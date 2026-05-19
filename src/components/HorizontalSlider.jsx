import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Maximize, RefreshCw } from 'lucide-react';
import mtgripContent from '../data/mtgrip_content.json';

const ICONS = {
  vibration: Activity,
  lock: Shield,
  universal: Maximize,
  rotation: RefreshCw,
};

/* ── Single feature card — content animates based on active state ── */
const FeatureCard = ({ pillar, index, total, isActive }) => {
  const Icon = ICONS[pillar.id] ?? Activity;

  return (
    <div
      className="w-screen h-full flex items-center justify-center px-6 md:px-16 lg:px-24 shrink-0"
      style={{ scrollSnapAlign: 'start' }}
    >
      <motion.div
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center"
        animate={{
          opacity: isActive ? 1 : 0.32,
          y: isActive ? 0 : 14,
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
      >

        {/* Left: icon tile + metadata */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-5 md:gap-6">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-3xl bg-white border border-card-border shadow-sm flex items-center justify-center shrink-0">
            <Icon size={36} className="text-mtgrip" strokeWidth={1.25} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-hud text-silver/45 tracking-[0.25em]">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            {pillar.stage_annotation && (
              <div className="text-hud text-silver/35 leading-relaxed hidden md:block mt-2">
                <div className="text-mtgrip/50">{pillar.stage_annotation.serial}</div>
                <div>TOL: {pillar.stage_annotation.tolerance}</div>
                <div className="mt-1 text-silver/25">{pillar.stage_annotation.coords}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right: title, description, spec chips */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h2
            className="font-black text-charcoal uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            {pillar.title}
          </h2>

          <p className="text-silver font-light leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
            {pillar.description}
          </p>

          {pillar.back_content?.details && (
            <p className="text-silver/70 font-light text-sm leading-relaxed hidden md:block max-w-lg">
              {pillar.back_content.details}
            </p>
          )}

          {/* Blueprint spec chips */}
          <div className="flex flex-wrap gap-2 mt-1">
            {Object.entries(pillar.blueprint).map(([key, val]) => (
              <span
                key={key}
                className={key === 'status' ? 'spec-chip spec-chip-accent' : 'spec-chip'}
              >
                {key.toUpperCase()}: {val}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};

/* ── Horizontal Slider — native touch scroll, non-blocking ── */
const HorizontalSlider = () => {
  const { specs } = mtgripContent;
  const pillars = specs.pillars;
  const N = pillars.length;

  const scrollRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRef = useRef(null);

  /* Derive active card index from native horizontal scroll position */
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setActiveCard(Math.min(N - 1, Math.max(0, Math.round(scrollLeft / clientWidth))));
  }, [N]);

  /* Jump to card by programmatic scroll */
  const scrollToCard = useCallback((index) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * scrollRef.current.clientWidth,
      behavior: 'smooth',
    });
  }, []);

  /* Auto-play: advance one card every 2.8 s */
  useEffect(() => {
    if (isPlaying) {
      playRef.current = setInterval(() => {
        setActiveCard(prev => {
          const next = prev + 1;
          if (next >= N) { setIsPlaying(false); return prev; }
          scrollToCard(next);
          return next;
        });
      }, 2800);
    } else {
      clearInterval(playRef.current);
    }
    return () => clearInterval(playRef.current);
  }, [isPlaying, scrollToCard, N]);

  return (
    <motion.section
      className="relative w-full h-screen flex flex-col bg-[#F5F5F7]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* Section label */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <span className="text-hud text-silver/50 tracking-[0.45em]">// SİSTEM ÖZELLİKLERİ</span>
      </div>

      {/* ── Native horizontal scroll strip ──
          • overflow-x: scroll   → touch-swipeable, does NOT block vertical page scroll
          • scroll-snap-type     → snaps cleanly to card boundaries
          • overscrollBehaviorX  → prevents scroll chaining at left/right edges only  */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 flex overflow-x-scroll hide-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
        }}
      >
        {pillars.map((pillar, i) => (
          <FeatureCard
            key={pillar.id}
            pillar={pillar}
            index={i}
            total={N}
            isActive={activeCard === i}
          />
        ))}
      </div>

      {/* ── Bottom navigation ── */}
      <div className="flex flex-col items-center gap-3 pb-8 pt-3">

        {/* Apple-style progress bar */}
        <div className="w-40 h-[3px] bg-silver/15 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-mtgrip rounded-full origin-left"
            animate={{ scaleX: (activeCard + 1) / N }}
            style={{ width: '100%', willChange: 'transform' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          />
        </div>

        {/* Pill dots + separator + play/pause */}
        <div className="flex items-center gap-3">
          {pillars.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Kart ${i + 1}`}
              className="transition-all duration-300 rounded-full focus:outline-none"
              style={{
                width:      activeCard === i ? '20px' : '6px',
                height:     '6px',
                background: activeCard === i ? '#FFB800' : 'rgba(134,134,139,0.35)',
              }}
            />
          ))}

          <span className="inline-block w-px h-4 bg-silver/20 mx-1" />

          <button
            onClick={() => setIsPlaying(p => !p)}
            aria-label={isPlaying ? 'Duraklat' : 'Oynat'}
            className="w-6 h-6 flex items-center justify-center text-silver/45 hover:text-charcoal transition-colors duration-200 focus:outline-none"
          >
            {isPlaying ? (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <rect x="0" y="0" width="3.5" height="12" rx="1" />
                <rect x="6.5" y="0" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <path d="M0 0L10 6L0 12Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Side rail (desktop only) */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-20">
        {pillars.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: '3px',
              height: activeCard === i ? '24px' : '10px',
              background: activeCard === i ? '#FFB800' : 'rgba(134,134,139,0.25)',
            }}
          />
        ))}
      </div>

    </motion.section>
  );
};

export default HorizontalSlider;
