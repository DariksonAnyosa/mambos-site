import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, MapPin, Phone, ChevronRight, Instagram, Facebook, Menu, X, Flame, Utensils, Sparkles, ArrowRight, Send, XCircle, Clock } from 'lucide-react';

import { menuItems } from './data/menuItems';

// --- CONFIGURACIÓN GLOBAL ---
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Inyectada desde .env

// --- ASSETS PREMIUM (Dark & Moody) ---
const ASSETS = {
  wingsHero: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=1000&auto=format&fit=crop", // Alitas oscuras alta calidad
  texture: "https://www.transparenttextures.com/patterns/stardust.png",
  smokeOverlay: "https://media.istockphoto.com/id/1130559099/video/smoke-on-black-background.jpg?s=640x640&k=20&c=4yKqXWDdJKVvWdGLJzH7_yKz6yL9z5z5z5z5z5z5z5z", // Concepto
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
  salchi: "https://images.unsplash.com/photo-1585109649139-3668018951a7?q=80&w=800&auto=format&fit=crop"
};

// --- HOOKS DE ALTO RENDIMIENTO ---

// Smooth Scroll & Parallax Logic
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

// Intersection Observer para Reveals
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [options]);

  return [ref, isVisible];
};

// Mouse Tracker para efectos Tilt
const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return mousePos;
};

// --- COMPONENTES VISUALES ---

const Reveal = ({ children, className, delay = 0, direction = 'up' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const transform = {
    up: 'translateY(50px)',
    down: 'translateY(-50px)',
    left: 'translateX(50px)',
    right: 'translateX(-50px)'
  };

  return (
    <div ref={ref} className={`${className} transition-all duration-1000 cubic-bezier(0.22, 1, 0.36, 1)`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0,0)' : transform[direction],
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const MagneticButton = ({ children, className, onClick }) => {
  // Simplificación de botón magnético para React sin librerías pesadas
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden transition-transform duration-300 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

// --- MENÚ DE NAVEGACIÓN ---
const Navbar = ({ scrollY, toggleMenu, toggleOrder }) => (
  <nav className={`fixed w-full z-50 transition-all duration-700 ${scrollY > 50 ? 'py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
    <div className="container mx-auto px-6 flex justify-between items-center">
      <div className="flex items-center gap-4 group cursor-pointer">
        <img src="/logo-blanco.png" alt="Mambo's Logo" className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
      </div>

      <div className="hidden lg:flex items-center gap-12">
        {['Carta', 'Concierge', 'Ubicación'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
        <MagneticButton onClick={toggleOrder} className="bg-white text-black px-8 py-3 rounded-full font-black tracking-wider hover:bg-yellow-500 hover:shadow-[0_0_30px_rgba(255,200,0,0.4)] transition-all">
          PEDIR AHORA
        </MagneticButton>
      </div>

      <button className="lg:hidden text-white" onClick={toggleMenu}><Menu size={32} /></button>
    </div>
  </nav>
);

// --- SECCIÓN: CONCIERGE (Chatbot Rediseñado) ---
const ConciergeSection = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const menuContext = JSON.stringify(menuItems);
      const prompt = `
        Eres "El Tío Mambo", dueño de Mambo's Fast Food.
        TU MENÚ ES ESTE Y SOLO ESTE: ${menuContext}.
        NO inventes platos. NO recomiendes nada que no esté en esa lista.
        Si te dicen un monto (ej. "tengo 20 soles"), busca en el menú qué alcanza con ese dinero y recomiéndalo.
        Tu tono es: peruano callejero fino ("batería", "causa", "fino"), breve y directo.
        Usuario dice: "${input}".
        Responde en máximo 25 palabras.
      `;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      setResponse(data.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (e) { console.error(e); } finally { setLoading(false); }

  };

  return (
    <section id="concierge" className="py-32 relative border-t border-white/5 bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-900 to-transparent opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/2">
          <Reveal>
            <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Mambo's AI Concierge</span>
            <h2 className="text-5xl md:text-7xl font-black italic mb-8 text-white leading-[0.9]">
              ¿INDECISO? <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">DÉJANOS GUIARTE</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-md mb-10">Nuestro sistema inteligente conoce el sabor exacto para tu estado de ánimo. Pruébalo.</p>
          </Reveal>
        </div>

        <div className="w-full lg:w-1/2">
          <Reveal delay={200} direction="left">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-yellow-500/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles size={40} /></div>

              <div className="min-h-[100px] flex items-center justify-center mb-8">
                {loading ? (
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                ) : response ? (
                  <p className="text-xl md:text-2xl font-medium text-white text-center animate-in fade-in italic">"{response}"</p>
                ) : (
                  <p className="text-neutral-600 italic text-center">"¿Qué se te antoja hoy, jefe?"</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                  placeholder="Algo picante, algo crocante..."
                  className="w-full bg-white/5 border-b border-white/20 px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-500 transition-colors font-medium text-lg bg-transparent"
                />
                <button
                  onClick={handleAsk}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-white transition-colors p-2"
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- PÁGINA PRINCIPAL ---
const App = () => {
  const scrollY = useScroll();
  const mousePos = useMousePosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);

  // Efecto para bloquear scroll si hay modales
  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isOrderOpen || showFullMenu) ? 'hidden' : 'unset';
  }, [isMenuOpen, isOrderOpen, showFullMenu]);

  return (
    <div className="bg-[#020202] text-white min-h-screen font-sans selection:bg-yellow-500 selection:text-black">

      {/* BACKGROUND NOISE & LIGHTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-yellow-900/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-neutral-800/20 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <Navbar scrollY={scrollY} toggleMenu={() => setIsMenuOpen(true)} toggleOrder={() => setIsOrderOpen(true)} />

      {/* --- HERO SECTION: CINEMATIC 3D --- */}
      <section className="relative min-h-[110vh] flex items-center overflow-hidden pt-20">
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col lg:flex-row items-center">

          {/* LEFT: TYPOGRAPHY */}
          <div className="w-full lg:w-5/12 relative z-20 order-2 lg:order-1 mt-10 lg:mt-0 text-center lg:text-left">
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-3 mb-6 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-neutral-300">Abierto hasta las 11PM</span>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <h1 className="text-[15vw] lg:text-[9rem] font-black leading-[0.8] italic tracking-tighter mb-4 lg:mb-8 text-white mix-blend-normal drop-shadow-2xl">
                ALITAS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 relative z-10">ROYAL</span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-neutral-400 text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0 mb-10 font-light border-l-2 border-yellow-500/50 pl-6">
                La fusión definitiva entre la calle y la alta cocina. <br />
                <strong className="text-white">Crujiente. Jugoso. Adictivo.</strong>
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button
                  onClick={() => setIsOrderOpen(true)}
                  className="bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1"
                >
                  PEDIR <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => setShowFullMenu(true)}
                  className="px-10 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
                >
                  VER CARTA
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: 3D COMPOSITION */}
          <div className="w-full lg:w-7/12 relative h-[50vh] lg:h-[80vh] flex items-center justify-center perspective-2000 order-1 lg:order-2">
            {/* Main Plate - Parallax with Mouse */}
            <div
              className="relative z-30 w-[90%] max-w-[700px] transition-transform duration-100 ease-out origin-center"
              style={{
                transform: `
                  rotateX(${mousePos.y * -5}deg) 
                  rotateY(${mousePos.x * -5}deg)
                  translateY(${scrollY * 0.1}px)
                `
              }}
            >
              {/* Glow Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-500/20 blur-[100px] rounded-full"></div>

              <img
                src={ASSETS.wingsHero}
                alt="Alitas Mambos Hero"
                className="w-full h-auto object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.7)] filter contrast-125 brightness-110"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)' }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse">
          <span className="text-[10px] uppercase tracking-[0.3em]">Descubre</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* --- SECCIÓN: FILOSOFÍA (Texto Cinético) --- */}
      <section className="py-32 bg-[#050505] relative z-10">
        <div className="container mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black text-center leading-tight text-neutral-200 mb-16">
              NO ES COMIDA RÁPIDA. <br />
              ES <span className="italic text-yellow-500">ARTE CALLEJERO</span> COMESTIBLE.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock size={32} />, title: "Tiempo Real", desc: "Nada congelado. Se cocina cuando lo pides." },
              { icon: <Utensils size={32} />, title: "Sabor Bruto", desc: "Salsas artesanales creadas en casa, sin químicos." },
              { icon: <ShoppingBag size={32} />, title: "Packaging Top", desc: "Tu comida viaja en primera clase hasta tu puerta." }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100} className="p-8 border border-white/5 hover:border-yellow-500/50 bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] transition-all duration-500 group">
                <div className="text-neutral-500 group-hover:text-yellow-500 transition-colors mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold uppercase mb-3 text-white">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: MENU TEASER (Galería) --- */}
      <section id="carta" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
            <Reveal>
              <span className="text-yellow-500 font-bold tracking-widest uppercase">La Colección</span>
              <h2 className="text-5xl md:text-7xl font-black italic text-white mt-2">NUESTROS HITS</h2>
            </Reveal>
            <Reveal delay={200}>
              <button onClick={() => setShowFullMenu(true)} className="hidden md:flex items-center gap-2 text-white border-b border-white pb-1 hover:text-yellow-500 hover:border-yellow-500 transition-all uppercase font-bold text-sm tracking-widest">
                Explorar Menú Completo <ArrowRight size={16} />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Grande 1 */}
            <div className="group relative h-[600px] md:col-span-1 overflow-hidden rounded-[2rem] cursor-pointer" onClick={() => setShowFullMenu(true)}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-20"></div>
              <img src={ASSETS.wingsHero} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-10 z-30 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <h3 className="text-5xl font-black italic text-white mb-2">ALITAS</h3>
                <p className="text-neutral-300 max-w-xs">12 variedades de salsas. Desde la dulce BBQ hasta el infierno del Rocoto.</p>
              </div>
            </div>

            <div className="flex flex-col gap-8 h-[600px]">
              {/* Card Pequeña 1 */}
              <div className="group relative h-1/2 overflow-hidden rounded-[2rem] cursor-pointer" onClick={() => setShowFullMenu(true)}>
                <img src={ASSETS.burger} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-3xl font-black italic text-white">BURGERS</h3>
                </div>
              </div>
              {/* Card Pequeña 2 */}
              <div className="group relative h-1/2 overflow-hidden rounded-[2rem] cursor-pointer" onClick={() => setShowFullMenu(true)}>
                <img src={ASSETS.salchi} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-3xl font-black italic text-white">SALCHIS</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConciergeSection />

      {/* --- FOOTER: MAPA & SOCIAL --- */}
      <footer id="ubicacion" className="bg-neutral-950 border-t border-white/5 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h3 className="text-3xl font-black italic mb-8 text-white">UBÍCANOS</h3>
              <div className="space-y-6 text-neutral-400">
                <div className="flex items-start gap-4">
                  <MapPin className="text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold">Urb. Los Cipreses P-40 – Nuevo Chimbote</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold">Delivery & Reservas</p>
                    <p>(043) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[300px] w-full rounded-3xl overflow-hidden bg-neutral-900 grayscale hover:grayscale-0 transition-all duration-500 border border-white/10 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.865576978644!2d-78.5326889241416!3d-9.12988869356656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ab85b27566666d%3A0x66a6666666666666!2sNuevo%20Chimbote!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent pointer-events-none transition-colors"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Flame className="text-yellow-500 w-5 h-5" />
              <span className="font-black italic tracking-tighter text-xl">MAMBO'S</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
            <p className="text-neutral-600 text-xs mt-4 md:mt-0">© 2025 Mambo's Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}

      {/* MENU FULL OVERLAY (Como otra página) */}
      {showFullMenu && (
        <div className="fixed inset-0 z-[70] bg-[#050505] overflow-y-auto animate-in slide-in-from-bottom duration-500">
          <div className="container mx-auto px-6 py-20">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-6xl font-black italic text-white">MENÚ COMPLETO</h2>
              <button onClick={() => setShowFullMenu(false)} className="p-4 rounded-full bg-white/10 hover:bg-white hover:text-black transition-all">
                <X size={32} />
              </button>
            </div>
            {/* Aquí iría la lógica completa del menú, simulada por brevedad */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-neutral-900 p-6 rounded-2xl border border-white/5 flex gap-4 items-center">
                  <div className="w-24 h-24 bg-neutral-800 rounded-xl"></div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Plato #{i}</h4>
                    <p className="text-neutral-500 text-sm mb-2">Descripción deliciosa...</p>
                    <span className="text-yellow-500 font-bold">S/ 24.90</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ORDER MODAL (Minimalista) */}
      {isOrderOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#111] border border-white/10 w-full max-w-md p-10 rounded-[2rem] relative shadow-2xl">
            <button onClick={() => setIsOrderOpen(false)} className="absolute top-6 right-6 text-neutral-500 hover:text-white"><XCircle size={28} /></button>
            <h3 className="text-3xl font-black italic text-white mb-2 text-center">ELIGE TU VIAJE</h3>
            <p className="text-center text-neutral-500 mb-10">Selecciona cómo quieres recibir tu pedido</p>

            <div className="space-y-4">
              <button className="w-full bg-[#25D366] text-white p-5 rounded-xl font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all">
                <MessageCircle /> WhatsApp (Directo)
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white/5 hover:bg-white/10 p-5 rounded-xl font-bold text-white border border-white/5">Rappi</button>
                <button className="bg-white/5 hover:bg-white/10 p-5 rounded-xl font-bold text-white border border-white/5">PedidosYa</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .perspective-2000 { perspective: 2000px; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 10s infinite; }
      `}</style>
    </div>
  );
};

export default App;
