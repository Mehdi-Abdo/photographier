import { Link } from 'react-router-dom';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Service from '../assests/images/service.jpg';

export default function Services() {
  const { services, servicesLoading } = useApp();

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-stone-900 relative py-28 overflow-hidden">
      <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${Service})` }}
        />  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-5xl font-light text-white mb-4">Photography Services</h1>
          <p className="text-stone-400 max-w-xl mx-auto">Tailored experiences for every occasion, budget, and vision.</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {servicesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-stone-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-stone-200 rounded w-2/3" />
                    <div className="h-4 bg-stone-100 rounded w-full" />
                    <div className="h-4 bg-stone-100 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col border border-stone-100">
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-stone-900 font-bold text-sm px-3 py-1 rounded-full">
                      ${service.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-stone-900">{service.name}</h3>
                      <div className="flex items-center gap-1 text-stone-500 text-xs shrink-0 ml-2">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration}
                      </div>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-5">{service.description}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {service.includes.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-stone-600">
                          <Check className="w-4 h-4 text-amber-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/booking?service=${service.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm"
                    >
                      Book This Session <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red-500 text-sm font-medium uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl font-light text-stone-900">Common Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: 'How far in advance should I book?', a: 'Weekends and peak seasons (spring/summer/fall) book quickly — typically 2-4 months in advance. Weekday sessions often have more availability.' },
              { q: 'What happens if the weather is bad?', a: 'Outdoor sessions can be rescheduled at no charge if conditions are severe. Light overcast is often ideal for portraits!' },
              { q: 'When will I receive my photos?', a: 'Edited galleries are delivered within 10-14 business days for most sessions, sooner for commercial work.' },
              { q: 'Do you offer payment plans?', a: 'Yes! A 30% deposit secures your date, with the remainder due 7 days before your session.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-stone-100 pb-6">
                <h3 className="font-semibold text-stone-900 mb-2">{q}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
