// Work page — filterable grid

// Carrusel de PROYECTOS con arrastre rotacional (pivote en la base → arco/tilt).
// La card centrada es la seleccionada; al tocarla se abre el proyecto.
function ProjectCarousel({ lang, projects, openProject }) {
  const [active, setActive] = React.useState(0);
  const [drag, setDrag] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const st = React.useRef({ x: 0, moved: 0 });

  const SPACING = 126;  // px por paso horizontal
  const ROT = 8;        // grados de inclinación por paso
  const DROP = 8;       // px de caída en el arco por paso (suave, sin corte)
  const CARD_W = 208, CARD_H = 272, stageW = 300;
  const TOP = 34;       // aire arriba para que las cards inclinadas no se corten

  if (!projects.length) {
    return <div style={{ textAlign: 'center', padding: 60, color: TOKENS.stone500, fontFamily: TOKENS.fontBody }}>{lang === 'es' ? 'Sin proyectos en esta categoría.' : 'No projects in this category.'}</div>;
  }
  const clamp = (n) => Math.max(0, Math.min(projects.length - 1, n));

  const onDown = (e) => {
    setDragging(true);
    const r = e.currentTarget.getBoundingClientRect();
    st.current = { x: e.clientX, moved: 0, cx: r.left + r.width / 2 };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
  };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = st.current.x - e.clientX;
    st.current.moved = Math.max(st.current.moved, Math.abs(dx));
    let d = dx / SPACING;
    const projected = active + d;
    if (projected < 0 || projected > projects.length - 1) d = d * 0.35;
    setDrag(d);
  };
  const settle = () => {
    if (!dragging) return;
    setDragging(false);
    if (st.current.moved < 6) {
      // Tap: abre la card tocada si es la central; si no, la centra
      const offset = Math.round((st.current.x - st.current.cx) / SPACING);
      const target = clamp(active + offset);
      if (target === active) openProject(projects[active]);
      else setActive(target);
      setDrag(0);
      return;
    }
    setActive(clamp(Math.round(active + drag)));
    setDrag(0);
  };

  return (
    <div className="fade-up" style={{ marginTop: 34 }}>
      <div
        className="cat-stage"
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={settle} onPointerCancel={settle}
        style={{ position: 'relative', height: CARD_H + TOP + 50, cursor: dragging ? 'grabbing' : 'grab', perspective: 1000, overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', left: '50%', top: TOP, width: stageW, height: CARD_H, marginLeft: -stageW / 2 }}>
          {projects.map((p, i) => {
            const rel = (i - active) - drag;
            const abs = Math.abs(rel);
            if (abs > 2.6) return null;
            const isActive = abs < 0.5;
            const x = rel * SPACING;
            const y = abs * DROP;
            const rot = rel * ROT;
            const scale = Math.max(1 - abs * 0.06, 0.8);
            const opacity = Math.max(1 - abs * 0.32, 0);
            return (
              <button key={p.id}
                aria-label={p.title}
                style={{
                  position: 'absolute', left: '50%', bottom: 0, width: CARD_W, height: CARD_H, marginLeft: -CARD_W / 2,
                  transform: `translateX(${x}px) translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
                  transformOrigin: 'center bottom',
                  transition: dragging ? 'none' : 'transform .4s cubic-bezier(.2,.8,.25,1), box-shadow .3s ease',
                  opacity, zIndex: 100 - Math.round(abs * 10),
                  borderRadius: 18, cursor: 'pointer', padding: 0, overflow: 'hidden',
                  border: `1px solid ${isActive ? TOKENS.green : 'rgba(10,10,10,0.10)'}`, background: TOKENS.ink,
                  boxShadow: isActive
                    ? '0 24px 50px -20px rgba(0,80,50,0.5), 0 10px 22px -12px rgba(0,80,50,0.32)'
                    : '0 20px 42px -22px rgba(10,10,10,0.4)',
                  display: 'block',
                }}>
                <img src={p.image} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0) 40%, rgba(10,10,10,0.82) 100%)' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.cream, opacity: 0.9 }}>
                  {String(i + 1).padStart(2, '0')} · {(p.cat || '').toUpperCase()}
                </span>
                {isActive && (
                  <span style={{ position: 'absolute', top: 10, right: 10, background: TOKENS.terracotta, color: TOKENS.cream, fontFamily: TOKENS.fontMono, fontSize: 9, letterSpacing: 1, padding: '4px 8px', borderRadius: 6 }}>{p.client}</span>
                )}
                <span style={{ position: 'absolute', left: 14, right: 14, bottom: 14, textAlign: 'left' }}>
                  <span style={{ display: 'block', fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: 22, lineHeight: 1, letterSpacing: -0.5, color: TOKENS.cream, textTransform: 'uppercase' }}>{p.title}</span>
                  <span style={{ display: 'block', fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1, color: TOKENS.cream, opacity: 0.75, marginTop: 6 }}>{p.year}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Puntitos indicadores */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {projects.map((p, i) => (
          <span key={p.id} style={{
            width: i === active ? 18 : 6, height: 6, borderRadius: 999,
            background: i === active ? TOKENS.green : TOKENS.stone300, transition: 'all .3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

function WorkPage({ lang, openProject }) {
  const isNarrow = useMedia('(max-width: 900px)');
  const [cat, setCat] = React.useState(() => {
    const saved = localStorage.getItem('ag_workcat');
    return saved && CATEGORIES.some(c => c.key === saved) ? saved : 'all';
  });
  const chooseCat = (k) => { setCat(k); localStorage.setItem('ag_workcat', k); };
  const inCat = (p, k) => (p.cats || [p.cat]).includes(k);
  const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter(p => inCat(p, cat));
  const countOf = (k) => k === 'all' ? PROJECTS.length : PROJECTS.filter(p => inCat(p, k)).length;
  return (
    <div style={{ background: TOKENS.cream, minHeight: '100vh' }}>
      <section style={{ padding: isNarrow ? '96px 20px 24px' : '160px 40px 60px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className={isNarrow ? 'fade-up' : undefined} style={{ fontFamily: TOKENS.fontMono, fontSize: 11, color: TOKENS.stone500, letterSpacing: 1.5, marginBottom: isNarrow ? 12 : 16 }}>{lang === 'es' ? 'ARCHIVO' : 'ARCHIVE'} · {PROJECTS.length} {lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}</div>
          <h1 className={isNarrow ? 'fade-up' : undefined} style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 'clamp(44px,13vw,64px)' : 'clamp(80px,14vw,200px)', letterSpacing: isNarrow ? -2 : -6, margin: 0, textTransform: 'uppercase', lineHeight: 0.86, color: TOKENS.ink, animationDelay: isNarrow ? '.06s' : undefined }}>
            {lang === 'es' ? <>TODO EL <span style={{ color: TOKENS.green }}>TRABAJO.</span></> : <>ALL THE <span style={{ color: TOKENS.green }}>WORK.</span></>}
          </h1>

          <div className={isNarrow ? 'cat-scroll' : undefined} style={{
            display: 'flex', flexWrap: isNarrow ? 'nowrap' : 'wrap', gap: 10, marginTop: isNarrow ? 24 : 48,
            overflowX: isNarrow ? 'auto' : 'visible', WebkitOverflowScrolling: 'touch',
            marginLeft: isNarrow ? -20 : 0, marginRight: isNarrow ? -20 : 0,
            paddingLeft: isNarrow ? 20 : 0, paddingRight: isNarrow ? 20 : 0, paddingBottom: isNarrow ? 2 : 0,
          }}>
            {CATEGORIES.map((c, ci) => {
              const active = cat === c.key;
              return (
                <button key={c.key} onClick={() => chooseCat(c.key)}
                  className={isNarrow ? 'pop-in' : undefined}
                  style={{
                  flex: '0 0 auto',
                  animationDelay: isNarrow ? (ci * 0.045) + 's' : undefined,
                  padding: isNarrow ? '9px 15px' : '10px 18px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
                  border: `1px solid ${active ? TOKENS.green : 'rgba(0,80,50,0.2)'}`,
                  background: active ? TOKENS.green : 'transparent',
                  color: active ? TOKENS.cream : TOKENS.green,
                  fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 12.5 : 13, fontWeight: 500,
                }}>{c.label[lang]} <span style={{ opacity: 0.6, fontFamily: TOKENS.fontMono, fontSize: 10, marginLeft: 4 }}>{countOf(c.key)}</span></button>
              );
            })}
          </div>
        </div>
      </section>
      {isNarrow ? (
        <section style={{ padding: '8px 20px 48px' }}>
          <ProjectCarousel key={cat} lang={lang} projects={filtered} openProject={openProject} />
        </section>
      ) : (
        <section style={{ padding: '40px 40px 120px' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <div key={cat + '-' + p.id} className="tile-anim" style={{ animationDelay: (Math.min(i, 12) * 45) + 'ms' }}>
                <ProjectTile p={p} lang={lang} index={i} onClick={openProject} />
              </div>
            ))}
          </div>
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 80, color: TOKENS.stone500, fontFamily: TOKENS.fontBody }}>{lang === 'es' ? 'Sin proyectos en esta categoría.' : 'No projects in this category.'}</div>}
        </section>
      )}
    </div>
  );
}

function AboutPage({ lang, setRoute }) {
  const isNarrow = useMedia('(max-width: 900px)');
  return (
    <div style={{ background: TOKENS.cream, minHeight: '100vh' }}>
      <section style={{ padding: isNarrow ? '96px 20px 72px' : '160px 40px 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, color: TOKENS.stone500, letterSpacing: 1.5, marginBottom: isNarrow ? 12 : 16 }}>{I18N.about.kicker[lang]}</div>
          <h1 style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 'clamp(34px,8.5vw,48px)' : 'clamp(60px,10vw,140px)', letterSpacing: isNarrow ? -1 : -4, margin: 0, textTransform: 'uppercase', lineHeight: isNarrow ? 1 : 0.86, color: TOKENS.ink, overflowWrap: 'break-word' }}>
            {I18N.about.title[lang]}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1.5fr', gap: isNarrow ? 32 : 80, marginTop: isNarrow ? 36 : 80, alignItems: 'start' }}>
            <img src="/assets/foto-work.webp" alt={lang === 'es' ? 'Retrato de Alen Gómez, diseñador gráfico' : 'Portrait of Alen Gómez, graphic designer'} style={{ width: '100%', maxWidth: isNarrow ? 300 : 'none', margin: isNarrow ? '0 auto' : 0, display: 'block', filter: 'grayscale(1)', borderRadius: isNarrow ? 12 : 0, WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)', maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)' }} />
            <div>
              <p style={{ fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 16 : 20, lineHeight: 1.65, color: TOKENS.stone700, marginTop: isNarrow ? 0 : undefined }}>{I18N.about.bio1[lang]}</p>
              <p style={{ fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 16 : 20, lineHeight: 1.65, color: TOKENS.stone700 }}>{I18N.about.bio2[lang]}</p>
              <p style={{ fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 16 : 20, lineHeight: 1.65, color: TOKENS.stone700 }}>{I18N.about.bio3[lang]}</p>
              <div style={{ marginTop: isNarrow ? 40 : 60, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isNarrow ? 20 : 40 }}>
                <div>
                  <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginBottom: 14 }}>{lang === 'es' ? 'AGENCIAS' : 'AGENCIES'}</div>
                  {['PVS Agencia · Colombia', 'Agencia Genoma · Colombia', 'Nasta / Ogilvy · Paraguay', 'Sol Naciente · Colombia', 'IMCT · Bucaramanga'].map(a => (
                    <div key={a} style={{ fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 13 : 15, color: TOKENS.ink, padding: '8px 0', borderBottom: `1px solid ${TOKENS.stone300}` }}>{a}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginBottom: 14 }}>{lang === 'es' ? 'ESPECIALIDADES' : 'SPECIALTIES'}</div>
                  {['UX/UI Design', 'Art Direction', 'Motion Graphics', '3D & Illustration', 'AI Direction', 'Campaign Design'].map(a => (
                    <div key={a} style={{ fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 13 : 15, color: TOKENS.ink, padding: '8px 0', borderBottom: `1px solid ${TOKENS.stone300}` }}>{a}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: isNarrow ? 44 : 72, paddingTop: isNarrow ? 32 : 44, borderTop: `1px solid ${TOKENS.stone300}` }}>
            <div style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 30 : 48, letterSpacing: -1.5, color: TOKENS.ink, textTransform: 'uppercase', lineHeight: 1 }}>
              {lang === 'es' ? <>¿Trabajamos <span style={{ color: TOKENS.green }}>juntos?</span></> : <>Let's work <span style={{ color: TOKENS.green }}>together?</span></>}
            </div>
            <button onClick={() => setRoute('contact')} className="btn-solid" style={{
              marginTop: 20, padding: '15px 30px', background: TOKENS.green, color: TOKENS.cream,
              border: 'none', borderRadius: 999, cursor: 'pointer',
              fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 600,
            }}>{lang === 'es' ? 'Contáctame →' : 'Contact me →'}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Formulario de contacto → Web3Forms (llega directo al Gmail, sin backend)
function ContactForm({ lang }) {
  const [status, setStatus] = React.useState('idle'); // idle | sending | ok | error
  const es = lang === 'es';
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
      const json = await res.json();
      if (json.success) { setStatus('ok'); form.reset(); } else { setStatus('error'); }
    } catch (_) { setStatus('error'); }
  };
  const field = {
    width: '100%', background: 'rgba(244,240,230,0.08)', color: TOKENS.cream,
    border: '1px solid rgba(244,240,230,0.28)', borderRadius: 12,
    padding: '13px 15px', fontFamily: TOKENS.fontBody, fontSize: 15, outline: 'none',
    marginBottom: 12, boxSizing: 'border-box',
  };
  if (status === 'ok') {
    return (
      <div style={{ border: '1px solid rgba(244,240,230,0.28)', borderRadius: 14, padding: '28px 22px', textAlign: 'center' }}>
        <div style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: 26, color: TOKENS.cream, letterSpacing: -0.5 }}>{es ? '¡Mensaje enviado!' : 'Message sent!'}</div>
        <div style={{ fontFamily: TOKENS.fontBody, fontSize: 15, color: TOKENS.cream, opacity: 0.8, marginTop: 8 }}>{es ? 'Gracias, te responderé pronto.' : 'Thanks, I\'ll get back to you soon.'}</div>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="access_key" value="6c26fc99-0c01-4051-9494-707e44b5e650" />
      <input type="hidden" name="subject" value="Nuevo mensaje desde alengomez.com" />
      <input type="hidden" name="from_name" value="Portafolio · alengomez.com" />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
      <input name="name" required placeholder={es ? 'Nombre' : 'Name'} style={field} />
      <input type="email" name="email" required placeholder={es ? 'Tu correo' : 'Your email'} style={field} />
      <textarea name="message" required rows={4} placeholder={es ? 'Cuéntame de tu proyecto…' : 'Tell me about your project…'} style={{ ...field, resize: 'vertical', minHeight: 110 }} />
      <button type="submit" disabled={status === 'sending'} style={{
        width: '100%', background: TOKENS.terracotta, color: TOKENS.cream, border: 'none',
        borderRadius: 999, padding: '15px 24px', cursor: status === 'sending' ? 'default' : 'pointer',
        fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 600, opacity: status === 'sending' ? 0.7 : 1,
        transition: 'opacity .2s ease',
      }}>{status === 'sending' ? (es ? 'Enviando…' : 'Sending…') : (es ? 'Enviar mensaje' : 'Send message')}</button>
      {status === 'error' && (
        <div style={{ fontFamily: TOKENS.fontBody, fontSize: 13, color: TOKENS.cream, opacity: 0.85, marginTop: 10 }}>
          {es ? 'Hubo un error. Intenta de nuevo o escríbeme por WhatsApp.' : 'Something went wrong. Try again or message me on WhatsApp.'}
        </div>
      )}
    </form>
  );
}

function ContactPage({ lang }) {
  const isNarrow = useMedia('(max-width: 900px)');
  return (
    <div style={{ background: TOKENS.green, color: TOKENS.cream, minHeight: '100vh' }}>
      <section style={{ padding: isNarrow ? '96px 20px 72px' : '160px 40px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, opacity: 0.7, letterSpacing: 1.5, marginBottom: isNarrow ? 12 : 16 }}>{lang === 'es' ? 'CONTACTO · 2026' : 'CONTACT · 2026'}</div>
          <h1 style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 'clamp(44px,13vw,64px)' : 'clamp(80px,14vw,200px)', letterSpacing: isNarrow ? -2 : -6, margin: 0, textTransform: 'uppercase', lineHeight: isNarrow ? 0.92 : 0.84 }}>
            {lang === 'es' ? <>TRABAJEMOS<br/><span style={{ color: TOKENS.terracotta }}>JUNTOS.</span></> : <>LET'S WORK<br/><span style={{ color: TOKENS.terracotta }}>TOGETHER.</span></>}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1fr', gap: isNarrow ? 40 : 80, marginTop: isNarrow ? 40 : 80 }}>
            <div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginBottom: 8 }}>EMAIL</div>
              <a href="mailto:trabajemos@alengomez.com" style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 'clamp(26px,8vw,40px)' : 44, color: TOKENS.cream, textDecoration: 'none', letterSpacing: -1, wordBreak: 'break-word' }}>trabajemos@alengomez.com</a>
              <div style={{ marginTop: isNarrow ? 24 : 28 }}>
                <WhatsAppButton lang={lang} big={!isNarrow} />
              </div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginTop: isNarrow ? 32 : 40, marginBottom: 8 }}>{lang === 'es' ? 'REDES' : 'SOCIAL'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { label: 'Instagram @aleng_artist', url: 'https://www.instagram.com/aleng_artist/' },
                  { label: 'Behance /alengomez', url: 'https://www.behance.net/alengomez' },
                  { label: 'LinkedIn /in/alengomez', url: 'https://www.linkedin.com/in/alengomez/' },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 16 : 18, color: TOKENS.cream, textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid rgba(244,240,230,0.2)' }}>{s.label} ↗</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginBottom: 12 }}>{lang === 'es' ? 'ENVÍAME UN MENSAJE' : 'SEND ME A MESSAGE'}</div>
              <ContactForm lang={lang} />
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginTop: 40, marginBottom: 8 }}>{lang === 'es' ? 'UBICACIÓN' : 'BASED IN'}</div>
              <div style={{ fontFamily: TOKENS.fontBody, fontSize: isNarrow ? 16 : 18 }}>Bucaramanga, Colombia<br/>{lang === 'es' ? 'Disponible en remoto' : 'Available remote'}</div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginTop: isNarrow ? 32 : 40, marginBottom: 8 }}>{lang === 'es' ? 'DISPONIBILIDAD' : 'AVAILABILITY'}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: TOKENS.terracotta, padding: '10px 18px', borderRadius: 999, fontFamily: TOKENS.fontBody, fontSize: 14, fontWeight: 500 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: TOKENS.cream, animation: 'pulse 2s infinite' }} />
                {lang === 'es' ? 'Tomando proyectos' : 'Taking projects'}
              </div>
              <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reproductor de YouTube "click-to-play": muestra un póster con botón de play
// y solo carga el iframe (y por tanto el video) cuando el usuario le da play.
function VideoPlayer({ id, poster, lang }) {
  const [play, setPlay] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={lang === 'es' ? 'Video de la campaña' : 'Campaign video'}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <button
          onClick={() => setPlay(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          aria-label={lang === 'es' ? 'Reproducir video de la campaña' : 'Play campaign video'}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 0, cursor: 'pointer', background: 'transparent', display: 'block' }}
        >
          {poster && <img src={poster} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
          <span style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.18)' }} />
          <span style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: `translate(-50%,-50%) scale(${hover ? 1.08 : 1})`,
            width: 88, height: 88, borderRadius: 999,
            background: TOKENS.terracotta, color: TOKENS.cream,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, paddingLeft: 6,
            boxShadow: '0 14px 44px rgba(0,0,0,0.45)',
            transition: 'transform .25s cubic-bezier(.2,.8,.2,1)',
          }}>▶</span>
        </button>
      )}
    </div>
  );
}

function CaseStudyPage({ p, lang, setRoute, openProject }) {
  const isNarrow = useMedia('(max-width: 900px)');
  if (!p) return null;
  const isDark = ['#005032', '#003520', '#0A0A0A'].includes(p.color);
  return (
    <div style={{ background: TOKENS.cream }}>
      <section style={{ background: p.color, color: isDark ? TOKENS.cream : TOKENS.ink, padding: isNarrow ? '96px 20px 48px' : '128px 40px 72px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <button onClick={() => setRoute('work')} style={{ background: 'none', border: 'none', color: 'inherit', fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, opacity: 0.75, cursor: 'pointer', marginBottom: isNarrow ? 24 : 36 }}>← {lang === 'es' ? 'VOLVER A WORK' : 'BACK TO WORK'}</button>
          <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.5fr 1fr', gap: isNarrow ? 28 : 48, alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, opacity: 0.7, marginBottom: isNarrow ? 12 : 18 }}>{p.cat.toUpperCase()} · {p.year}</div>
              <h1 style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 'clamp(36px,9vw,56px)' : 'clamp(48px, 7vw, 104px)', letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase', lineHeight: 0.92, overflowWrap: 'break-word' }}>{p.title}</h1>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, rowGap: 22, fontFamily: TOKENS.fontBody, fontSize: 14, paddingBottom: 8 }}>
              <div><div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginBottom: 8 }}>CLIENT</div>{p.client}</div>
              <div><div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginBottom: 8 }}>AGENCY</div>{p.agency}</div>
              <div><div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginBottom: 8 }}>YEAR</div>{p.year}</div>
              <div><div style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, opacity: 0.6, marginBottom: 8 }}>ROLE</div>{p.role ? p.role[lang] : (lang === 'es' ? 'Dirección de arte' : 'Art direction')}</div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: isNarrow ? '48px 20px 64px' : '90px 40px 110px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          {p.sections ? (
            /* CASO NARRATIVO — texto e imágenes intercalados según el brief */
            p.sections.map((s, si) => {
              const txt = s.t ? (Array.isArray(s.t[lang]) ? s.t[lang] : [s.t[lang]]) : null;
              const imgs = s.images || [];
              const narrows = imgs.filter(im => !im.wide);
              const gridCols = narrows.length > 1 ? 'repeat(auto-fit, minmax(clamp(220px, 30%, 340px), 1fr))' : '1fr';
              return (
                <div key={si} style={{ marginTop: si === 0 ? 0 : 80 }}>
                  {(s.k || txt) && (
                    <div style={{ maxWidth: 680, margin: '0 auto' }}>
                      {s.k && <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, color: TOKENS.terracotta, marginBottom: 16 }}>{s.k[lang].toUpperCase()}</div>}
                      {txt && txt.map((para, i) => (
                        <p key={i} style={{ fontFamily: TOKENS.fontBody, fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: TOKENS.stone700, margin: i === 0 ? 0 : '18px 0 0' }}>{para}</p>
                      ))}
                    </div>
                  )}
                  {s.video && (
                    <figure style={{ margin: (s.k || txt) ? '40px 0 0' : 0, width: '100%' }}>
                      <VideoPlayer id={s.video} poster={p.image} lang={lang} />
                      <figcaption style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginTop: 12 }}>{lang === 'es' ? 'VIDEO' : 'VIDEO'}</figcaption>
                    </figure>
                  )}
                  {imgs.length > 0 && (
                    <div style={{ marginTop: (s.k || txt || s.video) ? 32 : 0, display: 'grid', gridTemplateColumns: s.tiles ? 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' : gridCols, gap: 20, alignItems: s.tiles ? 'stretch' : 'start' }}>
                      {imgs.map((im, i) => (
                        <figure key={i} style={{ margin: 0, gridColumn: (im.wide && !s.tiles) ? '1 / -1' : 'auto' }}>
                          {s.tiles ? (
                            <div onClick={() => window.openLightbox(im.src, im.label ? im.label[lang] : p.title)} style={{ aspectRatio: '4 / 3', background: TOKENS.cream100, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in' }}>
                              <img src={im.src} alt={im.label ? im.label[lang] : `${p.title} — ${p.client}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                            </div>
                          ) : (
                            <img src={im.src} alt={im.label ? im.label[lang] : `${p.title} — ${p.client}`} loading="lazy" onClick={() => window.openLightbox(im.src, im.label ? im.label[lang] : p.title)} style={{ width: '100%', display: 'block', cursor: 'zoom-in' }} />
                          )}
                          {im.label && <figcaption style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginTop: 10 }}>{im.label[lang].toUpperCase()}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <React.Fragment>
              {p.blurb ? (
                <div style={{ maxWidth: 680, margin: '0 auto' }}>
                  {(Array.isArray(p.blurb[lang]) ? p.blurb[lang] : [p.blurb[lang]]).map((para, i) => (
                    <p key={i} style={{ fontFamily: TOKENS.fontBody, fontWeight: 400, fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: TOKENS.stone700, margin: i === 0 ? 0 : '20px 0 0', textAlign: 'left' }}>
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <p style={{ fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: 44, lineHeight: 1.1, letterSpacing: -1, color: TOKENS.ink, margin: 0, maxWidth: 900, textTransform: 'uppercase' }}>
                  {lang === 'es' ? `Dirección de arte para ${p.client}. Un ejercicio de síntesis entre idea y craft.` : `Art direction for ${p.client}. A synthesis exercise between idea and craft.`}
                </p>
              )}
              {(p.youtube || (p.images && p.images.length)) ? (
                <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
                  {p.youtube && (
                    <figure style={{ margin: 0, width: '100%' }}>
                      <VideoPlayer id={p.youtube} poster={p.image} lang={lang} />
                      <figcaption style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginTop: 12 }}>{lang === 'es' ? 'TVC · ANIMACIÓN' : 'TVC · ANIMATION'}</figcaption>
                    </figure>
                  )}
                  {p.images && p.images.map((im, i) => (
                    <figure key={i} style={{ margin: 0, width: '100%', maxWidth: im.wide ? '100%' : 620 }}>
                      <img src={im.src} alt={im.label ? im.label[lang] : `${p.title} — ${p.client}`} loading="lazy" onClick={() => window.openLightbox(im.src, im.label ? im.label[lang] : p.title)} style={{ width: '100%', display: 'block', cursor: 'zoom-in' }} />
                      {im.label && <figcaption style={{ fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.stone500, marginTop: 12 }}>{im.label[lang].toUpperCase()}</figcaption>}
                    </figure>
                  ))}
                </div>
              ) : null}
            </React.Fragment>
          )}
        </div>
      </section>
      {/* Siguiente proyecto + volver a todos */}
      {(() => {
        const idx = PROJECTS.findIndex(x => x.id === p.id);
        const next = PROJECTS[(idx + 1) % PROJECTS.length];
        if (!next || next.id === p.id) return null;
        return (
          <section style={{ padding: isNarrow ? '4px 20px 56px' : '8px 40px 110px', background: TOKENS.cream }}>
            <div style={{ maxWidth: 1120, margin: '0 auto' }}>
              <div style={{ fontFamily: TOKENS.fontMono, fontSize: 11, letterSpacing: 1.5, color: TOKENS.terracotta, marginBottom: 16 }}>
                {lang === 'es' ? 'SI TE GUSTÓ, MIRA ESTE OTRO' : 'IF YOU LIKED THIS, SEE THIS ONE'}
              </div>
              <button onClick={() => openProject && openProject(next)} aria-label={next.title} style={{
                display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', padding: 0,
                borderRadius: 18, overflow: 'hidden', position: 'relative', background: TOKENS.ink,
                aspectRatio: isNarrow ? '16 / 12' : '16 / 6',
              }}>
                <img src={next.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 55%, rgba(10,10,10,0) 100%)' }} />
                <span style={{ position: 'absolute', left: 20, right: 20, bottom: 18 }}>
                  <span style={{ display: 'block', fontFamily: TOKENS.fontMono, fontSize: 10, letterSpacing: 1.5, color: TOKENS.cream, opacity: 0.85 }}>{(next.cat || '').toUpperCase()} · {next.client}</span>
                  <span style={{ display: 'block', fontFamily: TOKENS.fontDisplay, fontWeight: 700, fontSize: isNarrow ? 26 : 42, lineHeight: 1, letterSpacing: -1, color: TOKENS.cream, textTransform: 'uppercase', marginTop: 6 }}>
                    {next.title} <span style={{ color: TOKENS.terracotta }}>→</span>
                  </span>
                </span>
              </button>
              <div style={{ marginTop: 20 }}>
                <button onClick={() => setRoute('work')} style={{
                  width: isNarrow ? '100%' : 'auto',
                  padding: '15px 28px', borderRadius: 999, cursor: 'pointer',
                  border: `2px solid ${TOKENS.green}`, background: 'transparent', color: TOKENS.green,
                  fontFamily: TOKENS.fontBody, fontSize: 15, fontWeight: 500,
                }}>{lang === 'es' ? '← Ver todos los proyectos' : '← View all projects'}</button>
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}

window.WorkPage = WorkPage;
window.AboutPage = AboutPage;
window.ContactPage = ContactPage;
window.CaseStudyPage = CaseStudyPage;
