// Shared header (nav) + footer

// Hook responsive compartido (definido aquí porque chrome.jsx carga antes que home-a.jsx)
function useMedia(query) {
  const [match, setMatch] = React.useState(() => window.matchMedia(query).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
window.useMedia = useMedia;

function Header({ lang, setLang, route, setRoute }) {
  const [scrolled, setScrolled] = React.useState(false);
  const isNarrow = useMedia('(max-width: 900px)');
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  const t = I18N.nav;
  const navItem = (key, label) => (
    <a
      href={`#${key}`}
      onClick={(e) => { e.preventDefault(); setRoute(key); }}
      className="nav-link"
      style={{
        fontFamily: TOKENS.fontBody, fontSize: 14, fontWeight: 500,
        color: route === key ? TOKENS.terracotta : TOKENS.ink,
        textDecoration: 'none',
        position: 'relative',
        padding: '4px 0',
        transition: 'color .2s ease',
      }}
    >
      {label}
      {route === key && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 2, background: TOKENS.terracotta }} />}
    </a>
  );
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: isNarrow ? '10px 16px' : '16px 40px',
      background: scrolled ? 'rgba(244,240,230,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${TOKENS.stone300}` : '1px solid transparent',
      transition: 'all .3s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'nowrap', rowGap: 6,
    }}>
      <a href="#home" onClick={(e)=>{e.preventDefault(); setRoute('home');}} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <div>
          <div style={{ fontFamily: TOKENS.fontBody, fontSize: 16, fontWeight: 600, color: TOKENS.ink, lineHeight: 1 }}>Alen Gomez</div>
          <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, color: TOKENS.stone500, letterSpacing: 1, marginTop: 3 }}>DISEÑADOR GRÁFICO</div>
        </div>
      </a>
      {!isNarrow && (
      <nav style={{
        display: 'flex', gap: 32,
        justifyContent: 'center',
      }}>
        {navItem('work', t.work[lang])}
        {navItem('about', t.about[lang])}
        {navItem('contact', t.contact[lang])}
      </nav>
      )}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <button
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label={lang === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'}
          style={{
            fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1,
            background: 'none', border: 'none', cursor: 'pointer', color: TOKENS.stone700,
          }}
        >
          <span style={{ color: lang === 'es' ? TOKENS.green : TOKENS.stone500, fontWeight: lang === 'es' ? 600 : 400 }}>ES</span>
          {' · '}
          <span style={{ color: lang === 'en' ? TOKENS.green : TOKENS.stone500, fontWeight: lang === 'en' ? 600 : 400 }}>EN</span>
        </button>
        <span className="cv-hover" style={{ position: 'relative', display: 'inline-flex' }}>
          <a href="/assets/alen-gomez-cv.pdf" download className="btn-solid" style={{
            padding: '10px 20px',
            background: TOKENS.green,
            color: TOKENS.cream,
            textDecoration: 'none',
            borderRadius: 999,
            fontFamily: TOKENS.fontBody, fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'background .2s ease',
          }}>
            {t.cv[lang]} <span>↓</span>
          </a>
          {!isNarrow && (
            <span className="cv-head" aria-hidden="true"><span /></span>
          )}
        </span>
      </div>
    </header>
  );
}

const SOCIAL_LINKS = [
    { label: 'Instagram', url: 'https://www.instagram.com/aleng_artist/', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.17-.74.36-1.06.68-.32.32-.51.63-.68 1.06-.13.32-.28.8-.32 1.7C3.44 9.06 3.43 9.4 3.43 12s.01 2.94.07 4.17c.04.9.19 1.38.32 1.7.17.43.36.74.68 1.06.32.32.63.51 1.06.68.32.13.8.28 1.7.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.17.74-.36 1.06-.68.32-.32.51-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.23.07-1.58.07-4.17s-.01-2.94-.07-4.17c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 0 0-.68-1.06 2.85 2.85 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06zm0 1.8A3.14 3.14 0 1 0 15.14 12 3.14 3.14 0 0 0 12 8.86zm5.13-1.09a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15z"/></svg>
    ) },
    { label: 'Behance', url: 'https://www.behance.net/alengomez', icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M8.8 10.66c.5-.27.79-.76.79-1.4 0-1.28-.98-1.9-2.5-1.9H2.1v9.06h5.05c1.6 0 2.9-.74 2.9-2.48 0-1.07-.5-1.87-1.25-2.28zm-4.6-1.55h2.28c.6 0 1 .3 1 .88s-.4.88-1 .88H4.2V9.11zm2.47 5.5H4.2v-2.06h2.56c.72 0 1.2.35 1.2 1.03 0 .7-.53 1.03-1.29 1.03zM21.9 13.3c0-2-1.14-3.63-3.26-3.63-2.06 0-3.5 1.57-3.5 3.6 0 2.06 1.38 3.55 3.55 3.55 1.68 0 2.8-.79 3.1-2.06h-1.87c-.15.39-.59.59-1.13.59-.84 0-1.33-.49-1.38-1.32h4.44c.02-.2.05-.4.05-.73zm-4.48-.6c.1-.73.54-1.17 1.28-1.17.73 0 1.12.49 1.17 1.17h-2.45zM15.5 8.16h4.24v1.06H15.5z"/></svg>
    ) },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alengomez/', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.6 22 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.03-3.34-2.03 0-2.34 1.58-2.34 3.23V21H9z"/></svg>
    ) },
  ];

// Barra vertical de redes fija a la derecha — solo desktop
function SocialRail() {
  const isNarrow = useMedia('(max-width: 900px)');
  if (isNarrow) return null;
  return (
    <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {SOCIAL_LINKS.map(s => (
        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="soc-btn" style={{
          width: 40, height: 40, borderRadius: 999, background: TOKENS.cream, color: TOKENS.green,
          border: `1px solid ${TOKENS.stone300}`, boxShadow: '0 6px 16px rgba(10,10,10,0.14)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
          transition: 'background .2s ease, color .2s ease, transform .2s ease',
        }}>{s.icon}</a>
      ))}
      <span style={{ width: 1, height: 60, background: 'rgba(10,10,10,0.2)', marginTop: 4 }} />
    </div>
  );
}

function Footer({ lang, setRoute }) {
  const isNarrow = useMedia('(max-width: 900px)');
  const SOCIALS = SOCIAL_LINKS;
  return (
    <footer style={{
      background: TOKENS.green,
      color: TOKENS.cream,
      padding: '80px 40px 40px',
      marginTop: 0,
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 80 }}>
          <div style={{
            fontFamily: TOKENS.fontDisplay, fontWeight: 700,
            fontSize: 'clamp(48px, 9vw, 140px)', lineHeight: 0.88, letterSpacing: -4,
          }}>
            {lang === 'es' ? (<>TRABAJEMOS<br/><span style={{ color: TOKENS.terracotta }}>JUNTOS.</span></>) : (<>LET'S WORK<br/><span style={{ color: TOKENS.terracotta }}>TOGETHER.</span></>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <button onClick={() => setRoute('contact')} className="btn-solid" style={{
              padding: '18px 32px', background: TOKENS.terracotta, color: TOKENS.cream,
              border: 'none', borderRadius: 999, cursor: 'pointer',
              fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 600,
              display: 'inline-flex', gap: 10, alignItems: 'center',
            }}>{lang === 'es' ? 'Contáctame' : 'Contact me'} <span>→</span></button>
            <a href="mailto:trabajemos@alengomez.com" style={{
              fontFamily: TOKENS.fontBody, fontSize: 15, color: TOKENS.cream, opacity: 0.85,
              textDecoration: 'none', display: 'inline-flex', gap: 8, alignItems: 'center',
            }}>trabajemos@alengomez.com <span style={{ transform: 'rotate(-45deg)' }}>→</span></a>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(244,240,230,0.2)', marginBottom: 24 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>© 2026 ALEN GOMEZ · {lang === 'es' ? 'TODOS LOS DERECHOS' : 'ALL RIGHTS RESERVED'}</div>
          {isNarrow && (
          <div style={{ display: 'flex', gap: 12 }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="soc-btn" style={{
                width: 44, height: 44, borderRadius: 999,
                border: '1px solid rgba(244,240,230,0.4)', color: TOKENS.cream, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .2s ease, border-color .2s ease, color .2s ease',
              }}>{s.icon}</a>
            ))}
          </div>
          )}
        </div>
      </div>
    </footer>
  );
}

// Barra de navegación inferior tipo app — solo móvil
function BottomNav({ lang, route, setRoute }) {
  const isNarrow = useMedia('(max-width: 900px)');
  if (!isNarrow) return null;

  const ICONS = {
    home: () => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.6 2.4 11h2.3v9.4a1 1 0 0 0 1 1h3.6V15h5.4v6.4h3.6a1 1 0 0 0 1-1V11h2.3L12 2.6z" />
      </svg>
    ),
    work: () => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 4h6a2.5 2.5 0 0 1 2.5 2.5V8h-2V6.5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 0-.5.5V8h-2V6.5A2.5 2.5 0 0 1 9 4z" />
        <path d="M3 9h18a2 2 0 0 1 2 2v2.5H13.5V12h-3v1.5H1V11a2 2 0 0 1 2-2z" />
        <path d="M1 15h9.5v1.5h3V15H23v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-5z" />
      </svg>
    ),
    about: () => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7.6" r="4.2" /><path d="M12 13.6c-4.5 0-8 2.7-8 6.2 0 .6.4 1 1 1h14c.6 0 1-.4 1-1 0-3.5-3.5-6.2-8-6.2z" />
      </svg>
    ),
    contact: () => (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16a2 2 0 0 1 2 2v.4l-10 6.1L2 6.4V6a2 2 0 0 1 2-2z" /><path d="M22 8.7V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.7l9.5 5.8a1 1 0 0 0 1 0L22 8.7z" />
      </svg>
    ),
  };
  const tabs = [
    { key: 'home', label: lang === 'es' ? 'Inicio' : 'Home' },
    { key: 'work', label: lang === 'es' ? 'Trabajos' : 'Work' },
    { key: 'about', label: lang === 'es' ? 'Sobre mí' : 'About' },
    { key: 'contact', label: lang === 'es' ? 'Contacto' : 'Contact' },
  ];
  // 'project' se considera dentro de Trabajos
  const activeKey = route === 'project' ? 'work' : route;
  const activeIndex = tabs.findIndex(t => t.key === activeKey);
  const pct = 100 / tabs.length;

  return (
    <nav style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 150,
      display: 'flex', alignItems: 'stretch',
      background: TOKENS.green,
      borderTop: `1px solid rgba(244,240,230,0.12)`,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {/* Burbuja líquida naranja deslizante detrás de la pestaña activa */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: 8, left: 0, width: pct + '%', height: 46,
        transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
        opacity: activeIndex < 0 ? 0 : 1,
        transition: 'transform .52s cubic-bezier(.5,-0.12,.2,1.25), opacity .3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 0,
      }}>
        <span key={activeIndex} className="liquid" style={{ width: 54, height: 46, borderRadius: 16, background: TOKENS.terracotta }} />
      </span>
      {tabs.map((tb) => {
        const active = activeKey === tb.key;
        return (
          <button key={tb.key}
            onClick={() => setRoute(tb.key)}
            aria-label={tb.label}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1, position: 'relative', zIndex: 1, background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '15px 4px',
              color: active ? TOKENS.greenDark : TOKENS.mint,
              transition: 'color .25s ease',
            }}>
            <span style={{
              display: 'inline-flex',
              transform: active ? 'scale(1.12)' : 'none',
              transition: 'transform .45s cubic-bezier(.34,1.5,.5,1)',
            }}>
              {ICONS[tb.key](active)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// Botón de WhatsApp reutilizable (home + contacto)
function WhatsAppButton({ lang, big, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={waLink(lang)} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: '#25D366', color: '#0A0A0A', textDecoration: 'none',
        padding: big ? '16px 28px' : '13px 22px', borderRadius: 999,
        fontFamily: TOKENS.fontBody, fontSize: big ? 16 : 15, fontWeight: 600,
        boxShadow: hover ? '0 12px 30px rgba(37,211,102,0.45)' : '0 8px 22px rgba(37,211,102,0.3)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'transform .2s ease, box-shadow .2s ease',
        ...style,
      }}>
      <svg width={big ? 22 : 20} height={big ? 22 : 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.5 9.5 0 0 1-4.83-1.32l-.35-.2-3.59.94.96-3.5-.23-.36a9.45 9.45 0 0 1-1.45-5.05c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.78a9.42 9.42 0 0 1 2.78 6.71c0 5.24-4.26 9.5-9.5 9.5zm8.08-17.58A11.36 11.36 0 0 0 12.05.6C5.8.6.72 5.68.72 11.93c0 2.1.55 4.16 1.6 5.97L.6 24l6.24-1.64a11.3 11.3 0 0 0 5.4 1.38h.01c6.24 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01z"/>
      </svg>
      {lang === 'es' ? 'Escríbeme por WhatsApp' : 'Message me on WhatsApp'}
    </a>
  );
}

// Visor de imagen a pantalla completa con zoom (rueda + doble clic en desktop,
// pellizco/pinch + doble toque en móvil) y arrastre para desplazar.
// Se abre desde cualquier parte con window.openLightbox(src, alt).
function Lightbox() {
  const [src, setSrc] = React.useState(null);
  const [alt, setAlt] = React.useState('');
  const [scale, setScale] = React.useState(1);
  const [tx, setTx] = React.useState(0);
  const [ty, setTy] = React.useState(0);
  const pts = React.useRef(new Map()); // punteros activos (para pinch)
  const gesture = React.useRef({});    // estado del gesto en curso

  const MIN = 1, MAX = 5;
  const reset = () => { setScale(1); setTx(0); setTy(0); };
  const close = () => { setSrc(null); reset(); };

  React.useEffect(() => {
    const onOpen = (e) => { setSrc(e.detail.src); setAlt(e.detail.alt || ''); setScale(1); setTx(0); setTy(0); };
    window.addEventListener('lightbox:open', onOpen);
    return () => window.removeEventListener('lightbox:open', onOpen);
  }, []);

  React.useEffect(() => {
    if (!src) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [src]);

  if (!src) return null;

  const clampScale = (s) => Math.max(MIN, Math.min(MAX, s));

  const onWheel = (e) => {
    e.preventDefault();
    const next = clampScale(scale * (e.deltaY < 0 ? 1.18 : 0.85));
    if (next === 1) reset(); else setScale(next);
  };
  const onDoubleClick = () => { if (scale > 1) reset(); else setScale(2.4); };

  const onPointerDown = (e) => {
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    if (pts.current.size === 1) {
      gesture.current = { mode: 'pan', sx: e.clientX, sy: e.clientY, tx, ty, moved: 0, t: Date.now() };
    } else if (pts.current.size === 2) {
      const [a, b] = [...pts.current.values()];
      gesture.current = { mode: 'pinch', dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
    }
  };
  const onPointerMove = (e) => {
    if (!pts.current.has(e.pointerId)) return;
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (g.mode === 'pinch' && pts.current.size >= 2) {
      const [a, b] = [...pts.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      setScale(clampScale(g.scale * (dist / (g.dist || dist))));
    } else if (g.mode === 'pan' && scale > 1) {
      const dx = e.clientX - g.sx, dy = e.clientY - g.sy;
      g.moved = Math.max(g.moved, Math.abs(dx) + Math.abs(dy));
      setTx(g.tx + dx); setTy(g.ty + dy);
    } else if (g.mode === 'pan') {
      g.moved = Math.max(g.moved, Math.abs(e.clientX - g.sx) + Math.abs(e.clientY - g.sy));
    }
  };
  const onPointerUp = (e) => {
    const g = gesture.current;
    pts.current.delete(e.pointerId);
    if (pts.current.size < 2 && g.mode === 'pinch') { gesture.current = {}; if (scale <= 1.02) reset(); }
    // Toque simple sin arrastre sobre el fondo cierra; sobre la imagen no
    if (pts.current.size === 0 && g.mode === 'pan' && (g.moved || 0) < 6 && scale <= 1) {
      // manejado por onClick del backdrop
    }
    if (pts.current.size === 0) gesture.current = {};
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(8,8,8,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        touchAction: 'none', animation: 'lbFade .2s ease',
      }}>
      <button onClick={close} aria-label="Cerrar" style={{
        position: 'fixed', top: 'max(16px, env(safe-area-inset-top))', right: 16, zIndex: 2,
        width: 44, height: 44, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: 'rgba(244,240,230,0.14)', color: TOKENS.cream, fontSize: 22, lineHeight: 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)',
      }}>×</button>
      <span style={{
        position: 'fixed', bottom: 'max(18px, env(safe-area-inset-bottom))', left: '50%', transform: 'translateX(-50%)',
        fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: 'rgba(244,240,230,0.6)', pointerEvents: 'none',
      }}>{scale > 1 ? 'ARRASTRA · DOBLE TOQUE PARA SALIR' : 'PELLIZCA O DOBLE TOQUE PARA ACERCAR'}</span>
      <img
        src={src} alt={alt} draggable="false"
        onWheel={onWheel} onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove}
        onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
        style={{
          maxWidth: '94vw', maxHeight: '90vh', objectFit: 'contain', userSelect: 'none',
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: gesture.current.mode ? 'none' : 'transform .22s ease',
          cursor: scale > 1 ? 'grab' : 'zoom-in',
          borderRadius: 6, boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  );
}
window.openLightbox = (src, alt) => window.dispatchEvent(new CustomEvent('lightbox:open', { detail: { src, alt } }));

window.Header = Header;
window.Footer = Footer;
window.BottomNav = BottomNav;
window.WhatsAppButton = WhatsAppButton;
window.SocialRail = SocialRail;
window.Lightbox = Lightbox;
