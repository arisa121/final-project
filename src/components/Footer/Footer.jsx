import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="container-responsive relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                  CitizenReport
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  Public Infrastructure Reporting
                </p>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Empowering citizens to report infrastructure issues and helping
                governments respond faster. Together, we build better
                communities.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  {
                    icon: FaFacebookF,
                    color: "hover:text-blue-500",
                    link: "https://www.facebook.com/md.sumon.mia.232638/",
                  },
                  {
                    icon: FaTwitter,
                    color: "hover:text-sky-400",
                    link: "https://x.com/mdsumonmia000",
                  },
                  {
                    icon: FaLinkedinIn,
                    color: "hover:text-blue-600",
                    link: "https://www.linkedin.com/in/md-sumon-mia-a3bb1639a/",
                  },
                  {
                    icon: FaGithub,
                    color: "hover:text-gray-400",
                    link: "https:/github.com",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color}`}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "All Issues", path: "/all-issues" },
                  { name: "About Us", path: "/about" },
                  { name: "Contact", path: "/contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="group flex items-center text-gray-300 hover:text-teal-400 transition-all duration-300"
                    >
                      <FaArrowRight className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Issue Categories */}
            <div>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Report Categories
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  "🚧 Road & Infrastructure",
                  "💡 Street Lighting",
                  "🚰 Water & Drainage",
                  "🗑️ Waste Management",
                  "🏛️ Public Facilities",
                  "🌳 Parks & Environment",
                ].map((category, index) => (
                  <li
                    key={index}
                    className="text-gray-300 hover:text-teal-400 cursor-pointer transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">{category.split(" ")[0]}</span>
                    <span>{category.substring(category.indexOf(" ") + 1)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-6 relative inline-block">
                  Stay Updated
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></span>
                </h3>

                {/* Newsletter Form */}
                <form onSubmit={handleNewsletterSubmit} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-md hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </form>

                {subscribed && (
                  <p className="text-green-400 text-sm mt-2 animate-fade-in">
                    ✓ Successfully subscribed!
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Contact Us</h4>

                <div className="flex items-start space-x-3 text-gray-300 hover:text-teal-400 transition-colors duration-300">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span className="text-sm">
                    123 Main Street, Sylhet, Bangladesh
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-gray-300 hover:text-teal-400 transition-colors duration-300">
                  <FaPhone className="flex-shrink-0" />
                  <span className="text-sm">+880 1626089815</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-300 hover:text-teal-400 transition-colors duration-300">
                  <FaEnvelope className="flex-shrink-0" />
                  <span className="text-sm">support@citizenreport.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-y border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Issues Reported" },
                { number: "35K+", label: "Issues Resolved" },
                { number: "15K+", label: "Active Citizens" },
                { number: "98%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © {currentYear}{" "}
                <span className="text-teal-400 font-semibold">
                  CitizenReport
                </span>
                . All rights reserved.
              </div>

              {/* Legal Links */}
              <div className="flex space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (link, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  )
                )}
              </div>

              {/* Made with Love */}
              <div className="text-gray-400 text-sm flex items-center">
                Made with
                <span className="text-red-500 mx-1 animate-pulse">❤️</span>
                by{" "}
                <span className="text-teal-400 ml-1 font-semibold">
                  Team Infrastructure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;