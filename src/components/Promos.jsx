import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { Flame, Clock, ShoppingBag, Utensils } from 'lucide-react';

const Promos = () => {
    return (
        <section id="promos" className="py-12 md:py-20 bg-neutral-900 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal direction="right">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-6">Promos & <span className="text-yellow-500">Ganchos</span></h2>
                            <div className="space-y-6">
                                {[
                                    { icon: <Flame size={24} />, title: "Salsas de Otro Mundo", desc: "9 sabores para explotar tu paladar." },
                                    { icon: <Clock size={24} />, title: "Siempre Fresco", desc: "Pollo fresco empanizado al momento." },
                                    { icon: <ShoppingBag size={24} />, title: "Packaging Top", desc: "Tu pedido llega caliente y facherito." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="bg-neutral-800 p-3 rounded-lg text-yellow-500">{item.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-lg md:text-xl">{item.title}</h4>
                                            <p className="text-gray-400 text-sm md:text-base">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={300}>
                        <div className="mt-8 md:mt-0 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-1 transform md:rotate-2 shadow-2xl">
                            <div className="bg-black rounded-2xl p-8 text-center min-h-[250px] flex flex-col items-center justify-center">
                                <Utensils className="text-yellow-500 w-12 h-12 mb-4" />
                                <h3 className="text-2xl md:text-4xl font-black uppercase italic mb-2 text-white">
                                    ¡Atento a las <br /><span className="text-yellow-500">Redes!</span>
                                </h3>
                                <a
                                    href="https://www.instagram.com/mambos_pe/?hl=es-la"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-block bg-white text-black font-bold px-8 py-3 rounded-full text-sm md:text-base hover:bg-yellow-500 transition-colors"
                                >
                                    IR A INSTAGRAM
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Promos;
