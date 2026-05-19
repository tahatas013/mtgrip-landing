import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Shield, Zap, RotateCcw, Wrench } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Titreşim Sönümleme',
    desc: '4 yastıklı elastomer modül ile 20–500Hz arası sarsıntıyı %98.5 oranında filtreler.',
    stat: '%98.5',
    statLabel: 'İzolasyon',
  },
  {
    icon: Shield,
    title: 'Darbe Dayanımı',
    desc: '15G ani ivmelenme ve yanal darbe testlerinden başarıyla geçmiş kilitleme sistemi.',
    stat: '15G',
    statLabel: 'Dayanım',
  },
  {
    icon: RotateCcw,
    title: '360° Küresel Mafsal',
    desc: 'CNC işlenmiş AL-6061 alüminyum mafsal ile sürtünmesiz açı kalibrasyonu.',
    stat: '360°',
    statLabel: 'Dönüş',
  },
  {
    icon: Wrench,
    title: 'Evrensel Montaj',
    desc: '22mm – 32mm gidon çapları ve ayna montajı için modüler adaptör sistemi.',
    stat: '3+',
    statLabel: 'Uyum',
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass rounded-3xl p-8 flex flex-col justify-between overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Big stat watermark */}
      <div className="absolute -top-4 -right-2 text-[80px] md:text-[100px] font-black text-charcoal/[0.03] leading-none pointer-events-none select-none tracking-tighter">
        {feature.stat}
      </div>

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#F5F5F7] border border-card-border flex items-center justify-center mb-6 group-hover:border-mtgrip/30 transition-colors duration-300">
        <Icon size={26} className="text-mtgrip" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-xl font-bold text-charcoal uppercase tracking-tight mb-2">
          {feature.title}
        </h3>
        <p className="text-silver text-sm font-light leading-relaxed mb-6">
          {feature.desc}
        </p>
      </div>

      {/* Bottom stat */}
      <div className="flex items-end gap-2 mt-auto">
        <span className="text-3xl font-black text-mtgrip leading-none">{feature.stat}</span>
        <span className="text-xs font-mono text-silver uppercase tracking-widest pb-0.5">{feature.statLabel}</span>
      </div>
    </motion.div>
  );
};

const ProductFeatures = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden">
      
      {/* Section header */}
      <div className="text-center mb-16 px-6">
        <motion.span
          className="text-hud text-silver/50 tracking-[0.45em] block mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          // ÜRÜN ÖZELLİKLERİ
        </motion.span>
        <motion.h2
          className="text-3xl md:text-5xl font-black text-charcoal uppercase tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Mühendislik Detayları
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left: 2x2 feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>

          {/* Right: large product showcase with parallax */}
          <motion.div
            className="relative glass rounded-3xl flex items-center justify-center overflow-hidden min-h-[400px] md:min-h-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Radial glow behind product */}
            <div className="absolute inset-0 bg-gradient-radial from-mtgrip/5 to-transparent pointer-events-none" />

            <motion.img
              src="/assets/images/hero-mount.png"
              alt="MTGrip Pro — detaylı görünüm"
              className="w-[75%] h-auto object-contain ambient-shadow"
              style={{ rotate: imgRotate, y: imgY }}
            />

            {/* Floating spec badges */}
            <motion.div
              className="absolute top-6 left-6 spec-chip spec-chip-accent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              AL-6061-T6
            </motion.div>
            <motion.div
              className="absolute bottom-6 right-6 spec-chip"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              CNC İŞLEM
            </motion.div>
            <motion.div
              className="absolute top-6 right-6 spec-chip"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              IP65 SEALED
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
