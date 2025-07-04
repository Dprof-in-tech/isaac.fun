import { useEffect, useState } from 'react'

const BloodText = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLetters, setVisibleLetters] = useState<number[]>([])
  const fullText = '  tthe end is near......'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setVisibleLetters(prev => [...prev, index])
        index++
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 3000)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="blood-text-container">
      <h1 className="blood-text">
        {fullText.split('').map((letter, index) => (
          <span
            key={index}
            className={`letter ${visibleLetters.includes(index) ? 'visible' : 'hidden'}`}
            style={{ animationDelay: `${visibleLetters.indexOf(index) * 0.1}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>
      <style jsx>{`
        @font-face {
          font-family: 'Melted Monster';
          src: url('/font/Melted-Monster.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: block;
        }
        
        .blood-text-container {
          position: relative;
          display: inline-block;
          font-variant-ligatures: none;
          text-rendering: optimizeLegibility;
        }
        
        .blood-text {
          font-family: 'Melted Monster', cursive, serif;
          font-size: clamp(2rem, 8vw, 5rem);
          font-weight: normal;
          letter-spacing: 0.05em;
          line-height: 1.1;
          color: #DC143C;
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          text-align: center;
          max-width: 90vw;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .blood-text {
            font-size: clamp(1.5rem, 6vw, 3rem);
            letter-spacing: 0.02em;
            line-height: 1.0;
          }
        }
        
        @media (max-width: 480px) {
          .blood-text {
            font-size: clamp(1.2rem, 5vw, 2.5rem);
            letter-spacing: 0;
          }
        }
        
        .letter {
          display: inline-block;
          position: relative;
        }
        
        .letter.hidden {
          opacity: 0;
          transform: translateY(-100vh);
        }
        
        .letter.visible {
          animation: fallDown 0.8s ease-out forwards, bloodGlow 2s ease-in-out infinite alternate 0.8s;
        }
        
        @keyframes fallDown {
          0% {
            opacity: 0;
            transform: translateY(-100vh) rotate(180deg);
          }
          70% {
            opacity: 1;
            transform: translateY(10px) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        @keyframes bloodGlow {
          0% {
            filter: brightness(1) drop-shadow(0 0 5px #ff0000);
          }
          100% {
            filter: brightness(1.3) drop-shadow(0 0 15px #ff0000);
          }
        }
      `}</style>
    </div>
  )
}

export default BloodText
