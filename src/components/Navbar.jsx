import React, { useState } from 'react';
import { ShoppingBag, Flame, Sparkles, Menu, X } from 'lucide-react';

const Navbar = ({ scrollY }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 20 || isMenuOpen ? 'bg-black/40 backdrop-blur-xl py-3 border-b border-white/10 shadow-lg' : 'bg-transparent py-4 lg:py-6'}`}>
            <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">

                {/* LOGO */}
                <div className="flex items-center gap-3 group cursor-pointer z-50 flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-yellow-500 overflow-hidden shadow-lg">
                        <img src="/logo-mambos.jpg" alt="Mambo's Logo" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold uppercase tracking-wide text-sm">
                    <a href="#menu" className="hover:text-yellow-400 transition-colors whitespace-nowrap">La Carta</a>
                    <a href="#ia-mambo" className="hover:text-yellow-400 transition-colors flex items-center gap-1 whitespace-nowrap"><Sparkles size={14} /> Tío Mambo</a>
                    <a href="#promos" className="hover:text-yellow-400 transition-colors whitespace-nowrap">Promos</a>
                    <a href="#ubicanos" className="hover:text-yellow-400 transition-colors whitespace-nowrap">Ubícanos</a>
                    <a href="#menu" className="bg-yellow-500 text-black px-5 py-2 rounded-full font-black hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,200,0,0.6)] flex items-center gap-2 whitespace-nowrap">
                        PEDIR AHORA <ShoppingBag size={18} />
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden text-white z-50 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} className="text-yellow-500" /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                <a href="#menu" className="text-2xl font-black italic text-white hover:text-yellow-500" onClick={() => setIsMenuOpen(false)}>LA CARTA</a>
                <a href="#ia-mambo" className="text-2xl font-black italic text-white hover:text-yellow-500 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}><Sparkles /> TÍO MAMBO AI</a>
                <a href="#promos" className="text-2xl font-black italic text-white hover:text-yellow-500" onClick={() => setIsMenuOpen(false)}>PROMOS</a>
                <a href="#ubicanos" className="text-2xl font-black italic text-white hover:text-yellow-500" onClick={() => setIsMenuOpen(false)}>UBÍCANOS</a>
                <a href="#menu" className="mt-4 bg-yellow-500 text-black px-8 py-3 rounded-full font-black text-lg shadow-[0_0_30px_rgba(255,200,0,0.4)]" onClick={() => setIsMenuOpen(false)}>
                    PEDIR DELIVERY
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
