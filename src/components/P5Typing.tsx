"use client";

import { useEffect, useRef } from "react";
import type p5 from "p5";

type Props = {
  text: string;
};

export default function P5Typing({ text }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const mod = await import("p5");
      if (cancelled) return;
      const P5 = mod.default;

      const sketch = (s: p5) => {
        let idx = 0;
        let lastTime = 0;

        s.setup = () => {
          s.createCanvas(s.windowWidth, 200);
          s.background(0);
          s.fill(255);
          s.textFont("monospace");
          s.textSize(24);
        };

        s.draw = () => {
          s.background(0);

          const now = s.millis();
          // simple typing speed
          if (now - lastTime > 40 && idx < text.length) {
            idx++;
            lastTime = now;
          }

          const visible = text.slice(0, idx);
          const cursor = now % 600 < 300 ? "|" : "";
          s.text(visible + cursor, 40, 100);
        };

        s.windowResized = () => {
          s.resizeCanvas(s.windowWidth, 200);
        };
      };

      if (hostRef.current) {
        p5Ref.current = new P5(sketch as any, hostRef.current);
      }
    };

    init();

    return () => {
      cancelled = true;
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [text]);

  return (
    <div
      ref={hostRef}
      className="w-full h-[200px]"
      aria-hidden="true"
    />
  );
}
