import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUser(response.data);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="font-sans">
      

      {/* Banner Slider */}
      <section className="pt-0">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-80 md:h-96"
        >
          {[
            {
              title: "Track Your Fitness",
              desc: "Monitor daily workouts & stay on track",
              img: "https://images.unsplash.com/photo-1594737625785-c94ed5153dd3?auto=format&fit=crop&w=1500&q=80",
            },
            {
              title: "Plan Your Meals",
              desc: "Custom nutrition plans for your goals",
              img: "https://images.unsplash.com/photo-1604909052846-75c6b493ff34?auto=format&fit=crop&w=1500&q=80",
            },
            {
              title: "Achieve Milestones",
              desc: "Set & conquer your wellness targets",
              img: "https://images.unsplash.com/photo-1589571894960-20bbe2828e6f?auto=format&fit=crop&w=1500&q=80",
            },
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-lg">{slide.desc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {["Workout Routines", "Balanced Diets", "Mindfulness"].map(
            (title, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:scale-105"
              >
                <h3 className="text-2xl font-bold mb-2 text-green-600">
                  {title}
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Content Rich Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src="https://www.biospectrumindia.com/uploads/articles/sehtup-25284.jpg"
              alt="Health Platform"
              className="rounded-3xl shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">
              All-in-One Health Platform
            </h2>
            <p className="text-gray-600 mb-6">
              Track your exercises, log nutrition details, set achievable goals,
              and visualize your progress with an intuitive dashboard. Our
              platform makes your wellness journey streamlined and enjoyable.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition"
            >
              Join for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials / Stories Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-10">Success Stories</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {["John", "Emily", "David"].map((name, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition"
            >
              <p className="text-gray-600 mb-4">
                "Using this platform, I achieved my health goals faster and with
                much more motivation. Highly recommended!"
              </p>
              <h4 className="text-green-600 font-semibold">{name}</h4>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default HomePage;
