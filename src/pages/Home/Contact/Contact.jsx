import { motion } from "framer-motion";
import { FaEnvelope, FaUserTie, FaPhoneAlt, FaUsersCog } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-md">
            Contact <span className="text-blue-600">Us</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto text-lg">
            We're here to help! Reach out to admins, staff, or send us a direct
            message.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-lg bg-white/60 backdrop-blur-xl border border-white"
          >
            <FaUserTie className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Admin Team</h3>
            <p className="text-gray-600 mt-2">
              Contact our admin team for management-related support.
            </p>
            <p className="flex items-center gap-2 mt-4 font-medium text-gray-800">
              <FaEnvelope /> admin@cityservice.com
            </p>
          </motion.div>

          {/* Staff Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-lg bg-white/60 backdrop-blur-xl border border-white"
          >
            <FaUsersCog className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Staff Support</h3>
            <p className="text-gray-600 mt-2">
              Staff members are available to help with issue processing.
            </p>
            <p className="flex items-center gap-2 mt-4 font-medium text-gray-800">
              <FaEnvelope /> staff@cityservice.com
            </p>
          </motion.div>

          {/* Phone Support */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl shadow-lg bg-white/60 backdrop-blur-xl border border-white"
          >
            <FaPhoneAlt className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Helpline</h3>
            <p className="text-gray-600 mt-2">
              For urgent support contact us directly through phone.
            </p>
            <p className="flex items-center gap-2 mt-4 font-medium text-gray-800">
              📞 +880 123 456 789
            </p>
          </motion.div>
        </div>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-16 bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Send Us a Message
          </h3>
          <form className="grid gap-4">
            <div>
              <label className="font-semibold text-gray-700">Your Email</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-500" />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="input input-bordered w-full pl-10 bg-white/80"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Message</label>
              <textarea
                className="textarea textarea-bordered w-full bg-white/80"
                placeholder="Write your message..."
                rows={4}
                required
              ></textarea>
            </div>

            <button className="btn btn-primary w-full text-lg tracking-wide">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
