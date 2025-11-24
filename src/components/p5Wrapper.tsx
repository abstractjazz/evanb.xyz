"use client";
import { useEffect, useRef } from "react";
import type p5 from "p5";

type Props = {
  strokeColor: string;
  strokeWeight?: number;
  clearSignal?: number; // increment this to clear from parent
};

export default function P5Draw({
  strokeColor,
  strokeWeight = 4,
  clearSignal = 0,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const lastClearRef = useRef<number>(0);
  const colorRef = useRef(strokeColor);
  const weightRef = useRef(strokeWeight);

  // keep latest controls in refs so p5 can read them
  useEffect(() => {
    colorRef.current = strokeColor;
  }, [strokeColor]);

  useEffect(() => {
    weightRef.current = strokeWeight;
  }, [strokeWeight]);

  // react to clearSignal changes
  useEffect(() => {
    if (!p5Ref.current) return;
    if (clearSignal !== lastClearRef.current) {
      lastClearRef.current = clearSignal;
      const s = p5Ref.current;
      // only clear if renderer exists
      if ((s as any)._renderer) {
        s.clear();
      }
    }
  }, [clearSignal]);

  useEffect(() => {
    let canceled = false;

    const init = async () => {
      const mod = await import("p5");
      if (canceled) return;
      const P5 = mod.default;

      const sketch = (s: p5) => {
        let drawing = false;

        const isReady = () => Boolean((s as any)._renderer);

        s.setup = () => {
  const c = s.createCanvas(s.windowWidth, s.windowHeight);
  s.clear(); // transparent

  // browser handles scroll on touch, even over the canvas
  // p5's renderer has an .elt property that is the actual <canvas>

  const canvasEl = (c as any).elt as HTMLCanvasElement;
  canvasEl.style.touchAction = "auto";
};


        s.draw = () => {
          // nothing on tick; we draw only on pointer events
        };

        const start = () => {
          if (!isReady()) return;
          drawing = true;
          s.stroke(colorRef.current);
          s.strokeWeight(weightRef.current);
          s.noFill();
          // draw a tiny dot so taps leave a mark
          s.line(s.mouseX, s.mouseY, s.mouseX, s.mouseY);
        };

        const move = () => {
          if (!drawing || !isReady()) return;
          s.stroke(colorRef.current);
          s.strokeWeight(weightRef.current);
          s.line(s.pmouseX, s.pmouseY, s.mouseX, s.mouseY);
        };

        const stop = () => {
          drawing = false;
        };

        s.mousePressed = start;
        s.mouseDragged = move;
        s.mouseReleased = stop;

        // touch support
        s.touchStarted = () => {
          start();
          // return false;
        };
        s.touchMoved = () => {
          move();
          // return false;
        };
        s.touchEnded = () => {
          stop();
          // return false;
        };

        s.windowResized = () => {
          if (!isReady()) return;
          const g = s.get(); // keep current drawing
          s.resizeCanvas(s.windowWidth, s.windowHeight);
          s.clear();
          s.image(g, 0, 0);
        };
      };

      if (hostRef.current) {
        p5Ref.current = new P5(sketch as any, hostRef.current);
      }
    };

    init();

    return () => {
      canceled = true;
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      aria-hidden="true"
    />
  );
}
