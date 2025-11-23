import React from 'react';
import { Flame, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="ubicanos" className="bg-neutral-950 pt-12 md:pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full border border-yellow-500 overflow-hidden">
                                <img src="/logo-mambos.jpg" alt="Mambo's Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-black italic">MAMBO'S</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-sm mx-auto md:mx-0">
                            Comida rápida con estilo. Sabores peruanos fusionados con el mejor crunch de la ciudad.
                        </p>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="font-bold text-white mb-4 uppercase">Ubícanos</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-2">
                                <MapPin className="text-yellow-500 flex-shrink-0" size={16} />
                                <span>Urb. Los Cipreses P-40, Nuevo Chimbote</span>
                            </li>
                            <li className="flex flex-col md:flex-row items-center gap-2">
                                <Phone className="text-yellow-500" size={16} />
                                <span>+51 935 218 273</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs md:text-sm">
                    <p>&copy; 2025 Mambo's Fast Food.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="https://www.instagram.com/mambos_pe/?hl=es-la" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <Instagram />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Facebook />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
