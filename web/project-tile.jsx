// Project card component used in Work grid and home

function ProjectTile({ p, lang, variant = 'A', onClick, index }) {
  const [hover, setHover] = React.useState(false);
  const isDark = ['#005032', '#003520', '#0A0A0A'].includes(p.color);
  const textColor = (p.image || isDark) ? TOKENS.cream : TOKENS.ink;
  const overImgShadow = p.image ? '0 1px 14px rgba(0,0,0,0.55)' : 'none';
  const catLabel = CATEGORIES.find(c => c.key === p.cat)?.label[lang] || p.cat;

  return (
    <a
      href={`#project/${p.id}`}
      onClick={(e) => { e.preventDefault(); onClick?.(p); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: variant === 'B' && index % 3 === 0 ? '4/5' : '4/3',
        background: p.color,
        overflow: 'hidden',
        containerType: 'inline-size',
        transition: 'transform .4s cubic-bezier(.2,.8,.2,1)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      }}>
        {/* Placeholder image — diagonal stripes w/ accent (fallback while/if no real image) */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(${135 + index * 17}deg, ${p.color} 0 40px, ${p.accent}22 40px 42px)`,
        }} />
        {/* Imagen — color de base + capa duotono verde que se desvanece al hover */}
        {p.image && (
          <div style={{
            position: 'absolute', inset: 0,
            transform: hover ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform .5s cubic-bezier(.2,.8,.2,1)',
          }}>
            <img
              src={p.image}
              alt={`${p.title} — ${p.client}`}
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <img
              src={p.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                filter: 'url(#duotone-green)',
                opacity: hover ? 0 : 1,
                transition: 'opacity .55s cubic-bezier(.2,.8,.2,1)',
              }}
            />
          </div>
        )}
        {/* Legibility gradient over image so tags/title keep contrast */}
        {p.image && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.62) 100%)',
          }} />
        )}
        {/* Big number */}
        <div style={{
          position: 'absolute', top: 20, left: 20,
          fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5,
          color: textColor, opacity: p.image ? 0.95 : 0.7, textShadow: overImgShadow,
        }}>{String(index + 1).padStart(3, '0')} · {catLabel.toUpperCase()}</div>
        {/* Client tag */}
        <div style={{
          position: 'absolute', top: 20, right: 20,
          padding: '4px 10px',
          background: p.accent,
          color: isDark ? TOKENS.ink : TOKENS.cream,
          fontFamily: TOKENS.fontMono, fontSize: 10, fontWeight: 500, letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}>{p.client}</div>
        {/* Arrow */}
        <div style={{
          position: 'absolute', bottom: 20, right: 20,
          width: 44, height: 44, borderRadius: 999,
          background: p.accent,
          color: isDark ? TOKENS.ink : TOKENS.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
          transform: hover ? 'rotate(-45deg) translate(2px,-2px)' : 'rotate(-45deg)',
          transition: 'transform .3s cubic-bezier(.2,.8,.2,1)',
        }}>→</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
        <div>
          <div style={{ fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 600, color: TOKENS.ink }}>{p.title} — {p.client}</div>
          <div style={{ fontFamily: TOKENS.fontBody, fontSize: 12, color: TOKENS.stone500, marginTop: 2 }}>{p.agency}</div>
        </div>
        <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, color: TOKENS.stone500 }}>{p.year}</div>
      </div>
    </a>
  );
}

window.ProjectTile = ProjectTile;
