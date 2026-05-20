import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Waves, Settings } from 'lucide-react';

const trinity = [
  {
    icon: Waves,
    title: 'Titreşim Sönümleyici',
    desc: '4 yastıklı elastomer sistem ile yüksek frekanslı sarsıntıları %98.5 filtreler.',
  },
  {
    icon: ShieldCheck,
    title: 'Güvenli Kilit',
    desc: 'Tek elle, 0.3 saniyede kilitlenen çift aşamalı mekanizma. 15G darbe dayanımı.',
  },
  {
    icon: Settings,
    title: 'Evrensel Uyum',
    desc: '22mm–32mm gidon ve ayna montajı. Tüm motosiklet, bisiklet ve scooter\'lara uyumlu.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  return (
    <>
      {/* ═══════════ HERO — Full-screen video ═══════════ */}
      <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-charcoal">

        {/* Background video — auto, muted, loop */}
        <video
          className="absolute inset-0 w-full h-full object-contain bg-[#e0e0e0] p-4 md:p-6"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/mtgrip-mt050.png"
        >
          <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 video-overlay" />

        {/* Content — bottom-aligned for thumb reach on mobile */}
        <div className="relative z-10 h-full flex flex-col justify-end items-center text-center pb-12 md:pb-20 px-6">
          
          {/* Logo */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <span className="text-2xl md:text-3xl font-extrabold tracking-[0.25em] uppercase select-none">
              <span className="text-white">MT</span>
              <span className="text-mtgrip">GRIP</span>
            </span>
          </div>

          {/* Headline */}
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-tight tracking-tight max-w-3xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Sarsıntısız Sürüş,{' '}
            <span className="text-mtgrip">Maksimum Güven.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-white/70 text-base md:text-lg font-light max-w-md mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Havacılık sınıfı alüminyum gövde ve 3-eksenli titreşim sönümleme sistemi.
          </motion.p>

          {/* CTA */}
          <motion.button
            className="px-10 py-4 bg-mtgrip text-charcoal font-bold text-sm md:text-base rounded-full uppercase tracking-[0.2em] cta-glow hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Hemen İncele
          </motion.button>
        </div>
      </section>

      {/* ═══════════ TRINITY — 3 Benefit Panel ═══════════ */}
      <section className="relative w-full bg-white border-b border-card-border">
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {trinity.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8E1] border border-mtgrip/20 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-mtgrip" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-silver text-sm font-light leading-relaxed max-w-[260px]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
