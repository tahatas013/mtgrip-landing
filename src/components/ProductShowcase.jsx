import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import mtgripContent from '../data/mtgrip_content.json';

const TOTAL = 4;

const springEase = (t) => 1 - Math.pow(1 - t, 5);

/* ── Per-stage scroll-driven scene ── */
const Stage = ({ pillar, index, scrollYProgress }) => {
  const start     = index / TOTAL;
  const end       = (index + 1) / TOTAL;
  const entryEnd  = start + 0.07;
  const exitStart = end - 0.06;

  const opacity    = useTransform(scrollYProgress, [start, entryEnd, exitStart, end], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [start, entryEnd], [0.60, 1], { ease: springEase });
  const titleY     = useTransform(scrollYProgress, [start, entryEnd], ['4rem', '0rem'], { ease: springEase });
  const descOpacity = useTransform(scrollYProgress, [start + 0.04, entryEnd + 0.05], [0, 1], { ease: springEase });
  const descY       = useTransform(scrollYProgress, [start + 0.04, entryEnd + 0.07], ['2rem', '0rem'], { ease: springEase });

  const ann = pillar.stage_annotation;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      {/* Corner HUD */}
      <div className="absolute top-6 left-6 text-hud text-silver/38 leading-relaxed">
        <div className="text-mtgrip/52">{ann.serial}</div>
        <div>{ann.coords}</div>
      </div>
      <div className="absolute top-6 right-6 text-hud text-silver/38 text-right leading-relaxed">
        <div>TOL: {ann.tolerance}</div>
        <div>SYS.{pillar.id.toUpperCase().slice(0, 3)}</div>
      </div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-hud text-silver/28">
        {String(index + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </div>
      <div className="absolute bottom-6 left-6 text-hud text-silver/28">
        MTGRIP SYSTEMS  //  STAGE {String(index + 2).padStart(2, '0')}
      </div>

      {/* Massive watermark title — z-0, behind product image */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden z-0"
        style={{ scale: titleScale, y: titleY }}
      >
        <span
          className="text-gradient-industrial font-black uppercase select-none whitespace-nowrap leading-none tracking-tighter"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 16rem)', fontWeight: 900, opacity: 0.10 }}
        >
          {pillar.title}
        </span>
      </motion.div>

      {/* Readable content — bottom quarter, z-10 */}
      <motion.div
        className="absolute bottom-[11%] left-0 right-0 flex flex-col items-center gap-2 px-8 z-10"
        style={{ opacity: descOpacity, y: descY }}
      >
        <span className="text-hud text-silver/50 tracking-[0.28em]">
          SYS.{pillar.id.toUpperCase().slice(0, 3)} — {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className="font-black text-charcoal uppercase text-center tracking-tight leading-tight"
          style={{ fontSize: 'clamp(1.4rem, 3.8vw, 3.2rem)' }}
        >
          {pillar.title}
        </h3>
        <p className="text-silver font-light text-center max-w-sm text-sm md:text-base leading-relaxed mt-0.5">
          {pillar.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ── ProductShowcase section ── */
const ProductShowcase = () => {
  const { specs } = mtgripContent;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const imgRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const imgScale    = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.72, 1, 1, 0.82]);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]">

        {/* Stage ambient light */}
        <div className="absolute inset-0 stage-light" />

        {/* All stages */}
        {specs.pillars.map((pillar, i) => (
          <Stage key={pillar.id} pillar={pillar} index={i} scrollYProgress={scrollYProgress} />
        ))}

        {/* Product image — z-20, rotates with scroll */}
        <motion.div
          className="relative z-20 w-[200px] h-[200px] md:w-[300px] md:h-[300px] pointer-events-none"
          style={{ rotate: imgRotation, scale: imgScale }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          >
            <img
              src="/assets/images/hero-mount.png"
              alt="MTGrip"
              className="w-full h-full object-contain ambient-shadow product-blend"
            />
          </motion.div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-mtgrip/10 blur-2xl rounded-full" />
        </motion.div>

      </div>
    </section>
  );
};

export default ProductShowcase;
