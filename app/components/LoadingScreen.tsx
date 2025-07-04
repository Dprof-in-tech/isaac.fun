'use client'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onLoadComplete: () => void
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onLoadComplete, 500) // Small delay before transitioning
          return 100
        }
        return prev + Math.random() * 15 + 5 // Realistic loading simulation
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onLoadComplete])

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Loading...') return 'Loading'
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(textInterval)
  }, [])

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="skull-icon">💀</div>
        <h1 className="loading-title">I&apos;m Loading</h1>
        <p className="loading-text">{loadingText}</p>
        
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="progress-text">{Math.round(progress)}%</p>
      </div>
      
      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #000000, #1a0000, #000000);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.5s ease-out;
        }
        
        .loading-content {
          text-align: center;
          color: #ff4444;
        }
        
        .skull-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: pulse 2s ease-in-out infinite;
        }
        
        .loading-title {
          font-family: 'Melted Monster', cursive, serif;
          font-size: 3rem;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px #ff0000;
        }
        
        .loading-text {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          min-height: 1.5rem;
        }
        
        .progress-container {
          width: 300px;
          height: 8px;
          background: #333;
          border-radius: 4px;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 1px solid #ff4444;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ff0000, #ff4444, #ff6666);
          transition: width 0.3s ease;
          border-radius: 3px;
        }
        
        .progress-text {
          font-size: 1rem;
          font-weight: bold;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @media (max-width: 768px) {
          .skull-icon {
            font-size: 3rem;
          }
          
          .loading-title {
            font-size: 2rem;
          }
          
          .progress-container {
            width: 250px;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen