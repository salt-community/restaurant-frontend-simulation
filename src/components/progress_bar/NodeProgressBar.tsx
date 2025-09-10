import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface NodeProgressBarProps {
  currentStep: number; // zero-based active step index
  steps?: string[];    // optional labels
}

export default function NodeProgressBar({
                                          currentStep,
                                          steps = ["ORDER", "PAYMENT", "ADRESS", "KITCHEN", "DELIVERY", "FINISH"],
                                        }: NodeProgressBarProps) {
  // Visual constants
  const NODE_DIAMETER = 20; // includes border (box-sizing: border-box)
  const RAIL_HEIGHT = 8;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Ensure nodeRefs length matches steps (do not recreate the array each render)
  if (nodeRefs.current.length !== steps.length) {
    nodeRefs.current = Array.from({ length: steps.length }, (_, i) => nodeRefs.current[i] ?? null);
  }

  const [railInset, setRailInset] = useState<{ left: number; right: number }>({ left: 0, right: 0 });
  const [fillPct, setFillPct] = useState(0);

  const total = steps.length;
  const clampedIndex = Math.max(0, Math.min(currentStep, total - 1));

  // Helper: set state only if value actually changed (rounded to avoid micro-jitter)
  const setIfChanged = <T extends number | { left: number; right: number }>(
    setter: React.Dispatch<React.SetStateAction<any>>,
    prevVal: any,
    nextVal: T
  ) => {
    const round = (n: number) => Math.round(n * 10) / 10; // 0.1px precision
    const changed =
      typeof nextVal === "number"
        ? round(prevVal) !== round(nextVal as number)
        : round(prevVal.left) !== round((nextVal as any).left) ||
        round(prevVal.right) !== round((nextVal as any).right);
    if (changed) setter(nextVal);
  };

  // Measure node centers and container to compute rail and fill precisely
  const measure = () => {
    const container = containerRef.current;
    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!container || nodes.length < 2) return;

    const containerRect = container.getBoundingClientRect();
    const centers = nodes.map((n) => {
      const r = n.getBoundingClientRect();
      return r.left - containerRect.left + r.width / 2;
    });

    const first = centers[0];
    const last = centers[centers.length - 1];
    if (last <= first) return;

    const left = first;
    const right = containerRect.width - last;

    const currCenter = centers[clampedIndex];
    const pct = ((currCenter - first) / (last - first)) * 100;

    setIfChanged(setRailInset, railInset, { left, right });
    setIfChanged(setFillPct, fillPct, Math.max(0, Math.min(100, pct)));
  };

  // Measure after layout
  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length, clampedIndex]);

  // Re-measure on container resize and window resize
  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    padding: "20px 10px 8px 10px",
    boxSizing: "border-box",
  };

  const railWrapperStyle: React.CSSProperties = {
    position: "relative",
    height: RAIL_HEIGHT,
  };

  const railStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: railInset.left,
    right: railInset.right,
    height: "100%",
    background: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
    transition: "left 150ms ease, right 150ms ease",
  };

  const fillStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `${fillPct}%`,
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    borderRadius: 999,
    transition: "width 250ms ease",
  };

  const nodesStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -10,
  };

  const labelStyleBase: React.CSSProperties = {
    position: "absolute",
    top: 18,
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    fontSize: 12,
    color: "#374151",
  };

  return (
    <div ref={containerRef} style={containerStyle} aria-label="Progress">
      <div style={railWrapperStyle}>
        <div style={railStyle}>
          <div style={fillStyle} aria-hidden />
        </div>
      </div>

      <div style={nodesStyle}>
        {steps.map((label, idx) => {
          const accomplished = idx <= clampedIndex;
          const nodeStyle: React.CSSProperties = {
            position: "relative",
            width: NODE_DIAMETER,
            height: NODE_DIAMETER,
            borderRadius: "50%",
            backgroundColor: accomplished ? "#2563eb" : "#fff",
            border: `3px solid ${accomplished ? "#2563eb" : "#cbd5e1"}`,
            boxSizing: "border-box",
            transition: "background-color 250ms ease, border-color 250ms ease",
            marginLeft: "auto",
            marginRight: "auto",
          };
          const labelStyle: React.CSSProperties = {
            ...labelStyleBase,
            color: accomplished ? "#111827" : "#6b7280",
            fontWeight: accomplished ? 600 : 500,
          };

          return (
            <div key={label} style={{ position: "relative", flex: 1 }}>
              <div
                ref={(el) => (nodeRefs.current[idx] = el)}
                style={nodeStyle}
                role="listitem"
                aria-current={idx === clampedIndex ? "step" : undefined}
                title={label}
              />
              <div style={labelStyle}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}