import {
  layoutNextLine,
  prepareWithSegments,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from '/Users/anthony/Developer/pretext/src/layout.ts'

type Point = { x: number; y: number }
type Segment = Point & { radius: number }
type Slot = { left: number; right: number }
type LineBox = { x: number; y: number; text: string }

const FONT = '16px Georgia, "Times New Roman", serif'
const LINE_HEIGHT = 24
const PAD_X = 22
const PAD_Y = 20
const MIN_SLOT_WIDTH = 94
const HEAD_RADIUS = 18
const BODY_RADIUS = 13
const SEGMENT_COUNT = 18
const SEGMENT_SPACING = 16
const TEXT = [
  '2015: interest in computational science.',
  '2017: first deep learning study.',
  '2020: started learning RL.',
  '2022: beta tester for the first ChatGPT.',
  '2024: met my idols in NeurIPS.',
].join(' ')

const handle = document.getElementById('dragonHandle')
const shell = document.getElementById('dragonShell')
const stage = document.getElementById('dragonStage')
if (!(handle instanceof HTMLDivElement)) throw new Error('#dragonHandle not found')
if (!(shell instanceof HTMLDivElement)) throw new Error('#dragonShell not found')
if (!(stage instanceof HTMLDivElement)) throw new Error('#dragonStage not found')

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svg.style.position = 'absolute'
svg.style.inset = '0'
svg.style.width = '100%'
svg.style.height = '100%'
svg.style.pointerEvents = 'none'

const lineLayer = document.createElement('div')
lineLayer.style.position = 'absolute'
lineLayer.style.inset = '0'
lineLayer.style.pointerEvents = 'none'

stage.append(svg, lineLayer)

const prepared = prepareWithSegments(TEXT, FONT)
const state = {
  active: false,
  dragging: false,
  pointerId: -1,
  target: { x: 0, y: 0 },
  segments: [] as Segment[],
  raf: 0,
}

initializeSegments()
attachEvents()
new ResizeObserver(() => {
  if (!state.active) return
  clampTarget()
  resetSegmentsNearTarget()
  render()
}).observe(stage)

function attachEvents(): void {
  handle.style.cursor = 'grab'
  handle.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
}

function onPointerDown(event: PointerEvent): void {
  event.preventDefault()
  state.active = true
  state.dragging = true
  state.pointerId = event.pointerId
  handle.style.cursor = 'grabbing'
  shell.style.display = 'block'
  moveTargetFromClientPoint(event.clientX, event.clientY)
  resetSegmentsNearTarget()
  render()
  ensureAnimation()
}

function onPointerMove(event: PointerEvent): void {
  if (!state.dragging || event.pointerId !== state.pointerId) return
  moveTargetFromClientPoint(event.clientX, event.clientY)
}

function onPointerUp(event: PointerEvent): void {
  if (event.pointerId !== state.pointerId) return
  state.dragging = false
  state.pointerId = -1
  handle.style.cursor = 'grab'
}

function moveTargetFromClientPoint(clientX: number, clientY: number): void {
  const rect = stage.getBoundingClientRect()
  const fallbackY = Math.max(PAD_Y + 40, Math.min(rect.height - PAD_Y - 40, rect.height * 0.48))
  state.target.x = clientX - rect.left
  state.target.y = clientY - rect.top
  if (clientY < rect.top || clientY > rect.bottom || clientX < rect.left || clientX > rect.right) {
    state.target.y = fallbackY
  }
  clampTarget()
}

function clampTarget(): void {
  const width = Math.max(320, stage.clientWidth)
  const height = Math.max(280, stage.clientHeight)
  state.target.x = Math.max(PAD_X + 30, Math.min(width - PAD_X - 30, state.target.x || width * 0.18))
  state.target.y = Math.max(PAD_Y + 26, Math.min(height - PAD_Y - 26, state.target.y || height * 0.48))
}

function initializeSegments(): void {
  state.segments = []
  for (let index = 0; index < SEGMENT_COUNT; index++) {
    state.segments.push({
      x: 120 - index * SEGMENT_SPACING,
      y: 120,
      radius: index === 0 ? HEAD_RADIUS : BODY_RADIUS - Math.min(4, index * 0.12),
    })
  }
}

function resetSegmentsNearTarget(): void {
  for (let index = 0; index < state.segments.length; index++) {
    const segment = state.segments[index]!
    segment.x = state.target.x - index * SEGMENT_SPACING
    segment.y = state.target.y
  }
}

function ensureAnimation(): void {
  if (state.raf !== 0) return
  state.raf = requestAnimationFrame(tick)
}

function tick(): void {
  state.raf = 0
  if (!state.active) return

  stepSegments()
  render()

  if (state.dragging || segmentsStillMoving()) ensureAnimation()
}

function stepSegments(): void {
  const head = state.segments[0]!
  head.x += (state.target.x - head.x) * 0.28
  head.y += (state.target.y - head.y) * 0.28

  for (let index = 1; index < state.segments.length; index++) {
    const previous = state.segments[index - 1]!
    const current = state.segments[index]!
    const dx = previous.x - current.x
    const dy = previous.y - current.y
    const distance = Math.max(0.001, Math.hypot(dx, dy))
    const desired = SEGMENT_SPACING
    const ratio = (distance - desired) / distance
    current.x += dx * ratio * 0.72
    current.y += dy * ratio * 0.72
  }
}

function segmentsStillMoving(): boolean {
  const head = state.segments[0]!
  return Math.abs(head.x - state.target.x) > 0.5 || Math.abs(head.y - state.target.y) > 0.5
}

function render(): void {
  const width = Math.max(320, Math.floor(stage.clientWidth))
  const height = Math.max(280, Math.floor(stage.clientHeight))
  const lines = layoutAroundDragon(prepared, width, height, state.segments)

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  svg.replaceChildren(buildSvgFrame(width, height, state.segments))
  lineLayer.replaceChildren(...lines.map(createLineNode))
}

function layoutAroundDragon(
  preparedText: PreparedTextWithSegments,
  width: number,
  height: number,
  obstacles: Segment[],
): LineBox[] {
  const lines: LineBox[] = []
  const base: Slot = { left: PAD_X, right: width - PAD_X }
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = PAD_Y

  outer: while (y + LINE_HEIGHT <= height - PAD_Y) {
    const bandTop = y
    const bandBottom = y + LINE_HEIGHT
    const blocked = obstacles
      .map(obstacle => circleIntervalForBand(obstacle, bandTop, bandBottom))
      .filter((slot): slot is Slot => slot !== null)
      .sort((a, b) => a.left - b.left)
    const slots = carveSlots(base, blocked)

    if (slots.length === 0) {
      y += LINE_HEIGHT
      continue
    }

    for (let index = 0; index < slots.length; index++) {
      const slot = slots[index]!
      const line = layoutNextLine(preparedText, cursor, slot.right - slot.left)
      if (line === null) break outer
      lines.push({
        x: Math.round(slot.left),
        y,
        text: line.text,
      })
      cursor = line.end
    }

    y += LINE_HEIGHT
  }

  return lines
}

function circleIntervalForBand(obstacle: Segment, bandTop: number, bandBottom: number): Slot | null {
  const top = bandTop - 4
  const bottom = bandBottom + 4
  if (top >= obstacle.y + obstacle.radius || bottom <= obstacle.y - obstacle.radius) return null

  const minDy = obstacle.y >= top && obstacle.y <= bottom
    ? 0
    : obstacle.y < top
      ? top - obstacle.y
      : obstacle.y - bottom
  if (minDy >= obstacle.radius) return null

  const dx = Math.sqrt(obstacle.radius * obstacle.radius - minDy * minDy)
  return {
    left: obstacle.x - dx - 6,
    right: obstacle.x + dx + 6,
  }
}

function carveSlots(base: Slot, blocked: Slot[]): Slot[] {
  let slots: Slot[] = [base]
  for (let index = 0; index < blocked.length; index++) {
    const block = blocked[index]!
    const next: Slot[] = []
    for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
      const slot = slots[slotIndex]!
      if (block.right <= slot.left || block.left >= slot.right) {
        next.push(slot)
        continue
      }
      if (block.left > slot.left) next.push({ left: slot.left, right: block.left })
      if (block.right < slot.right) next.push({ left: block.right, right: slot.right })
    }
    slots = next
  }
  return slots.filter(slot => slot.right - slot.left >= MIN_SLOT_WIDTH)
}

function buildSvgFrame(width: number, height: number, segments: Segment[]): SVGGElement {
  const group = createSvg('g')

  const label = createSvg('text')
  label.setAttribute('x', String(PAD_X))
  label.setAttribute('y', '16')
  label.setAttribute('fill', '#7a7163')
  label.setAttribute('font-size', '12')
  label.setAttribute('font-family', 'Georgia, "Times New Roman", serif')
  label.textContent = 'drag the first node'
  group.appendChild(label)

  const body = createSvg('path')
  body.setAttribute('d', buildBodyPath(segments))
  body.setAttribute('fill', 'none')
  body.setAttribute('stroke', '#717f5a')
  body.setAttribute('stroke-width', '16')
  body.setAttribute('stroke-linecap', 'round')
  body.setAttribute('stroke-linejoin', 'round')
  body.setAttribute('opacity', '0.22')
  group.appendChild(body)

  const spine = createSvg('path')
  spine.setAttribute('d', buildBodyPath(segments))
  spine.setAttribute('fill', 'none')
  spine.setAttribute('stroke', '#39452c')
  spine.setAttribute('stroke-width', '1.75')
  spine.setAttribute('stroke-linecap', 'round')
  spine.setAttribute('stroke-linejoin', 'round')
  spine.setAttribute('opacity', '0.7')
  group.appendChild(spine)

  for (let index = 0; index < segments.length; index++) {
    const segment = segments[index]!
    const circle = createSvg('circle')
    circle.setAttribute('cx', String(segment.x))
    circle.setAttribute('cy', String(segment.y))
    circle.setAttribute('r', String(index === 0 ? 8 : 4.5))
    circle.setAttribute('fill', index === 0 ? '#2e2a24' : '#5f6f4d')
    circle.setAttribute('fill-opacity', index === 0 ? '0.95' : '0.75')
    group.appendChild(circle)
  }

  const head = segments[0]!
  const snout = createSvg('path')
  snout.setAttribute(
    'd',
    `M ${head.x + 8} ${head.y - 5} L ${head.x + 24} ${head.y} L ${head.x + 8} ${head.y + 5}`,
  )
  snout.setAttribute('fill', '#717f5a')
  snout.setAttribute('fill-opacity', '0.25')
  snout.setAttribute('stroke', '#39452c')
  snout.setAttribute('stroke-width', '1.5')
  group.appendChild(snout)

  const eye = createSvg('circle')
  eye.setAttribute('cx', String(head.x + 7))
  eye.setAttribute('cy', String(head.y - 2))
  eye.setAttribute('r', '1.6')
  eye.setAttribute('fill', '#1d1a16')
  group.appendChild(eye)

  const hornA = createSvg('path')
  hornA.setAttribute(
    'd',
    `M ${head.x + 1} ${head.y - 7} Q ${head.x - 4} ${head.y - 18} ${head.x - 10} ${head.y - 18}`,
  )
  hornA.setAttribute('fill', 'none')
  hornA.setAttribute('stroke', '#39452c')
  hornA.setAttribute('stroke-width', '1.3')
  hornA.setAttribute('stroke-linecap', 'round')
  group.appendChild(hornA)

  const hornB = createSvg('path')
  hornB.setAttribute(
    'd',
    `M ${head.x + 4} ${head.y - 6} Q ${head.x + 2} ${head.y - 19} ${head.x + 11} ${head.y - 21}`,
  )
  hornB.setAttribute('fill', 'none')
  hornB.setAttribute('stroke', '#39452c')
  hornB.setAttribute('stroke-width', '1.3')
  hornB.setAttribute('stroke-linecap', 'round')
  group.appendChild(hornB)

  const border = createSvg('rect')
  border.setAttribute('x', '0.5')
  border.setAttribute('y', '0.5')
  border.setAttribute('width', String(width - 1))
  border.setAttribute('height', String(height - 1))
  border.setAttribute('fill', 'none')
  border.setAttribute('stroke', '#d6d1c7')
  group.appendChild(border)

  return group
}

function buildBodyPath(segments: Segment[]): string {
  if (segments.length === 0) return ''
  let d = `M ${segments[0]!.x} ${segments[0]!.y}`
  for (let index = 1; index < segments.length - 1; index++) {
    const current = segments[index]!
    const next = segments[index + 1]!
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    d += ` Q ${current.x} ${current.y} ${midX} ${midY}`
  }
  const tail = segments[segments.length - 1]!
  d += ` T ${tail.x} ${tail.y}`
  return d
}

function createLineNode(line: LineBox): HTMLSpanElement {
  const node = document.createElement('span')
  node.textContent = line.text
  node.style.position = 'absolute'
  node.style.left = `${line.x}px`
  node.style.top = `${line.y}px`
  node.style.font = FONT
  node.style.lineHeight = `${LINE_HEIGHT}px`
  node.style.color = '#2f2a24'
  node.style.whiteSpace = 'pre'
  return node
}

function createSvg<Tag extends keyof SVGElementTagNameMap>(tag: Tag): SVGElementTagNameMap[Tag] {
  return document.createElementNS('http://www.w3.org/2000/svg', tag)
}
