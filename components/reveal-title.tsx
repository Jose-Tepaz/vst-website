"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";

type Line = { text: string; highlight?: boolean; inline?: boolean };

// Título que aparece palabra por palabra: cada palabra sube desde detrás de una máscara.
// Se activa una vez, cuando el título entra en la vista.
export function RevealTitle({ id, lines, as = "h2", className = "", delay = 0 }: { id?: string; lines: Line[]; as?: "h2" | "p"; className?: string; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as as "h2";
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const box = element.getBoundingClientRect();
    if (window.scrollY > 8 && box.top < window.innerHeight && box.bottom > 0) { element.classList.add("in-view", "seen"); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { element.classList.add("in-view"); observer.disconnect(); } }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  let index = 0;
  return <Tag id={id} ref={ref} className={`reveal-title ${className}`.trim()} style={delay ? { "--d": `${delay}s` } as CSSProperties : undefined}>
    {lines.map((line, lineIndex) => <Fragment key={lineIndex}>
      {line.inline && lineIndex > 0 && " "}
      <span className={`rt-line${line.inline ? " rt-inline" : ""}${line.highlight ? " hl" : ""}`}>
        {line.text.split(" ").map((word, wordIndex) => <span key={wordIndex}>{wordIndex > 0 && " "}<span className="rt-mask"><span className="rt-word" style={{ "--w": index++ } as React.CSSProperties}>{word}</span></span></span>)}
      </span>
    </Fragment>)}
  </Tag>;
}
