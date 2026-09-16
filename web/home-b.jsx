// Home variant B — Expresivo experimental
function HomeB({ lang, setRoute, openProject }) {
  const featured = PROJECTS.slice(0, 6);
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const heroRef = React.useRef(null);
  React.useEffect(() => {
    const on = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    window.addEventListener('mousemove', on);
    return () => window.removeEventListener('mousemove', on);
  }, []);

  return (
    <div>
      {/* HERO inmersivo */}
      <section ref={heroRef} style={{ minHeight: '100vh', background: TOKENS.green, color: TOKENS.cream, position: 'relative', overflow: 'hidden', padding: '120px 40px 40px' }}>
        {/* Big rotating pill behind */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: `translate(-50%,-50%) translate(${(mouse.x - 0.5) * 30}px, ${(mouse.y - 0.5) * 30}px)`,
          width: '60vh', height: '60vh', borderRadius: 999,
          background: TOKENS.terracotta, opacity: 0.95,
          transition: 'transform .3s ease-out',
        }} />
        <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, opacity: 0.75 }}>(01) {I18N.hero.role[lang].toUpperCase()}</div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, opacity: 0.75, marginTop: 4 }}>2016 — 2026</div>
            </div>
            <div style={{ textAlign: 'right', fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, opacity: 0.75, lineHeight: 1.8 }}>
              {I18N.hero.location[lang].toUpperCase()}<br/>
              {lang === 'es' ? 'DISPONIBLE AHORA' : 'AVAILABLE NOW'}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'center', marginTop: 40 }}>
            <div style={{
              fontFamily: TOKENS.fontDisplay, fontWeight: 700,
              fontSize: 'clamp(80px, 14vw, 240px)', lineHeight: 0.82, letterSpacing: -6,
              textTransform: 'uppercase',
            }}>
              {I18N.hero.line1[lang]}<br/>{I18N.hero.line2[lang]}
            </div>
            <img src="/assets/logo-portrait-green-transparent.png" style={{ height: '46vh', filter: 'brightness(0) saturate(100%) invert(93%) sepia(9%) saturate(334%) hue-rotate(19deg) brightness(100%) contrast(91%)' }} />
            <div style={{
              fontFamily: TOKENS.fontDisplay, fontWeight: 700,
              fontSize: 'clamp(80px, 14vw, 240px)', lineHeight: 0.82, letterSpacing: -6,
              textTransform: 'uppercase', textAlign: 'right',
            }}>
              {I18N.hero.line3[lang]}<br/><span style={{ color: TOKENS.ink }}>2016.</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 60, gap: 60 }}>
            <p style={{ fontFamily: TOKENS.fontBody, fontSize: 18, lineHeight: 1.55, maxWidth: 420, margin: 0, opacity: 0.9 }}>{I18N.hero.sub[lang]}</p>
            <button onClick={() => setRoute('work')} style={{
              padding: '20px 36px', background: TOKENS.cream, color: TOKENS.green,
              border: 'none', borderRadius: 999, cursor: 'pointer',
              fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 600,
              display: 'inline-flex', gap: 10, alignItems: 'center',
            }}>{lang === 'es' ? 'Ver el trabajo' : 'See the work'} <span style={{ transform: 'rotate(-45deg)' }}>→</span></button>
          </div>
        </div>
      </section>

      {/* MARQUEE terracota */}
      <section style={{ background: TOKENS.terracotta, color: TOKENS.cream, padding: '20px 0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 32, whiteSpace: 'nowrap',
          fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: 44, letterSpacing: -0.5,
          animation: 'mqb 30s linear infinite', textTransform: 'uppercase',
        }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <React.Fragment key={i}>
              <span>↗ AVAILABLE FOR FREELANCE · 2026</span>
              <span>↗ DISPONIBLE PARA PROYECTOS</span>
              <span>↗ HELLO@ALENGOMEZ.WORK</span>
            </React.Fragment>
          ))}
        </div>
        <style>{`@keyframes mqb { from { transform: translateX(0);} to { transform: translateX(-50%);}}`}</style>
      </section>

      {/* WORK grid asimétrico */}
      <section style={{ padding: '120px 40px', background: TOKENS.cream }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, color: TOKENS.stone500, letterSpacing: 1.5, marginBottom: 10 }}>(02) WORK</div>
              <h2 style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: 120, margin: 0, letterSpacing: -4, color: TOKENS.ink, textTransform: 'uppercase', lineHeight: 0.88 }}>
                {lang === 'es' ? <>TRABAJO<br/><span style={{ color: TOKENS.terracotta }}>RECIENTE</span></> : <>RECENT<br/><span style={{ color: TOKENS.terracotta }}>WORK</span></>}
              </h2>
            </div>
            <a href="#work" onClick={(e)=>{e.preventDefault(); setRoute('work');}} style={{
              padding: '16px 28px', background: TOKENS.ink, color: TOKENS.cream, borderRadius: 999, textDecoration: 'none',
              fontFamily: TOKENS.fontBody, fontSize: 14, fontWeight: 500,
            }}>{I18N.sections.viewAll[lang]} →</a>
          </div>
          {/* Asymmetric grid: 2 rows. Row1: big + 2 small stacked. Row2: 3 equal */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
            <div><ProjectTile p={featured[0]} lang={lang} variant="B" index={0} onClick={openProject} /></div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 24 }}>
              <ProjectTile p={featured[1]} lang={lang} variant="A" index={1} onClick={openProject} />
              <ProjectTile p={featured[2]} lang={lang} variant="A" index={2} onClick={openProject} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {featured.slice(3).map((p, i) => <ProjectTile key={p.id} p={p} lang={lang} variant="A" index={i+3} onClick={openProject} />)}
          </div>
        </div>
      </section>

      {/* ABOUT con color blocks */}
      <section style={{ background: TOKENS.ink, color: TOKENS.cream, padding: '120px 40px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 60, alignItems: 'center' }}>
          <div style={{ background: TOKENS.terracotta, aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
            <img src="/assets/foto-work.png" style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', filter: 'grayscale(1)' }} />
          </div>
          <div>
            <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, opacity: 0.6, marginBottom: 10 }}>(03) {I18N.about.kicker[lang]}</div>
            <h2 style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: 100, margin: 0, letterSpacing: -3, textTransform: 'uppercase', lineHeight: 0.88 }}>
              {I18N.about.title[lang]}
            </h2>
            <p style={{ fontFamily: TOKENS.fontBody, fontSize: 20, lineHeight: 1.55, opacity: 0.85, marginTop: 32 }}>{I18N.about.bio1[lang]}</p>
            <p style={{ fontFamily: TOKENS.fontBody, fontSize: 20, lineHeight: 1.55, opacity: 0.85 }}>{I18N.about.bio2[lang]}</p>
            <button onClick={() => setRoute('about')} style={{
              marginTop: 32, padding: '18px 34px', background: TOKENS.terracotta, color: TOKENS.cream,
              border: 'none', borderRadius: 999, cursor: 'pointer',
              fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 500,
            }}>{lang === 'es' ? 'Leer más →' : 'Read more →'}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.HomeB = HomeB;
