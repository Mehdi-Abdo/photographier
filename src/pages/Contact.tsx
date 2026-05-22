import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import contact from '../assests/images/contact.jpg';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', subject: '', message: '' };
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(): boolean {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    const { error } = await supabase.from('contacts').insert(form);
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm(EMPTY);
    }
  }

  function set(field: keyof FormState, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  return (
    <div className="pt-16">
      <section className="bg-stone-900 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${contact})` }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-5xl font-light text-white mb-4">Contact Us</h1>
          <p className="text-stone-400 max-w-xl mx-auto">Have a question or want to discuss your project? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 mb-2">Let's Talk</h2>
                <p className="text-stone-500 text-sm leading-relaxed">Whether you have questions about our services, pricing, or availability — we're here to help and typically respond within a few hours.</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@Drivij.com' },
                  { icon: Phone, label: 'Phone', value: '+(212) 609-111499' },
                  { icon: MapPin, label: 'Studio', value: 'Avenue tachfine city ain borja ' },
                  { icon: Clock, label: 'Hours', value: 'Mon–Fri 9am–6pm, Sat 10am–4pm' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-stone-100">
                    <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-stone-700 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8">
                {status === 'success' && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Message sent! We'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your Name" required error={errors.name}>
                      <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" className={iClass(!!errors.name)} />
                    </Field>
                    <Field label="Email Address" required error={errors.email}>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" className={iClass(!!errors.email)} />
                    </Field>
                  </div>
                  <Field label="Subject" required error={errors.subject}>
                    <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="Wedding photography inquiry" className={iClass(!!errors.subject)} />
                  </Field>
                  <Field label="Message" required error={errors.message}>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={6} placeholder="Tell us about your project..." className={`${iClass(!!errors.message)} resize-none`} />
                  </Field>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function iClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-colors ${
    hasError ? 'border-red-300 focus:ring-red-400 bg-red-50' : 'border-stone-200 focus:ring-amber-400 bg-stone-50 focus:bg-white'
  }`;
}

function Field({ label, required, error, children }: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
