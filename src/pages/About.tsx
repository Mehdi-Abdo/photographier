import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Eye, Zap } from 'lucide-react';
import about from '../assests/images/about.jpg';

const values = [
  { icon: Heart, title: 'Passion', description: 'Photography is not just our profession — it is our calling. We pour genuine emotion into every shoot.' },
  { icon: Eye, title: 'Artistry', description: 'We see beauty in the ordinary and extraordinary alike, composing each frame with intention and care.' },
  { icon: Zap, title: 'Excellence', description: 'From lighting to post-processing, we hold every aspect of our work to the highest standards.' },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden bg-stone-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{ backgroundImage: `url(${about})` }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6">Behind the Lens</h1>
          <p className="text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Drivij Photography was founded with a single belief: that every person, every moment, every story deserves to be immortalized with honesty and artistry.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3831849/pexels-photo-3831849.jpeg"
                  alt="Photographer at work"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-6 -right-6 bg-red-700 text-white px-6 py-4 rounded-xl shadow-xl">
                  <p className="text-2xl font-bold">8+</p>
                  <p className="text-xs font-medium">Years of Excellence</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-red-500 text-sm font-medium uppercase tracking-widest mb-3">About Me</p>
              <h2 className="text-4xl font-light text-stone-900 mb-6">Idriss Boutamzine,<br /><span className="italic text-stone-500">Visual Storyteller</span></h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>My journey into photography began in a small darkroom with my father's film camera. What started as curiosity quickly became an obsession — the way light sculpts a face, the way a single moment can contain an entire universe of emotion.</p>
                <p>Over twelve years I've had the privilege of photographing intimate weddings on sun-drenched coastlines, capturing the first breaths of newborns, and telling brand stories for companies that dare to dream big.</p>
                <p>Based in New York City, I travel worldwide for sessions and believe that the best photographs happen when subjects feel truly at ease — seen, valued, and beautifully themselves.</p>
              </div>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 mt-8 bg-stone-900 hover:bg-stone-800 text-white font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                Work With Me <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-red-500 text-sm font-medium uppercase tracking-widest mb-2">Philosophy</p>
            <h2 className="text-4xl font-light text-stone-900">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100">
                <div className="w-12 h-12 bg-red-100 border rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-red-500 text-sm font-medium uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="text-4xl font-light text-stone-900">The Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'We discuss your vision, style preferences, and what the session means to you.' },
              { step: '02', title: 'Planning', desc: 'Together we choose locations, timing, and outfits to create the perfect shoot.' },
              { step: '03', title: 'The Session', desc: 'I guide you through natural, relaxed poses to capture authentic moments.' },
              { step: '04', title: 'Delivery', desc: 'Carefully edited images delivered to your private online gallery within 2 weeks.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-light text-stone-100 mb-3">{step}</div>
                <h3 className="font-semibold text-stone-900 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
