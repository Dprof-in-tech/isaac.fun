import { useEffect, useState } from "react"

const GoldenText = () => {
    const [visibleLetters, setVisibleLetters] = useState<number[]>([])
    const fullText = ' bbut first, the beginning .......'
  
    useEffect(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setVisibleLetters(prev => [...prev, index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 120)
      return () => clearInterval(interval)
    }, [])
  
    return (
      <div className="golden-text-container">
        <h1 className="golden-text">
          {fullText.split('').map((letter, index) => (
            <span
              key={index}
              className={`letter ${visibleLetters.includes(index) ? 'visible' : 'hidden'}`}
              style={{ animationDelay: `${visibleLetters.indexOf(index) * 0.08}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
          
          .golden-text-container {
            position: relative;
            display: inline-block;
          }
          
          .golden-text {
            font-family: 'Orbitron', monospace;
            font-weight: 700;
            font-size: clamp(1.8rem, 7vw, 3.5rem);
            background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700, #ffb347);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            background-clip: text;
            margin-top: 1rem;
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
            max-width: 90vw;
            margin: 1rem auto 0;
          }
          
          @media (max-width: 768px) {
            .golden-text {
              font-size: clamp(1.4rem, 5vw, 2.5rem);
              margin-top: 0.5rem;
            }
          }
          
          @media (max-width: 480px) {
            .golden-text {
              font-size: clamp(1.2rem, 4vw, 2rem);
              margin-top: 0.25rem;
            }
          }
          
          .letter {
            display: inline-block;
            position: relative;
          }
          
          .letter.hidden {
            opacity: 0;
            transform: translateY(100vh);
          }
          
          .letter.visible {
            animation: riseUp 0.9s ease-out forwards, goldenGlow 3s ease-in-out infinite alternate 0.9s, goldenShimmer 4s ease-in-out infinite 0.9s;
          }
          
          @keyframes riseUp {
            0% {
              opacity: 0;
              transform: translateY(100vh) rotate(-180deg) scale(0.5);
            }
            70% {
              opacity: 1;
              transform: translateY(-10px) rotate(0deg) scale(1.1);
            }
            100% {
              opacity: 1;
              transform: translateY(0px) rotate(0deg) scale(1);
            }
          }
          
          @keyframes goldenGlow {
            0%, 100% {
              filter: brightness(1) saturate(1) drop-shadow(0 0 10px gold);
            }
            50% {
              filter: brightness(1.4) saturate(1.3) drop-shadow(0 0 20px gold);
            }
          }
          
          @keyframes goldenShimmer {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>
    )
  }

export default GoldenText