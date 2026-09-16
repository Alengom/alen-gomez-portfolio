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
          <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, color: TOKENS.stone500, letterSpacing: 1, marginTop: 3 }}>ART DIRECTOR</div>
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

function Footer({ lang, setRoute }) {
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
          <a href="mailto:hello@alengomez.work" style={{
            padding: '18px 32px', background: TOKENS.terracotta, color: TOKENS.cream,
            borderRadius: 999, textDecoration: 'none',
            fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 500,
            display: 'inline-flex', gap: 10, alignItems: 'center',
          }}>hello@alengomez.work <span style={{ transform: 'rotate(-45deg)' }}>→</span></a>
        </div>
        <div style={{ height: 1, background: 'rgba(244,240,230,0.2)', marginBottom: 24 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', fontFamily: TOKENS.fontMono, fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>
          <div>© 2026 ALEN GOMEZ · {lang === 'es' ? 'TODOS LOS DERECHOS' : 'ALL RIGHTS RESERVED'}</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="https://www.instagram.com/aleng_artist/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>INSTAGRAM</a>
            <a href="https://www.behance.net/alengomez" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>BEHANCE</a>
            <a href="https://www.linkedin.com/in/alengomez/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LINKEDIN</a>
          </div>
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

window.Header = Header;
window.Footer = Footer;
window.BottomNav = BottomNav;
window.WhatsAppButton = WhatsAppButton;
