"use client";

type Props = {
  colors: string[];
  onPick: (c: string) => void;
  active: string;
  isAutoCycling?: boolean;
};

export default function ColorPicker({ colors, onPick, active, isAutoCycling = false }: Props) {
  return (
   

    <div
      className={
        `grid grid-cols-8` +
        (isAutoCycling ? " animate-pulse" : "")
      }
      
    >
      {colors.map((c) => (
        <button
          key={c}
          aria-label={`pick ${c}`}
          onClick={() => onPick(c)}
          className="h-6 w-6 ring-1 ring-black/30"
          style={{
            background: c,
            outline: active === c ? "2px solid white" : "none",
          }}
        />
      ))}
    </div>
  );
}
