"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CypherPawShape({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={`pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] ${className}`}
      style={{ transform: "translate(-38%, -38%) rotate(-12deg)" }}
      aria-hidden
    >
      <path
        d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-8.8-2.2c-30.1-7.5-61.2-11.4-92.5-11.4s-62.4 3.9-92.5 11.4l-8.8 2.2c-11 2.8-22.5 4.2-34 4.2C30.9 480 10 459.1 10 433.3l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s59.7-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-59.7 47.3-78.5 33.3zM318.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
        fill="var(--teal)"
        stroke="var(--line)"
        strokeWidth="16"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function PawCursor() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  // Springs for the Chibi mascot follower
  const chibiX = useSpring(x, { stiffness: 240, damping: 22 });
  const chibiY = useSpring(y, { stiffness: 240, damping: 22 });

  // Springs for the pinpoint target pointer
  const pointerX = useSpring(x, { stiffness: 900, damping: 45 });
  const pointerY = useSpring(y, { stiffness: 900, damping: 45 });

  const rotate = useSpring(0, { stiffness: 280, damping: 18 });
  const scale = useSpring(1, { stiffness: 350, damping: 20 });

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  const lastPos = useRef({ x: 0, time: 0 });
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const capable =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!capable) return;

    const apply = (on: boolean) => {
      setActive(on);
      document.documentElement.classList.toggle("paw-on", on);
    };
    apply(localStorage.getItem("paw-cursor") !== "off");

    const onToggle = () => {
      const next = !document.documentElement.classList.contains("paw-on");
      localStorage.setItem("paw-cursor", next ? "on" : "off");
      apply(next);
    };

    const onMove = (e: PointerEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);

      // Calculate movement velocity for natural sticker inertia tilt
      const now = performance.now();
      const dt = Math.max(12, now - lastPos.current.time);
      const dx = e.clientX - lastPos.current.x;
      const vx = dx / dt;
      lastPos.current = { x: e.clientX, time: now };

      // Clamped dynamic tilt (-14 to +14 deg)
      const targetTilt = Math.max(-14, Math.min(14, vx * 12));
      rotate.set(targetTilt);

      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        rotate.set(0);
      }, 100);

      // Check if hovering over clickable / interactive elements
      const target = e.target as HTMLElement | null;
      const clickable = !!target?.closest(
        'a, button, input, select, textarea, [role="button"], [data-boing], .btn-squish, .clickable'
      );
      setIsHovering(clickable);
    };

    const onDown = (e: PointerEvent) => {
      scale.set(0.88);
      // Spawn quick cyan ripple
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 420);
    };

    const onUp = () => {
      scale.set(isHovering ? 1.14 : 1);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("paw-toggle", onToggle);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("paw-toggle", onToggle);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("paw-on");
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, [x, y, rotate, scale, isHovering]);

  // Adjust scale when hover state changes
  useEffect(() => {
    scale.set(isHovering ? 1.12 : 1);
  }, [isHovering, scale]);

  if (!active || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Click ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="pointer-events-none fixed rounded-full border-2 border-teal/70"
          initial={{
            width: 8,
            height: 8,
            x: r.x - 4,
            y: r.y - 4,
            opacity: 0.85,
            scale: 0.4,
          }}
          animate={{
            width: 38,
            height: 38,
            x: r.x - 19,
            y: r.y - 19,
            opacity: 0,
            scale: 1.5,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ))}

      {/* Pinpoint click target dot with mini Cypher paw */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[1001]"
        style={{
          x: pointerX,
          y: pointerY,
          transform: "translate(-2px, -2px)",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.25 : 1,
            rotate: isHovering ? -18 : -10,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
        >
          <CypherPawShape size={isHovering ? 24 : 20} />
        </motion.div>
      </motion.div>

      {/* Adorable Chibi Cypher Mascot follower looking up towards the cursor pointer */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[1000] will-change-transform"
        style={{
          x: chibiX,
          y: chibiY,
          // Offset placing Cypher slightly below and to the left of the pointer.
          // Because Cypher's eyes are tilted looking up-right, he looks directly at the click target!
          transform: "translate(-30px, 14px)",
          rotate,
          scale,
        }}
      >
        <div className="relative group">
          <Image
            src="/cypher-chibi-cursor.png"
            alt="Cypher Chibi Cursor"
            width={52}
            height={58}
            priority
            draggable={false}
            className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] select-none pointer-events-none"
          />
        </div>
      </motion.div>
    </div>
  );
}
