import React, { useState } from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { menuItems } from '../data/menuItems';

// --- CONFIGURACIÓN API GEMINI ---
// --- CONFIGURACIÓN API GEMINI ---
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // La clave se inyectará en tiempo de ejecución

const GeminiAI = () => {
    const [aiInput, setAiInput] = useState('');
    const [aiResponse, setAiResponse] = useState(null);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiError, setAiError] = useState(null);

    const handleAskGemini = async () => {
        if (!aiInput.trim()) return;

        setIsAiLoading(true);
        setAiResponse(null);
        setAiError(null);

        try {
            const menuContext = JSON.stringify(menuItems);
            const systemPrompt = `
            Eres "El Tío Mambo", el dueño carismático de "Mambo's Fast Food" en Perú.
            DATOS DEL MENÚ: ${menuContext}
            PERSONALIDAD: Jerga peruana moderada (causa, buenazo, al toque). Divertido.
            MISIÓN: Recomienda UN plato del menú basado en el input del usuario.
            FORMATO: Saludo, Plato Recomendado, Razón corta. Máx 3 líneas.
        `;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `Usuario dice: "${aiInput}"` }] }],
                        systemInstruction: { parts: [{ text: systemPrompt }] }
                    }),
                }
            );

            if (!response.ok) throw new Error('Error al conectar con el Tío Mambo');
            const data = await response.json();
            setAiResponse(data.candidates?.[0]?.content?.parts?.[0]?.text);

        } catch (error) {
            console.error(error);
            setAiError("¡Uy causa! Se me fue la señal. Intenta de nuevo.");
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <section id="ia-mambo" className="py-12 md:py-20 bg-gradient-to-b from-neutral-900 to-black relative border-y border-white/10">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-8">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-4 text-white">
                        ¿Indeciso? <br />
                        <span className="text-yellow-500">El Tío Mambo Ayuda</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base">
                        Cuéntame qué se te antoja o cuánto traes. Te recomiendo al toque.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-neutral-800 rounded-2xl p-1 border border-white/10">
                    <div className="bg-neutral-900/80 rounded-xl p-4 md:p-8 backdrop-blur-sm">
                        <div className="space-y-4 mb-6">
                            {aiResponse && (
                                <div className="flex gap-4 items-start animate-in fade-in">
                                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-black">
                                        <Flame className="text-black w-5 h-5" fill="currentColor" />
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-100 p-3 rounded-2xl rounded-tl-none text-sm md:text-base">
                                        <p className="whitespace-pre-line font-medium">{aiResponse}</p>
                                    </div>
                                </div>
                            )}
                            {aiError && <div className="text-red-400 text-sm text-center">{aiError}</div>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                placeholder="Ej: Tengo 20 soles y quiero algo picante..."
                                className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-3 md:py-4 text-white text-sm md:text-base placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleAskGemini()}
                            />
                            <button
                                onClick={handleAskGemini}
                                disabled={isAiLoading || !aiInput.trim()}
                                className={`px-6 py-3 md:py-4 rounded-xl font-black uppercase text-sm md:text-base flex items-center justify-center gap-2 ${isAiLoading ? 'bg-neutral-700 text-gray-500' : 'bg-yellow-500 text-black hover:scale-105'}`}
                            >
                                {isAiLoading ? "Pensando..." : "Recomiéndame"} <Sparkles size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeminiAI;
