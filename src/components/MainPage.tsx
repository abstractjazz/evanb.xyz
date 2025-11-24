// index.tsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ColorPicker from "./ColorPicker";


const P5Draw = dynamic(() => import("./p5Wrapper"), { ssr: false });
const P5Models = dynamic(() => import("./p5Models"), { ssr: false });
// const P5Typing = dynamic(() => import("./P5Typing"), { ssr: false });

const MODEL_URLS = [
  "https://evanb.xyz.s3.amazonaws.com/sportcoat.obj",
  "https://evanb.xyz.s3.amazonaws.com/skull.obj",
  "https://evanb.xyz.s3.amazonaws.com/raven.obj",
  "https://evanb.xyz.s3.amazonaws.com/pullover.obj",
  "https://evanb.xyz.s3.amazonaws.com/pants1.obj",
  "https://evanb.xyz.s3.amazonaws.com/owl.obj",
  "https://evanb.xyz.s3.amazonaws.com/octopus2.obj",
  "https://evanb.xyz.s3.amazonaws.com/octopus.obj",
  "https://evanb.xyz.s3.amazonaws.com/hoverboard.obj",
  "https://evanb.xyz.s3.amazonaws.com/gnome1.obj",
  "https://evanb.xyz.s3.amazonaws.com/earth2.obj",
  "https://evanb.xyz.s3.amazonaws.com/earth.obj",
  "https://evanb.xyz.s3.amazonaws.com/containership.obj",
  "https://evanb.xyz.s3.amazonaws.com/cherry.obj",
  "https://evanb.xyz.s3.amazonaws.com/cat.obj",
  "https://evanb.xyz.s3.amazonaws.com/cassette.obj",
  "https://evanb.xyz.s3.amazonaws.com/camera.obj",
  "https://evanb.xyz.s3.amazonaws.com/bus.obj",
  "https://evanb.xyz.s3.amazonaws.com/brain.obj",
];

const TEXTURE_URLS = [
  "https://evanb.xyz.s3.amazonaws.com/watertexture.jpg",
  "https://evanb.xyz.s3.amazonaws.com/puppy.jpg",
  "https://evanb.xyz.s3.amazonaws.com/leopardtexture.jpg",
  "https://evanb.xyz.s3.amazonaws.com/grass.jpg",
  "https://evanb.xyz.s3.amazonaws.com/glittertexture.jpg",
  "https://evanb.xyz.s3.amazonaws.com/foil.jpg",
  "https://evanb.xyz.s3.amazonaws.com/firetexture.jpg",
  "https://evanb.xyz.s3.amazonaws.com/denimtexture.jpg",
  "https://evanb.xyz.s3.amazonaws.com/currency.jpg",
  "https://evanb.xyz.s3.amazonaws.com/cloudtexture.jpg",
  "https://evanb.xyz.s3.amazonaws.com/clay.jpg",
  "https://evanb.xyz.s3.amazonaws.com/candytexture.jpg",
];

const PALETTE = [
  "#000000",
  "#222222",
  "#444444",
  "#666666",
  "#888888",
  "#AAAAAA",
  "#3498db",
  "#ff4757",
  "#ff6b81",
  "#ffa502",
  "#ffdd59",
  "#2ed573",
  "#1e90ff",
  "#3742fa",
  "#a55eea",
  "#ff7f50",
  "#eccc68",
  "#7bed9f",
  "#70a1ff",
  "#5352ed",
  "#2f3542",
  "#00a8ff",
  "#9c88ff",
  "#e84118",
  "#fbc531",
  "#4cd137",
  "#00d2d3",
  "#48dbfb",
  "#5f27cd",
  "#341f97",
  "#c23616",
  "#b71540",
  "#e58e26",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#d35400",
];

export default function MainPage() {
  const [bgIndex, setBgIndex] = useState(0);
  const [color, setColor] = useState(PALETTE[0]);
  const [clearTick, setClearTick] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);
  const [canChangeBg, setCanChangeBg] = useState(true);
  const [enableSketches, setEnableSketches] = useState(false);

  // defer heavy WebGL + p5 bundles until idle or first interaction
  useEffect(() => {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setEnableSketches(true);
    };

    const timer = window.setTimeout(start, 800);
    const onFirstInput = () => {
      start();
      window.clearTimeout(timer);
    };

    window.addEventListener("pointerdown", onFirstInput, { once: true });
    window.addEventListener("keydown", onFirstInput, { once: true });

    const idleId =
      "requestIdleCallback" in window
        ? (window as any).requestIdleCallback(() => start())
        : null;

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", onFirstInput);
      window.removeEventListener("keydown", onFirstInput);
      if (idleId && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      }
    };
  }, []);

  // auto-cycle the drawing color
  useEffect(() => {
    if (!autoCycle) return;

    const id = setInterval(() => {
      setColor((prev) => {
        const idx = PALETTE.indexOf(prev);
        const nextIdx = (idx + 1) % PALETTE.length;
        return PALETTE[nextIdx];
      });
    }, 500);

    return () => clearInterval(id);
  }, [autoCycle]);

  const handleChangeBg = () => {
    setEnableSketches(true);
    if (!canChangeBg) return; // cooldown

    setCanChangeBg(false);
    setBgIndex((i) => i + 1);

    // simple cooldown: 1.5s
    setTimeout(() => setCanChangeBg(true), 1500);
  };

  const handleClearDrawing = () => {
    setEnableSketches(true);
    setClearTick((t) => t + 1);
  };

  return (
    <main id="home" className="relative min-h-[100dvh] overflow-hidden bg-black">
      {/* p5 background models (start as plain black, no model until first click) */}
      {enableSketches && (
        <>
          <P5Models
            modelUrls={MODEL_URLS}
            textureUrls={TEXTURE_URLS}
            switchToken={bgIndex}
          />
          <div className="absolute inset-0" />
          {/* Draw layer */}
          <P5Draw
            
            strokeColor={color}
            strokeWeight={4}
            clearSignal={clearTick}
          />
        </>
      )}

      {/* Nav + palette wrapper */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 z-10">
        <div className="relative">
          <a
            href="#about"
            className="font-articulat-cf absolute left-[-26px] top-1/2 -translate-y-1/2 text-m font-bold tracking-wide text-goldenrod"
            style={{ writingMode: "vertical-rl" }}
          >
            About
          </a>

          <a
            href="#contact"
            className="font-articulat-cf absolute top-[-26px] left-1/2 -translate-x-1/2 text-m font-bold tracking-wide text-goldenrod"
          >
            Contact
          </a>

          <a
            href="#services"
            className="font-articulat-cf absolute right-[-26px] top-1/2 -translate-y-1/2 text-m font-bold tracking-wide text-goldenrod"
            style={{ writingMode: "vertical-rl" }}
          >
            Services
          </a>

          <a
            href="#work"
            className="font-articulat-cf absolute bottom-[-26px] left-1/2 -translate-x-1/2 text-m font-bold tracking-wide text-goldenrod"
          >
            Work
          </a>

          <div className="flex items-center justify-center opacity-65">
            <ColorPicker
              colors={PALETTE}
              active={color}
              onPick={(c) => {
                setAutoCycle(false);
                setColor(c);
              }}
            />
          </div>
        </div>
      </div>

      {/* Center text */}
      <div className="mt-15 absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="flex flex-col items-center space-y-2">
          <span className="font-articulat-cf font-bold text-2xl not-italic tracking-tight text-white">
            evanb.xyz
          </span>

          <div className="text-center text-sm md:text-xl font-articulat-cf font-bold leading-tight">
            <span className="text-white">Brand Builder • Creative Technologist</span>
          </div>

          <div className="text-beige text-center text-5xl md:text-7xl font-miller-banner font-black italic leading-tight">
            {"let's "}
            <span
              className="transition-colors duration-900 ease-out italic"
              style={{ color }}
            >
              {"make it "}
            </span>
            happen.
          </div>
          {/* <div className="flex justify-center align-center w-80 mt-4">
            You can call me Ev. I love building things. I've helped some of the world's biggest brands tell their stories.
          {/* <P5Typing text="You can call me Ev. Over the past decade, I've helped some of the world's biggest brands tell their stories." /> */}
          {/* </div>  */}
        </div>
      </div>

{/* Scroll handle (mobile only) */}
{/* <div className="absolute inset-x-0 bottom-18 z-10 flex justify-center md:hidden pointer-events-none">
  <div className="flex flex-col items-center text-[10px] font-articulat-cf text-beige/60">
    <span className="mb-1 tracking-[0.2em] uppercase">Scroll</span>
    <span className="animate-bounce text-lg">⌄</span>
  </div>
</div> */}

      {/* Bottom buttons */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-4 px-4">
        <button
          onClick={handleChangeBg}
          disabled={!canChangeBg}
          className={`font-articulat-cf min-w-[10rem] px-0 py-0 tracking-tight font-black ring-1 rounded-md text-goldenrod ${
            canChangeBg ? "ring-goldenrod md:hover:ring-1" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Change Background
        </button>
        <button
          onClick={handleClearDrawing}
          className="font-articulat-cf min-w-[8rem] rounded-md text-beige px-0 py-0 tracking-tight ring-1 font-black md:hover:ring-1 text-goldenrod"
        >
          Clear Drawing
        </button>
      </div>
    </main>
  );
}
