import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { certificates } from '../../data';
import { SectionHeading } from '../ui/Terminal';
import Lightbox from '../ui/Lightbox';

export default function Certificates() {
  const [preview, setPreview] = useState(null);

  return (
    <section id="certificates" className="py-16" aria-labelledby="certificates-heading">
      <SectionHeading
        command="ls -la certificates/"
        title="Certificates"
        description="A little showcase of the certificates I've earned (and yes, I'm proud of them!)"
        align="center"
        className="mb-14"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      />

      <div
        className="cert-swiper"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          slidesPerView={1}
          spaceBetween={24}
          grabCursor
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            scale: 0.86,
            slideShadows: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation
        >
          {certificates.map((certificate) => (
            <SwiperSlide key={certificate.id}>
              <button
                type="button"
                onClick={() => setPreview(certificate)}
                className="panel group w-full rounded-xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-term-accent/40"
                aria-label={`Preview certificate: ${certificate.title}`}
              >
                <div className="overflow-hidden rounded-lg border border-term-border">
                  <img
                    src={certificate.gambar}
                    alt={`${certificate.title} certificate`}
                    className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-term-accent">
                  {certificate.type}
                </p>
                <h3 className="mt-2 text-base font-bold leading-snug transition-colors group-hover:text-term-accent">
                  {certificate.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-term-faint">
                  {certificate.issuer} · {certificate.date}
                </p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Lightbox
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview?.title}
        image={preview?.gambar}
        meta={preview ? `${preview.type} — ${preview.issuer}, ${preview.date}` : null}
      />

      <h2 id="certificates-heading" className="sr-only">
        Certificates
      </h2>
    </section>
  );
}
