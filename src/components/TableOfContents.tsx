import React, { useState, useEffect, useCallback, useRef } from "react";

interface Section {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TableOfContentsProps {
  sections: Section[];
  offset?: number;
}

const navStyle: React.CSSProperties = {
  position: "fixed",
  right: "24px",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 40,
  alignItems: "center",
  gap: "16px",
};

const progressTrackStyle: React.CSSProperties = {
  width: "2px",
  borderRadius: "9999px",
  overflow: "hidden",
  height: "200px",
  position: "relative",
  backgroundColor: "#E9E8EA",
};

const progressFillStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  borderRadius: "9999px",
  backgroundColor: "#357E7D",
  transition: "height 300ms ease-out",
};

export default function TableOfContents({
  sections,
  offset = 80,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dividerTopsRef = useRef<Map<string, number>>(new Map());

  const updateDividerPositions = useCallback(() => {
    const map = new Map<string, number>();
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        map.set(id, el.getBoundingClientRect().top + window.scrollY);
      }
    });
    dividerTopsRef.current = map;
  }, [sections]);

  useEffect(() => {
    updateDividerPositions();

    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
        setScrollProgress(progress);

        const tops = dividerTopsRef.current;
        let currentActive = "";

        for (let i = 0; i < sections.length; i++) {
          const id = sections[i].id;
          const thisTop = tops.get(id);
          if (thisTop === undefined) continue;

          const nextId = sections[i + 1]?.id;
          const nextTop = nextId ? tops.get(nextId) : undefined;

          if (scrollY + offset >= thisTop) {
            if (nextTop === undefined || scrollY + offset < nextTop) {
              currentActive = id;
              break;
            }
          }
        }

        if (!currentActive && tops.size > 0) {
          const firstEntry = Array.from(tops.entries())[0];
          if (scrollY + offset < firstEntry[1]) {
            currentActive = firstEntry[0];
          }
        }

        if (!currentActive && tops.size > 0) {
          const entries = Array.from(tops.entries());
          const lastEntry = entries[entries.length - 1];
          if (scrollY + offset >= lastEntry[1]) {
            currentActive = lastEntry[0];
          }
        }

        if (currentActive && currentActive !== activeId) {
          setActiveId(currentActive);
        }

        if (scrollY % 400 < 16) {
          updateDividerPositions();
        }
      });
    };

    const handleResize = () => updateDividerPositions();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sections, offset, activeId, updateDividerPositions]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const progressPct = Math.round(scrollProgress * 100);

  return (
    <nav className="toc-nav" style={navStyle} aria-label="Table des matières">
      <style>{`
        .toc-nav { display: none; }
        @media (min-width: 1024px) {
          .toc-nav { display: flex; }
        }
      `}</style>
      <div style={progressTrackStyle}>
        <div style={{ ...progressFillStyle, height: `${progressPct}%` }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {sections.map((section) => {
          const isActive = activeId === section.id;
          const isHovered = hoveredId === section.id;
          const showLabel = isActive || isHovered;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "44px",
                height: "44px",
                outline: "none",
              }}
              aria-label={`Aller à ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                style={{
                  display: "block",
                  borderRadius: "50%",
                  transition: "all 300ms ease-out",
                  width: isActive ? "10px" : isHovered ? "7px" : "5px",
                  height: isActive ? "10px" : isHovered ? "7px" : "5px",
                  backgroundColor: isActive
                    ? "#357E7D"
                    : isHovered
                      ? "#828183"
                      : "#B0AEB2",
                }}
              />

              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: showLabel
                    ? "translateY(-50%) translateX(0)"
                    : "translateY(-50%) translateX(6px)",
                  whiteSpace: "nowrap",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: "#ffffff",
                  color: "#204140",
                  border: "1px solid #E9E8EA",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 250ms ease-out",
                  opacity: showLabel ? 1 : 0,
                  pointerEvents: showLabel ? "auto" : "none",
                }}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}