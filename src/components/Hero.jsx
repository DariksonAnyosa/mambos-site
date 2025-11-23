import React, { useState, useRef } from 'react';
import { Flame, ArrowRight, Utensils, ShoppingBag, MessageCircle, ChevronRight, Bike, Phone, X } from 'lucide-react';

const Hero = ({ scrollY }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const heroRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 40;
        const y = (e.clientY - top - height / 2) / 40;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <>
            <section
                className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden perspective-3d"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                ref={heroRef}
            >
                {/* FONDO DINÁMICO */}
                <div className="absolute inset-0 bg-neutral-900 z-0">
                    {/* Gradiente Radial "Foco" */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-500/10 via-neutral-900 to-black opacity-60"></div>
                    {/* Texto de Fondo Gigante (Marca de Agua) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
                        <h1 className="text-[20vw] font-black text-white leading-none whitespace-nowrap animate-[marquee_60s_linear_infinite]">
                            MAMBO'S FOOD • ALITAS • BURGERS •
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full pt-20 lg:pt-0">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-0 h-full">

                        {/* IZQUIERDA: TEXTO Y CTA */}
                        <div className="w-full lg:w-5/12 text-center lg:text-left z-20 flex flex-col items-center lg:items-start space-y-6 pb-10 lg:pb-0">
                            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 text-yellow-500 text-xs md:text-sm font-bold tracking-wider uppercase animate-fade-in-up">
                                <Flame size={14} className="animate-pulse" />
                                El Sabor que necesitas
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] italic text-white drop-shadow-2xl">
                                ALITAS <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 relative inline-block">
                                    EXTREMAS
                                    {/* Subrayado decorativo */}
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-white opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                                Olvídate de lo aburrido. Aquí se come con las manos, se disfruta el crunch y se vive el sabor peruano.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                                <button
                                    onClick={() => setIsOrderModalOpen(true)}
                                    className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-black text-lg hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(255,200,0,0.3)] hover:shadow-[0_0_50px_rgba(255,200,0,0.5)] flex items-center justify-center gap-3 group w-full sm:w-auto hover:-translate-y-1"
                                >
                                    PEDIR AHORA
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <a href="#menu" className="px-8 py-4 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all w-full sm:w-auto hover:border-yellow-500/50 flex items-center justify-center">
                                    VER EL MENÚ
                                </a>
                            </div>
                        </div>

                        {/* DERECHA: ESCENA 3D */}
                        <div className="w-full lg:w-7/12 relative h-[40vh] md:h-[50vh] lg:h-[70vh] flex items-center justify-center perspective-container">
                            {/* Contenedor Transformable */}
                            <div
                                className="relative w-full max-w-[500px] aspect-square transform-3d transition-transform duration-100 ease-out"
                                style={{
                                    transform: `
                            rotateX(${mousePosition.y * 0.5}deg) 
                            rotateY(${mousePosition.x * 0.5}deg)
                            translateY(${scrollY * 0.15}px)
                        `
                                }}
                            >
                                {/* PLATO PRINCIPAL */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <img
                                        src="https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&q=80&w=1000"
                                        alt="Alitas Mambos"
                                        className="w-[85%] md:w-full h-auto object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.6)] animate-float-slow"
                                        style={{
                                            clipPath: 'polygon(10% 0, 100% 0%, 100% 90%, 50% 100%, 0 80%)',
                                            filter: 'contrast(1.15) saturate(1.1)'
                                        }}
                                    />
                                </div>

                                {/* ELEMENTOS FLOTANTES */}
                                <div className="absolute top-1/4 right-0 text-orange-600/40 blur-sm transform translate-z-[-40px] animate-pulse">
                                    <Flame size={120} />
                                </div>

                                <div
                                    className="absolute bottom-[10%] left-[5%] md:left-[-20px] z-30 transform translate-z-[60px]"
                                    style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
                                >
                                    <div className="bg-white text-black p-4 md:p-5 rounded-2xl shadow-2xl -rotate-12 border-l-8 border-yellow-500 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">Desde</span>
                                        <span className="text-2xl md:text-4xl font-black leading-none">S/ 24.90</span>
                                    </div>
                                </div>

                                <div
                                    className="absolute top-[5%] right-[5%] md:right-0 z-30 transform translate-z-[40px] rotate-12"
                                    style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
                                >
                                    <div className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-sm md:text-base shadow-lg shadow-red-600/40 animate-bounce-slow">
                                        ★ NUEVA RECETA
                                    </div>
                                </div>

                                <div className="absolute top-1/2 -right-10 text-yellow-500 transform translate-z-[80px] animate-float-delayed">
                                    <Utensils size={40} className="drop-shadow-lg" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <style>{`
        .perspective-3d { perspective: 1000px; }
        .transform-3d { transform-style: preserve-3d; }
        .translate-z-\[-40px\] { transform: translateZ(-40px); }
        .translate-z-\[40px\] { transform: translateZ(40px); }
        .translate-z-\[60px\] { transform: translateZ(60px); }
        .translate-z-\[80px\] { transform: translateZ(80px); }
        
        @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
            </section>

            {/* MODAL DE PEDIDO */}
            {isOrderModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOrderModalOpen(false)}
                    ></div>

                    <div className="relative bg-neutral-900 border border-yellow-500/30 w-full max-w-md rounded-3xl p-8 shadow-[0_0_50px_rgba(255,200,0,0.2)] transform animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsOrderModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-8">
                            <div className="inline-block bg-yellow-500 p-3 rounded-full mb-4 shadow-lg">
                                <ShoppingBag size={32} className="text-black" />
                            </div>
                            <h3 className="text-3xl font-black uppercase italic text-white mb-2">¡Pide tu Bajón!</h3>
                            <p className="text-gray-400 text-sm">Elige tu forma favorita de ordenar. <br />¡Te atendemos al toque!</p>
                        </div>

                        <div className="space-y-4">
                            <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-xl font-bold flex items-center justify-between group transition-all hover:scale-[1.02] shadow-lg">
                                <div className="flex items-center gap-3">
                                    <MessageCircle size={24} className="fill-white text-white" />
                                    <div className="text-left">
                                        <span className="block text-xs opacity-90 uppercase tracking-wider">Chat Directo</span>
                                        <span className="text-lg">WhatsApp</span>
                                    </div>
                                </div>
                                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-neutral-800 hover:bg-neutral-700 border border-white/10 p-4 rounded-xl font-bold text-left transition-all hover:border-yellow-500/50 group">
                                    <Bike size={24} className="text-yellow-500 mb-2" />
                                    <span className="block text-sm text-gray-400 group-hover:text-white">Pedir por</span>
                                    <span className="text-lg">Rappi</span>
                                </button>
                                <button className="bg-neutral-800 hover:bg-neutral-700 border border-white/10 p-4 rounded-xl font-bold text-left transition-all hover:border-yellow-500/50 group">
                                    <Bike size={24} className="text-red-500 mb-2" />
                                    <span className="block text-sm text-gray-400 group-hover:text-white">Pedir por</span>
                                    <span className="text-lg">PedidosYa</span>
                                </button>
                            </div>

                            <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-white/5 hover:border-white/20">
                                <Phone size={20} className="text-gray-400" />
                                <span>Llamar al Local</span>
                            </button>
                        </div>

                        <div className="mt-8 text-center border-t border-white/5 pt-4">
                            <p className="text-xs text-gray-500">
                                Horario de atención: Mar - Dom | 5:00 PM - 11:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Hero;
