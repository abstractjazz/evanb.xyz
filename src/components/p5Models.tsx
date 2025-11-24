// components/P5Models.tsx
"use client";

import { useEffect, useRef } from "react";
import type p5 from "p5";

type Props = {
  /** S3 (or other) URLs to your 3D models (OBJ / STL) */
  modelUrls: string[];
  /** Whenever this number changes, we reload a random model + primitives */
  switchToken?: number;
  /** Optional URLs for texture images (PNG / JPG / etc) */
  textureUrls?: string[];
};

export default function P5Models({ modelUrls, switchToken, textureUrls }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    if (!modelUrls || modelUrls.length === 0) {
      console.warn("[P5Models] No modelUrls provided – skipping sketch.");
      return;
    }

    let canceled = false;

    const init = async () => {
      const mod = await import("p5");
      if (canceled) return;
      const P5 = mod.default;

      const sketch = (s: p5) => {
        // ---------- STATE ----------
        let currentModel: any = null;
        let isLoadingModel = false;

        // central model appearance
        let modelColor: [number, number, number] | null = null;
        let modelTexture: p5.Image | null = null;

        // textures for everything
        let textures: p5.Image[] = [];

        type Bouncer = {
          shape: "box" | "sphere" | "torus" | "cylinder" | "cone";
          size: number;
          pos: { x: number; y: number; z: number };
          vel: { x: number; y: number; z: number };
          color: [number, number, number];
          texture?: p5.Image | null;
        };

        let bouncers: Bouncer[] = [];
        const BOUNDS = 260; // overall motion bounds

        const shapes: Bouncer["shape"][] = [
          "box",
          "sphere",
          "torus",
          "cylinder",
          "cone",
        ];

        const rand = (min: number, max: number) =>
          min + Math.random() * (max - min);

        const pickRandomUrl = () =>
          modelUrls[Math.floor(Math.random() * modelUrls.length)];

        const pickRandomTexture = (): p5.Image | null => {
          if (!textures.length) return null;
          const idx = Math.floor(Math.random() * textures.length);
          return textures[idx] ?? null;
        };

        // ---------- LOADERS ----------

        const loadTextures = () => {
          textures = [];

          if (!textureUrls || !textureUrls.length) return;

          textureUrls.forEach((url) => {
            s.loadImage(
              url,
              (img) => {
                textures.push(img);
              },
              (err) => {
                console.warn("[P5Models] Failed texture:", url, err);
              }
            );
          });

          console.log("[P5Models] Textures queued:", textureUrls.length);
        };

        const loadRandomModel = () => {
          if (isLoadingModel) return;
          isLoadingModel = true;

          const url = pickRandomUrl();
          console.log("[P5Models] Loading model:", url);

          // NOTE: p5.js 2.0 – don't pass boolean as second arg
          s.loadModel(
            url,
            (m: any) => {
              currentModel = m;

              // ~70% chance to texture the model
              const useTexture = textures.length > 0 && Math.random() < 0.7;
              if (useTexture) {
                modelTexture = pickRandomTexture();
                modelColor = null;
              } else {
                modelTexture = null;
                modelColor = [
                  Math.floor(rand(0, 255)),
                  Math.floor(rand(0, 255)),
                  Math.floor(rand(0, 255)),
                ];
              }

              isLoadingModel = false;
            },
            (err: any) => {
              console.error("[P5Models] Error loading model:", err);
              isLoadingModel = false;
            }
          );
        };

        const createBouncers = () => {
          // fewer shapes for perf: 2–4
          const count = 2 + Math.floor(Math.random() * 3);
          bouncers = [];

          for (let i = 0; i < count; i++) {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = rand(40, 140);

            const pos = {
              x: rand(-BOUNDS, BOUNDS),
              y: rand(-BOUNDS, BOUNDS),
              z: rand(-BOUNDS, BOUNDS),
            };

            const vel = {
              x: rand(-0.6, 0.6),
              y: rand(-0.6, 0.6),
              z: rand(-0.6, 0.6),
            };

            const color: [number, number, number] = [
              Math.floor(rand(40, 160)),
              Math.floor(rand(40, 160)),
              Math.floor(rand(40, 160)),
            ];

            // ~40% chance this bouncer uses a texture
            const useTexture = textures.length > 0 && Math.random() < 0.4;
            const texture = useTexture ? pickRandomTexture() : null;

            bouncers.push({ shape, size, pos, vel, color, texture });
          }
        };

        const regenerateScene = () => {
          console.log("[P5Models] Regenerating scene");
          loadRandomModel();
          createBouncers();
        };

        const bounceUpdate = (b: Bouncer) => {
          b.pos.x += b.vel.x;
          b.pos.y += b.vel.y;
          b.pos.z += b.vel.z;

          if (b.pos.x > BOUNDS || b.pos.x < -BOUNDS) {
            b.vel.x *= -1;
            b.pos.x = Math.max(Math.min(b.pos.x, BOUNDS), -BOUNDS);
          }
          if (b.pos.y > BOUNDS || b.pos.y < -BOUNDS) {
            b.vel.y *= -1;
            b.pos.y = Math.max(Math.min(b.pos.y, BOUNDS), -BOUNDS);
          }
          if (b.pos.z > BOUNDS || b.pos.z < -BOUNDS) {
            b.vel.z *= -1;
            b.pos.z = Math.max(Math.min(b.pos.z, BOUNDS), -BOUNDS);
          }
        };

        const drawBouncer = (b: Bouncer) => {
          s.push();
          s.translate(b.pos.x, b.pos.y, b.pos.z);

          if (b.texture) {
            s.texture(b.texture);
          } else {
            s.ambientMaterial(b.color[0], b.color[1], b.color[2]);
          }

          switch (b.shape) {
            case "box":
              s.box(b.size);
              break;
            case "sphere":
              s.sphere(b.size * 0.7, 16, 16);
              break;
            case "torus":
              s.torus(b.size * 0.7, b.size * 0.25, 16, 16);
              break;
            case "cylinder":
              s.cylinder(b.size * 0.6, b.size * 1.1, 16, 8);
              break;
            case "cone":
              s.cone(b.size * 0.7, b.size * 1.1, 16, 8);
              break;
          }

          s.pop();
        };

        // ---------- EXPOSED HOOK FOR REACT ----------

        (s as any).triggerSwap = regenerateScene;

        // ---------- P5 LIFECYCLE ----------

        s.setup = () => {
          s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
          s.noStroke();

          // load textures asynchronously; keep scene empty initially
          loadTextures();
          // NOTE: we do NOT call regenerateScene() here,
          // so the page starts in "plain black" state.
        };

        s.draw = () => {
          s.background(0);

          const t = s.millis() * 0.0005;
          s.orbitControl();
          s.lights();
          s.directionalLight(180, 120, 255, 0.5, -0.75, -1);

          // central model
          if (currentModel) {
            s.push();

            s.rotateY(t);
            s.rotateX(t * 0.5);

            // 👉 control model size here
            s.scale(1.4);

            if (modelTexture) {
              s.texture(modelTexture);
            } else if (modelColor) {
              s.ambientMaterial(modelColor[0], modelColor[1], modelColor[2]);
            } else {
              s.ambientMaterial(255, 255, 255);
            }

            s.model(currentModel);
            s.pop();
          }

          // bouncers
          for (const b of bouncers) {
            bounceUpdate(b);
            drawBouncer(b);
          }
        };

        s.windowResized = () => {
          s.resizeCanvas(s.windowWidth, s.windowHeight);
        };
      };

      if (hostRef.current) {
        try {
          p5Ref.current = new P5(sketch as any, hostRef.current);
        } catch (err) {
          console.error("[P5Models] Error creating p5 instance:", err);
        }
      }
    };

    init();

    return () => {
      canceled = true;
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [modelUrls, textureUrls]);

  // when switchToken changes, ask p5 to regenerate
  useEffect(() => {
    if (!p5Ref.current) return;
    const anyP5 = p5Ref.current as any;
    if (typeof anyP5.triggerSwap === "function") {
      anyP5.triggerSwap();
    }
  }, [switchToken]);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
