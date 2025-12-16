import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiShield, FiTrendingUp } from "react-icons/fi";
import { FaHandsHelping } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, type: "spring", stiffness: 120 },
  }),
};

const AboutUs = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-sky-50 to-indigo-50 overflow-hidden">
      {/* decorative circles */}
      <div className="pointer-events-none absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-200 to-transparent opacity-40 blur-3xl"></div>
      <div className="pointer-events-none absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-gradient-to-br from-sky-200 to-transparent opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4"
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-sky-500">
                Smart City Issue Tracker
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="text-slate-600 max-w-2xl mb-8"
            >
              We connect citizens, staff, and administrators through a simple,
              transparent workflow — report issues, track real-time progress,
              and get them resolved faster. Our platform is built for
              reliability, accountability, and speed.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="group relative p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 inline-flex">
                    <FiUsers size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Citizen First
                    </h4>
                    <p className="text-sm text-slate-600">
                      Easy reporting, instant confirmation, and full tracking
                      for every report.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="group relative p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-sky-50 text-sky-600 inline-flex">
                    <FaHandsHelping size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Staff Empowered
                    </h4>
                    <p className="text-sm text-slate-600">
                      Tools for staff to accept, update and close tasks with
                      clear timelines.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="group relative p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 inline-flex">
                    <FiShield size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Secure & Transparent
                    </h4>
                    <p className="text-sm text-slate-600">
                      Role-based access, immutable timelines and audit-friendly
                      history.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="group relative p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600 inline-flex">
                    <FiTrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Data Driven
                    </h4>
                    <p className="text-sm text-slate-600">
                      Insights & charts to help the municipality prioritize
                      interventions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <a
                href="/about"
                className="inline-block px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-500 transition"
              >
                Learn More
              </a>

              <a
                href="/contact"
                className="inline-block px-5 py-3 rounded-lg border border-indigo-200 text-indigo-700 font-medium hover:bg-indigo-50 transition"
              >
                Contact Us
              </a>
            </motion.div>
          </div>

          {/* Right: Illustration + stats badges */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="rounded-3xl p-6 bg-white/60 backdrop-blur-md border border-white/30 shadow-2xl"
            >
              {/* Illustration (replace with your own svg or image in public folder) */}
              <div className="w-full h-56 rounded-xl overflow-hidden bg-linear-to-tr from-indigo-200 to-sky-200 flex items-center justify-center">
                <svg
                  width="220"
                  height="220"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-95"
                >
                  <g fill="none" fillRule="evenodd">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="white"
                      fillOpacity="0.06"
                    />
                    <path
                      d="M30 140 L40 110 L60 120 L80 90 L100 110 L130 70 L150 95 L170 80"
                      stroke="#6366F1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g transform="translate(40,40)">
                      <rect width="40" height="30" rx="6" fill="#A5B4FC" />
                      <rect
                        x="60"
                        y="10"
                        width="40"
                        height="30"
                        rx="6"
                        fill="#BFDBFE"
                      />
                      <rect
                        x="120"
                        y="30"
                        width="40"
                        height="30"
                        rx="6"
                        fill="#C7FFD8"
                      />
                    </g>
                  </g>
                </svg>
              </div>

              {/* Stats badges */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/80 border border-white/30 shadow flex flex-col items-start">
                  <span className="text-xs text-slate-500">Resolved</span>
                  <strong className="text-2xl text-slate-900">1,230</strong>
                  <span className="text-xs text-slate-500">issues</span>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-white/30 shadow flex flex-col items-start">
                  <span className="text-xs text-slate-500">Active Staff</span>
                  <strong className="text-2xl text-slate-900">84</strong>
                  <span className="text-xs text-slate-500">on field</span>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-white/30 shadow flex flex-col items-start">
                  <span className="text-xs text-slate-500">Avg Time</span>
                  <strong className="text-2xl text-slate-900">36h</strong>
                  <span className="text-xs text-slate-500">to resolve</span>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-white/30 shadow flex flex-col items-start">
                  <span className="text-xs text-slate-500">Premium Users</span>
                  <strong className="text-2xl text-slate-900">1,052</strong>
                  <span className="text-xs text-slate-500">priority</span>
                </div>
              </div>
            </motion.div>

            {/* subtle floating badge */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="absolute -top-6 -left-6 p-2 rounded-full bg-white/90 border border-white/40 shadow-lg"
            >
              <div className="text-sm font-semibold text-indigo-600">
                Trusted by Citizens
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
