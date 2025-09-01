import DataImage from "./data";
import {listTools, listProyek, certificates} from "./data";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [preview, setPreview] = useState(null);
  const handlePreview = (certificate) => setPreview(certificate);
  const closePreview = () => setPreview(null);
  return (
    <>
      <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6  grid-cols-1">
        <div className="animate__animated animate__fadeInUp animate__delay-3s">
          <div className="flex items-center gap-3 mb-6 bg-zinc-800 w-fit p-4 rounded-2xl">
            <p  className="font-semibold">Status:</p><p>Open to Work!</p>
          </div>
          <h1 className="text-5xl/tight font-bold mb-6">Hi, My name is Wiridlangit</h1>
          <p className="text-base/loose text-gray-300 mb-6">Welcome to my humble little portfolio! Most people call me Sky—yep, like the thing above us. Not a groundbreaking fact, but hey, now you know. 😄 I've got a soft spot for smart cities and all the cool tech that makes them tick.</p>
        <div className="flex items-center sm:gap-4 gap-2">
          <a
            href="/assets/CV_Wiridlangit.pdf"
            download
            className="bg-violet-700 hover:bg-violet-600 text-white py-2 p-4 rounded-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV <i className="ri-download-line"></i>
          </a>
          <a href="#projects" className="bg-zinc-700 hover:bg-zinc-600 py-2 p-4 rounded-2xl">
            Lihat Proyek <i className="ri-arrow-down-line"></i>
          </a>
        </div>
        </div>
        <img src={DataImage.HeroImage} alt="Hero Image" className="w-[500px] md:ml-auto animate__animated animate__fadeInUp animate__delay-4s" loading="lazy"/>
      </div>

    {/* about */}
      <div className="about mt-32 py-10" id="about">
        <div className="xl:w-2/3 lg:w-3/4 w-full mx-auto p-7 bg-zinc-800 rounded-lg" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
        <img src={DataImage.HeroImage} alt="Image" className="w-12 rounded-md mb-10 sm:hidden" loading="lazy"/>
        <p className="text-base/loose mb-10">Information Technology graduate from Institut Teknologi Sepuluh Nopember (ITS) with experience in mobile development, computer vision, and Internet of Things. Skilled in building end-to-end applications and intelligent systems using Kotlin, Python, and YOLO, with hands-on experience deploying real-time solutions on edge devices such as Raspberry Pi.</p>
        <div className="flex items-center justify-between">
          <img src={DataImage.HeroImage} alt="Image" className="w-12 rounded-md sm:block hidden" loading="lazy"/>
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-4xl mb-1">3.74<span className="text-violet-500">/4.00</span></h1>
              <p>GPA</p>
            </div>
              <div>
              <h1 className="text-4xl mb-1">Understandable</h1>
              <p>English</p>
            </div>
          </div>
        </div>
        </div>

      {/* tools */}
        <div className="tools mt-32">
        <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Tools I've gotten pretty comfy with</h1>
        <p className="xl:w-2/5 lg:w-2/4 md:w-2/3 sm:w-3/4 text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">These are a few of the tools I’ve been playing around with while working on my projects!</p>
        <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

        {listTools.map(tool => (
        <div className="group flex items-center gap-2 p-3 border border-zinc-600 rounded-md hover:bg-zinc-800" key={tool.id} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={tool.dad} data-aos-once="true">
          <img src={tool.gambar} alt="Tools Image" className="w-14 bg-zinc-800 p-1 group-hover:bg-zinc-900"/>
          <div>
            <h4 className="font-bold">{tool.nama}</h4>
            <p className="opacity-50">{tool.ket}</p>
          </div>
        </div>
        ))}
        </div>
        </div>
      {/* tools */}
      </div>
    {/* about */}

    {/* projects */}
        <div className="projects mt-32 py-10" id="projects">
          <h1 className="text-center text-4xl font-bold mb-2"data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Projects</h1>
          <p className="text-center text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Here are some of the projects I've worked on so far!</p>
          <div className="projects-box mt-14 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {listProyek.map(proyek => (
              <div key={proyek.id} className="p-4 bg-zinc-800 rounded-md" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={proyek.dad} data-aos-once="true">
                <img src={proyek.gambar} alt="Project Image" loading="lazy"/>
                <div>
                  <h1 className="text-2xl font-bold my-4">{proyek.nama}</h1>
                  <p className="text-base/loose mb-4">{proyek.desk}</p>
                  <div className="flex flex-wrap gap-2">
                    {proyek.tools.map((tool, index) => (
                      <p className="py-1 px-3 border border-zinc-500 bg-zinc-600 rounded-md font-semibold" key={index}>{tool}</p>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Link to={`/project/${proyek.id}`} className="bg-violet-700 p-3 rounded-lg block border border-zinc-600 hover:bg-violet-600">More Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    {/* projects */}

    {/* certificates */}
     <div className="certificates mt-32" id="certificates">
       <h1 className="text-4xl font-bold mb-4 text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Certificates</h1>
       <p className="text-base/loose text-center mb-10 opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">A little showcase of the certificates I've earned (and yes, I'm proud of them!)</p>
       <div className="certificates-box mt-14">
         <Swiper
           modules={[Navigation, Pagination, EffectCoverflow]}
           effect="coverflow"
           centeredSlides={true}
           slidesPerView={1}
           spaceBetween={30}
           coverflowEffect={{
             rotate: 0,
             stretch: 0,
             depth: 120,
             modifier: 2.5,
             scale: 0.85,
             slideShadows: false
           }}
           breakpoints={{
             640: { slidesPerView: 1 },
             768: { slidesPerView: 2 },
             1024: { slidesPerView: 3 }
           }}
           pagination={{ clickable: true }}
           navigation
           className="mySwiper"
         >
           {certificates.map(certificate => (
             <SwiperSlide key={certificate.id}>
               <div className="p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => handlePreview(certificate)} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={certificate.dad} data-aos-once="true">
                 <img src={certificate.gambar} alt="Certificate Image" className="rounded-lg" loading="lazy"/>
                 <div>
                   <h1 className="text-2xl font-bold my-4 text-center">{certificate.title}</h1>
                   <p className="text-base/loose mb-4 text-center">{certificate.issuer} - {certificate.date}</p>
                 </div>
               </div>
             </SwiperSlide>
           ))}
      {/* Modal Preview Certificate */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={closePreview}>
          <div className="bg-zinc-900 rounded-lg p-4 max-w-2xl w-full relative animate__animated animate__zoomIn" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-2xl text-white hover:text-violet-400" onClick={closePreview}>&times;</button>
            <img src={preview.gambar} alt="Certificate Preview" className="w-full rounded-lg"/>
          </div>
        </div>
      )}
         </Swiper>
       </div>
     </div>
    {/* certificates */}

      <div className="kontak mt-32 sm:p-10 p-0" id="contact">
        <h1 className="text-4xl font-bold mb-2 text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Contact</h1>
        <p className="text-base/loose text-center mb-10 opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">If this caught your eye, imagine what happens when you reach out!</p>
        <form action="https://formsubmit.co/wiridlangitjiwangga@gmail.com" method="POST" className="bg-zinc-800 p-10 sm:w-fit w-full mx-auto rounded-md" autoComplete="off" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true">
          <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
          <label className="font-semibold">Full name</label>
          <input type="text" name="nama" placeholder="Enter your name..." className="border border-zinc-500 p-2 rounded-md" required/>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input type="email" name="email" placeholder="Enter your email..." className="border border-zinc-500 p-2 rounded-md" required/>
          </div>
          <div className="flex flex-col gap-2">
          <label className="font-semibold">Message</label>
          <textarea name="pesan" id="pesan" cols={45} rows={7} placeholder="Enter your message..." className="border border-zinc-500 p-2 rounded-md" required></textarea>
          </div>
          <div className="text-center">
          <button type="submit" className="bg-violet-700 p-3 rounded-lg w-full cursor-pointer border border-zinc-600 hover:bg-violet-600">Send Message</button>
          </div>
          </div>
        </form>
      </div>
    {/* contact */}
    </>
  )
}

export default App
