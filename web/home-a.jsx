// Apple (iOS/Safari) reproduce WebM pero IGNORA el canal alfa (lo pinta negro).
// En esos navegadores mostramos la imagen transparente en vez del video.
const APPLE_NO_ALPHA_VIDEO = (() => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const iOS = /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|crios|android|fxios|edg|opr).)*safari/i.test(ua);
  return iOS || isSafari;
})();

// Media del hero: video (WebM alfa) donde se soporta; imagen transparente en Apple/Safari.
function HeroMedia({ style }) {
  const s = { objectFit: 'contain', objectPosition: 'center bottom', display: 'block', ...style };
  if (APPLE_NO_ALPHA_VIDEO) {
    return <img src="/public/videoperfil-poster.webp" alt="Alen Gómez" style={s} />;
  }
  return (
    <video autoPlay loop muted playsInline poster="/public/videoperfil-poster.webp" style={s}>
      <source src="/public/videoperfil.webm" type="video/webm" />
    </video>
  );
}

// Home variant A — Editorial calmado
function HomeA({ lang, setRoute, openProject }) {
  const featured = PROJECTS.slice(0, 6);
  const isNarrow = useMedia('(max-width: 900px)');

  // Parallax + fade dinámico del video del hero al hacer scroll
  const heroMediaRef = React.useRef(null);
  React.useEffect(() => {
    const el = heroMediaRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = window.scrollY || window.pageYOffset || 0;
        const vh = window.innerHeight || 1;
        // progreso 0 -> 1 a lo largo del primer viewport
        const p = Math.min(Math.max(y / (vh * 0.85), 0), 1);
        // parallax: el video sube más lento y se desvanece
        el.style.transform = `translate3d(0, ${(-y * 0.35).toFixed(1)}px, 0) scale(${(1 - p * 0.06).toFixed(3)})`;
        el.style.opacity = String(Math.max(1 - p * 1.15, 0));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div>
      {/* HERO */}
      {isNarrow ? (
        /* Hero móvil tipo app: solo foto + nombre, centrado, a pantalla completa */
        <section style={{
          minHeight: 'calc(100svh - 64px)', padding: '84px 20px 16px', background: TOKENS.cream,
          position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}>
          <div className="hero-item" style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: TOKENS.terracotta, display: 'inline-block' }} />
            <span style={{ fontFamily: TOKENS.fontMono, fontSize: 10.5, letterSpacing: 1.5, color: TOKENS.stone700 }}>{I18N.hero.availability[lang]}</span>
          </div>
          <div ref={heroMediaRef} className="hero-item" style={{
            width: '100%', maxWidth: 420, aspectRatio: '720 / 918', maxHeight: '56vh', position: 'relative',
            willChange: 'transform, opacity',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 90%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, #000 90%, transparent 100%)',
          }}>
            <HeroMedia style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          </div>
          <h1 className="hero-title" style={{
            fontFamily: TOKENS.fontDisplay,
            fontSize: 'clamp(52px, 15vw, 92px)', lineHeight: 0.9, letterSpacing: -1,
            color: TOKENS.ink, margin: '10px 0 0', textTransform: 'uppercase',
          }}>
            ALEN <span style={{ color: TOKENS.green }}>GÓMEZ.</span>
          </h1>
          <div className="hero-item" style={{
            fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
            color: TOKENS.stone500, marginTop: 12,
          }}>
            {lang === 'es' ? 'Diseñador Gráfico Senior' : 'Senior Graphic Designer'}
          </div>
          <div className="hero-item" style={{ marginTop: 20 }}>
            <WhatsAppButton lang={lang} />
          </div>
        </section>
      ) : (
      <section style={{ minHeight: 'auto', padding: '96px 40px 48px', background: TOKENS.cream, position: 'relative' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="hero-item" style={{ display: 'flex', gap: 10, marginBottom: 32, alignItems: 'center', transitionDelay: '.05s' }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: TOKENS.terracotta, display: 'inline-block' }} />
              <span style={{ fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, color: TOKENS.stone700 }}>{I18N.hero.availability[lang]}</span>
            </div>
            <h1 className="hero-title" style={{
              fontFamily: TOKENS.fontDisplay,
              fontSize: 'clamp(72px, 11vw, 180px)', lineHeight: 0.88, letterSpacing: -4,
              color: TOKENS.ink, margin: 0, textTransform: 'uppercase',
              transitionDelay: '.12s',
            }}>
              ALEN<br/>
              <span style={{ color: TOKENS.green }}>GÓMEZ.</span>
            </h1>
            <p className="hero-item" style={{
              fontFamily: TOKENS.fontBody, fontWeight: 500,
              fontSize: 'clamp(15px, 1.4vw, 20px)', letterSpacing: 0.2,
              color: TOKENS.stone700, margin: '20px 0 0',
              textTransform: 'none',
              transitionDelay: '.24s',
            }}>
              {lang === 'es' ? 'Diseñador Gráfico Senior' : 'Senior Graphic Designer'}
            </p>
            <div className="hero-item" style={{ marginTop: 28, transitionDelay: '.3s' }}>
              <WhatsAppButton lang={lang} big />
            </div>
            <div className="hero-item" style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 720, transitionDelay: '.34s' }}>
              <p style={{ fontFamily: TOKENS.fontBody, fontSize: 17, lineHeight: 1.55, color: TOKENS.stone700, margin: 0 }}>{I18N.hero.sub[lang]}</p>
              <div>
                <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginBottom: 8 }}>{lang === 'es' ? 'BASE' : 'BASED'}</div>
                <div style={{ fontFamily: TOKENS.fontBody, fontSize: 15, color: TOKENS.ink }}>{I18N.hero.location[lang]}</div>
                <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginTop: 20, marginBottom: 8 }}>{lang === 'es' ? 'CAPACIDADES' : 'CAPABILITIES'}</div>
                <div style={{ fontFamily: TOKENS.fontBody, fontSize: 13, color: TOKENS.ink, lineHeight: 1.8 }}>UX/UI · Campaign · Motion<br/>3D · AI · Illustration</div>
              </div>
            </div>
          </div>
          <div className="hero-item" style={{ position: 'relative', marginTop: 0, transitionDelay: '.18s' }}>
            <div ref={heroMediaRef} style={{
              aspectRatio: '720 / 918', willChange: 'transform, opacity',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 74%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, #000 74%, transparent 100%)',
            }}>
              <HeroMedia style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{
              position: 'absolute', bottom: 20, left: 20,
              padding: '6px 12px', background: TOKENS.green, color: TOKENS.cream,
              fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5,
            }}>ALEN · BUC · 2026</div>
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 32, left: 40,
          fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500,
        }}>{I18N.hero.scroll[lang]}</div>
      </section>
      )}

      {/* Secciones inferiores: solo desktop (en móvil se navegan por la barra inferior) */}
      {!isNarrow && (
      <React.Fragment>
      {/* STATS STRIP */}
      {(() => {
        const stats = lang === 'es'
          ? [
              { num: '14', label: 'Años de\nexperiencia' },
              { num: '6', label: 'Disciplinas\nde diseño' },
              { num: 'COL', label: 'Bucaramanga\nRemoto' },
            ]
          : [
              { num: '14', label: 'Years of\nexperience' },
              { num: '6', label: 'Design\ndisciplines' },
              { num: 'COL', label: 'Bucaramanga\nRemote' },
            ];
        return (
          <section style={{ background: TOKENS.green, color: TOKENS.cream, position: 'relative', zIndex: 2, marginTop: '-38px' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: isNarrow ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding: isNarrow ? '26px 22px' : '40px 48px',
                  borderLeft: (isNarrow ? i % 2 !== 0 : i > 0) ? '1px solid rgba(244,240,230,0.15)' : 'none',
                  borderTop: isNarrow && i > 1 ? '1px solid rgba(244,240,230,0.15)' : 'none',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{
                    fontFamily: TOKENS.fontDisplay, fontWeight: 700,
                    fontSize: 'clamp(48px, 5vw, 80px)', lineHeight: 1,
                    letterSpacing: -2, color: i === stats.length - 1 ? TOKENS.terracotta : TOKENS.cream,
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: TOKENS.fontMono, fontSize: 11,
                    letterSpacing: 1.2, opacity: 0.6, lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                  }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* SELECTED WORK */}
      <section style={{ padding: isNarrow ? '64px 20px' : '120px 40px', background: TOKENS.cream }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, color: TOKENS.stone500, letterSpacing: 1.5, marginBottom: 10 }}>01 / {lang === 'es' ? 'TRABAJO' : 'WORK'}</div>
              <h2 style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 40 : 72, margin: 0, letterSpacing: -2, color: TOKENS.ink, textTransform: 'uppercase' }}>
                {I18N.sections.selectedWork[lang]}
              </h2>
            </div>
            <a href="#work" onClick={(e)=>{e.preventDefault(); setRoute('work');}} className="btn-outline" style={{
              padding: '14px 26px', border: `2px solid ${TOKENS.green}`, borderRadius: 999,
              color: TOKENS.green, textDecoration: 'none',
              fontFamily: TOKENS.fontBody, fontSize: 14, fontWeight: 500,
              transition: 'all .2s ease',
            }}>{I18N.sections.viewAll[lang]} →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : 'repeat(3, 1fr)', gap: isNarrow ? 16 : 24 }}>
            {featured.map((p, i) => <ProjectTile key={p.id} p={p} lang={lang} variant="A" index={i} onClick={openProject} />)}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ padding: isNarrow ? '64px 20px' : '120px 40px', background: TOKENS.cream100 }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1.2fr', gap: isNarrow ? 40 : 80, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
            <img src="/public/logo-static.png" style={{ width: '75%', maxWidth: 320, height: 'auto' }} />
          </div>
          <div>
            <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, color: TOKENS.stone500, letterSpacing: 1.5, marginBottom: 10 }}>02 / {I18N.about.kicker[lang]}</div>
            <h2 style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: 64, margin: 0, letterSpacing: -2, color: TOKENS.ink, textTransform: 'uppercase', lineHeight: 0.92 }}>
              {lang === 'es' ? <>14 AÑOS<br/>DANDO VIDA<br/><span style={{ color: TOKENS.terracotta }}>A LAS IDEAS.</span></> : <>14 YEARS<br/>BRINGING IDEAS<br/><span style={{ color: TOKENS.terracotta }}>TO LIFE.</span></>}
            </h2>
            <p style={{ fontFamily: TOKENS.fontBody, fontSize: 18, lineHeight: 1.6, color: TOKENS.stone700, marginTop: 32, maxWidth: 520 }}>{I18N.about.summary[lang]}</p>
            <button onClick={() => setRoute('about')} className="btn-solid" style={{
              marginTop: 32, padding: '16px 32px', background: TOKENS.green, color: TOKENS.cream,
              border: 'none', borderRadius: 999, cursor: 'pointer',
              fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 500,
              transition: 'background .2s ease',
            }}>{lang === 'es' ? 'Sobre mí →' : 'About me →'}</button>
          </div>
        </div>
      </section>

      {/* MARCAS QUE HE MANEJADO */}
      <section style={{ padding: isNarrow ? '64px 20px' : '100px 40px', background: TOKENS.cream, borderTop: `1px solid ${TOKENS.stone300}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, color: TOKENS.stone500, letterSpacing: 1.5, marginBottom: 32 }}>03 / {lang === 'es' ? 'MARCAS QUE HE MANEJADO' : 'BRANDS I’VE WORKED WITH'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0, borderLeft: `1px solid ${TOKENS.stone300}`, borderTop: `1px solid ${TOKENS.stone300}` }}>
            {['Alex', 'Milka', 'KitKat', 'Chevrolet', 'Freskaleche', 'STAR', 'UNAB', 'Delirios', 'La Botica', 'Sol Naciente', 'Vivero El Bosque'].map(c => (
              <div key={c} style={{ padding: isNarrow ? '24px 18px' : '32px 24px', borderRight: `1px solid ${TOKENS.stone300}`, borderBottom: `1px solid ${TOKENS.stone300}`, fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 20 : 30, letterSpacing: -1, color: TOKENS.ink, textTransform: 'uppercase' }}>{c}</div>
            ))}
          </div>
        </div>
      </section>
      </React.Fragment>
      )}
    </div>
  );
}

window.HomeA = HomeA;
