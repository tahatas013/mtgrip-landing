import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import mtgripContent from '../data/mtgrip_content.json';

const CORNER_CLASS = {
  tl: 'top-6 left-6',
  tr: 'top-6 right-6 text-right',
  bl: 'bottom-8 left-6',
  br: 'bottom-8 right-6 text-right',
};

const springEase = (t) => 1 - Math.pow(1 - t, 5);

/* ── Logo: MT charcoal / GRIP yellow, extra-light, wide tracked ── */
const MTGripLogo = () => (
  <div
    className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none"
    style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: 200,
      fontSize: '11px',
      letterSpacing: '0.58em',
      textTransform: 'uppercase',
      lineHeight: 1,
    }}
  >
    <span style={{ color: '#1D1D1F' }}>MT</span>
    <span style={{ color: '#FFB800' }}>GRIP</span>
  </div>
);

const Hero = () => {
  const { hero, meta } = mtgripContent;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ── YOLA: z-10, slides LEFT ── */
  const leftX = useTransform(scrollYProgress, [0, 0.62], ['0vw', '-85vw'], { ease: springEase });
  /* ── HÜKMEDİN: z-10, slides RIGHT ── */
  const rightX = useTransform(scrollYProgress, [0, 0.62], ['0vw', '85vw'], { ease: springEase });
  /* ── Both fade as curtains part ── */
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.48, 0.76], [1, 0.80, 0]);

  /* ── Product: starts tiny behind curtains, emerges ── */
  const imgScale   = useTransform(scrollYProgress, [0, 0.62], [0.48, 1.18], { ease: springEase });
  const imgOpacity = useTransform(scrollYProgress, [0, 0.28], [0.12, 1]);
  const imgY       = useTransform(scrollYProgress, [0, 0.62], ['8%', '-6%'], { ease: springEase });

  /* ── CTA fades in after curtains part ── */
  const ctaOpacity = useTransform(scrollYProgress, [0.40, 0.72], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.40, 0.72], ['2rem', '0rem'], { ease: springEase });

  const DISPLAY_SIZE = 'clamp(4.5rem, 13vw, 18rem)';

  return (
    <section ref={containerRef} className="relative w-full h-[220vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Subtle stage light */}
        <div className="absolute inset-0 stage-light" />

        {/* Technical corner HUD */}
        {meta?.hero_annotations?.map((ann) => (
          <div
            key={ann.corner}
            className={`absolute z-50 text-hud text-silver/38 pointer-events-none ${CORNER_CLASS[ann.corner]}`}
          >
            {ann.lines.map((line, i) => (
              <div key={i} className={i === 0 ? 'text-mtgrip/48' : ''}>{line}</div>
            ))}
          </div>
        ))}

        {/* Logo */}
        <MTGripLogo />

        {/* ── Curtain container: vertically centered column, words split horizontally ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none overflow-hidden"
          style={{ opacity: curtainOpacity }}
        >
          {/* YOLA → slides LEFT */}
          <motion.div className="w-full flex justify-end pr-[3vw]" style={{ x: leftX }}>
            <span
              className="text-gradient-industrial font-black uppercase select-none whitespace-nowrap leading-none tracking-tighter"
              style={{ fontSize: DISPLAY_SIZE, fontWeight: 900, display: 'block' }}
            >
              {hero.headline_left}
            </span>
          </motion.div>

          {/* Fixed gap between the two words */}
          <div style={{ height: 'clamp(0.5rem, 1.5vw, 2rem)', flexShrink: 0 }} />

          {/* HÜKMEDİN → slides RIGHT, separate z-layer via isolation */}
          <motion.div className="w-full flex justify-start pl-[3vw]" style={{ x: rightX, isolation: 'isolate' }}>
            <span
              className="text-gradient-industrial font-black uppercase select-none whitespace-nowrap leading-none tracking-tighter"
              style={{ fontSize: DISPLAY_SIZE, fontWeight: 900, display: 'block' }}
            >
              {hero.headline_right}
            </span>
          </motion.div>
        </motion.div>

        {/* ── Product: z-20, above both curtains, emerges from center ── */}
        <motion.div
          className="absolute z-20 w-[240px] h-[240px] md:w-[380px] md:h-[380px] pointer-events-none"
          style={{ scale: imgScale, opacity: imgOpacity, y: imgY }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          >
            <img
              src="/assets/images/hero-mount.png"
              alt="MTGrip Pro"
              className="w-full h-full object-contain ambient-shadow product-blend"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-4 bg-mtgrip/12 blur-3xl rounded-full" />
          </motion.div>
        </motion.div>

        {/* ── CTA — z-30, above product ── */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 z-30 px-6"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <p className="text-silver text-sm md:text-base text-center max-w-xs leading-relaxed font-light">
            {hero.subheadline}
          </p>
          <button className="px-9 py-3.5 bg-charcoal text-white text-xs font-semibold rounded-full uppercase tracking-[0.25em] hover:bg-charcoal-light active:scale-95 transition-all duration-200 cursor-pointer">
            {hero.ctaText}
          </button>
          <div className="w-px h-10 bg-gradient-to-b from-silver/25 to-transparent mt-1" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
