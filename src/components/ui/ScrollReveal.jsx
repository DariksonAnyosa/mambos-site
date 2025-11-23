import React from 'react';
import useOnScreen from '../../hooks/useOnScreen';

// Componente para animar secciones al hacer scroll (Bidireccional)
const ScrollReveal = ({ children, className, delay = 0, direction = 'up' }) => {
    // Threshold 0.15 asegura que el elemento esté un poco adentro antes de animar
    const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

    const getTransform = () => {
        if (direction === 'left') return 'translateX(-50px)';
        if (direction === 'right') return 'translateX(50px)';
        return 'translateY(50px)'; // up
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className}`} // Reduje un poco la duración para que se sienta más ágil al scrollear rápido
            style={{
                opacity: isVisible ? 1 : 0,
                // Cuando no es visible, vuelve a su posición original desplazada (efecto rebobinado)
                transform: isVisible ? 'translate(0,0) scale(1)' : `${getTransform()} scale(0.95)`,
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
