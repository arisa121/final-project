import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    title: "Report Problems, Improve Your City",
    desc: "Easily report road damage, water leaks and broken street lights.",
    button: "Report an Issue",
    link: "/report",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
    title: "Smart City Infrastructure System",
    desc: "Connect directly with authorities and fix city problems faster.",
    button: "View Issues",
    link: "/all-issues",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    title: "Together We Build A Better Future",
    desc: "Your action today can make your city safer tomorrow.",
    button: "Get Started",
    link: "/login",
  },
];

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      speed={1200}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop
      className="w-full h-[70vh] rounded-b-3xl overflow-hidden"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full h-full">
            {/* Background Image */}
            <img
              src={slide.image}
              className="w-full h-full object-cover"
              alt="slide"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30 flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-white max-w-2xl px-6 md:px-16 space-y-6"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg text-gray-200">{slide.desc}</p>

                <Link to={slide.link} className="btn btn-primary">
                  {slide.button}
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const slides = [
//   {
//     id: 1,
//     title: "Smart City Issue Management",
//     desc: "Report local problems instantly and help build a better city.",
//     img: "https://images.unsplash.com/photo-1581090464777-4f3c5e6af8ba?auto=format&fit=crop&w=1500&q=90",
//   },
//   {
//     id: 2,
//     title: "Your Voice Matters",
//     desc: "Easily report issues to authorities with one tap.",
//     img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1500&q=90",
//   },
//   {
//     id: 3,
//     title: "Track Reported Issues",
//     desc: "Monitor issue progress in real-time through our dashboard.",
//     img: "https://images.unsplash.com/photo-1529419412599-7bb870e11810?auto=format&fit=crop&w=1500&q=90",
//   },
//   {
//     id: 4,
//     title: "Together We Build a Better City",
//     desc: "Citizen + Authority collaboration made simple.",
//     img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=90",
//   },
// ];

// const BannerSlider = () => {
//   return (
//     <div className="w-11/12 mx-auto h-[85vh] md:h-[90vh] overflow-hidden relative">
//       <Swiper
//         modules={[Autoplay, Pagination, Navigation]}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{ delay: 3500, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         navigation={true}
//         className="w-full h-full"
//       >
//         {slides.map((s) => (
//           <SwiperSlide key={s.id} className="relative w-full h-full">
//             <div
//               className="w-full h-full bg-cover bg-center bg-no-repeat"
//               style={{ backgroundImage: `url(${s.img})` }}
//             >
//               {/* Dark Overlay */}
//               <div className="absolute inset-0 bg-black/60"></div>

//               {/* Glassmorphism Content Box */}
//               <div className="absolute left-6 right-6 md:left-20 md:right-20 bottom-20 bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl">
//                 <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
//                   {s.title}
//                 </h1>
//                 <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
//                   {s.desc}
//                 </p>

//                 <div className="mt-6 flex gap-4">
//                   <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:scale-105 transition">
//                     Report Issue
//                   </button>
//                   <button className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/40 rounded-xl text-lg hover:bg-white/20 transition">
//                     View Issues
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default BannerSlider;

