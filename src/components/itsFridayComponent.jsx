import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

// Componente para una partícula individual del fuego artificial
const FireworkParticle = ({ color, delay, x, y }) => (
  <div 
    className="particle"
    style={{
      '--x': x,
      '--y': y,
      '--delay': `${delay}s`,
      '--color': color
    }}
  />
);

// Componente para un fuego artificial completo
const FireworkDisplay = ({ top, left, particleCount = 20, baseDelay = 0 }) => {
  // Array de colores vivos para los fuegos artificiales
  const colors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
  ];
  
  // Crear array de partículas
  const particles = [...Array(particleCount)].map((_, i) => {
    // Ángulo distribuido en 360 grados
    const angle = (i / particleCount) * Math.PI * 2;
    // Aleatorizar un poco la posición
    const variance = Math.random() * 0.4 + 0.8;
    // Coordenadas x,y para la animación
    const x = Math.cos(angle) * variance;
    const y = Math.sin(angle) * variance;
    
    return {
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: baseDelay + Math.random() * 0.3,
      x,
      y
    };
  });

  return (
    <div className="firework-display" style={{ top: `${top}%`, left: `${left}%` }}>
      {particles.map((props, i) => (
        <FireworkParticle key={i} {...props} />
      ))}
    </div>
  );
};

const Fireworks = () => {
  // Definir posiciones para varios fuegos artificiales
  const fireworkPositions = [
    { top: 20, left: 20, delay: 0, particles: 24 },
    { top: 40, left: 60, delay: 0.5, particles: 30 },
    { top: 70, left: 30, delay: 1, particles: 20 },
    { top: 30, left: 80, delay: 1.5, particles: 28 },
    { top: 60, left: 50, delay: 2, particles: 32 },
    { top: 50, left: 10, delay: 2.5, particles: 22 },
    { top: 80, left: 70, delay: 3, particles: 26 }
  ];

  return (
    <div className="fireworks-container">
      {fireworkPositions.map((pos, i) => (
        <FireworkDisplay 
          key={i} 
          top={pos.top} 
          left={pos.left} 
          particleCount={pos.particles} 
          baseDelay={pos.delay}
        />
      ))}
      
      <style jsx>{`
        .fireworks-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          overflow: hidden;
          z-index: 1000;
        }
        
        .firework-display {
          position: absolute;
          width: 6px;
          height: 6px;
          transform: translate(-50%, -50%);
        }
        
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--color);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: explode 1.8s ease-out infinite;
          animation-delay: var(--delay);
          opacity: 0;
        }
        
        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            box-shadow: 0 0 3px 1px var(--color);
          }
          5% {
            opacity: 1;
          }
          30% {
            transform: translate(
              calc(-50% + (var(--x) * 80px)), 
              calc(-50% + (var(--y) * 80px))
            ) scale(0.8);
            opacity: 1;
            box-shadow: 0 0 5px 2px var(--color);
          }
          100% {
            transform: translate(
              calc(-50% + (var(--x) * 120px)), 
              calc(-50% + (var(--y) * 120px))
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

const ItsFridayComponent = () => {
  const [queDia, setQueDia] = useState();
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 = Domingo, 5 = Viernes
    setQueDia(diaSemana);
    
    // Verificar si es viernes (día 5)
    if (diaSemana === 5) {
      setShowFireworks(true);
    }
  }, []);

  // Función para mostrar fuegos artificiales a petición
  const celebrar = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 10000); // Mostrar durante 10 segundos
  };

  return (
    <div className="viernes-container">
      <div className="viernes-content">¿Es Viernes?
        <h1 className={queDia === 5 ? "es-viernes" : "no-viernes"}>
          {queDia === 5 ? '¡Sí, es viernes! 🎉' : 'No, todavía no es viernes 😢'}
        </h1>
        
        {queDia !== 5 && (
          <button 
            className="btn-celebrar" 
            onClick={celebrar}
          >
            ¡Celebrar de todos modos!
          </button>
        )}
      </div>
      
      {(queDia === 5 || showFireworks) && <Fireworks />}
      
      <style jsx>{`
        .viernes-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          font-family: 'Arial', sans-serif;
          position: relative;
        }
        
        .viernes-content {
          text-align: center;
          padding: 30px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }
        
        .es-viernes {
          color: #ff4081;
          animation: pulse 2s infinite;
        }
        
        .no-viernes {
          color: #546e7a;
        }
        
        .btn-celebrar {
          padding: 12px 24px;
          background: linear-gradient(45deg, #ff4081, #7c4dff);
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(124, 77, 255, 0.4);
        }
        
        .btn-celebrar:hover {
          transform: translateY(-3px);
          box-shadow: 0 7px 20px rgba(124, 77, 255, 0.6);
        }
        
        .btn-celebrar:active {
          transform: translateY(1px);
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ItsFridayComponent;