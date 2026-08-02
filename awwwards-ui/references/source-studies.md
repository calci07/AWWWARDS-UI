# Source studies

Use these studies as evidence for principles, not as instructions to imitate a site's recognizable expression. Observations were made on 2026-07-19. "Observed" means visible in the rendered page, public document, or exposed implementation; "inference" is labeled. Access limitations are part of the record.

## Contents

- [Research method](#research-method)
- [Trend and discovery sources](#trend-and-discovery-sources)
- [Health, product, and SaaS references](#health-product-and-saas-references)
- [Shopify Editions](#shopify-editions)
- [Studios, platforms, and cultural references](#studios-platforms-and-cultural-references)
- [Awwwards hand-picked references](#awwwards-hand-picked-references)
- [Cross-source conclusions](#cross-source-conclusions)
- [Patterns to avoid copying](#patterns-to-avoid-copying)

## Research method

- Inspect desktop and phone compositions where the site renders reliably.
- Inspect hierarchy, typography, palette, media, interaction, conversion path, and implementation signals.
- Record touch/mobile translation and production risks, not only visual novelty.
- Distinguish visual observation from inference based on assets, DOM, CSS, or corroborating first-party material.
- Treat subscription gates, protected DOMs, blocking loaders, and automation timeouts as access limitations rather than filling gaps from memory.
- Re-check live sources when a current implementation detail materially affects a build; these are dated studies, not permanent facts.

## Trend and discovery sources

### Top 2026 Web Design Trends video

Source: [YouTube](https://www.youtube.com/watch?v=DQOCFw_23FI&list=LL&index=21&t=15s)

- **Observed:** Codex Community video titled "Top 2026 Web Design Trends," duration 13:25. Player metadata exposed modular grids and 3D chapters; the description emphasizes hand-crafted interaction even in an AI-heavy period.
- **Metadata/description-derived theme list:** modular design, playful interfaces, 3D, gradients, hand-drawn illustration, brutalism, gamification, Gen-Z/anti-design, minimalism, variable fonts, 2D/3D mixing, and deliberate hybridization. Treat this as a directional synthesis, not a frame-by-frame observation or independently sourced transcript.
- **Useful principle:** treat trends as ingredients. Select only those that make the subject clearer or more ownable.
- **Access limit:** controlled playback returned black frames, so metadata and a textual recap were used; cinematography and frame-by-frame examples were not claimed as directly observed.

### Awwwards websites directory

Source: [Awwwards websites](https://www.awwwards.com/websites/)

- **Observed:** the directory reported more than 10,000 winning/listed sites and exposed detail pages plus badges such as SOTD, HM, DEV, and AH. Current examples included Glitch&Grit, Izanami, Hiroto Sato, House of Honey, PP Neue Montreal, Bucks Sauce, and many unrelated genres.
- **Taxonomy lesson:** a useful corpus must be searchable by genre, composition, media, typography, interaction, and mobile behavior. Award badge alone is not a creative brief.
- **Evaluation lesson:** Awwwards detail pages frame quality across design, usability, creativity, and content; the skill must optimize the whole experience rather than visual spectacle alone.
- **Effect evidence:** public detail pages expose concrete element labels such as image reveal on hover, bottom navigation, minigames, sculptural navigation, gestures, and transitions.
- **Catalog treatment:** `data/inspiration-index.jsonl` holds broad listing metadata; this file keeps only deep analysis. Do not load hundreds of catalog rows into context when a bounded query will do.

### Mobbin popular sites

Source: [Mobbin popular sites](https://mobbin.com/discover/sites/popular)

- **Observed taxonomy:** categories included Portfolio, Lifestyle, Finance, Shopping, and Social; section types included Social Proof, Hero, How It Works, FAQ, 404, Footer, Blog, Pricing, About, and Stats; styles included Photography, Motion, Minimal, Illustration, and Colorful.
- **Observed visible examples:** Mercury, Ramp, Origin, and Superpower appeared in the accessible popular grid.
- **Shell and hierarchy:** black editorial discovery shell, compact filtering, underlined latest/popular state, taxonomy-first navigation, and a dense thumbnail grid.
- **Access limit:** a PRO banner stated that full access extends beyond the four latest sites. Do not claim exhaustive Mobbin coverage from this account/session.
- **Reusable principle:** tag references by the section or design decision they solve, not merely by industry.

### Mobbin iOS latest

Source: [Mobbin iOS latest](https://mobbin.com/discover/apps/ios/latest)

- **Observed categories:** Finance, Health & Fitness, Food & Drink, AI, and Education.
- **Observed screens/elements:** Dashboard, Home, Login, Welcome, Subscription/Paywall; Card, Button, Progress Indicator, Bottom Sheet, and Text Field.
- **Observed flows:** account creation, chat, onboarding, login, and tutorials. Visible apps included Notion, Strava, Oportun, Wabi, Life Reset, ElevenLabs, Too Good To Go, and Cleo AI.
- **Reusable principle:** recent app design favors focused tasks, explicit state/progress, large primary actions, and secondary decisions in sheets rather than crowded screens.

### Mobbin iOS popular

Source: [Mobbin iOS popular](https://mobbin.com/discover/apps/ios/popular)

- **Observed categories:** Food & Drink, Finance, AI, Business, and Lifestyle.
- **Observed screens/elements:** Signup, Welcome, Dashboard, Filter & Sort, Login; Text Field, Stacked List, Card, Tab Bar, and Banner.
- **Observed flows/apps:** subscription, chat, profile editing, tutorial, onboarding; Revolut, Airbnb, Duolingo, Coinbase, Wise, Headspace, Spotify, and Cash App.
- **Reusable principle:** combine one dominant value/state with a compact action row, predictable lists, and contextual sheets. Persistent tab bars belong to multi-destination products, not every marketing page.

### Mobbin iOS top

Source: [Mobbin iOS top](https://mobbin.com/discover/apps/ios/top)

- **Observed categories:** AI, Health & Fitness, Business, Finance, and Shopping.
- **Observed screens/elements:** Login, Home, Profile, Filter & Sort, Subscription; Card, Banner, Progress, Bottom Sheet, and Text Field.
- **Observed apps:** Family, Duolingo, GO Club, one year, Luma, Tiimo, Open, and Abode.
- **Reusable principle:** highly rated screens often give one task generous vertical room, keep progress visible, and place the next action near the thumb. Transfer that clarity to mobile websites without cloning native chrome.

## Health, product, and SaaS references

### Superpower

Source: [Superpower](https://superpower.com/)

- **Direction:** premium consumer-health cinema: warm amber video, dark vignette, simple white type, and rounded conversion controls.
- **Hierarchy:** offer -> outcomes -> doctor credibility -> workflow -> sticky product story -> value comparison -> experts -> member proof -> pricing -> final action.
- **Interaction/media:** full-bleed hero video, sticky state changes, carousels, profiles, and overlays. The inspected page exposed roughly 186 images, 11 videos, and 83 SVGs, so restraint and lifecycle control are essential.
- **Mobile:** compact logo/CTA/menu, portrait hero crop, and bottom-anchored copy preserve the cinematic idea. Consent/promotion overlays competed for the first viewport.
- **Lesson:** lead with felt outcome, then alternate human trust, clinical proof, product mechanics, and price. Decode only current/adjacent media and provide static reduced-motion states.

### Seed

Source: [Seed](https://seed.com/)

- **Direction:** soft clinical naturalism: botanical green, diffuse daylight, clean supplement imagery, and calm scientific labels.
- **Hierarchy:** personalized promise -> product shelf -> bundle -> capsule science -> microbiome education -> transformation proof -> editorial stories -> sustainability -> action.
- **Conversion:** a quiz supports uncertain visitors while direct shopping serves high intent; science and proof reduce objections before the late CTA.
- **Mobile/access limit:** promotion and cookie layers prevented a clean full-phone audit, though the semantic order remained readable.
- **Lesson:** pair clinical evidence with warm material/photographic cues. Acquisition overlays must never simultaneously hide the proposition and primary action.

### Biograph

Source: [Biograph](https://www.biograph.com/)

- **Direction:** ultra-premium medical hospitality: black, warm architecture, gallery spacing, restrained typography, and selective scientific color.
- **Hierarchy:** architectural promise -> metrics -> three-step method -> risk visualization -> disease chapter -> assessment catalog -> locations -> membership -> continuity -> join.
- **Interaction/media:** looping biological films, canvas/data visuals, and "tap and hold" states. The inspected route exposed roughly 119 images, nine videos, and three canvases.
- **Mobile:** portrait architectural crop above proposition and action; compact wordmark, Join button, and menu.
- **Lesson:** atmosphere can establish trust before diagnostics, but all medical meaning must survive without canvas. Give hold gestures explicit keyboard/touch alternatives and cap media/DPR.

### Tines

Source: [Tines](https://www.tines.com/)

- **Direction:** editorial SaaS rather than generic dashboard: violet graph paper, huge serif statements, neutral UI sans, colorful diagrams, and product screens treated as illustration.
- **Hierarchy:** proposition/dual CTA -> logo proof -> product constellation -> editorial resources -> ratings/cases -> platform -> use cases -> integrations -> final action.
- **Interaction/media:** moving logo rail, rising panels, looping card media, and short hover feedback. The central storyboard is the signature object.
- **Mobile:** centered serif hero, compact action/navigation bar, clipped marquee, and intentionally overlapping product panels.
- **Lesson:** establish a recognizable graphic system and authentic product evidence. Keep grids CSS-based, contain collage overflow, pause marquees/media, and preserve two distinct conversion intents.

## Shopify Editions

### Winter 2026 - Renaissance

Source: [Shopify Editions Winter 2026](https://www.shopify.com/editions/winter2026)

- **Direction:** surreal Renaissance collage with contemporary objects, black architectural prelude, fine rules, Roman numerals, and an old/new typographic contrast.
- **Architecture:** immersive world plus persistent framed directory -> twelve category chapters -> themed product-update articles and deep links.
- **Motion:** multi-second reveal and layered depth. Inspection produced extended black transitional frames.
- **Mobile:** vertically re-art-directed collage, framed title, category index, compact Shopify header and CTA/menu.
- **Lesson:** a historical/world-building metaphor can organize a large catalog. Make entry skippable, semantic categories immediate, and a static composition available for reduced motion/low power.

### Spring 2026 - Everywhere

Source: [Shopify Editions Spring 2026](https://www.shopify.com/editions/spring2026)

- **Direction:** multicolor point-field environment with a word orbiting in perspective over a landscape-like scene.
- **Architecture:** immersive gateway and compact two-column directory -> Agentic, Sidekick, Online, Retail, Marketing, Operations, Shop, Payments, Finance, and Developer chapters.
- **Motion:** continuous spatial point/text movement with transitional cropped type before stable navigation.
- **Mobile:** portrait particle field retains the spatial word while the promise and categories settle into a usable directory.
- **Lesson:** if WebGL is concept-critical, keep DOM text/navigation independent, cap DPR, pause when hidden, and ship a static fallback. LCP and deep links must not wait for the scene.

### Summer 2025 - Horizons

Source: [Shopify Editions Summer 2025](https://www.shopify.com/editions/summer2025)

- **Direction:** vaporwave destination world: star field, palms, violet-pink sky, reflective water, chrome script, and condensed poster typography.
- **Architecture:** cinematic hero -> theme platform -> theme carousel -> Sidekick, retail, checkout, global, marketing, Shop, B2B, shipping, operations, and developer chapters.
- **Mobile:** vertical environment, palms framing the wordmark, feature lines at the waterline, CTA/menu header.
- **Lesson:** bake expensive bloom/atmosphere into media where possible; stop ambient loops offscreen. An optional game may deepen the world but cannot replace the release catalog.

### Summer 2024 - Unified

Source: [Shopify Editions Summer 2024](https://www.shopify.com/editions/summer2024)

- **Direction:** black-and-white gallery with monumental cropped type and glossy knowledge orbs containing products, code, people, and UI.
- **Architecture:** hero -> curated Top 10 path -> exhaustive categorized index -> modular articles. The short/full navigation serves different attention budgets.
- **Motion:** orbital depth, floating media, and scroll-to-explore framing.
- **Mobile access limit:** the responsive capture remained black during the entry transition, while semantic content remained exposed.
- **Lesson:** preserve an ordinary index beside spatial spectacle, bypass long entries, and use static orb frames for reduced motion.

### Winter 2024 - Foundations

Source: [Shopify Editions Winter 2024](https://www.shopify.com/editions/winter2024)

- **Direction:** icy-lavender product museum with monumental thin type, architectural plinths, chrome glyphs, floating panels, and speaker media.
- **Architecture:** staged hero carousel -> Conversion, Channels, Marketing, Operations, and Developer chapters -> feature articles.
- **Mobile:** title and description lead; speaker card and progress rail become the central vertical composition.
- **Lesson:** CSS perspective and pre-rendered cards can carry much of the spatial idea without WebGL. Convert desktop stages to vertical/scroll-snap scenes rather than scaling absolute coordinates.

### Winter 2023 - Built to Last

Source: [Shopify Editions Winter 2023](https://www.shopify.com/editions/winter2023)

- **Direction:** black editorial field, high-contrast Didone title, warm archive banner, and a large illustrated cutaway building.
- **Architecture:** title/system map -> nine chapter selectors -> category narratives/media -> product map.
- **Mobile:** title/copy stack, tall cropped cutaway, and prominent grid menu.
- **Lesson:** one narrative illustration can be both mnemonic and information architecture. Keep a semantic chapter list and lazy-load detail instead of making image coordinates the only navigation.

### Summer 2022 - Connect to Consumer / B2B

Source: [Shopify Editions Summer 2022 B2B](https://www.shopify.com/editions/summer2022#b2b)

- **Direction:** ultra-condensed white type on black, iridescent tunnel film, circular badge, numbered chapters, and a Dev Mode route.
- **Observed B2B content:** wholesale pricing/net terms, theme/discount customization, shared or dedicated storefronts, Shopify Plus positioning, and product/blog routes.
- **Access limit:** the supplied anchor loaded but the animated introduction did not visually honor the deep-link position; B2B content was verified in the semantic document.
- **Mobile:** three-line reflowed title, prominent badge/menu, full-width tunnel media, and one-column explanation.
- **Lesson:** re-run hash positioning after hydration, preserve `scroll-margin-top`, and never let an intro override a deep link.

## Studios, platforms, and cultural references

### Parker

Source: [Parker](https://heyparker.ai/)

- **Direction:** retro office-machine world: beige CRT, paper surfaces, black outlines, red serif mark, and a subject-specific product metaphor.
- **Architecture:** long sticky narrative from problem through research/chat/growth, comparison, pricing, and testimonials.
- **Mobile:** dedicated portrait CRT asset, smaller type, collapsed navigation, same central metaphor.
- **Risk:** roughly 25,000 px, multiple sticky regions, sequence imagery, video, and duplicated breakpoint content increase restoration, focus, and motion costs.
- **Lesson:** let one brand object change state across chapters, but keep semantic text over posters and render the final state immediately for reduced motion.

### Contra Labs

Source: [Contra Labs](https://contralabs.com/)

- **Direction:** quiet institutional editorial frame around experimental creative-AI evidence; warm off-white, charcoal, sage, restrained serif accent.
- **Architecture:** proposition -> partners -> evaluation products -> expertise -> research -> trust.
- **Media:** six canvases, three videos, and twenty images were exposed; generative media acts as evidence rather than decoration.
- **Mobile:** portrait media and smaller headline, but all canvases remained present.
- **Risk/lesson:** the intro blocked bounded inspection and semantic landmarks were weak. Pair every canvas with DOM explanation/poster, lazy-mount individually, and never let a splash hide ready content.

### Basement

Source: [Basement](https://basement.studio/)

- **Direction:** abrasive monochrome studio identity: fixed utility navigation, blunt large type, client proof, sticky work, procedural wireframe environment.
- **Mobile:** simplified Menu control, smaller headline, portrait wireframe stage preserving the motif.
- **Interaction:** optional music, full-screen overlays, and canvas environments.
- **Risk:** desktop canvas appeared empty while mobile rendered, showing why a poster and conventional content are required. Audio starts only by request; overlays need focus/escape discipline.

### Cofounder

Source: [Cofounder](https://cofounder.co/)

- **Direction:** friendly pixel-art world makes a broad AI-company platform approachable; sky/landscape palette with dark translucent product signals.
- **Architecture:** world hero -> platform -> education -> specialized agents -> tools -> industries -> repeated conversion.
- **Mobile:** recomposed landscape, retained CTAs, collapsed menu.
- **Risk:** visible horizontal overflow at 390 px plus a large image/SVG inventory and very long page.
- **Lesson:** embed authentic product state inside one coherent world, but prefer art-directed responsive raster over continuous rendering and enforce 320-430 px overflow tests.

### FOLLOW.ART

Source: [FOLLOW.ART](https://follow.art/)

- **Direction:** saturated orange cultural poster, oversized cream condensed wordmark, small star glyph, and intentional type cropping.
- **Architecture:** one practice/one card -> method -> testimonials -> centralization -> benefits -> card -> discovery/support.
- **Mobile:** aggressive wordmark crop preserves the poster idea rather than shrinking it.
- **Access limit:** the visual page rendered but its inspectable DOM reported `about:blank`; downstream motion, semantics, and counts were not asserted.
- **Lesson:** a small glyph can introduce a composition, but keep the intro brief and build cropped wordmarks as real responsive text.

### Zipline

Source: [Zipline](https://www.zipline.com/)

- **Direction:** cinematic consumer optimism: landscape footage, oversized condensed statements, clear three-step mechanism, lifestyle cases, impact, and delivery action.
- **Media/mobile:** dedicated portrait video preserves the action and scale; compact navigation. The desktop route remained on a loader during bounded inspection.
- **Positive accessibility signals:** skip link, semantic main, labeled menu, and useful image alternatives were present.
- **Risk/lesson:** immediate posters, offscreen pausing, device-specific media, and consent UI composed with the phone viewport are essential on a very long video-led page.

### MANA yerba mate

Source: [MANA yerba mate](https://en.manayerbamate.com/)

- **Direction:** playful beverage/packaging world on cream with coral, yellow, green, navy, bold type, illustrated and 3D product imagery.
- **Architecture:** bio-energy intro -> flavors/products -> ingredients -> recommendations -> social content.
- **Implementation observation:** 102 images, 31 SVGs, an iframe, no canvas/video. A frame sequence is a reasonable inference, not a direct claim.
- **Risk:** the fixed intro hid content during bounded capture; many images/buttons lacked useful alternatives/labels.
- **Lesson:** preload only a sparse sequence, fetch later frames near intent, use fewer phone frames, and keep a static first frame plus labeled controls.

## Awwwards hand-picked references

### Floema

Source: [Floema](https://www.floema.com/en)

- **Direction:** warm off-white, charcoal, restrained orange, architectural typography, and nature/urban photography.
- **Architecture:** centered fragment hero -> five full-viewport collection chapters -> editorial grids and product cards.
- **Motion:** pinned panels with a vertical photo wipe and crossfading labels; exposed implementation included many images/SVGs and three canvases.
- **Mobile:** compact header, retained fragment composition, single vertical collection content.
- **Lesson:** scroll states must read as chapters. Shorten pins on phones, lazy-decode media, pause canvases, and provide a normal stacked reduced-motion version.

### House of Honey

Source: [House of Honey](https://www.houseofhoney.com/)

- **Direction:** fashion-editorial maximalism: blush, oxblood, hot pink, cream, saturated interiors, block sans, editorial serif, and calligraphic gesture.
- **Architecture:** tab-like fixed header -> masthead over photography -> manifesto -> project grid/coordinates -> oversized script layer.
- **Interaction:** bee cursor, progress line, scale/rotation/parallax, marquees, intro mask, and intercepted smooth scroll.
- **Mobile:** symbol/menu, reflowed wordmark, portrait photography, one-column work.
- **Lesson:** let expressive type and imagery carry identity. Disable pointer-only behavior on touch/reduced motion and preserve native-scroll fallback.

### PP Neue Montreal

Source: [PP Neue Montreal](https://neuemontreal.com/)

- **Direction:** type specimen as a 1960s Montreal travel guide: coral grain, cream/black, archive footage and ephemera.
- **Architecture:** fine-rule editorial grids, capsule navigation, oversized type, small archival images, sticky story and comparisons.
- **Motion:** loader, postcard rotations, pinned video, scroll-linked font-weight label, Text-versus-Display glyph moments.
- **Mobile:** central section nav removed while identity/purchase remain; media and name re-authored vertically.
- **Lesson:** when typography is the product, variation settings and comparison become useful interaction. Use poster frames and static final-state specimens for reduced motion.

### Bucks Sauce

Source: [Bucks Sauce](https://buckssauce.com/)

- **Direction:** outlaw BBQ/woodcut culture: dark brown, cream, mustard, orange/red, antlers, skull mascot, fruit cutouts, distressed custom type.
- **Architecture:** bottle/fruit slider hero -> pinned ingredient accordion -> product stage -> curved type -> horizontal story.
- **Mobile:** centered bottle/mascot, large thumb arrows, persistent product/cart/menu actions.
- **Implementation observation:** many images/SVGs and seven canvases; third-party coverage identifies stop-motion, GSAP, and interactive fruit.
- **Lesson:** product folklore can unify typography, objects, and interaction. Consolidate canvases, pause inactive scenes, and keep commerce actions outside animated layers.

### JoyRush

Source: [JoyRush](https://drinkjoyrush.com/)

- **Direction:** saturated late-1970s leisure editorial: tangerine, pink, lemon green, violet, cream, retro display type, and script identity.
- **Architecture:** ticker/header -> full-bleed lifestyle hero -> centered proposition/CTAs -> cream product carousels.
- **Motion:** marquees, carousel controls, likely staggered type, fixed quick actions; a delayed discount modal blocked scrolling.
- **Mobile:** portrait crop keeps product and CTA central.
- **Lesson:** maintain overflow discipline, delay interruption until meaningful engagement, reserve media dimensions, and limit third-party/duplicated assets.

### Izanami

Source: [Izanami](https://izanami-official.com/)

- **Observed system:** near-black/warm-white spiritual luxury, Latin/Japanese type mix, fixed wordmark/language/menu, philosophy/projects/school/craft/retreat/company structure, sticky chapters, and large cloud textures.
- **Inference:** slow cinematic cloud movement and quiet transitions are suggested by canvases/assets but were not visually verified.
- **Access limit:** the preloader remained at zero and the main visual experience never appeared; mobile could not be observed directly.
- **Lesson:** never gate semantic content on GPU success. Provide timeout/skip, static hero, device-tiered textures, and immediate reduced-motion output.

### Glitch&Grit

Source: [Glitch&Grit](https://glitchandgrit.com/)

- **Direction:** dark cinematic reel with full-screen footage, enormous cyan project titles, and tiny edge labels.
- **Architecture:** fixed edge navigation/identity around a changing project stage.
- **Motion:** cream loader grid -> three vertical media panels -> scroll-driven title fade, footage shift/crossfade, and project advance.
- **Mobile:** preserves three narrow panels and corner navigation rather than using a generic hamburger.
- **Risk/lesson:** the page exposed 26 videos plus GSAP/ScrollTrigger/Flip/Text/ScrollTo, Lenis, and Swiper. Decode current/adjacent media only; show a still list for reduced data/motion.

### Hiroto Sato

Source: [Hiroto Sato](https://www.hirotos.com/)

- **Observed:** cycling glitch loader, fixed canvas/experience/navigation/transition layers, custom pointer preview, and semantic Home/Projects/About/Contact plus a Signal Pole region.
- **Corroborated direction:** the official About material describes motion, WebGL, 3D modeling, and tactile interfaces.
- **Inference:** a black industrial/urban signal-object world is strongly suggested, but the final scene did not render during inspection.
- **Access limit:** loader continued beyond thirteen seconds; mobile final state was not verified.
- **Lesson:** strict loader timeout, poster/static fallback, device-tiered rendering, compressed assets, paused offscreen work, and conventional DOM navigation are mandatory.

## Cross-source conclusions

1. **Subject-derived metaphor beats trend collage.** The memorable systems are inseparable from their subjects: a CRT assistant, a type specimen/travel archive, a cutaway platform building, BBQ folklore, signal hardware, or a living product world.
2. **Scroll works best as a state machine.** Each viewport communicates one chapter or change. Long scrub sequences without semantic states create confusion and restoration problems.
3. **Mobile quality is recomposition.** Strong references keep the metaphor, but change crop, order, navigation density, interaction, and often the asset itself.
4. **One expressive type voice plus one utility voice is usually enough.** Identity comes from scale, rhythm, crop, and context more than many fashionable font families.
5. **Spectacle needs an ordinary layer.** Semantic directories, content, actions, deep links, and static posters must exist independently of loaders, media, smooth scrolling, canvas, or WebGL.
6. **Media is the recurring production debt.** Cinematic sites repeatedly exposed dozens of images/videos/canvases, blocking loaders, overflow, offscreen work, and overlay collisions.
7. **App-like mobile means focused action.** Use safe areas, task-oriented grouping, progress, sheets, and thumb reach when useful; do not put a tab bar on a brand story merely to resemble an app.
8. **Conversion and originality can coexist.** Expressive hero -> compact taxonomy -> product/proof chapters -> contextual links -> decisive action is a recurring successful structure.

## Patterns to avoid copying

- Do not reproduce a source's exact wordmark crop, color palette, page order, hero composition, illustration, copy, transition timing, or signature object.
- Do not turn the catalog into "make it like site X." Retrieve several references for different principles and synthesize a subject-derived system.
- Do not infer that heavy Canvas/WebGL, Lenis, loaders, custom cursors, audio, or autoplay caused award recognition. Several inspected implementations exposed clear usability and performance failures.
- Do not use screenshots or generated imitations as production assets unless rights and identity are clear.
- Attribute source-derived observations in audits. In builds, translate the principle and disclose remaining inspiration risk when resemblance becomes too close.
