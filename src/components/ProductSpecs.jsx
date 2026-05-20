import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

/* ── Annotation data for QuadLock-style pop-ups around the product ── */
const annotations = [
  {
    label: 'CNC AL-6061 GÖVDE',
    detail: 'Havacılık sınıfı alüminyum',
    position: 'top-[12%] left-[5%] md:left-[8%]',
    dotPosition: 'top-[28%] left-[32%]',
    lineStyle: { top: '28%', left: '18%', width: '14%', height: '1px' },
  },
  {
    label: 'TİTANYUM VİDALAR',
    detail: 'Paslanmaz, korozyona dayanıklı',
    position: 'top-[12%] right-[5%] md:right-[8%]',
    dotPosition: 'top-[26%] right-[35%]',
    lineStyle: { top: '26%', right: '18%', width: '17%', height: '1px' },
  },
  {
    label: 'ELASTOMER MODÜL',
    detail: '4 yastıklı titreşim sönümleme',
    position: 'bottom-[22%] left-[5%] md:left-[8%]',
    dotPosition: 'bottom-[34%] left-[38%]',
    lineStyle: { bottom: '34%', left: '20%', width: '18%', height: '1px' },
  },
  {
    label: 'EASY LOCK CLİP',
    detail: 'Tek elle 0.3s kilitleme',
    position: 'bottom-[22%] right-[5%] md:right-[8%]',
    dotPosition: 'bottom-[36%] right-[36%]',
    lineStyle: { bottom: '36%', right: '18%', width: '18%', height: '1px' },
  },
];

/* ── "Neden MTGrip?" trust facts ── */
const trustFacts = [
  { label: 'AL-6061 Alaşım', desc: 'Havacılık sınıfı alüminyum gövde' },
  { label: '%98.5 Titreşim Absorpsiyonu', desc: '20–500Hz frekans bandında tam izolasyon' },
  { label: 'IP65 Su Sızdırmazlık', desc: 'O-ring contalar ile toz ve sıvı koruması' },
  { label: '15G Darbe Dayanımı', desc: 'Aşırı koşullarda test edilmiş kilitleme' },
  { label: '360° Küresel Mafsal', desc: 'CNC işlenmiş, sürtünmesiz açı ayarı' },
  { label: 'Evrensel Montaj', desc: '22mm–32mm gidon + ayna adaptörleri dahil' },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } },
});

const ProductSpecs = () => {
  const annoRef = useRef(null);
  const trustRef = useRef(null);
  const annoInView = useInView(annoRef, { once: true, margin: '-60px' });
  const trustInView = useInView(trustRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* ═══════════ TECHNICAL TRANSPARENCY — Product Annotation ═══════════ */}
      <section ref={annoRef} className="relative w-full bg-[#F8F8FA] py-20 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeUp(0)}
            initial="hidden"
            animate={annoInView ? 'visible' : 'hidden'}
          >
            <span className="text-hud text-silver/50 tracking-[0.45em] block mb-3">
              // TEKNİK DETAYLAR
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-charcoal uppercase tracking-tight">
              Her Parça, Bir Mühendislik Kararı.
            </h2>
          </motion.div>

          {/* Product + Annotations */}
          <div className="relative w-full max-w-2xl mx-auto aspect-square">

            {/* Central product image */}
            <motion.img
              src="/assets/images/mtgrip-mt050.png"
              alt="MTGrip Pro detaylı görünüm"
              className="absolute inset-0 w-full h-full object-contain ambient-shadow p-8 md:p-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={annoInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            />

            {/* Annotation pop-ups */}
            {annotations.map((ann, i) => (
              <React.Fragment key={i}>
                {/* Connector line */}
                <motion.div
                  className="absolute bg-mtgrip/60 hidden md:block"
                  style={ann.lineStyle}
                  initial={{ scaleX: 0 }}
                  animate={annoInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
                />

                {/* Pulsing dot on product */}
                <motion.div
                  className={`absolute w-2.5 h-2.5 rounded-full bg-mtgrip hidden md:block ${ann.dotPosition}`}
                  initial={{ scale: 0 }}
                  animate={annoInView ? { scale: [0, 1.3, 1] } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                >
                  <span className="absolute inset-0 rounded-full bg-mtgrip/40 animate-ping" />
                </motion.div>

                {/* Label card */}
                <motion.div
                  className={`absolute ${ann.position} z-10`}
                  variants={fadeUp(0.5 + i * 0.12)}
                  initial="hidden"
                  animate={annoInView ? 'visible' : 'hidden'}
                >
                  <div className="bg-white/90 backdrop-blur-md border border-card-border rounded-xl px-4 py-3 shadow-sm">
                    <span className="block text-xs font-bold text-charcoal uppercase tracking-wide">
                      {ann.label}
                    </span>
                    <span className="block text-[11px] text-silver font-light mt-0.5">
                      {ann.detail}
                    </span>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NEDEN MTGRIP? — Trust Section ═══════════ */}
      <section ref={trustRef} className="relative w-full bg-white py-20 md:py-28 border-t border-card-border">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <motion.div
            className="text-center mb-14"
            variants={fadeUp(0)}
            initial="hidden"
            animate={trustInView ? 'visible' : 'hidden'}
          >
            <h2 className="text-3xl md:text-4xl font-black text-charcoal uppercase tracking-tight mb-3">
              Neden MTGrip?
            </h2>
            <p className="text-silver font-light max-w-lg mx-auto">
              Her bileşen, gerçek yol koşullarında test edilmiş mühendislik verileriyle tasarlanmıştır.
            </p>
          </motion.div>

          {/* Trust grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trustFacts.map((fact, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border border-card-border bg-[#FAFAFA] hover:border-mtgrip/30 hover:shadow-sm transition-all duration-200"
                variants={fadeUp(i * 0.07)}
                initial="hidden"
                animate={trustInView ? 'visible' : 'hidden'}
              >
                <CheckCircle2 size={20} className="text-mtgrip mt-0.5 shrink-0" strokeWidth={2} />
                <div>
                  <span className="block text-sm font-bold text-charcoal uppercase tracking-tight">
                    {fact.label}
                  </span>
                  <span className="block text-xs text-silver font-light mt-1 leading-relaxed">
                    {fact.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSpecs;
