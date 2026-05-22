import { Link } from 'react-router-dom';
import {  Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assests/images/logo_white.png';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Drivij Logo" className="w-7 h-7" />
              <span className="text-white font-semibold text-xl">Drivij</span>
            </Link>

            <p className="text-sm leading-relaxed mb-5">
              Capturing life's most beautiful moments with artistry and passion. Every frame tells a story.
            </p>

            {/* ✅ FIXED SOCIAL LINKS */}
            <div className="flex gap-3">
              
              <a
                href="https://www.instagram.com/drivij"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>

            </div>
          </div>

          {/* باقي الكود كما هو */}
          
          <div>
            <h4 className="text-red-500 font-semibold mb-4 text-sm uppercase tracking-wider">Pages</h4>
            <ul className="space-y-2 text-sm">
              {[['Home', '/'], ['About', '/about'], ['Gallery', '/gallery'], ['Services', '/services'], ['Booking', '/booking']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white border-b border-transparent hover:border-white transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-red-500 font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              {['Portrait Sessions', 'Wedding Photography', 'Family Sessions', 'Commercial Work', 'Event Coverage', 'Newborn Sessions'].map(s => (
                <li key={s}>
                  <Link to="/services" className="hover:text-white border-b border-transparent hover:border-white transition-colors duration-200">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-red-500 font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-300 mt-0.5 shrink-0" />
                <span>Residence ain borja , Casablanca</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-300 shrink-0" />
                <span>(+212) 663-458-507</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-300 shrink-0" />
                <span>hello@drivij.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>&copy; {new Date().getFullYear()} Drivij Photography. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}