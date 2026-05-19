import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Maximize, RefreshCw, X, ChevronDown } from 'lucide-react';
import mtgripContent from '../data/mtgrip_content.json';

const getIconForPillar = (id, size = 24) => {
  const cls = `text-mtgrip`;
  switch (id) {
    case 'vibration': return <Activity size={size} className={cls} strokeWidth={1.5} />;
    case 'lock':      return <Shield   size={size} className={cls} strokeWidth={1.5} />;
    case 'universal': return <Maximize size={size} className={cls} strokeWidth={1.5} />;
    case 'rotation':  return <RefreshCw size={size} className={cls} strokeWidth={1.5} />;
    default:          return <Activity size={size} className={cls} strokeWidth={1.5} />;
  }
};

const BENTO_SPAN = ['col-span-1 lg:col-span-2', 'col-span-1', 'col-span-1', 'col-span-1 lg:col-span-2'];

const ProductSpecs = () => {
  const { specs } = mtgripContent;
  const [selectedId, setSelectedId] = useState(null);
  const selectedPillar = specs.pillars.find(p => p.id === selectedId);

  return (
    <section className="relative w-full pb-32 pt-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="w-1.5 h-1.5 rounded-full bg-mtgrip shadow-[0_0_8px_rgba(255,184,0,0.5)]" />
          <h2 className="text-sm font-mono text-charcoal uppercase tracking-[0.4em]">
            // {specs.title}
          </h2>
          <div className="w-1.5 h-1.5 rounded-full bg-mtgrip shadow-[0_0_8px_rgba(255,184,0,0.5)]" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {specs.pillars.map((pillar, index) => (
            <motion.div
              layoutId={`card-${pillar.id}`}
              key={pillar.id}
              onClick={() => setSelectedId(pillar.id)}
              className={`relative flex flex-col justify-between p-8 rounded-2xl glass overflow-hidden group cursor-pointer ${BENTO_SPAN[index]}`}
              whileHover={{ scale: 1.015, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Ghost watermark icon */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.04] scale-[4.5] pointer-events-none">
                {getIconForPillar(pillar.id, 32)}
              </div>

              {/* Icon row */}
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="p-2.5 rounded-lg bg-[#F5F5F7] border border-card-border flex items-center justify-center group-hover:border-mtgrip/30 transition-colors duration-300">
                  {getIconForPillar(pillar.id, 22)}
                </div>
                <span className="text-silver font-mono text-[11px] tracking-[0.3em] uppercase">
                  SYS.{pillar.id.substring(0, 3).toUpperCase()}
                </span>
              </div>

              {/* Text */}
              <div className="mt-auto relative z-10">
                <h3 className="text-xl font-bold text-charcoal uppercase leading-tight mb-2 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Tap hint */}
              <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <span className="font-mono text-[9px] tracking-widest text-charcoal uppercase">TAP TO EXPAND</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Blueprint Modal */}
      <AnimatePresence>
        {selectedId && selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#F5F5F7]/70 backdrop-blur-xl"
              onClick={() => setSelectedId(null)}
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${selectedPillar.id}`}
              className="relative w-full max-w-2xl bg-white/90 border border-[#E5E5E5] rounded-2xl shadow-2xl overflow-hidden blueprint-grid"
              style={{ backdropFilter: 'blur(24px)' }}
            >
              {/* Close button */}
              <button
                className="absolute top-5 right-5 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5F7] border border-card-border text-silver hover:text-charcoal hover:border-charcoal/20 transition-all duration-200"
                onClick={() => setSelectedId(null)}
              >
                <X size={15} strokeWidth={2} />
              </button>

              {/* Blueprint content */}
              <div className="p-8 md:p-12">

                {/* Centered Logo + Title Block (takes ~50% width, centered) */}
                <div className="flex justify-center mb-8 border-b border-[#E5E5E5] pb-8">
                  <div className="w-full max-w-md flex flex-col items-center text-center">
                    <div className="p-5 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E5] mb-5">
                      {getIconForPillar(selectedPillar.id, 48)}
                    </div>
                    <span className="text-silver font-mono text-[10px] tracking-[0.3em] uppercase block mb-2">
                      SYS.{selectedPillar.id.substring(0, 3).toUpperCase()} — BLUEPRINT
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-charcoal uppercase leading-tight tracking-tight">
                      {selectedPillar.title}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 bg-mtgrip" />
                    <span className="font-mono text-[11px] tracking-widest uppercase text-charcoal-light">
                      {selectedPillar.back_content.subtitle}
                    </span>
                  </div>
                  <p className="text-slate-600 font-light leading-relaxed text-base md:text-lg max-w-lg">
                    {selectedPillar.back_content.details}
                  </p>
                </div>

                {/* CAD / Spec table — dynamic from JSON */}
                <div className="grid grid-cols-2 font-mono text-xs text-slate-500 border-t border-l border-[#E5E5E5] mb-10 w-full max-w-sm">
                  <div className="border-b border-r border-[#E5E5E5] p-2.5 uppercase">
                    <span className="text-silver-light">MATERIAL</span>
                    <span className="block text-charcoal font-bold mt-0.5">{selectedPillar.blueprint.material}</span>
                  </div>
                  <div className="border-b border-r border-[#E5E5E5] p-2.5 uppercase">
                    <span className="text-silver-light">TOLERANCE</span>
                    <span className="block text-charcoal font-bold mt-0.5">{selectedPillar.blueprint.tolerance}</span>
                  </div>
                  <div className="border-b border-r border-[#E5E5E5] p-2.5 uppercase">
                    <span className="text-silver-light">FINISH</span>
                    <span className="block text-charcoal font-bold mt-0.5">{selectedPillar.blueprint.finish}</span>
                  </div>
                  <div className="border-b border-r border-[#E5E5E5] p-2.5 uppercase">
                    <span className="text-silver-light">STATUS</span>
                    <span className="block text-mtgrip font-bold mt-0.5">{selectedPillar.blueprint.status}</span>
                  </div>
                </div>

                {/* Swipe down hint */}
                <div
                  className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
                  onClick={() => setSelectedId(null)}
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400">Swipe down to close</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronDown size={18} className="text-slate-400" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductSpecs;
