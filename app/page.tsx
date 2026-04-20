'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: mixed-editorial

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Gem, 
  Scissors, 
  Flower2, 
  MapPin, 
  Mail, 
  Phone, 
  Layers, 
  Users, 
  Trophy, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Instagram,
  ImageOff,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

// --- Data ---

const brand = {
  name: "Teefah Tailoring Accessories",
  tagline: "The Foundation of Great Design",
  description: "Exquisite fabrics and designer supplies for the visionary creator. From the heart of Shasha Road to the world's finest ateliers.",
  industry: "fashion",
  region: "nigeria",
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1593803926640-0c663fabfaf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1648651486480-d5d9763b0901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1644483527210-9ca7f250c393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1606941542497-d2f694387f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1642872597460-278924cb13dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1664151100165-71ed5515adad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1690967707362-96563aedb181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

const products = [
  { name: "Premium Ankara Wax", description: "Authentic high-thread-count cotton with vibrant, heritage-inspired patterns.", price: "₦18,500" },
  { name: "Lustrous Crepe de Chine", description: "Sophisticated drape and a soft silk-matte finish for elegant silhouettes.", price: "₦7,500" },
  { name: "Heavyweight Bridal Satin", description: "A structural masterpiece with a brilliant luster for high-fashion gowns.", price: "₦12,000" }
];

const features = [
  { title: "Swarovski Grade Crystals", description: "Precision-cut stones designed to catch the light from every angle.", icon: Gem },
  { title: "Intricate Guipure Applique", description: "Hand-finished floral motifs to elevate any bodice or hemline.", icon: Flower2 },
  { title: "Designer Trimmings", description: "Velvet ribbons, metallic cords, and bespoke fringe for the finishing touch.", icon: Scissors }
];

const stats = [
  { number: "10k+", label: "Fabrics Sourced" },
  { number: "1,200", label: "Designers Served" },
  { number: "1", label: "Unrivaled Standard" }
];

const testimonials = [
  { name: "Arikeade O.", text: "The quality of the stones is unmatched in Lagos. My bridal clients can truly see the difference.", role: "Couture Designer" },
  { name: "Chidi K.", text: "Teefah is my first stop for every collection. Their crepe selection has the best drape in the city.", role: "Creative Director" }
];

// --- Main Page ---

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-primary w-10 h-10 flex items-center justify-center font-heading font-black text-xl rounded-sm">T</div>
            <span className="font-heading font-bold text-white tracking-widest text-sm hidden sm:block">TEEFAH</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Materials', 'Toolkit', 'Flagship', 'Concierge'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-accent text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all rounded-sm">
              Inquire
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[100] bg-primary flex flex-col p-8 animate-slideIn">
          <button className="self-end text-accent mb-12" onClick={() => setMobileMenu(false)}>
            <X size={32} />
          </button>
          <div className="space-y-8 flex flex-col items-center">
            {['Materials', 'Toolkit', 'Flagship', 'Concierge'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setMobileMenu(false)}
                className="text-white text-3xl font-heading font-bold"
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenu(false)}
              className="w-full text-center bg-accent text-primary py-4 font-black uppercase tracking-widest rounded-sm"
            >
              Inquire
            </a>
          </div>
        </div>
      )}

      {/* Hero: HR-C */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1.2fr_1fr] items-stretch bg-primary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-20 py-32 relative">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <p className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-8 opacity-80 animate-fadeIn">
            Atelier Grade Supplies
          </p>
          <h1 className="font-heading text-5xl md:text-[5.5rem] font-black text-white leading-[0.9] tracking-tighter animate-slideUp">
            The Foundation <br/> of <span className="text-accent">Great Design</span>
          </h1>
          <p className="text-white/45 mt-8 text-lg max-w-md leading-relaxed animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            {brand.description}
          </p>
          <div className="flex gap-6 mt-12 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <a href="#materials" className="bg-accent text-primary px-10 py-5 font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all">
              Explore the Atelier
            </a>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full">
          <SafeImage src={IMAGES.hero} alt="Teefah Collection" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/10 to-transparent" />
          <div className="absolute bottom-10 right-10 bg-white/5 backdrop-blur-md p-6 border border-white/10 max-w-[200px]">
            <p className="text-accent text-3xl font-black font-heading mb-1 tracking-tighter">Premium</p>
            <p className="text-white/50 text-[10px] uppercase tracking-widest leading-relaxed">Sourced from globally recognized textile mills.</p>
          </div>
        </div>
      </section>

      {/* Products: P-STAGGER */}
      <section id="materials" className="py-28 px-6 bg-secondary overflow-hidden">
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-primary mb-4 leading-none">The Raw Materials</h2>
          <p className="text-primary/40 text-lg uppercase tracking-widest font-medium">Lustrous Foundations</p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-28">
          {products.map((p, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div 
                key={i} 
                ref={ref}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-[30px_30px_0px_0px_#c9a84c20] group">
                    <SafeImage 
                      src={IMAGES.products[i]} 
                      alt={p.name} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                  </div>
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                    0{i + 1} — Signature Selection
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl font-black text-primary leading-tight">{p.name}</h3>
                  <p className="text-primary/60 mt-5 text-lg leading-relaxed">{p.description}</p>
                  <div className={`mt-10 flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'}`}>
                    <span className="text-4xl font-black text-primary font-heading tracking-tighter mb-6">{p.price}</span>
                    <a href="#contact" className="border-b-2 border-accent text-primary px-2 py-1 font-black uppercase tracking-widest text-sm hover:bg-accent/10 transition-all">
                      Secure Stock
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Divider: D-STAT */}
      <div className="bg-accent py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10 text-center">
          {stats.map((s, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div 
                key={i} 
                ref={ref}
                className={`px-8 py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <p className="text-5xl font-black text-primary tracking-tighter font-heading">{s.number}</p>
                <p className="text-primary/70 text-xs mt-2 font-bold uppercase tracking-[0.2em]">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features: F-ICON-GRID */}
      <section id="toolkit" className="py-32 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="font-heading text-5xl font-black text-white leading-none">The Embellishments</h2>
              <p className="text-white/40 mt-4 text-lg max-w-lg">
                Elevate your creations with masterfully crafted stones and hand-finished appliques.
              </p>
            </div>
            <a href="#contact" className="text-accent flex items-center gap-2 font-bold tracking-widest text-sm uppercase group">
              View Catalog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div 
                  key={i} 
                  ref={ref}
                  className={`p-10 border border-white/5 bg-white/[0.02] hover:bg-accent/5 hover:border-accent/30 transition-all duration-500 group relative overflow-hidden ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />
                  <div className="mb-8 text-accent group-hover:scale-110 transition-transform origin-left duration-500">
                    <f.icon size={44} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-4">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery: Toolkit Grid */}
      <section className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-primary mb-4">The Designer’s Toolkit</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[IMAGES.products[3], IMAGES.products[4], IMAGES.products[5], IMAGES.products[0], IMAGES.products[1]].map((src, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div 
                  key={i} 
                  ref={ref}
                  className={`break-inside-avoid group relative rounded-sm overflow-hidden shadow-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <SafeImage 
                    src={src} 
                    alt={`Gallery ${i + 1}`} 
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About: Flagship V3 Split */}
      <section id="flagship" className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {(() => {
          const { ref, isVisible } = useScrollReveal();
          return (
            <div ref={ref} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-70">
                  Lagos, Nigeria
                </p>
                <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-[0.9] mb-8">
                  The Shasha Road <br/><span className="text-accent">Flagship</span>
                </h2>
                <p className="text-white/50 text-xl leading-relaxed mb-10 italic border-l-2 border-accent/30 pl-8">
                  &ldquo;Teefah Tailoring Accessories is more than a supplier; we are a partner in the creative process.&rdquo;
                </p>
                <p className="text-white/40 leading-relaxed mb-12">
                  Our flagship location on Shasha Road serves as a sanctuary for designers, providing the premium materials necessary to transform a sketch into a legend. Sharp delivery to every atelier across the nation is our standard.
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-px bg-accent/40" />
                  <span className="text-accent font-bold tracking-widest text-xs uppercase">Est. Since Inception</span>
                </div>
              </div>
              
              <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                <div className="aspect-square relative rounded-full overflow-hidden border-8 border-white/5 shadow-2xl animate-float">
                  <SafeImage src={IMAGES.products[2]} alt="Atelier Interior" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-accent p-8 rounded-sm shadow-2xl max-w-[240px]">
                  <p className="text-primary font-black text-sm uppercase tracking-widest mb-2">Heritage</p>
                  <p className="text-primary/70 text-xs font-medium">Supporting the Nigerian fashion industry with unrivaled excellence.</p>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Testimonials: T-MASONRY */}
      <section className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-primary leading-none text-center">Voices of the Atelier</h2>
          </div>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((t, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div 
                  key={i} 
                  ref={ref}
                  className={`break-inside-avoid bg-white p-10 rounded-sm shadow-xl border border-primary/5 relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="mb-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                  </div>
                  <p className="text-primary/80 text-2xl font-medium leading-relaxed mb-10 tracking-tight italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between border-t border-primary/5 pt-8">
                    <div>
                      <p className="font-heading font-black text-primary text-xl uppercase tracking-tighter">{t.name}</p>
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact: C3 (Wholesale Concierge) */}
      <section id="concierge" className="py-32 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 opacity-60">Procurement</p>
          <h2 className="font-heading text-6xl md:text-7xl font-black text-white mb-6">Wholesale Concierge</h2>
          <p className="text-white/40 mb-16 text-lg max-w-2xl mx-auto">
            Our concierge team specializes in high-volume textile procurement and custom trimmings for large collections. Let us source your next masterpiece.
          </p>
          
          <div className="text-left">
            <ContactForm />
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left border-t border-white/5 pt-16">
            <div>
              <p className="text-accent font-bold uppercase text-xs tracking-widest mb-3">WhatsApp</p>
              <a href="https://wa.me/message/YFREUNO2MON7D1" className="text-white/60 hover:text-white transition-colors">wa.me/message/YFREUNO2MON7D1</a>
            </div>
            <div>
              <p className="text-accent font-bold uppercase text-xs tracking-widest mb-3">Instagram</p>
              <a href="https://instagram.com/teefahtailoringaccessories" className="text-white/60 hover:text-white transition-colors">@teefahtailoringaccessories</a>
            </div>
            <div>
              <p className="text-accent font-bold uppercase text-xs tracking-widest mb-3">Flagship</p>
              <p className="text-white/60">Shasha Road Location, <br/> Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 border border-accent/20 text-accent w-10 h-10 flex items-center justify-center font-heading font-black text-xl rounded-sm">T</div>
            <div className="text-left">
              <p className="font-heading font-bold text-white tracking-[0.2em] text-xs">TEEFAH</p>
              <p className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Accessories</p>
            </div>
          </div>
          
          <div className="flex gap-8">
            <a href="https://instagram.com/teefahtailoringaccessories" className="text-white/30 hover:text-accent transition-colors">
              <Instagram size={20} />
            </a>
          </div>

          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} TEEFAH TAILORING ACCESSORIES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-white/[0.02] rounded-sm border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 relative z-10">
          <CheckCheck size={32} className="text-accent" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Request Received</h3>
        <p className="text-white/50 max-w-sm text-lg relative z-10">The concierge team will review your requirements and respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/[0.01] p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-10 border-l-4 border-accent pl-6 leading-none">Concierge Inquiry</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className={field === 'phone' ? 'md:col-span-2' : ''}>
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone Number'}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent group-hover:border-white/20"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <textarea rows={5} placeholder="Describe your wholesale needs or the materials you wish to source..."
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-accent text-primary py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} /> Processing...
            </span>
          ) : (
            <>
              Submit to Concierge <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}