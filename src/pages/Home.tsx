import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Award, Users, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Background from '../assests/images/background.png'

const stats = [
  { icon: Camera, label: 'Photo Sessions', value: '1,200+' },
  { icon: Award, label: 'Awards Won', value: '24' },
  { icon: Users, label: 'Happy Clients', value: '850+' },
  { icon: Star, label: 'Years Experience', value: '12' },
];

export default function Home() {
  const { images, imagesLoading } = useApp();
  const featuredImages = images.filter(img => img.featured).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        //  style={{ backgroundImage: "url('https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg')" }}
          style={{ backgroundImage: `url(${Background})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15  text-white text-xs font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>Award-Winning Photography Studio</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6 it ">
            Capturing{' '}
            <span className="text-red-500 italic ">Timeless</span>
            <br />Moments
          </h1>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Every photograph is a story waiting to be told. We transform fleeting moments into lasting memories with artistry, passion, and an eye for the extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
            >
              View Gallery <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Session
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-700 border border-red-400 mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-3xl font-light text-white mb-1">{value}</p>
                <p className="text-stone-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-red-500 text-sm font-medium uppercase tracking-widest mb-2">Portfolio</p>
            <h2 className="text-4xl font-light text-stone-900 mb-4">Featured Work</h2>
            <p className="text-stone-500 max-w-xl mx-auto">A curated selection of our finest photographs across different styles and subjects.</p>
          </div>

          {imagesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-stone-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {featuredImages.map((img, i) => (
                <div
                  key={img.id}
                  className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-medium">{img.title}</p>
                      <p className="text-stone-300 text-sm capitalize">{img.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium border-b-2 border-red-400 hover:border-red-600 pb-0.5 transition-colors duration-200"
            >
              See Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg')" }}
        />
        <div className="absolute inset-0 bg-stone-900/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Ready to Create<br /><span className="text-red-500 italic">Something Beautiful?</span></h2>
          <p className="text-stone-300 text-lg mb-10 leading-relaxed">Let's work together to capture the moments that matter most to you.</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-1 text-lg"
          >
            Book Your Session <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
