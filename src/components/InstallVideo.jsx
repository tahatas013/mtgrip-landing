import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const InstallVideo = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 overflow-hidden">

      {/* Section header */}
      <div className="text-center mb-16 px-6">
        <motion.span
          className="text-hud text-silver/50 tracking-[0.45em] block mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('install.hud')} REHBERİ
        </motion.span>
        <motion.h2
          className="text-3xl md:text-5xl font-black text-charcoal uppercase tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          60 Saniyede Monte Et
        </motion.h2>
        <motion.p
          className="text-silver font-light text-base md:text-lg max-w-lg mx-auto mt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          MTGrip Pro'yu motosikletinize monte etmek için herhangi bir alete ihtiyacınız yok. 
          Aşağıdaki videoyu izleyerek 60 saniyede kurulumu tamamlayın.
        </motion.p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="relative glass rounded-3xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Video Container */}
          <div className="relative w-full aspect-video bg-charcoal/5 cursor-pointer group" onClick={togglePlay}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/assets/images/mtgrip-mt050.png"
              playsInline
              loop
              preload="metadata"
            >
              {/* Replace with actual video URL */}
              <source src="/assets/videos/install-guide.mp4" type="video/mp4" />
              Tarayıcınız video etiketini desteklemiyor.
            </video>

            {/* Play/Pause overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-xl border border-card-border shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95">
                {isPlaying ? (
                  <Pause size={28} className="text-charcoal" strokeWidth={2} />
                ) : (
                  <Play size={28} className="text-charcoal ml-1" strokeWidth={2} />
                )}
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 spec-chip bg-white/90">
              00:60
            </div>
          </div>

          {/* Steps bar at bottom */}
          <div className="grid grid-cols-3 border-t border-card-border">
            {[
              { step: '01', title: 'Adaptör Seçimi', desc: 'Gidon çapınıza uygun ringi seçin' },
              { step: '02', title: 'Montaj', desc: 'Gövdeyi gidon üzerine sabitleyin' },
              { step: '03', title: 'Kilitleme', desc: 'Telefonu yerleştirip kilitleyin' },
            ].map((s, i) => (
              <div key={i} className={`p-5 md:p-6 ${i < 2 ? 'border-r border-card-border' : ''}`}>
                <span className="text-mtgrip font-mono text-xs tracking-widest font-bold">{s.step}</span>
                <h4 className="text-charcoal font-bold text-sm uppercase tracking-tight mt-1">{s.title}</h4>
                <p className="text-silver text-xs font-light mt-1 hidden md:block">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstallVideo;
