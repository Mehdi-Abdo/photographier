import { useState } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Lightbox from '../components/Lightbox';
import gallery from '../assests/images/gallery.jpg';

const CATEGORIES = ['all', 'portrait', 'wedding', 'family', 'commercial', 'event'];

export default function Gallery() {
  const { images, imagesLoading } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = images.filter(img => {
    const matchCat = activeCategory === 'all' || img.category === activeCategory;
    const matchSearch = img.title.toLowerCase().includes(search.toLowerCase()) ||
      img.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIndex(i => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative py-28 overflow-hidden bg-stone-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
         // style={{ backgroundImage: "url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg')" }}
          style={{ backgroundImage: `url(${gallery})` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-200 text-sm font-medium uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-5xl font-light text-white mb-4">The Gallery</h1>
          <p className="text-stone-400 max-w-xl mx-auto">Every photograph is a window into a story. Explore our full collection of work.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {imagesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-stone-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-stone-400">
              <p className="text-lg">No images found.</p>
              <button onClick={() => { setActiveCategory('all'); setSearch(''); }} className="mt-4 text-red-600 hover:text-red-700 text-sm underline">Clear filters</button>
            </div>
          ) : (
            <>
              <p className="text-stone-500 text-sm mb-6">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</p>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {filtered.map((img, idx) => (
                  <div
                    key={img.id}
                    onClick={() => openLightbox(idx)}
                    className="break-inside-avoid relative overflow-hidden rounded-xl group cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-3">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium leading-tight">{img.title}</p>
                        <span className="text-xs text-stone-300 capitalize">{img.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
