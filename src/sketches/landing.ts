import type p5 from 'p5'

declare module 'p5' {
  interface p5InstanceExtensions {
    canvas: HTMLCanvasElement
  }
}

const landingSketch = (p: p5) => {
  let parent!: HTMLElement
  let w = 0, h = 0
  let t = 0

  const fitToParent = () => {
    if (!parent) return
    const nw = parent.clientWidth
    const nh = parent.clientHeight
    if (nw !== w || nh !== h) {
      w = nw
      h = nh
      if (p.canvas) p.resizeCanvas(w, h)
    }
  }

  p.setup = () => {
    // p._userNode is the mount div provided by your P5Wrapper
    parent = (p as any)._userNode as HTMLElement
    w = parent.clientWidth
    h = parent.clientHeight

    p.createCanvas(w, h, p.P2D)
    p.pixelDensity(Math.min(2, window.devicePixelRatio || 1))
    p.noStroke()
  }

  p.draw = () => {
    // Keep the canvas transparent every frame so page content shows through
    p.clear()

    // Gentle animated shapes with alpha
    const cx = w / 2
    const cy = h / 2
    const baseR = Math.min(w, h) * 0.25

    for (let i = 0; i < 7; i++) {
      const ang = (i / 7) * Math.PI * 2 + t * 0.25
      const r = baseR + Math.sin(t * 0.8 + i) * 24
      const x = cx + Math.cos(ang) * r
      const y = cy + Math.sin(ang) * r

      // Tailwind-ish palette with alpha (RGBA)
      p.fill(99, 102, 241, 56)   // indigo-500 @ ~22% alpha
      p.ellipse(x, y, Math.min(w, h) * 0.1, Math.min(w, h) * 0.1)
    }

    t += 0.01
  }

  // Throttled resize to parent
  let resizeTimer: number | null = null
  p.windowResized = () => {
    if (resizeTimer) window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(fitToParent, 100)
  }
}

export default landingSketch
