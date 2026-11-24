/* ============================================================================
   KARTIK RESEARCH — OPEN STUDIO DESK, SOUND DECK, ZINES & RAW CHAOS MODULE
   Drop into ~/Desktop/Dada/studio-desk.js and include right before </body>:
     <script src="./studio-desk.js"></script>
   Zero dependencies. Respects Plain Mode, Currency Switcher, and never
   interferes with existing Three.js .glb loaders or WebGL cleanup.
============================================================================ */
(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     1. ANTI-AI STUDIO STYLES (DRY PAPER, GRAPHITE RULES, ZERO SAAS CHROME)
  ------------------------------------------------------------------------- */
  const style = document.createElement('style');
  style.textContent = `
    /* Open Studio Desk Proof Block inside PDP */
    .kr-desk-wrap {
      border-top: 1px solid var(--line-dark, #141413);
      padding-top: 18px;
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .kr-stamp-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .kr-stamp {
      font-family: var(--mono, monospace);
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid var(--ink, #141413);
      padding: 2px 6px;
      background: var(--paper, #F6F5F1);
      color: var(--ink, #141413);
    }
    .kr-hours-bars {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: var(--paper, #F6F5F1);
      border: 1px solid var(--line, #E4E2DB);
      padding: 12px;
    }
    .kr-hour-row {
      display: grid;
      grid-template-columns: 112px 1fr 48px;
      align-items: center;
      gap: 8px;
      font-family: var(--mono, monospace);
      font-size: 10px;
    }
    .kr-bar-track {
      height: 5px;
      background: #E4E2DB;
      position: relative;
    }
    .kr-bar-fill {
      position: absolute;
      top: 0; left: 0; bottom: 0;
      background: var(--indigo, #1E3246);
    }

    /* Scanned Artisan Notebook Artifact */
    .kr-notebook-card {
      border: 1px solid var(--line, #E4E2DB);
      background: #F5F2E9;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .kr-notebook-canvas {
      width: 100%;
      height: auto;
      display: block;
      border: 1px solid #DCD7C9;
      cursor: zoom-in;
    }

    /* Year 0 -> Year 5 Patina Scrubber */
    .kr-patina-box {
      border: 1px solid var(--line, #E4E2DB);
      background: var(--bg, #FFFFFF);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .kr-patina-strip {
      display: grid;
      grid-template-columns: 64px 1fr;
      gap: 12px;
      align-items: center;
    }
    .kr-patina-swatch {
      width: 64px;
      height: 64px;
      border: 1px solid var(--ink, #141413);
      position: relative;
      overflow: hidden;
    }
    .kr-patina-grain {
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
        0deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 4px
      );
      pointer-events: none;
    }

    /* Raw Chaos Margin Note (Unpolished Studio Friction) */
    .kr-chaos-note {
      border-left: 2px solid var(--madder, #7A2E22);
      background: #FAF8F3;
      padding: 10px 12px;
      font-size: 12px;
      line-height: 1.5;
      color: #2B2A27;
    }

    /* Manual 3-Stem Workshop Sound Deck (Never Auto-Play) */
    .kr-sound-deck {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 20px;
      border-bottom: 1px solid var(--line, #E4E2DB);
      background: #FAF9F5;
    }
    .kr-stem-btn {
      font-family: var(--mono, monospace);
      font-size: 10px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 4px 8px;
      border: 1px solid var(--line, #E4E2DB);
      background: #FFFFFF;
      color: var(--ink, #141413);
      cursor: pointer;
    }
    .kr-stem-btn.active {
      background: var(--ink, #141413);
      color: #FFFFFF;
      border-color: var(--ink, #141413);
    }

    /* Zines & Scrap Objects View */
    .kr-zine-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
      border-bottom: 1px solid var(--line, #E4E2DB);
    }
    .kr-zine-reader {
      background: #EAE6DC;
      padding: 28px;
      border-right: 1px solid var(--line, #E4E2DB);
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      justify-content: center;
    }
    .kr-spread {
      width: 100%;
      max-width: 680px;
      aspect-ratio: 16 / 10;
      background: #F7F4EC;
      border: 1px solid #141413;
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
    }
    .kr-spread::after {
      content: "";
      position: absolute;
      top: 0; bottom: 0; left: 50%;
      width: 1px;
      background: #CFC9BC;
    }
    .kr-page {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .kr-objects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    .kr-obj-card {
      border-right: 1px solid var(--line, #E4E2DB);
      border-bottom: 1px solid var(--line, #E4E2DB);
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #FFFFFF;
    }
    .kr-obj-plate {
      width: 100%;
      aspect-ratio: 4 / 3;
      border: 1px solid var(--line, #E4E2DB);
      display: block;
    }

    /* Raw Desk / 35mm Contact Sheet View */
    .kr-contact-sheet {
      background: #141413;
      color: #EAE6DC;
      padding: 24px 20px;
      border-bottom: 1px solid var(--line, #E4E2DB);
    }
    .kr-sprockets {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      opacity: 0.45;
      font-family: var(--mono, monospace);
      font-size: 10px;
      letter-spacing: 0.14em;
    }
    .kr-frames-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 14px;
    }
    .kr-film-frame {
      border: 1px solid #3A3834;
      background: #1C1B19;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .kr-film-plate {
      width: 100%;
      aspect-ratio: 3 / 2;
      background: #272521;
      border: 1px solid #35332E;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px;
      font-family: var(--mono, monospace);
      font-size: 10px;
      color: #D8CFC0;
    }
    .kr-music-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      border-top: 1px solid var(--line, #E4E2DB);
    }
    .kr-music-card {
      padding: 20px;
      border-right: 1px solid var(--line, #E4E2DB);
      border-bottom: 1px solid var(--line, #E4E2DB);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Notebook Fullscreen Lightbox */
    .kr-lightbox {
      position: fixed;
      inset: 0;
      z-index: 90;
      background: rgba(20, 20, 19, 0.82);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .kr-lightbox.open { display: flex; }
    .kr-lightbox-inner {
      background: #F5F2E9;
      border: 1px solid #141413;
      max-width: 820px;
      width: 100%;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    @media (max-width: 960px) {
      .kr-zine-layout { grid-template-columns: 1fr; }
      .kr-zine-reader { border-right: none; border-bottom: 1px solid var(--line, #E4E2DB); padding: 16px; }
      .kr-spread { aspect-ratio: auto; grid-template-columns: 1fr; }
      .kr-spread::after { display: none; }
    }
  `;
  document.head.appendChild(style);

  /* -------------------------------------------------------------------------
     2. STUDIO DATA (REAL ARTISAN HOURS, PATINA PROFILES, CHAOS LOGS, ZINES)
  ------------------------------------------------------------------------- */
  const CURR = {
    USD: { sym: '$', rate: 1 },
    INR: { sym: '₹', rate: 84.5 },
    EUR: { sym: '€', rate: 0.92 },
    GBP: { sym: '£', rate: 0.79 }
  };

  function getCurrency() {
    const sel = document.getElementById('currencySelect');
    return (sel && CURR[sel.value]) ? sel.value : 'USD';
  }
  function fmtPrice(usd) {
    const code = getCurrency();
    const c = CURR[code];
    return `${c.sym}${Math.round(usd * c.rate).toLocaleString('en-US')} ${code}`;
  }

  const DESK_BY_TITLE = {
    'Crash Kantha Denim Trouser': {
      maker: 'Shuttle Loom Guild (Gujarat) + Kantha Cluster (West Bengal)',
      unit: 'Tailored at Gurgaon / Delhi Partner Unit (25 mins from studio)',
      totalHours: 54,
      breakdown: [
        ['Indigo Vat Dye', 8],
        ['Handloom Weave', 12],
        ['Crash Kantha', 28],
        ['Pattern & Sew', 6]
      ],
      notebookCode: 'NB-014 / CRASH TENSION TEST',
      notebookNotes: [
        'Warp: 14oz unbleached Kutch cotton',
        'Stitch spacing: irregular 4-7mm pull',
        'NOTE: wash once before knee cut — shrinks 3.5%'
      ],
      patina: {
        base: [29, 43, 58],
        aged: [84, 104, 122],
        stitchBase: [156, 72, 54],
        stitchAged: [192, 134, 108],
        notes: [
          'Yr 0: Crisp deep indigo vat tone; dense Kantha ridges stand stiff.',
          'Yr 1: Indigo crocks softly along pocket edges and knee creases.',
          'Yr 3: Handloom slubs surface as pale blue streaks; cloth drops fluidly.',
          'Yr 5: Full future-vintage fade — terraced stitch relief like an old quilt.'
        ]
      },
      chaos: 'Studio log (Oct 14): First trouser sample puckered 2 inches shorter on the left leg after rain delayed drying in Bengal. We adjusted stitch tension by hand and kept the slight wave along the outseam.'
    },
    'Brown Leather Atma Tote': {
      maker: 'Vegetable-Tan Saddlery Workshop (Kanpur / Delhi) + Deccan Godhadi Pocket',
      unit: 'Hand-waxed linen saddle stitch · Solid cast matte brass rivets',
      totalHours: 22,
      breakdown: [
        ['Bark Tanning', 6],
        ['Hide Cutting', 3],
        ['Saddle Stitch', 9],
        ['Godhadi Liner', 4]
      ],
      notebookCode: 'NB-124 / GUSSET LOAD SPEC',
      notebookNotes: [
        'Handle drop: 21cm rolled veg-tan tube',
        'Brass rivets: unlacquered — oxidizes dark',
        'Pocket: cut from leftover Godhadi vest scraps'
      ],
      patina: {
        base: [87, 54, 35],
        aged: [52, 28, 17],
        stitchBase: [201, 177, 146],
        stitchAged: [152, 122, 88],
        notes: [
          'Yr 0: Dry matte saddle brown with light chalky natural wax finish.',
          'Yr 1: Handles darken first from hand oils; brass rivets lose bright shine.',
          'Yr 3: Rich chestnut burnish across corners; leather relaxes without collapsing.',
          'Yr 5: Deep espresso patina; Godhadi inner pocket softens like flannel.'
        ]
      },
      chaos: 'Studio log (Sep 28): Tested carrying 4 hardcover architecture books plus a 13-inch MacBook through GK2 rain — switched from machine seam to 1.0mm hand-waxed linen thread on handle anchors.'
    },
    'Kantha Overcoat': {
      maker: 'West Bengal Vintage Quilt Curators + Lucknow Zardozi Artisans',
      unit: 'Cut & French-seamed at New Delhi Tailoring Unit',
      totalHours: 82,
      breakdown: [
        ['Quilt Sourcing', 10],
        ['Kantha Re-quilt', 46],
        ['Zardozi Collar', 14],
        ['Hand Tailoring', 12]
      ],
      notebookCode: 'NB-059 / RAGLAN DRAPE & QUILT MAP',
      notebookNotes: [
        'Every quilt panel has prior household darns — DO NOT cut out',
        'Collar tack: oxidized bullion wire (No. 008)',
        'Chai break tally during sampling: 14 cups'
      ],
      patina: {
        base: [40, 58, 78],
        aged: [78, 92, 108],
        stitchBase: [216, 207, 192],
        stitchAged: [228, 222, 210],
        notes: [
          'Yr 0: Structured vintage cotton quilt; crisp raw indigo and madder contrast.',
          'Yr 1: Shoulders mold to the wearer; interior cotton tape softens.',
          'Yr 3: Subtle feathering around cuff edges exposes buried quilt colors underneath.',
          'Yr 5: Heirloom softness — bring to 61 Orchard St or GK2 for free darning.'
        ]
      },
      chaos: 'Studio log (Jan 09, Paris): Got evicted from our apartment mid-casting with 100 models lined up, packed six of these coats into cab trunks, and finished collar hand-tacking at 2 AM before the showroom opened.'
    },
    'Indigo Check Shirt': {
      maker: 'Varanasi Pit-Loom Weavers + Kutch Rabari Stitchers',
      unit: 'Small-batch loom runs — made-to-order waitlist funds next dye lot',
      totalHours: 36,
      breakdown: [
        ['Warp Setting', 8],
        ['Pit-Loom Weave', 16],
        ['Rabari Cuff', 7],
        ['MOP Buttons', 5]
      ],
      notebookCode: 'NB-075 / ZARI CHECK COUNT',
      notebookNotes: [
        '24 indigo ends : 2 tested gold zari ends',
        'Mother-of-pearl buttons — slightly irregular hand-cut thickness',
        'Never tumble dry; hang in shade'
      ],
      patina: {
        base: [27, 42, 60],
        aged: [66, 86, 106],
        stitchBase: [199, 163, 91],
        stitchAged: [176, 146, 94],
        notes: [
          'Yr 0: Deep vat indigo with quiet metallic glint along check lines.',
          'Yr 1: Cotton breathes softer; collar folds take natural hand-pressed crease.',
          'Yr 3: Indigo lightens to dusty slate while gold zari mellows to warm antique brass.',
          'Yr 5: Paper-thin summer drape that outlasts any factory poplin.'
        ]
      },
      chaos: 'Studio log (Nov 02): Sold out of XS–L in 48 hours. Rather than rushing a power-loom knockoff, we opened the batch waitlist so the Varanasi weaver gets paid up front before setting the next warp.'
    }
  };

  const ZINE_SPREADS = [
    {
      num: '01 / 04',
      leftTitle: 'ISSUE 01 — SHIMLA BEAT & 1970s DELHI PSYCH',
      leftSub: 'A6 POCKET RESEARCH ZINE · 36 PAGES · RISOGRAPH + UNCOATED COTTON STOCK',
      leftBody: 'Before starting the first collection, we dug through dusty copies of Junior Statesman magazine — tracking Delhi college bands blending Fender amps with tabla and sitar in the 1970s.',
      rightStamp: 'ARCHIVAL INDEX · PAGE 02',
      rightList: [
        '• 14 scanned press clippings & gig flyers',
        '• Interview with 4th-gen Bagru Chhipa printer',
        '• Full natural dye recipe notes (iron + jaggery)',
        '• Liner notes & 45-min Delhi studio cassette tracklist'
      ]
    },
    {
      num: '02 / 04',
      leftTitle: 'BAGRU FIELDS OF COLOR (400 YEARS OF DABU)',
      leftSub: 'CHHIPA MOHALLA, 32 KM SW OF JAIPUR',
      leftBody: 'Clay mud, gum arabic, and lime mixed by hand to resist fermented indigo vats. Each length of cotton passes under 8 to 12 hand-carved sheesham blocks before drying under open sun.',
      rightStamp: 'DYE BATH RECIPE · PAGE 11',
      rightList: [
        '• Black outline: rusted horseshoes + jaggery',
        '• Red fill: madder root + alum mordant',
        '• Grey-olive: Kashish (ferrous sulphate) + pomegranate rind',
        '• Imperfection rule: block mis-registration stays'
      ]
    },
    {
      num: '03 / 04',
      leftTitle: '25 MINUTES FROM HOME — THE TAILORING UNIT',
      leftSub: 'TEA BREAKS, PATTERN CHALK & AFTERNOON CRICKET',
      leftBody: 'No conveyor belts. The workshop nearly shut down during the pandemic; today the same tailors cut every sample slowly, stopping at 4 PM for chai and a quick over outside the gate.',
      rightStamp: 'WORKSHOP NOTES · PAGE 22',
      rightList: [
        '• Average coat cutting time: 3.5 hrs (single-ply hand cut)',
        '• Every scrap > 8cm saved for cardholders & key fobs',
        '• Free lifetime darning at GK2 & 61 Orchard St'
      ]
    },
    {
      num: '04 / 04',
      leftTitle: 'SOUNDTRACK FOR THE SEWING TABLE',
      leftSub: 'COMMISSIONED & CURATED SOUTH ASIAN INDIE ROTATION',
      leftBody: 'Clothes carry the energy of the room they are made in. This issue ships with a printed QR-free tape insert listing the exact Delhi, Lahore, and London records spinning in our studio.',
      rightStamp: 'TAPE SIDE A / B · PAGE 35',
      rightList: [
        'A1. Lifafa — Jaago / Ghar Sessions',
        'A2. Peter Cat Recording Co. — Flowers R. Blooming',
        'B1. Jaubi — Nafs at Peace (Lahore)',
        'B2. Sarathy Korwar & Upaj Collective — Earth'
      ]
    }
  ];

  const ENTRY_OBJECTS = [
    {
      id: 'zine-01',
      title: 'Research Zine Issue 01: Delhi Psych & Craft',
      priceUSD: 24,
      tag: 'PRINT EDITION · 300 COPIES',
      colorA: '#EAE4D5',
      colorB: '#1E3246',
      note: 'A6 pocket-sized saddle-stitched zine (36pp uncoated paper). Archival photos, workshop essays, dye notes, and studio soundtrack liner notes.'
    },
    {
      id: 'scrap-cardholder',
      title: 'Offcut Kantha Cardholder (Zero-Waste)',
      priceUSD: 45,
      tag: 'TAILORING SCRAP · EACH UNIQUE',
      colorA: '#243547',
      colorB: '#C8BFA8',
      note: 'Cut exclusively from leftover overcoat Kantha panels too small for sleeves. Hand-bound cotton edge, stamped lot number inside.'
    },
    {
      id: 'bagru-bandana',
      title: 'Bagru Dabu Mud-Resist Bandana',
      priceUSD: 58,
      tag: 'CHHIPA MOHALLA · NATURAL DYE',
      colorA: '#7A2E22',
      colorB: '#E7DFCE',
      note: '55cm × 55cm coarse handspun cotton stamped with hand-carved teak blocks in natural madder and iron-jaggery black.'
    },
    {
      id: 'indigo-keyfob',
      title: 'Handloom Selvedge Indigo Key Fob',
      priceUSD: 34,
      tag: 'GUJARAT DENIM SCRAP + BRASS',
      colorA: '#1B2A3C',
      colorB: '#B89650',
      note: 'Heavy selvedge edge from our Crash Kantha trouser runs paired with an unlacquered solid brass ring that darkens with daily carry.'
    },
    {
      id: 'studio-tape',
      title: '61 Orchard / GK2 Studio Mix Cassette',
      priceUSD: 18,
      tag: 'ANALOG AUDIO · LIMITED 150',
      colorA: '#2B2A27',
      colorB: '#D8CFC0',
      note: '45-minute C45 tape pairing field recordings from Bagru and Varanasi looms with indie South Asian studio selections.'
    }
  ];

  const CONTACT_FRAMES = [
    { num: '01A', img: './frame1.png', loc: 'BAGRU, RAJASTHAN', caption: 'Sheesham block dipped in iron-jaggery black. Third hit misaligned by 2mm — kept it in the final yardage.', bg: '#2B2620' },
    { num: '02A', img: './frame2.png', loc: 'NEW DELHI ROOFTOP', caption: 'Freshly dipped indigo denim drying above the tailoring unit before a surprise evening dust storm.', bg: '#1E2C3B' },
    { num: '03A', img: './frame3.png', loc: 'GURGAON WORKSHOP · 4:15 PM', caption: 'Two steel glasses of adrak chai next to tailor chalk and an Aari adda embroidery frame.', bg: '#3A2E26' },
    { num: '04A', img: './frame4.png', loc: '61 ORCHARD ST, NYC', caption: 'Front-door portrait #42: regular stopped by just to hang out and listen to the new studio mix.', bg: '#32302B' },
    { num: '05A', img: './frame5.png', loc: 'PARIS APARTMENT · 11:40 PM', caption: 'Boxes stacked after getting kicked out of the first casting flat. Fitting racks moved into the hallway.', bg: '#262428' },
    { num: '06A', img: './frame6.png', loc: 'WEST BENGAL CLUSTER', caption: '48 hours of hand running-stitch on one overcoat back panel. Zero electric machines touched the cloth.', bg: '#2A332D' }
  ];

  const LOOKBOOK_STILLS = [
    { num: 'REEL 01', img: './lookbook1.png', title: 'Grandma’s Courtyard Cricket', score: 'Peter Cat Recording Co.' },
    { num: 'REEL 02', img: './lookbook2.png', title: 'Jaipur Dusk — Indigo Zari Check', score: 'Lifafa (New Delhi)' },
    { num: 'REEL 03', img: './lookbook3.png', title: 'Paris Room — Kantha Overcoat', score: 'Jaubi (Lahore)' },
    { num: 'REEL 04', img: './lookbook4.png', title: 'Afternoon Lane — Shisha & Atma Tote', score: 'Begum (New Delhi / Goa)' },
    { num: 'REEL 05', img: './lookbook5.png', title: 'Monsoon Dye Vat — Vat Indigo', score: 'Sarathy Korwar & Upaj Collective' },
    { num: 'REEL 06', img: './lookbook6.png', title: '61 Orchard St — Closing Time Chai', score: 'Studio Tape Side B' }
  ];

  const SOUND_ROSTER = [
    { artist: 'Lifafa (Suryakant Sawhney)', city: 'New Delhi', fit: 'Craft Mini-Docs & Monsoon Films', ref: 'Jaago / Ghar: Sounds of Raw Mango — warm harmonium + moody electronics built for slow textile cinema.' },
    { artist: 'Peter Cat Recording Co.', city: 'New Delhi', fit: 'Street Campaigns & Hangout Reels', ref: 'BETA / Flowers R. Blooming — nostalgic horns and live Delhi warmth that refuses sterile luxury pretension.' },
    { artist: 'Jaubi', city: 'Lahore', fit: 'Paris Runway & Pitti Presentations', ref: 'Nafs at Peace / A Sound Heart — sarangi and tabla colliding with modal jazz and raw hip-hop percussion.' },
    { artist: 'Begum', city: 'New Delhi / Goa', fit: '35mm Contact Sheet Shorts', ref: 'Bagh / Anarkali Lacha — dreamy lo-fi tape fuzz that pairs naturally with hand-shot 8mm/16mm workshop clips.' },
    { artist: 'Sarathy Korwar & Upaj Collective', city: 'London / India', fit: 'Long-Form Artisan Portraits', ref: 'My East Is Your West — deeply grounded Indo-jazz percussion honoring lineage without sounding like a museum.' }
  ];

  /* -------------------------------------------------------------------------
     3. MANUAL 3-STEM WORKSHOP WEB AUDIO ENGINE (STRICTLY NEVER AUTO-PLAY)
  ------------------------------------------------------------------------- */
  const StudioSound = {
    ctx: null,
    stems: { loom: false, block: false, air: false },
    timers: {},
    airNode: null,
    airGain: null,

    ensureCtx() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!this.ctx) this.ctx = new AC();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    },

    pulseNoise(freq, q, dur, vol) {
      const ctx = this.ctx;
      if (!ctx) return;
      const now = ctx.currentTime;
      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.24));
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;

      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = freq;
      f.Q.value = q;

      const g = ctx.createGain();
      g.gain.value = vol;

      src.connect(f);
      f.connect(g);
      g.connect(ctx.destination);
      src.start(now);
    },

    toggle(name) {
      if (document.body.classList.contains('plain-mode')) return false;
      this.stems[name] = !this.stems[name];

      if (this.stems[name]) {
        if (!this.ensureCtx()) { this.stems[name] = false; return false; }

        if (name === 'loom') {
          const loop = () => {
            if (!this.stems.loom) return;
            // Wooden shuttle clack + double beater rhythm with human timing jitter
            this.pulseNoise(310 + Math.random() * 90, 2.2, 0.065, 0.14);
            setTimeout(() => {
              if (this.stems.loom) this.pulseNoise(580 + Math.random() * 140, 3.0, 0.035, 0.07);
            }, 220 + Math.random() * 35);
            this.timers.loom = setTimeout(loop, 880 + (Math.random() - 0.5) * 90);
          };
          loop();
        } else if (name === 'block') {
          const loop = () => {
            if (!this.stems.block) return;
            // Damp sheesham wooden block stamp + craftsman palm slap
            this.pulseNoise(150 + Math.random() * 35, 1.4, 0.09, 0.18);
            setTimeout(() => {
              if (this.stems.block) this.pulseNoise(210 + Math.random() * 40, 1.8, 0.06, 0.11);
            }, 145);
            this.timers.block = setTimeout(loop, 1320 + (Math.random() - 0.5) * 180);
          };
          loop();
        } else if (name === 'air') {
          // Soft warm room tone (brown-filtered)
          const ctx = this.ctx;
          const len = ctx.sampleRate * 2;
          const buf = ctx.createBuffer(1, len, ctx.sampleRate);
          const d = buf.getChannelData(0);
          let last = 0;
          for (let i = 0; i < len; i++) {
            const w = Math.random() * 2 - 1;
            d[i] = (last + 0.02 * w) / 1.02;
            last = d[i];
            d[i] *= 2.2;
          }
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.loop = true;

          const lp = ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.value = 260;

          const g = ctx.createGain();
          g.gain.setValueAtTime(0.001, ctx.currentTime);
          g.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.6);

          src.connect(lp);
          lp.connect(g);
          g.connect(ctx.destination);
          src.start();
          this.airNode = src;
          this.airGain = g;
        }
      } else {
        this.stopStem(name);
      }
      return this.stems[name];
    },

    stopStem(name) {
      this.stems[name] = false;
      if (this.timers[name]) { clearTimeout(this.timers[name]); this.timers[name] = null; }
      if (name === 'air' && this.airNode) {
        try { this.airNode.stop(); } catch (_) {}
        this.airNode = null;
      }
    },

    stopAll() {
      ['loom', 'block', 'air'].forEach(n => this.stopStem(n));
      document.querySelectorAll('.kr-stem-btn').forEach(b => b.classList.remove('active'));
    }
  };

  /* -------------------------------------------------------------------------
     4. PROCEDURAL SCANNED ARTISAN NOTEBOOK CANVAS (ZERO BROKEN IMAGES)
  ------------------------------------------------------------------------- */
  function drawNotebookScan(canvas, meta) {
    const W = 720, H = 400;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Warm uncoated archival paper
    ctx.fillStyle = '#F4F0E6';
    ctx.fillRect(0, 0, W, H);

    // Center spine crease shadow
    const sp = ctx.createLinearGradient(W / 2 - 18, 0, W / 2 + 18, 0);
    sp.addColorStop(0, 'rgba(20,20,19,0)');
    sp.addColorStop(0.5, 'rgba(20,20,19,0.12)');
    sp.addColorStop(1, 'rgba(20,20,19,0)');
    ctx.fillStyle = sp;
    ctx.fillRect(W / 2 - 18, 0, 36, H);

    // Left Page: Graph-paper stitch diagram
    ctx.strokeStyle = 'rgba(88, 114, 134, 0.22)';
    ctx.lineWidth = 1;
    for (let x = 24; x < W / 2 - 16; x += 16) {
      ctx.beginPath(); ctx.moveTo(x, 24); ctx.lineTo(x, H - 24); ctx.stroke();
    }
    for (let y = 24; y < H - 24; y += 16) {
      ctx.beginPath(); ctx.moveTo(24, y); ctx.lineTo(W / 2 - 16, y); ctx.stroke();
    }

    // Hand-drawn geometric Kasuti / Kantha stitch grid in indigo & madder ink
    ctx.strokeStyle = '#1E3246';
    ctx.lineWidth = 2;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 6; c++) {
        const cx = 64 + c * 48;
        const cy = 96 + r * 48;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 16); ctx.lineTo(cx + 16, cy);
        ctx.lineTo(cx, cy + 16); ctx.lineTo(cx - 16, cy);
        ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.strokeStyle = '#7A2E22';
    ctx.setLineDash([7, 5]);
    for (let y = 64; y <= 330; y += 32) {
      ctx.beginPath(); ctx.moveTo(36, y); ctx.lineTo(328, y + (y % 64 === 0 ? 4 : -3)); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Pencil header on left page
    ctx.fillStyle = '#2B2A27';
    ctx.font = '11px Menlo, monospace';
    ctx.fillText(meta.notebookCode, 32, 44);

    // Right Page: Faint chai cup ring stain
    ctx.strokeStyle = 'rgba(136, 92, 52, 0.16)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(W - 86, H - 82, 46, 0, Math.PI * 2);
    ctx.stroke();

    // Taped cloth swatch scrap on right page
    const sx = W / 2 + 34, sy = 54, sw = 152, sh = 118;
    const p = meta.patina.base;
    ctx.fillStyle = `rgb(${p[0]},${p[1]},${p[2]})`;
    ctx.fillRect(sx, sy, sw, sh);
    // Running stitches inside taped swatch
    ctx.strokeStyle = `rgb(${meta.patina.stitchBase.join(',')})`;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([6, 5]);
    for (let y = sy + 12; y < sy + sh - 8; y += 14) {
      ctx.beginPath(); ctx.moveTo(sx + 6, y); ctx.lineTo(sx + sw - 6, y); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Masking tape strips holding swatch down
    ctx.fillStyle = 'rgba(226, 212, 174, 0.78)';
    ctx.save();
    ctx.translate(sx + 10, sy + 2); ctx.rotate(-0.28);
    ctx.fillRect(-18, -8, 42, 16);
    ctx.restore();
    ctx.save();
    ctx.translate(sx + sw - 12, sy + sh - 4); ctx.rotate(-0.22);
    ctx.fillRect(-22, -8, 46, 16);
    ctx.restore();

    // Hand-written studio notes on right page
    ctx.fillStyle = '#141413';
    ctx.font = '12px Menlo, monospace';
    ctx.fillText('WORKSHOP BENCH NOTES:', W / 2 + 34, 212);
    ctx.font = '11.5px Helvetica, Arial, sans-serif';
    ctx.fillStyle = '#33312D';
    meta.notebookNotes.forEach((line, i) => {
      ctx.fillText('— ' + line, W / 2 + 34, 238 + i * 24);
    });
    ctx.fillStyle = '#6E6C66';
    ctx.font = '10px Menlo, monospace';
    ctx.fillText(`TOTAL HANDWORK: ${meta.totalHours} HRS  ·  CLICK TO ENLARGE`, W / 2 + 34, H - 28);
  }

  /* -------------------------------------------------------------------------
     5. INJECT OPEN STUDIO DESK INTO EXISTING PDP (SYNCED VIA MUTATIONOBSERVER)
  ------------------------------------------------------------------------- */
  function injectPDPStudioDesk() {
    const pdpInfo = document.querySelector('#view-pdp .pdp-info');
    const titleEl = document.getElementById('pdpTitle');
    if (!pdpInfo || !titleEl) return;

    const desk = document.createElement('div');
    desk.id = 'krStudioDeskPanel';
    desk.className = 'kr-desk-wrap';
    // Insert right after waitlistBox (immediately next to Buy / Waitlist button)
    const waitlistEl = document.getElementById('waitlistBox');
    if (waitlistEl && waitlistEl.parentNode === pdpInfo) {
      waitlistEl.insertAdjacentElement('afterend', desk);
    } else {
      pdpInfo.appendChild(desk);
    }

    // Lightbox for full-size scanned notebook inspection
    const lb = document.createElement('div');
    lb.className = 'kr-lightbox';
    lb.innerHTML = `
      <div class="kr-lightbox-inner">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="mono-label" id="krLbTitle" style="color:#141413;">SCANNED STUDIO NOTEBOOK</span>
          <button class="util-btn" id="krLbClose">Close &times;</button>
        </div>
        <canvas id="krLbCanvas" style="width:100%;height:auto;border:1px solid #CFC9BC;"></canvas>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
          <span class="mono-label">Drop a real phone scan of your own notebook page to replace:</span>
          <input type="file" id="krLbUpload" accept="image/*" style="font-size:11px;" />
        </div>
      </div>
    `;
    document.body.appendChild(lb);
    document.getElementById('krLbClose').onclick = () => lb.classList.remove('open');
    lb.onclick = (e) => { if (e.target === lb) lb.classList.remove('open'); };

    let uploadedNotebookImg = null;
    document.getElementById('krLbUpload').onchange = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const img = new Image();
      img.onload = () => {
        uploadedNotebookImg = img;
        renderDeskForCurrentProduct();
        const lbc = document.getElementById('krLbCanvas');
        lbc.width = img.naturalWidth; lbc.height = img.naturalHeight;
        lbc.getContext('2d').drawImage(img, 0, 0);
      };
      img.src = URL.createObjectURL(f);
    };

    function renderDeskForCurrentProduct() {
      const title = (titleEl.textContent || '').trim();
      const meta = DESK_BY_TITLE[title] || DESK_BY_TITLE['Crash Kantha Denim Trouser'];

      const maxH = Math.max(...meta.breakdown.map(b => b[1]));
      const barsHtml = meta.breakdown.map(([step, hrs]) => `
        <div class="kr-hour-row">
          <span>${step}</span>
          <div class="kr-bar-track"><div class="kr-bar-fill" style="width:${Math.round((hrs / maxH) * 100)}%;"></div></div>
          <span style="text-align:right;">${hrs} HRS</span>
        </div>
      `).join('');

      desk.innerHTML = `
        <div class="kr-stamp-row">
          <span class="mono-label" style="color:var(--ink);">Open Studio Desk · Proof of Hands</span>
          <span class="kr-stamp">${meta.totalHours} HOURS BY HAND</span>
        </div>

        <div class="kr-hours-bars">
          <div style="font-size:12px;font-weight:500;margin-bottom:2px;">${meta.maker}</div>
          <div class="mono-label" style="margin-bottom:8px;">${meta.unit}</div>
          ${barsHtml}
        </div>

        <div class="kr-notebook-card">
          <div class="kr-stamp-row">
            <span class="mono-label">${meta.notebookCode}</span>
            <span class="mono-label">Click to inspect scan</span>
          </div>
          <canvas class="kr-notebook-canvas" id="krInlineNotebook"></canvas>
        </div>

        <div class="kr-patina-box">
          <div class="kr-stamp-row">
            <span class="mono-label" style="color:var(--ink);">Natural Dye Aging Log (Year 0 &rarr; Year 5)</span>
            <span class="mono-label" id="krPatinaYrLabel">YEAR 0 (NEW)</span>
          </div>
          <div class="kr-patina-strip">
            <div class="kr-patina-swatch" id="krPatinaSwatch"><div class="kr-patina-grain"></div></div>
            <div>
              <input type="range" id="krPatinaSlider" min="0" max="5" step="1" value="0" style="width:100%;" />
              <div id="krPatinaNote" style="font-size:11.5px;color:#2B2A27;margin-top:6px;"></div>
            </div>
          </div>
        </div>

        <div class="kr-chaos-note">
          <div class="mono-label" style="color:var(--madder);margin-bottom:4px;">Unedited Studio Friction Log</div>
          ${meta.chaos}
        </div>
      `;

      // Render scanned notebook canvas
      const nbCanvas = document.getElementById('krInlineNotebook');
      if (uploadedNotebookImg) {
        nbCanvas.width = 720; nbCanvas.height = 400;
        nbCanvas.getContext('2d').drawImage(uploadedNotebookImg, 0, 0, 720, 400);
      } else {
        drawNotebookScan(nbCanvas, meta);
      }
      nbCanvas.onclick = () => {
        document.getElementById('krLbTitle').textContent = `${meta.notebookCode} — ${title.toUpperCase()}`;
        const lbc = document.getElementById('krLbCanvas');
        if (uploadedNotebookImg) {
          lbc.width = uploadedNotebookImg.naturalWidth;
          lbc.height = uploadedNotebookImg.naturalHeight;
          lbc.getContext('2d').drawImage(uploadedNotebookImg, 0, 0);
        } else {
          drawNotebookScan(lbc, meta);
        }
        lb.classList.add('open');
      };

      // Wire Year 0 -> Year 5 natural dye patina slider
      const slider = document.getElementById('krPatinaSlider');
      const swBox = document.getElementById('krPatinaSwatch');
      const yrLbl = document.getElementById('krPatinaYrLabel');
      const noteEl = document.getElementById('krPatinaNote');

      const updatePatina = (yr) => {
        const t = yr / 5;
        const lerp = (a, b) => Math.round(a + (b - a) * t);
        const rgb = [0, 1, 2].map(i => lerp(meta.patina.base[i], meta.patina.aged[i]));
        const st  = [0, 1, 2].map(i => lerp(meta.patina.stitchBase[i], meta.patina.stitchAged[i]));
        swBox.style.background = `rgb(${rgb.join(',')})`;
        swBox.style.boxShadow = `inset 0 0 0 2px rgb(${rgb.join(',')})`;
        swBox.style.borderBottom = `6px dashed rgb(${st.join(',')})`;
        yrLbl.textContent = yr === 0 ? 'YEAR 0 (NEW)' : `YEAR ${yr} (LIVED-IN)`;
        const noteIdx = yr === 0 ? 0 : yr <= 2 ? 1 : yr <= 4 ? 2 : 3;
        noteEl.textContent = meta.patina.notes[noteIdx];
      };
      slider.oninput = (e) => updatePatina(parseInt(e.target.value, 10));
      updatePatina(0);
    }

    // Watch #pdpTitle so switching garments automatically updates maker hours, notebook & patina
    new MutationObserver(renderDeskForCurrentProduct).observe(titleEl, {
      childList: true, characterData: true, subtree: true
    });
    renderDeskForCurrentProduct();
  }

  /* -------------------------------------------------------------------------
     6. INJECT 3-STEM WORKSHOP SOUND BAR ON FABRIC LIBRARY (NEVER AUTO-PLAY)
  ------------------------------------------------------------------------- */
  function injectWorkshopSoundBar() {
    const libView = document.getElementById('view-library');
    if (!libView) return;

    const bar = document.createElement('div');
    bar.className = 'kr-sound-deck';
    bar.innerHTML = `
      <span class="mono-label" style="color:var(--ink);">Optional Studio Acoustics (Never Auto-Play):</span>
      <button class="kr-stem-btn" data-stem="loom">01 Pit Loom Shuttle</button>
      <button class="kr-stem-btn" data-stem="block">02 Bagru Wood Block</button>
      <button class="kr-stem-btn" data-stem="air">03 Delhi Atelier Air</button>
      <button class="kr-stem-btn" id="krMuteAllStems" style="margin-left:auto;">Mute All</button>
    `;
    libView.insertBefore(bar, libView.children[1] || null);

    bar.querySelectorAll('[data-stem]').forEach(btn => {
      btn.onclick = () => {
        const active = StudioSound.toggle(btn.dataset.stem);
        btn.classList.toggle('active', active);
      };
    });
    document.getElementById('krMuteAllStems').onclick = () => StudioSound.stopAll();

    // Respect existing Plain Mode button
    const plainBtn = document.getElementById('plainModeBtn');
    if (plainBtn) {
      plainBtn.addEventListener('click', () => {
        setTimeout(() => {
          if (document.body.classList.contains('plain-mode')) StudioSound.stopAll();
        }, 0);
      });
    }
  }

  /* -------------------------------------------------------------------------
     7. NEW VIEWS: ZINES & SCRAP OBJECTS + RAW DESK / 35mm CONTACT SHEET
  ------------------------------------------------------------------------- */
  function injectExtraViews() {
    const navLeft = document.querySelector('.nav-left');
    const footer = document.querySelector('.site-footer');
    if (!navLeft || !footer) return;

    // Add 2 clean navigation tabs
    const addNavTab = (viewId, label) => {
      const b = document.createElement('button');
      b.className = 'nav-btn';
      b.dataset.view = viewId;
      b.textContent = label;
      b.onclick = () => {
        // Trigger 'archive' first so index.html's internal WebGLMgr.dispose() cleans up any active GPU context
        const archBtn = document.querySelector('.nav-btn[data-view="archive"]');
        if (archBtn) archBtn.click();
        document.querySelectorAll('.nav-btn').forEach(x => x.classList.toggle('active', x.dataset.view === viewId));
        document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + viewId));
      };
      navLeft.appendChild(b);
    };

    addNavTab('desk-objects', 'Zines & Scraps');
    addNavTab('chaos-log', 'Raw Desk');

    /* --- VIEW A: ZINES & SCRAP-FABRIC COLLECTOR OBJECTS --- */
    const zineSection = document.createElement('section');
    zineSection.id = 'view-desk-objects';
    zineSection.className = 'view';

    let spreadIdx = 0;
    const parcel = [];

    function renderZineView() {
      const sp = ZINE_SPREADS[spreadIdx];
      zineSection.innerHTML = `
        <div class="rule-bar">
          <span class="mono-label">ENTRY COLLECTOR LAYER (${fmtPrice(18)} &ndash; ${fmtPrice(58)}) &mdash; RESEARCH ZINES &amp; TAILORING SCRAPS</span>
          <span class="mono-label">ZERO DISCOUNTING ON CORE CLOTHES · BUILT FOR THE 95% WHO LOVE THE CRAFT</span>
        </div>

        <div class="kr-zine-layout">
          <div class="kr-zine-reader">
            <div class="kr-spread">
              <div class="kr-page">
                <div>
                  <div class="mono-label">${sp.leftSub}</div>
                  <h2 style="margin:8px 0 10px;font-size:15px;font-weight:600;letter-spacing:0.03em;">${sp.leftTitle}</h2>
                  <p style="margin:0;font-size:12px;line-height:1.55;color:#2B2A27;">${sp.leftBody}</p>
                </div>
                <div class="mono-label">MONOLITH / KR ARCHIVE PRINT · UNCOATED 110GSM</div>
              </div>
              <div class="kr-page" style="background:#F2EEE4;">
                <div>
                  <div class="kr-stamp" style="display:inline-block;margin-bottom:10px;">${sp.rightStamp}</div>
                  <div style="display:flex;flex-direction:column;gap:8px;font-family:var(--mono);font-size:11px;line-height:1.5;">
                    ${sp.rightList.map(line => `<div>${line}</div>`).join('')}
                  </div>
                </div>
                <div class="mono-label" style="text-align:right;">SPREAD ${sp.num}</div>
              </div>
            </div>

            <div style="display:flex;gap:10px;align-items:center;">
              <button class="util-btn" style="border-color:#141413;" id="krPrevSpread">&larr; Prev Spread</button>
              <span class="mono-label" style="color:#141413;">Flip A6 Zine (${sp.num})</span>
              <button class="util-btn" style="border-color:#141413;" id="krNextSpread">Next Spread &rarr;</button>
            </div>
          </div>

          <aside style="padding:24px;display:flex;flex-direction:column;gap:14px;background:#FFFFFF;">
            <span class="mono-label">WHY PRINT ZINES &amp; OFF-CUTS?</span>
            <h2 style="margin:0;font-size:17px;font-weight:500;text-transform:uppercase;">Own the Research, Not a Cheapened Logo Tee</h2>
            <p class="pdp-desc">
              A 19-year-old student studying our craft shouldn't be locked out just because a hand-quilted overcoat costs ${fmtPrice(1150)}. Every scrap larger than 8cm from our Delhi cutting table becomes a numbered cardholder or key fob, and every season's archival research ships as a tactile pocket zine.
            </p>
            <div class="spec-section">
              <span class="mono-label">Collector Parcel (${parcel.length} Reserved)</span>
              <div id="krParcelList" style="margin-top:8px;font-size:12px;display:flex;flex-direction:column;gap:6px;">
                ${parcel.length ? parcel.map(p => `<div style="display:flex;justify-content:space-between;"><span>${p.title}</span><span class="mono-label">${fmtPrice(p.priceUSD)}</span></div>`).join('') : '<span class="mono-label">Select any zine or scrap object below to add to your studio parcel.</span>'}
              </div>
            </div>
          </aside>
        </div>

        <div class="kr-objects-grid">
          ${ENTRY_OBJECTS.map(obj => `
            <article class="kr-obj-card">
              <div class="kr-obj-plate" style="background:linear-gradient(135deg, ${obj.colorA} 62%, ${obj.colorB} 62%);padding:12px;display:flex;flex-direction:column;justify-content:space-between;">
                <span class="kr-stamp" style="align-self:flex-start;">${obj.tag}</span>
                <span class="mono-label" style="background:#FFFFFF;padding:2px 5px;align-self:flex-end;color:#141413;">${fmtPrice(obj.priceUSD)}</span>
              </div>
              <div style="font-size:13px;font-weight:500;text-transform:uppercase;">${obj.title}</div>
              <p style="margin:0;font-size:12px;color:#2B2A27;flex:1;">${obj.note}</p>
              <button class="secondary-cta" data-reserve-obj="${obj.id}">Add to Parcel — ${fmtPrice(obj.priceUSD)}</button>
            </article>
          `).join('')}
        </div>
      `;

      document.getElementById('krPrevSpread').onclick = () => {
        spreadIdx = (spreadIdx - 1 + ZINE_SPREADS.length) % ZINE_SPREADS.length;
        renderZineView();
      };
      document.getElementById('krNextSpread').onclick = () => {
        spreadIdx = (spreadIdx + 1) % ZINE_SPREADS.length;
        renderZineView();
      };
      zineSection.querySelectorAll('[data-reserve-obj]').forEach(btn => {
        btn.onclick = () => {
          const item = ENTRY_OBJECTS.find(x => x.id === btn.dataset.reserveObj);
          if (item) { parcel.push(item); renderZineView(); }
        };
      });
    }

    /* --- VIEW B: RAW DESK / 35mm CONTACT SHEET & MUSIC ROSTER --- */
    const rawSection = document.createElement('section');
    rawSection.id = 'view-chaos-log';
    rawSection.className = 'view';
    rawSection.innerHTML = `
      <div class="rule-bar">
        <span class="mono-label">RAW STUDIO CONTACT SHEET &mdash; DO NOT HIDE THE CHAOS</span>
        <span class="mono-label">35MM KODAK PORTRA 400 · BAGRU / NEW DELHI / 61 ORCHARD ST / PARIS</span>
      </div>

      <div class="kr-contact-sheet">
        <div class="kr-sprockets">
          <span>&#9634; PORTRA 400 &#9634; KR-ROLL-19 &#9634;</span>
          <span>&#9634; NO RETOUCHING &#9634;</span>
          <span>&#9634; 01A &ndash; 06A &#9634;</span>
        </div>
        <div class="kr-frames-grid">
          ${CONTACT_FRAMES.map(f => `
  <div class="kr-film-frame">
    <div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:#B8B2A6;">
      <span>FRAME ${f.num}</span>
      <span>${f.loc}</span>
    </div>
    <img src="${f.img}" alt="${f.loc}" style="width:100%;aspect-ratio:3/2;object-fit:cover;display:block;border:1px solid #35332E;background:${f.bg};" onerror="this.style.opacity='0.25'" />
    <div style="font-family:var(--sans);font-size:12px;line-height:1.45;color:#F6F5F1;">
      ${f.caption}
    </div>
  </div>
`).join('')}

        </div>
      </div>

      <div class="rule-bar">
        <span class="mono-label">LOOKBOOK FILM &amp; FLAGSHIP SOUND ROSTER &mdash; INDIE SOUTH ASIAN MUSICIANS</span>
        <span class="mono-label">COMMISSIONED SCORES REPLACE GENERIC LUXURY STOCK MUSIC</span>
      </div>

      <div class="kr-music-grid">
        ${SOUND_ROSTER.map(m => `
          <div class="kr-music-card">
            <span class="mono-label">${m.city} · ${m.fit}</span>
            <h3 style="margin:2px 0;font-size:14px;font-weight:600;text-transform:uppercase;">${m.artist}</h3>
            <p style="margin:0;font-size:12px;color:#2B2A27;">${m.ref}</p>
          </div>
        `).join('')}
      </div>
    `;

    footer.parentNode.insertBefore(zineSection, footer);
    footer.parentNode.insertBefore(rawSection, footer);
    renderZineView();

    // Keep Zine & Scrap prices synced with the main header Currency Switcher
    const currSel = document.getElementById('currencySelect');
    if (currSel) currSel.addEventListener('change', renderZineView);
  }

  /* -------------------------------------------------------------------------
     8. BOOT AFTER DOM IS READY
  ------------------------------------------------------------------------- */
  function boot() {
    injectPDPStudioDesk();
    injectWorkshopSoundBar();
    injectExtraViews();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();