import React from 'react';
import { motion } from 'framer-motion';
import { Bike } from 'lucide-react';

const useCases = [
  {
    id: 'motorcycle',
    title: 'Motorsiklet',
    desc: 'Yüksek hız ve titreşime karşı tam koruma.',
    image: '/assets/images/usecase-motorcycle.jpg',
  },
  {
    id: 'scooter',
    title: 'Scooter',
    desc: 'Şehir içi sürüşlerde güvenli navigasyon.',
    image: '/assets/images/usecase-scooter.jpg',
  },
  {
    id: 'atv',
    title: 'ATV',
    desc: 'Arazi koşullarında maksimum dayanıklılık.',
    image: '/assets/images/usecase-atv.jpg',
  },
  {
    id: 'bicycle',
    title: 'Bisiklet',
    desc: 'Hafif montaj, güçlü tutuş.',
    image: '/assets/images/usecase-bicycle.jpg',
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const UseCases = () => {
  return (
    <section className="relative w-full bg-white py-20 md:py-28 border-b border-card-border">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <span className="text-hud text-silver/50 tracking-[0.45em] block mb-3">
            // KULLANIM ALANLARI
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-charcoal uppercase tracking-tight">
            Her Yolda, Her Araçta.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.id}
              className="group relative rounded-2xl overflow-hidden border border-card-border bg-[#F8F8FA] cursor-pointer hover:shadow-lg transition-shadow duration-300"
              variants={fadeUp(i * 0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image / Video placeholder */}
              <div className="relative w-full aspect-[4/5] bg-[#EBEBEF] overflow-hidden">
                <img
                  src={uc.image}
                  alt={`MTGrip — ${uc.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Placeholder shown when image is missing */}
                <div
                  className="absolute inset-0 items-center justify-center bg-[#EBEBEF]"
                  style={{ display: 'none' }}
                >
                  <div className="flex flex-col items-center gap-3 text-silver/40">
                    <Bike size={40} strokeWidth={1} />
                    <span className="font-mono text-[10px] tracking-widest uppercase">
                      Fotoğraf Ekle
                    </span>
                  </div>
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight leading-tight">
                  {uc.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm font-light mt-1">
                  {uc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
