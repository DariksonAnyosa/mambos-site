import React, { useState } from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { menuItems } from '../data/menuItems';
import { ChevronRight, Star } from 'lucide-react';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('alitas');

    const categories = [
        { id: 'alitas', label: 'Alitas' },
        { id: 'broasters_crispy', label: 'Broasters' },
        { id: 'salchipapas', label: 'Salchipapas' },
        { id: 'bebidas', label: 'Bebidas' },
        { id: 'extras', label: 'Extras' }
    ];

    const renderAlitas = () => (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Tabla Clásicas */}
                <div className="bg-neutral-900 rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <h3 className="text-2xl font-black italic text-yellow-500 mb-6">Alitas Clásicas</h3>
                    <div className="space-y-4">
                        {menuItems.alitas.clasicas.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-end border-b border-white/10 pb-3 last:border-0">
                                <span className="text-white font-bold text-lg">{item.piezas} Piezas</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-500 text-xs mb-1">{item.salsas_incluidas} salsas</span>
                                    <span className="text-yellow-500 font-black text-2xl leading-none">S/ {item.precio}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabla Broaster */}
                <div className="bg-neutral-900 rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <h3 className="text-2xl font-black italic text-yellow-500 mb-6">Alitas Broaster</h3>
                    <div className="space-y-4">
                        {menuItems.alitas.broaster.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-end border-b border-white/10 pb-3 last:border-0">
                                <span className="text-white font-bold text-lg">{item.piezas} Piezas</span>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-500 text-xs mb-1">{item.salsas_incluidas} salsas</span>
                                    <span className="text-yellow-500 font-black text-2xl leading-none">S/ {item.precio}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Salsas */}
            <div className="bg-neutral-900 rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} /> Salsas Disponibles
                </h3>
                <div className="flex flex-wrap gap-3">
                    {menuItems.salsas_alitas.map((salsa, idx) => (
                        <span key={idx} className="bg-neutral-800 text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-white/5 hover:border-yellow-500/50 transition-colors cursor-default">
                            {salsa}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderList = (items, type = 'simple') => (
        <div className="grid md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
                <ScrollReveal key={idx} delay={idx * 50} direction="up">
                    <div className="bg-neutral-900 rounded-xl p-4 border border-white/5 hover:border-yellow-500/30 transition-all flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-white text-lg">{item.nombre}</h4>
                            {item.descripcion && <p className="text-gray-400 text-sm mt-1">{item.descripcion}</p>}
                        </div>
                        <span className="text-yellow-500 font-black text-xl whitespace-nowrap ml-4">S/ {item.precio}</span>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    );

    const renderBebidas = () => (
        <div className="space-y-8">
            {Object.entries(menuItems.bebidas).map(([category, items]) => (
                <div key={category}>
                    <h3 className="text-xl font-black text-yellow-500 uppercase mb-4 border-l-4 border-yellow-500 pl-3">
                        {category}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-neutral-900 p-3 rounded-lg border border-white/5">
                                <span className="text-white font-medium">{item.nombre}</span>
                                <span className="text-yellow-500 font-bold">S/ {item.precio}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section id="menu" className="py-12 md:py-20 bg-black relative z-20">
            <div className="container mx-auto px-4 md:px-6">
                <ScrollReveal>
                    <div className="text-center mb-8 md:mb-12">
                        <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm md:text-base">Explora nuestros sabores</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase italic mt-2 text-white">La Carta Mambo's</h2>
                    </div>
                </ScrollReveal>

                {/* Tabs */}
                <ScrollReveal direction="left" delay={200}>
                    <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-2 md:px-0 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex-shrink-0 px-6 py-2 md:px-8 md:py-3 rounded-full font-black uppercase text-sm md:text-base transition-all ${activeCategory === category.id ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-gray-400 border border-white/10'}`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Content */}
                <div className="min-h-[400px]">
                    {activeCategory === 'alitas' && renderAlitas()}
                    {activeCategory === 'broasters_crispy' && renderList(menuItems.broasters_crispy)}
                    {activeCategory === 'salchipapas' && renderList(menuItems.salchipapas)}
                    {activeCategory === 'bebidas' && renderBebidas()}
                    {activeCategory === 'extras' && renderList(menuItems.extras)}
                </div>
            </div>
        </section>
    );
};

export default Menu;
