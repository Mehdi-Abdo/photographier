import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import Boking from '../assests/images/booking.png'

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

interface FormState {
  client_name: string;
  client_email: string;
  client_phone: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  client_name: '',
  client_email: '',
  client_phone: '',
  service_id: '',
  booking_date: '',
  booking_time: '',
  message: '',
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { services } = useApp();
  const [form, setForm] = useState<FormState>({ ...EMPTY_FORM, service_id: searchParams.get('service') ?? '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const s = searchParams.get('service');
    if (s) setForm(f => ({ ...f, service_id: s }));
  }, [searchParams]);

  function validate(): boolean {
    const errs: Partial<FormState> = {};
    if (!form.client_name.trim()) errs.client_name = 'Name is required';
    if (!form.client_email.trim()) errs.client_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email)) errs.client_email = 'Invalid email address';
    if (!form.service_id) errs.service_id = 'Please select a service';
    if (!form.booking_date) errs.booking_date = 'Please select a date';
    if (!form.booking_time) errs.booking_time = 'Please select a time';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const selectedService = services.find(s => s.id === form.service_id);

    const { error } = await supabase.from('bookings').insert({
      ...form,
      service_name: selectedService?.name ?? '',
      status: 'pending',
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ ...EMPTY_FORM });
    }
  }

  function set(field: keyof FormState, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  if (status === 'success') {
    return (
      <div className="pt-16 min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-stone-900 mb-3">Booking Received!</h2>
          <p className="text-stone-500 leading-relaxed mb-8">Thank you for your booking request. We'll review your details and send a confirmation email within 24 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="bg-stone-900 hover:bg-stone-800 text-white font-medium px-8 py-3 rounded-xl transition-colors"
          >
            Book Another Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-20 bg-stone-900 text-center px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${Boking})` }} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-3">Reserve Your Spot</p>
          <h1 className="text-5xl font-light text-white mb-4">Book a Session</h1>
          <p className="text-stone-400 max-w-xl mx-auto">Fill out the form below and we'll get back to you within 24 hours to confirm your booking.</p>
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 md:p-10">
            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
                  Your Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" required error={errors.client_name}>
                    <input
                      type="text"
                      value={form.client_name}
                      onChange={e => set('client_name', e.target.value)}
                      placeholder="Jane Smith"
                      className={inputClass(!!errors.client_name)}
                    />
                  </Field>
                  <Field label="Email Address" required error={errors.client_email}>
                    <input
                      type="email"
                      value={form.client_email}
                      onChange={e => set('client_email', e.target.value)}
                      placeholder="jane@example.com"
                      className={inputClass(!!errors.client_email)}
                    />
                  </Field>
                  <Field label="Phone Number" className="sm:col-span-2">
                    <input
                      type="tel"
                      value={form.client_phone}
                      onChange={e => set('client_phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={inputClass(false)}
                    />
                  </Field>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
                  Session Details
                </h3>
                <div className="space-y-4">
                  <Field label="Photography Service" required error={errors.service_id}>
                    <select
                      title='tittle'
                      value={form.service_id}
                      onChange={e => set('service_id', e.target.value)}
                      className={inputClass(!!errors.service_id)}
                    >
                      <option value="">Select a service...</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id}>{s.name} — ${s.price.toLocaleString()}</option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Preferred Date" required error={errors.booking_date}>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        <input
                          type="date"
                          placeholder='aaaa'
                          min={minDateStr}
                          value={form.booking_date}
                          onChange={e => set('booking_date', e.target.value)}
                          className={`${inputClass(!!errors.booking_date)} pl-10`}
                        />
                      </div>
                    </Field>

                    <Field label="Preferred Time" required error={errors.booking_time}>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        <select
                          title='tittle ...'
                          value={form.booking_time}
                          onChange={e => set('booking_time', e.target.value)}
                          className={`${inputClass(!!errors.booking_time)} pl-10`}
                        >
                          <option value="">Select a time...</option>
                          {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </Field>
                  </div>

                  <Field label="Additional Notes">
                    <textarea
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      rows={4}
                      placeholder="Tell us about your vision, any special requests, location preferences..."
                      className={`${inputClass(false)} resize-none`}
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-stone-900 hover:bg-stone-800 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? 'border-red-300 focus:ring-red-400 bg-red-50'
      : 'border-stone-200 focus:ring-amber-400 bg-stone-50 focus:bg-white'
  }`;
}

function Field({ label, required, error, children, className }: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
