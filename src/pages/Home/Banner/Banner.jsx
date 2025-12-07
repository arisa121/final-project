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
      className="w-11/12 mx-auto h-[50vh] rounded-b-3xl overflow-hidden"
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
