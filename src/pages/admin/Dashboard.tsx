import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera, LogOut, Calendar, Mail, Image, BarChart2,
  Trash2, Check, X, Plus, Eye, EyeOff, ChevronDown
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import type { Booking, Contact, GalleryImage } from '../../types';

type Tab = 'overview' | 'bookings' | 'gallery' | 'messages';

const CATEGORIES = ['portrait', 'wedding', 'family', 'commercial', 'event'];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { images, refetchImages } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [contactsLoading, setContactsLoading] = useState(true);

  // Gallery form state
  const [showAddImage, setShowAddImage] = useState(false);
  const [imgForm, setImgForm] = useState({ title: '', url: '', category: 'portrait', description: '', featured: false });
  const [imgSaving, setImgSaving] = useState(false);

  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    setBookings((data as Booking[]) ?? []);
    setBookingsLoading(false);
  }, []);

  const fetchContacts = useCallback(async () => {
    setContactsLoading(true);
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    setContacts((data as Contact[]) ?? []);
    setContactsLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
    fetchContacts();
  }, [fetchBookings, fetchContacts]);

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  async function updateBookingStatus(id: string, status: string) {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchBookings();
  }

  async function deleteBooking(id: string) {
    if (!confirm('Delete this booking?')) return;
    await supabase.from('bookings').delete().eq('id', id);
    fetchBookings();
  }

  async function deleteImage(id: string) {
    if (!confirm('Delete this image?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    refetchImages();
  }

  async function toggleFeatured(img: GalleryImage) {
    await supabase.from('gallery_images').update({ featured: !img.featured }).eq('id', img.id);
    refetchImages();
  }

  async function handleAddImage(e: React.FormEvent) {
    e.preventDefault();
    if (!imgForm.title || !imgForm.url) return;
    setImgSaving(true);
    await supabase.from('gallery_images').insert(imgForm);
    setImgSaving(false);
    setShowAddImage(false);
    setImgForm({ title: '', url: '', category: 'portrait', description: '', featured: false });
    refetchImages();
  }

  async function markContactRead(id: string, read: boolean) {
    await supabase.from('contacts').update({ read }).eq('id', id);
    fetchContacts();
  }

  async function deleteContact(id: string) {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contacts').delete().eq('id', id);
    fetchContacts();
  }

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Pending Review', value: bookings.filter(b => b.status === 'pending').length, icon: ChevronDown, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Gallery Images', value: images.length, icon: Image, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Unread Messages', value: contacts.filter(c => !c.read).length, icon: Mail, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-stone-900 fixed top-0 left-0 h-full flex flex-col z-10">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-stone-800">
          <Camera className="w-6 h-6 text-amber-400" />
          <span className="text-white font-semibold">Lumière Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {([
            { id: 'overview', label: 'Overview', icon: BarChart2 },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'gallery', label: 'Gallery', icon: Image },
            { id: 'messages', label: 'Messages', icon: Mail },
          ] as { id: Tab; label: string; icon: React.ElementType }[]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id ? 'bg-amber-500 text-stone-900' : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-800">
          <div className="text-xs text-stone-500 mb-3 truncate">{user?.email}</div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 text-stone-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 p-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-2xl font-semibold text-stone-900 mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {stats.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p className="text-2xl font-bold text-stone-900">{value}</p>
                  <p className="text-stone-500 text-sm mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                <h2 className="font-semibold text-stone-900 mb-4">Recent Bookings</h2>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-stone-900">{b.client_name}</p>
                        <p className="text-stone-500 text-xs">{b.service_name} · {b.booking_date}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                  {bookings.length === 0 && <p className="text-stone-400 text-sm">No bookings yet.</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                <h2 className="font-semibold text-stone-900 mb-4">Recent Messages</h2>
                <div className="space-y-3">
                  {contacts.slice(0, 5).map(c => (
                    <div key={c.id} className="flex items-start gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${c.read ? 'bg-stone-300' : 'bg-amber-500'}`} />
                      <div>
                        <p className="font-medium text-stone-900">{c.name}</p>
                        <p className="text-stone-500 text-xs">{c.subject}</p>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && <p className="text-stone-400 text-sm">No messages yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div>
            <h1 className="text-2xl font-semibold text-stone-900 mb-6">Bookings</h1>
            {bookingsLoading ? (
              <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-stone-200 rounded-xl animate-pulse" />)}</div>
            ) : bookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center text-stone-400">No bookings yet.</div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 text-stone-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-5 py-3 font-medium">Client</th>
                        <th className="text-left px-5 py-3 font-medium">Service</th>
                        <th className="text-left px-5 py-3 font-medium">Date & Time</th>
                        <th className="text-left px-5 py-3 font-medium">Status</th>
                        <th className="text-left px-5 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-medium text-stone-900">{b.client_name}</p>
                            <p className="text-stone-400 text-xs">{b.client_email}</p>
                          </td>
                          <td className="px-5 py-4 text-stone-700">{b.service_name}</td>
                          <td className="px-5 py-4 text-stone-700">
                            <p>{b.booking_date}</p>
                            <p className="text-stone-400 text-xs">{b.booking_time}</p>
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={b.status}
                              onChange={e => updateBookingStatus(b.id, e.target.value)}
                              className="text-xs border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-400"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <button onClick={() => deleteBooking(b.id)} className="text-stone-400 hover:text-red-500 transition-colors p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gallery */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-stone-900">Gallery</h1>
              <button
                onClick={() => setShowAddImage(v => !v)}
                className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>

            {showAddImage && (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-stone-900 mb-4">Add New Image</h3>
                <form onSubmit={handleAddImage} className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Title *</label>
                    <input type="text" value={imgForm.title} onChange={e => setImgForm(f => ({ ...f, title: e.target.value }))} placeholder="Image title" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Image URL *</label>
                    <input type="url" value={imgForm.url} onChange={e => setImgForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Category</label>
                    <select value={imgForm.category} onChange={e => setImgForm(f => ({ ...f, category: e.target.value }))} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                      {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Description</label>
                    <input type="text" value={imgForm.description} onChange={e => setImgForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description" className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                      <input type="checkbox" checked={imgForm.featured} onChange={e => setImgForm(f => ({ ...f, featured: e.target.checked }))} className="rounded border-stone-300" />
                      Feature on homepage
                    </label>
                    <div className="ml-auto flex gap-2">
                      <button type="button" onClick={() => setShowAddImage(false)} className="px-4 py-2 rounded-lg text-sm text-stone-600 hover:bg-stone-100 transition-colors">Cancel</button>
                      <button type="submit" disabled={imgSaving} className="px-4 py-2 rounded-lg text-sm bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-60 transition-colors">
                        {imgSaving ? 'Saving...' : 'Save Image'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.id} className="relative group bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm">
                  <img src={img.url} alt={img.title} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button onClick={() => toggleFeatured(img)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-stone-700 hover:text-amber-500 transition-colors" title={img.featured ? 'Remove from featured' : 'Add to featured'}>
                      {img.featured ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => deleteImage(img.id)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-stone-700 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-stone-800 truncate">{img.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400 capitalize">{img.category}</span>
                      {img.featured && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Featured</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <div>
            <h1 className="text-2xl font-semibold text-stone-900 mb-6">Messages</h1>
            {contactsLoading ? (
              <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-stone-200 rounded-xl animate-pulse" />)}</div>
            ) : contacts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center text-stone-400">No messages yet.</div>
            ) : (
              <div className="space-y-3">
                {contacts.map(c => (
                  <div key={c.id} className={`bg-white rounded-xl border shadow-sm p-5 ${c.read ? 'border-stone-100' : 'border-amber-200'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!c.read && <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0" />}
                          <p className="font-semibold text-stone-900 text-sm">{c.name}</p>
                          <span className="text-stone-400 text-xs">·</span>
                          <span className="text-stone-500 text-xs">{c.email}</span>
                        </div>
                        <p className="font-medium text-stone-700 text-sm">{c.subject}</p>
                        <p className="text-stone-500 text-sm mt-1 leading-relaxed">{c.message}</p>
                        <p className="text-stone-400 text-xs mt-2">{new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => markContactRead(c.id, !c.read)}
                          className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors"
                          title={c.read ? 'Mark unread' : 'Mark read'}
                        >
                          {c.read ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteContact(c.id)}
                          className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-red-100 flex items-center justify-center text-stone-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${map[status] ?? 'bg-stone-100 text-stone-600'}`}>
      {status}
    </span>
  );
}

