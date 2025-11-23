import { useState, useEffect, useRef } from 'react';

// Hook personalizado para detectar cuando un elemento entra y sale de la pantalla
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // ACTUALIZACIÓN: Ahora actualizamos el estado cada vez que entra O sale
            // Esto permite que la animación se repita al subir y bajar (efecto "vivo")
            setIsVisible(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, options]);

    return [ref, isVisible];
};

export default useOnScreen;
