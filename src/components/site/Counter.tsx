import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
