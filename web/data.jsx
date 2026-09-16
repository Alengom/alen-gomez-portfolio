// Shared tokens + data for the portfolio

const TOKENS = {
  green: '#005032',
  greenDark: '#003520',
  cream: '#F4F0E6',
  cream100: '#EBE6D8',
  terracotta: '#E86A33',
  ink: '#0A0A0A',
  stone300: '#D4CFC2',
  stone500: '#8A8578',
  stone700: '#3D3B35',
  mint: '#B8D4C4',
  fontDisplay: '"Archivo Narrow", sans-serif',
  fontBody: 'Inter, system-ui, sans-serif',
  fontMono: '"JetBrains Mono", monospace',
};

// WhatsApp — link directo con mensaje pre-escrito
const WA_NUMBER = '573165219139';
const waLink = (lang) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  lang === 'es'
    ? 'Hola Alen, vi tu portafolio y me gustaría trabajar contigo.'
    : "Hi Alen, I saw your portfolio and I'd love to work with you."
)}`;
window.waLink = waLink;

const CATEGORIES = [
  { key: 'all', label: { es: 'Todos', en: 'All' } },
  { key: 'campaign', label: { es: 'Campaña', en: 'Campaign' } },
  { key: 'keyvisual', label: { es: 'Key Visual', en: 'Key Visual' } },
  { key: 'illustration', label: { es: 'Ilustración', en: 'Illustration' } },
  { key: 'animation', label: { es: 'Animación', en: 'Animation' } },
  { key: 'ia', label: { es: 'IA', en: 'AI' } },
  { key: 'rrss', label: { es: 'RRSS', en: 'Social' } },
  { key: 'editorial', label: { es: 'Diagramación', en: 'Editorial' } },
];

// Categorías por proyecto (un proyecto puede estar en varias). Fallback: [cat].
const PROJECT_CATS = {
  'primera-estrella': ['campaign', 'ia', 'animation'],
  'atr-alex': ['campaign', 'animation'],
  'golazo': ['campaign', 'animation'],
  'alex-2casas': ['campaign', 'animation'],
  'casa-en-el-rio': ['illustration', 'animation'],
};

const IMG = '/public/projects';

// Projects — trabajo real de Alen Gómez
const PROJECTS = [
  {
    id: 'primera-estrella', title: 'Nuestra Primera Estrella', client: 'Alex', cat: 'campaign', year: 2025,
    agency: 'Alex · Paraguay', color: '#0A0A0A', accent: '#E86A33',
    image: `${IMG}/primera-estrella/kv.webp`,
    role: { es: 'Dirección de arte · Key Visual · TVC', en: 'Art direction · Key Visual · TVC' },
    sections: [
      {
        k: { es: 'Brief', en: 'Brief' },
        t: {
          es: [
            'Paraguay estaba clasificando al Mundial y el país entero lo vivía como un milagro posible. Alex —una de las marcas de retail más grandes del país— quería ser parte de esa historia.',
            'El brief llegó casi como una apuesta: «Estamos tan convencidos de que Paraguay va a ganar, que vamos a subir muchísimo la vara». La mecánica se definió desde ahí: si Paraguay no sale campeón, Alex regala 100 televisores.',
          ],
          en: [
            'Paraguay was qualifying for the World Cup and the whole country lived it as a possible miracle. Alex —one of the largest retail brands in the country— wanted to be part of that story.',
            'The brief arrived almost as a bet: "We’re so sure Paraguay will win that we’re raising the stakes way up." The mechanic came straight from that line: if Paraguay isn’t champion, Alex gives away 100 TVs.',
          ],
        },
      },
      {
        k: { es: 'El Key Visual', en: 'The Key Visual' },
        t: {
          es: [
            'El key visual es el corazón de la campaña: Alexito en el centro del estadio, con la camiseta de la selección, levantando los brazos como si ya hubiera ganado. No como espectador, sino como protagonista —la marca convertida en el hincha número uno del país—.',
            'Los televisores no aparecen como producto, sino integrados al escenario, como las pantallas donde Paraguay verá su propia coronación. Todo en una paleta de estadio nocturno, destellos dorados y los colores de la bandera, amarrando la promesa de los 100 televisores con una carga emocional que ningún banner de oferta lograría solo.',
          ],
          en: [
            'The key visual is the heart of the campaign: Alexito at the center of the stadium, in the national jersey, raising his arms as if he’d already won. Not as a spectator, but as the protagonist —the brand turned into the country’s number-one fan.',
            'The TVs don’t appear as product but integrated into the scene, as the screens where Paraguay will watch its own coronation. All in a night-stadium palette, golden sparkles and the flag’s colors, tying the promise of 100 TVs to an emotional charge no offer banner could achieve alone.',
          ],
        },
        images: [
          { src: `${IMG}/primera-estrella/kv.webp`, label: { es: 'Key visual · Nuestra 1ra Estrella', en: 'Key visual · Our First Star' }, wide: true },
        ],
      },
      {
        k: { es: 'El concepto · Storyboard', en: 'The concept · Storyboard' },
        t: {
          es: ['El TVC nació de una pregunta: ¿cómo conectar los televisores con el Mundial sin que se sintiera forzado? La respuesta fue un arco sobre las «primeras veces» —los primeros pasos, el primer trabajo, mudarse solo, el primer flechazo— que Alexito recorre uno a uno hasta llegar al más grande de todos: la primera estrella de Paraguay. El storyboard definió cada escena y el tono emocional antes de producir un solo frame.'],
          en: ['The TVC came from a question: how do we connect the TVs to the World Cup without it feeling forced? The answer was an arc about "firsts" —first steps, first job, moving out, first crush— that Alexito goes through one by one, up to the biggest of all: Paraguay’s first star. The storyboard defined every scene and the emotional tone before producing a single frame.'],
        },
        images: [
          { src: `${IMG}/primera-estrella/storyboard.webp`, label: { es: 'Storyboard', en: 'Storyboard' }, wide: true },
        ],
      },
      {
        k: { es: 'Exploración visual', en: 'Visual exploration' },
        t: {
          es: ['Con el guion aprobado, se generaron las imágenes iniciales de cada escena —exploraciones que definieron composición, iluminación y atmósfera antes de la versión final—.'],
          en: ['With the script approved, the initial images for each scene were generated —explorations that defined composition, lighting and atmosphere before the final version.'],
        },
        images: [
          { src: `${IMG}/primera-estrella/propuesta.webp`, label: { es: 'Tomas para propuesta', en: 'Proposal shots' }, wide: true },
        ],
      },
      {
        k: { es: 'Frames finales', en: 'Final frames' },
        t: {
          es: ['Las imágenes finales llevaron a Alexito por cada momento con color, detalle y emoción —desde una habitación de bebé hasta un estadio lleno—. El TVC fue producido íntegramente con IA, con dirección de arte y animación coordinadas para que cada escena se sintiera parte de la misma historia.'],
          en: ['The final images took Alexito through every moment with color, detail and emotion —from a baby’s room to a packed stadium. The TVC was produced entirely with AI, with art direction and animation coordinated so every scene felt part of the same story.'],
        },
        images: [
          { src: `${IMG}/primera-estrella/frames.webp`, label: { es: 'Frames finales del TVC', en: 'Final TVC frames' }, wide: true },
        ],
      },
      {
        k: { es: 'TVC', en: 'TVC' },
        t: {
          es: ['El TVC animado tomó la energía del resultado final y la convirtió en una historia con principio, corazón y remate.'],
          en: ['The animated TVC took the energy of the final result and turned it into a story with a beginning, a heart and a punchline.'],
        },
        video: 'Mqne924cYZY',
      },
    ],
  },
  {
    id: 'atr-alex', title: 'ATR', client: 'Alex', cat: 'campaign', year: 2025,
    agency: 'Nasta · Paraguay', color: '#0A0A0A', accent: '#E86A33',
    image: `${IMG}/atr-alex/kv-1.webp`,
    role: { es: 'Dirección de arte · Branding', en: 'Art direction · Branding' },
    sections: [
      {
        k: { es: 'El punto de partida', en: 'The starting point' },
        t: {
          es: [
            'Alex, una de las cadenas de electrónica más grandes de Paraguay, estaba por lanzar ATR: su propia línea de parlantes, speakers y cajas acústicas. Productos coloridos y accesibles para un público que vive la música como parte de su rutina.',
            'El reto no era solo presentar un producto, sino construir una marca desde cero dentro de una marca que ya existía —con identidad, voz y razón de ser propias—.',
          ],
          en: [
            'Alex, one of the largest electronics chains in Paraguay, was about to launch ATR: its own line of speakers and sound systems. Colorful, accessible products for people who live music as part of their routine.',
            "The challenge wasn't just launching a product, but building a brand from scratch inside a brand that already existed —with its own identity, voice and reason to be.",
          ],
        },
      },
      {
        k: { es: 'El insight', en: 'The insight' },
        t: {
          es: [
            'Escuchamos música en todo momento —limpiando la casa, tomando tereré en la vereda, en un asado, en el arroyo el fin de semana—. Y cuando alguien nos cuenta un buen plan, respondemos: «qué bien suena».',
            'Esa frase se volvió el corazón de la campaña, con doble lectura: reacción al momento y promesa del producto.',
          ],
          en: [
            'We listen to music all the time —cleaning the house, sharing tereré on the sidewalk, at a barbecue, at the creek on weekends. And when someone pitches a good plan, we answer: "that sounds good".',
            'That line became the heart of the campaign, on two levels: a reaction to the moment and a promise from the product.',
          ],
        },
      },
      {
        k: { es: 'El key visual', en: 'The key visual' },
        t: {
          es: ['Le di prioridad al nombre ATR con tipografía contundente sobre fondos oscuros que dejan respirar los colores vibrantes de los parlantes. «¡Qué bien suena!» siempre como cierre.'],
          en: ['I gave priority to the ATR name with bold type over dark backgrounds that let the speakers’ vibrant colors breathe. "¡Qué bien suena!" always as the closing line.'],
        },
        images: [
          { src: `${IMG}/atr-alex/kv-1.webp`, label: { es: 'Key visual · vereda', en: 'Key visual · sidewalk' }, wide: true },
          { src: `${IMG}/atr-alex/kv-2.webp`, label: { es: 'Key visual · arroyo', en: 'Key visual · creek' }, wide: true },
          { src: `${IMG}/atr-alex/kv-3.webp`, label: { es: 'Key visual · piki vóley', en: 'Key visual · beach volley' }, wide: true },
        ],
      },
      {
        k: { es: 'Dirección fotográfica', en: 'Photography' },
        t: {
          es: ['Una regla estratégica: sin rostros. Sin caras reconocibles, las piezas ganan vida útil y el foco se mantiene en el producto y su situación de consumo. El sistema bajó a materiales digitales y piezas tácticas.'],
          en: ['A strategic rule: no faces. Without recognizable faces, the assets gain shelf life and the focus stays on the product and its context of use. The system extended into digital materials and tactical pieces.'],
        },
        images: [
          { src: `${IMG}/atr-alex/mockup-cel.webp`, label: { es: 'Pieza táctica', en: 'Tactical piece' } },
          { src: `${IMG}/atr-alex/social.webp`, label: { es: 'Pieza para redes', en: 'Social piece' } },
        ],
      },
      {
        k: { es: 'TVC', en: 'TVC' },
        t: {
          es: ['Dos propuestas audiovisuales; una animando las fotografías con IA para que el contexto cobrara vida alrededor del parlante.'],
          en: ['Two audiovisual proposals; one animating the photographs with AI so the context came alive around the speaker.'],
        },
        video: 'dtVAoDnEApc',
      },
    ],
  },
  {
    id: 'golazo', title: 'Golazo', client: 'STAR', cat: 'campaign', year: 2025,
    agency: 'Alex · Paraguay', color: '#005032', accent: '#E86A33',
    image: `${IMG}/golazo/kv-motos.webp`,
    role: { es: 'Diseño · Dirección de arte · TVC', en: 'Design · Art direction · TVC' },
    sections: [
      {
        k: { es: 'Brief', en: 'Brief' },
        t: {
          es: ['Paraguay vibraba con las Eliminatorias rumbo al Mundial 2026. STAR —la marca de motos propia de Alex— necesitaba convertir esa emoción colectiva en tráfico a los puntos de venta.'],
          en: ['Paraguay was buzzing with the World Cup 2026 qualifiers. STAR —Alex’s own motorcycle brand— needed to turn that collective emotion into store traffic.'],
        },
      },
      {
        k: { es: 'La mecánica', en: 'The mechanic' },
        t: {
          es: ['Tan directa como efectiva: por cada gol de Paraguay, una cuota menos en tu moto —hasta tres en total—. «Golazo» no era descriptivo, era la promesa de la campaña.'],
          en: ['As direct as it was effective: for every goal Paraguay scored, one less installment on your bike —up to three. "Golazo" wasn’t descriptive, it was the campaign’s promise.'],
        },
        images: [
          { src: `${IMG}/golazo/kv-titular.webp`, label: { es: 'Titular de campaña', en: 'Campaign lockup' }, wide: true },
        ],
      },
      {
        k: { es: 'Sistema visual', en: 'Visual system' },
        t: {
          es: ['Lo construí sobre los colores de la bandera, textura de pasto, estadio al fondo y confeti rojo. Las motos, protagonistas del campo de juego.'],
          en: ['I built it on the flag’s colors, grass texture, a stadium backdrop and red confetti. The bikes, stars of the field.'],
        },
        images: [
          { src: `${IMG}/golazo/kv.webp`, label: { es: 'Key visual', en: 'Key visual' }, wide: true },
          { src: `${IMG}/golazo/kv-motos.webp`, label: { es: 'Key visual · motos', en: 'Key visual · bikes' }, wide: true },
        ],
      },
      {
        k: { es: 'En redes', en: 'On social' },
        t: {
          es: ['La campaña se desplegó en una cadena de contenido que escaló la emoción antes, durante y después del partido.'],
          en: ['The campaign rolled out as a content chain that scaled the emotion before, during and after the match.'],
        },
        images: [
          { src: `${IMG}/golazo/social.webp`, label: { es: 'Contenido en redes', en: 'Social content' }, wide: true },
        ],
      },
      {
        k: { es: 'Resultado', en: 'Result' },
        t: {
          es: ['Diseño, concepto y TVC animado salieron del mismo equipo, amarrando todo en una pieza que vivía en tiempo real con cada partido.'],
          en: ['Design, concept and the animated TVC came from the same team, tying it all into a piece that lived in real time with every match.'],
        },
        video: 'Hm2yKQ4UE68',
      },
    ],
  },
  {
    id: 'delirios', title: 'Delirios', client: 'Delirios', cat: 'rrss', year: 2025,
    agency: 'Freelance', color: '#003520', accent: '#E86A33',
    image: `${IMG}/delirios/look-1.webp`,
    role: { es: 'Branding · Sistema para RRSS', en: 'Branding · Social system' },
    sections: [
      {
        k: { es: 'Brief', en: 'Brief' },
        t: {
          es: ['Delirios —extensiones, pelucas y accesorios capilares— tenía comunidad y energía de sobra, pero su feed se sentía disperso. Para 2024–2025 querían dar el salto: de una estética vibrante pero dispersa a una identidad más de marca, sin perder el espíritu juvenil.'],
          en: ['Delirios —hair extensions, wigs and accessories— had community and energy to spare, but its feed felt scattered. For 2024–2025 they wanted a leap: from a vibrant but scattered look to a more brand-like identity, without losing the youthful spirit.'],
        },
      },
      {
        k: { es: 'El punto de partida', en: 'The starting point' },
        t: {
          es: ['La marca anterior usaba una paleta amplia de fucsias, rosas, morados y amarillos; cada pieza decidía por su cuenta. Las tipografías brush daban actitud, pero sin sistema se volvían ruido. El primer trabajo fue auditar: qué conservar y qué soltar.'],
          en: ['The previous brand used a wide palette of fuchsias, pinks, purples and yellows; every piece made its own calls. Brush typefaces gave attitude, but without a system they became noise. The first job was to audit: what to keep and what to let go.'],
        },
        images: [
          { src: `${IMG}/delirios/antecedentes.webp`, label: { es: 'Antes · feed anterior', en: 'Before · previous feed' }, wide: true },
        ],
      },
      {
        k: { es: 'Un sistema, no un estilo', en: 'A system, not a style' },
        t: {
          es: ['Definí una paleta reducida anclada en el fucsia, una jerarquía tipográfica clara (Wild Mango para impacto, Charlotte para lo elegante, Univers para texto) y un set propio de elementos gráficos —destellos, contenedores y un patrón que funciona como firma—.'],
          en: ['I set a reduced palette anchored in fuchsia, a clear type hierarchy (Wild Mango for impact, Charlotte for elegance, Univers for body) and a custom set of graphic elements —sparkles, containers and a pattern that works as a signature.'],
        },
        images: [
          { src: `${IMG}/delirios/paleta.webp`, label: { es: 'Paleta de color', en: 'Color palette' }, wide: true },
          { src: `${IMG}/delirios/tipografia.webp`, label: { es: 'Sistema tipográfico', en: 'Type system' }, wide: true },
          { src: `${IMG}/delirios/elemento-1.webp`, label: { es: 'Elemento', en: 'Element' } },
          { src: `${IMG}/delirios/elemento-2.webp`, label: { es: 'Elemento', en: 'Element' } },
          { src: `${IMG}/delirios/elemento-3.webp`, label: { es: 'Elemento', en: 'Element' } },
          { src: `${IMG}/delirios/estructura.webp`, label: { es: 'Estructura de piezas', en: 'Piece structure' }, wide: true },
        ],
      },
      {
        k: { es: 'Resultado', en: 'Result' },
        t: {
          es: ['Cada pieza quedó estructurada con los mismos componentes en el mismo orden: fotografía, patrón, texto destacado, texto complementario, logo. Un feed que siempre se ve como Delirios. La diferencia entre el antes y el después no es de gusto: es de estructura.'],
          en: ['Every piece was built from the same components in the same order: photo, pattern, headline, supporting text, logo. A feed that always looks like Delirios. The difference between before and after isn’t taste —it’s structure.'],
        },
        images: [
          { src: `${IMG}/delirios/look-1.webp`, label: { es: 'Nuevo look', en: 'New look' } },
          { src: `${IMG}/delirios/look-2.webp`, label: { es: 'Nuevo look', en: 'New look' } },
          { src: `${IMG}/delirios/mockup.webp`, label: { es: 'Grid final aplicado', en: 'Final applied grid' }, wide: true },
        ],
      },
    ],
  },
  {
    id: 'cuento-y-escribo', title: 'Cuento y Escribo', client: 'Sol Naciente', cat: 'illustration', year: 2025,
    agency: 'Editorial Sol Naciente', color: '#B8D4C4', accent: '#003520',
    image: `${IMG}/cuento-y-escribo/mockup-1.webp`,
    role: { es: 'Ilustración · Creación de personajes', en: 'Illustration · Character design' },
    sections: [
      {
        k: { es: 'Brief', en: 'Brief' },
        t: {
          es: ['Editorial Sol Naciente necesitaba renovar su colección de libros de aprestamiento —los primeros pasos de los niños en la lectura y la escritura—. El material anterior se sentía genérico. Única dirección creativa: monstruos, pero amigables.'],
          en: ['Editorial Sol Naciente needed to refresh its early-learning book collection —a child’s first steps into reading and writing. The old material felt generic. The only creative direction: monsters, but friendly.'],
        },
      },
      {
        k: { es: 'Proceso', en: 'Process' },
        t: {
          es: ['De ahí nació una familia de personajes construida desde el boceto: vistas de frente y espalda, proporciones y personalidad para cada uno.'],
          en: ['From there came a family of characters built from sketch: front and back views, proportions and a distinct personality for each.'],
        },
        images: [
          { src: `${IMG}/cuento-y-escribo/boceto-2.webp`, label: { es: 'Bocetos de personajes', en: 'Character sketches' } },
          { src: `${IMG}/cuento-y-escribo/boceto-1.webp`, label: { es: 'Vistas frente y espalda', en: 'Front & back views' } },
        ],
      },
      {
        k: { es: 'Color', en: 'Color' },
        t: {
          es: ['Después, la exploración de color: paletas probadas sobre el personaje hasta dar con un tono cálido e infantil sin caer en lo genérico.'],
          en: ['Then the color exploration: palettes tested on the character until landing on a warm, playful tone that never felt generic.'],
        },
        images: [
          { src: `${IMG}/cuento-y-escribo/color-1.webp`, label: { es: 'Construcción de color', en: 'Color build' } },
          { src: `${IMG}/cuento-y-escribo/color-2.webp`, label: { es: 'Pruebas de color', en: 'Color tests' } },
          { src: `${IMG}/cuento-y-escribo/detalle-1.webp`, label: { es: 'Detalle', en: 'Detail' } },
          { src: `${IMG}/cuento-y-escribo/detalle-2.webp`, label: { es: 'Detalle', en: 'Detail' } },
          { src: `${IMG}/cuento-y-escribo/mockup-1.webp`, label: { es: 'Personajes ilustrados', en: 'Illustrated characters' }, wide: true },
        ],
      },
      {
        k: { es: 'Resultado', en: 'Result' },
        t: {
          es: ['Tres portadas con escena propia, unificadas por los personajes como hilo conductor. Esos personajes —diseñados e ilustrados para el proyecto— son el activo más valioso: pueden vivir en material didáctico, papelería o futuras extensiones sin perder coherencia.'],
          en: ['Three covers, each with its own scene, unified by the characters as a connecting thread. Those characters —designed and illustrated for the project— are the most valuable asset: they can live on in learning materials, stationery or future extensions without losing coherence.'],
        },
        images: [
          { src: `${IMG}/cuento-y-escribo/mockup-2.webp`, label: { es: 'Los tres libros', en: 'The three books' }, wide: true },
        ],
      },
    ],
  },
  {
    id: 'pascua-milka', title: 'La Pascua más Tierna', client: 'Milka', cat: 'keyvisual', year: 2024,
    agency: 'Agencia', color: '#005032', accent: '#E86A33',
    image: `${IMG}/pascua-milka/kv-final.webp`,
    role: { es: 'Ilustración · Key Visual', en: 'Illustration · Key Visual' },
    sections: [
      {
        k: { es: 'Brief', en: 'Brief' },
        t: {
          es: ['La Pascua es territorio natural de Milka, pero también cuando la competencia aprieta en el punto de venta. El objetivo: posicionar a Milka como la mejor opción destacando su atributo diferencial —la ternura—, con un tono emotivo y premium.'],
          en: ['Easter is Milka’s natural territory —but also when competitors push hard at retail. The goal: position Milka as the best choice by leaning into its differentiator —tenderness— with an emotional, premium tone.'],
        },
      },
      {
        k: { es: 'Concepto y proceso', en: 'Concept & process' },
        t: {
          es: ['Bajo «Compartí la Pascua más tierna», la vaca tenía que ser protagonista y verse tierna de verdad. La ilustré desde cero respetando los códigos de marca —el morado, la campana, la expresión suave— sumando orejas de conejo como guiño pascual. Partí de un boceto estructural antes del color.'],
          en: ['Under "Share the tenderest Easter", the cow had to be the star and genuinely tender. I illustrated it from scratch honoring the brand codes —the purple, the bell, the soft expression— adding bunny ears as an Easter wink. I started from a structural sketch before color.'],
        },
        images: [
          { src: `${IMG}/pascua-milka/ilustracion-vaca.webp`, label: { es: 'Ilustración de la vaca', en: 'Cow illustration' }, wide: true },
        ],
      },
      {
        k: { es: 'Resultado', en: 'Result' },
        t: {
          es: ['Un key visual que pone a la vaca en el centro sin competir con los productos, con un paisaje de montañas que ancla el universo Milka. Propuesta desarrollada en agencia; concepto no producido.'],
          en: ['A key visual that centers the cow without competing with the products, with a mountain landscape anchoring the Milka universe. Concept developed in agency; not produced.'],
        },
        images: [
          { src: `${IMG}/pascua-milka/kv-final.webp`, label: { es: 'Key visual final', en: 'Final key visual' }, wide: true },
        ],
      },
    ],
  },
  {
    id: 'casa-en-el-rio', title: 'Casa en el Río', client: 'Personal', cat: 'illustration', year: 2025,
    agency: 'Proyecto personal', color: '#0A0A0A', accent: '#B8D4C4',
    image: `${IMG}/casa-en-el-rio/final.webp`,
    role: { es: 'Ilustración · Concept art', en: 'Illustration · Concept art' },
    sections: [
      {
        k: { es: 'El origen', en: 'The origin' },
        t: {
          es: ['Sin cliente ni deadline. Solo una casa que llamó la atención desde la ventana del carro —zinc, enredaderas, maderas apiladas— y la sensación de que ahí adentro podía haber algo mágico. La pregunta que disparó todo: ¿qué vería alguien que mirara esta casa con otros ojos?'],
          en: ['No client, no deadline. Just a house that caught my eye from the car window —zinc, climbing vines, stacked timber— and the feeling that something magical could live inside. The question that started it all: what would someone see if they looked at this house with different eyes?'],
        },
        images: [
          { src: `${IMG}/casa-en-el-rio/inspiracion.webp`, label: { es: 'La casa real', en: 'The real house' }, wide: true },
        ],
      },
      {
        k: { es: 'Proceso', en: 'Process' },
        t: {
          es: ['Primero, composición y perspectiva: traducir la estructura real a un lenguaje fantástico sobre el agua. Luego, los valores de luz y sombra para entender la profundidad —cueva en primer plano, casa al centro, cascadas al fondo—.'],
          en: ['First, composition and perspective: translating the real structure into a fantastical language over water. Then the light and shadow values to build depth —cave in the foreground, house at center, waterfalls behind.'],
        },
        images: [
          { src: `${IMG}/casa-en-el-rio/sketch.webp`, label: { es: 'Boceto lineal', en: 'Line sketch' } },
          { src: `${IMG}/casa-en-el-rio/boceto.webp`, label: { es: 'Estudio de valores', en: 'Value study' } },
        ],
      },
      {
        k: { es: 'Speedpainting', en: 'Speedpainting' },
        t: {
          es: ['La ilustración se construyó capa por capa en una sesión de speedpainting, del boceto al detalle.'],
          en: ['The illustration was built layer by layer in a speedpainting session, from sketch to detail.'],
        },
        video: 'KcayTsUJVEY',
      },
      {
        k: { es: 'Resultado', en: 'Result' },
        t: {
          es: ['A veces el mundo real solo necesita que alguien lo mire con otros ojos.'],
          en: ['Sometimes the real world just needs someone to look at it with different eyes.'],
        },
        images: [
          { src: `${IMG}/casa-en-el-rio/final.webp`, label: { es: 'Ilustración final', en: 'Final illustration' }, wide: true },
        ],
      },
    ],
  },
  {
    id: 'santa-costeno', title: 'Santa Costeño', client: 'Vivero El Bosque', cat: 'illustration', year: 2024,
    agency: 'Freelance', color: '#E86A33', accent: '#005032',
    image: `${IMG}/santa-costeno/santa-1.webp`,
    role: { es: 'Ilustración · Diseño de personaje', en: 'Illustration · Character design' },
    sections: [
      {
        k: { es: 'Brief', en: 'Brief' },
        t: {
          es: ['Vivero El Bosque necesitaba un personaje navideño para su stand en un evento de Navidad en Bucaramanga. Nada de Santa genérico con nieve y trineo: querían uno propio, uno que se sintiera de aquí. El brief fue claro y divertido —un Santa costeño—.'],
          en: ['Vivero El Bosque needed a Christmas character for its stand at a holiday event in Bucaramanga. No generic snow-and-sleigh Santa: they wanted their own, one that felt local. The brief was clear and fun —a coastal Colombian Santa.'],
        },
      },
      {
        k: { es: 'Proceso', en: 'Process' },
        t: {
          es: ['Reinterpretar un ícono universal sin perder su esencia. La barba y la panza quedaron; todo lo demás se tropicalizó: sombrero vueltiao, camisa abierta, pantaloneta, chancletas, mochila arhuaca y pulseras de colores. Se partió de un boceto lineal detallado antes del color.'],
          en: ['Reinterpreting a universal icon without losing its essence. The beard and belly stayed; everything else went tropical: a vueltiao hat, open shirt, shorts, flip-flops, an Arhuaco bag and colorful bracelets. It started from a detailed line sketch before color.'],
        },
        images: [
          { src: `${IMG}/santa-costeno/santa-2.webp`, label: { es: 'Personaje y boceto', en: 'Character & sketch' }, wide: true },
        ],
      },
      {
        k: { es: 'Resultado', en: 'Result' },
        t: {
          es: ['Un personaje con identidad regional fuerte que funciona como ilustración standalone.'],
          en: ['A character with strong regional identity that works as a standalone illustration.'],
        },
        images: [
          { src: `${IMG}/santa-costeno/santa-1.webp`, label: { es: 'Personaje final', en: 'Final character' }, wide: true },
        ],
      },
    ],
  },
  {
    id: 'alex-2casas', title: 'Fin de Año Alex', client: 'Alex', cat: 'campaign', year: 2024,
    agency: 'Nasta · Paraguay', color: '#E86A33', accent: '#005032',
    image: `${IMG}/alex-2casas/kv-principal.webp`,
    youtube: 'btOc-g0qiIc',
    images: [
      { src: `${IMG}/alex-2casas/kv-principal.webp`, label: { es: 'KV principal · 2 Casas Nuevas', en: 'Main KV · 2 New Houses' }, wide: true },
      { src: `${IMG}/alex-2casas/kv-tactico.webp`, label: { es: 'Pieza táctica', en: 'Tactical piece' }, wide: true },
    ],
    role: { es: 'Dirección de arte · Diseño 3D', en: 'Art direction · 3D design' },
    blurb: {
      es: 'Campaña de fin de año para Alex (Paraguay), desarrollada con la agencia Nasta. La mecánica premiaba a los clientes con dos casas: bastaba con registrar sus compras para participar del sorteo. Para dar el tono festivo, diseñé en 3D los globos de «Alexito» —el personaje de la marca— que protagonizan el key visual «2 Casas Nuevas», y a partir de esa pieza se animó el TVC de la campaña.',
      en: 'Year-end campaign for Alex (Paraguay), developed with agency Nasta. The mechanic rewarded shoppers with two houses: registering their purchases was all it took to enter the draw. To set the festive tone, I designed the 3D "Alexito" balloons —the brand character— that headline the "2 Casas Nuevas" key visual, which the campaign TVC was then animated from.',
    },
  },
  {
    id: 'always-on-alex', title: 'Always On', client: 'Alex', cat: 'rrss', year: 2024,
    agency: 'Alex · Paraguay', color: '#0A0A0A', accent: '#E86A33',
    image: `${IMG}/always-on-alex/look.webp`,
    images: [
      { src: `${IMG}/always-on-alex/look.webp`, label: { es: 'Look & feel', en: 'Look & feel' }, wide: true },
      { src: `${IMG}/always-on-alex/presenta.webp`, label: { es: 'Presentación del sistema', en: 'System presentation' }, wide: true },
      { src: `${IMG}/always-on-alex/precios.webp`, label: { es: 'Esquema de precios', en: 'Price scheme' } },
      { src: `${IMG}/always-on-alex/tipografia.webp`, label: { es: 'Tipografía', en: 'Typography' } },
    ],
    role: { es: 'Dirección de arte · RRSS', en: 'Art direction · Social' },
    blurb: {
      es: 'Sistema de contenido always-on para Alex en Paraguay: dirección de arte, look & feel, tipografía y un esquema de piezas de precio pensado para sostener la presencia de marca en redes de forma consistente, pieza tras pieza.',
      en: 'Always-on content system for Alex in Paraguay: art direction, look & feel, typography and a price-piece scheme designed to keep the brand’s social presence consistent, piece after piece.',
    },
  },
  {
    id: 'la-botica', title: 'La Botica', client: 'La Botica', cat: 'keyvisual', year: 2024,
    agency: 'Freelance', color: '#003520', accent: '#B8D4C4',
    image: `${IMG}/la-botica/kv-principal.webp`,
    images: [
      { src: `${IMG}/la-botica/kv-principal.webp`, label: { es: 'Key visual principal', en: 'Main key visual' }, wide: true },
      { src: `${IMG}/la-botica/kv-valla.webp`, label: { es: 'Adaptación a valla', en: 'Billboard adaptation' }, wide: true },
    ],
    role: { es: 'Dirección de arte · Key Visual', en: 'Art direction · Key Visual' },
    blurb: {
      es: 'Key visual para La Botica: una pieza principal y su adaptación a valla, construyendo el mundo visual de la marca con una dirección de arte cálida y contundente.',
      en: 'Key visual for La Botica: a hero piece and its billboard adaptation, building the brand’s visual world with a warm, bold art direction.',
    },
  },
  {
    id: 'revista-unab', title: 'Revista UNAB', client: 'UNAB', cat: 'editorial', year: 2023,
    agency: 'UNAB', color: '#F4F0E6', accent: '#005032',
    image: `${IMG}/revista-unab/revista-1.webp`,
    images: [
      { src: `${IMG}/revista-unab/revista-1.webp`, label: { es: 'Diagramación · pliego', en: 'Layout · spread' }, wide: true },
      { src: `${IMG}/revista-unab/revista-2.webp`, label: { es: 'Diagramación · pliego', en: 'Layout · spread' }, wide: true },
    ],
    role: { es: 'Diagramación editorial', en: 'Editorial layout' },
    blurb: {
      es: 'Diagramación editorial para la revista de la UNAB: retícula, jerarquía tipográfica y ritmo de página para que el contenido respire y se lea con claridad.',
      en: 'Editorial layout for UNAB’s magazine: grid, type hierarchy and page rhythm so the content breathes and reads clearly.',
    },
  },
];

// Asignar categorías (multi) a cada proyecto
PROJECTS.forEach(p => { p.cats = PROJECT_CATS[p.id] || [p.cat]; });

window.TOKENS = TOKENS;
window.CATEGORIES = CATEGORIES;
window.PROJECTS = PROJECTS;
