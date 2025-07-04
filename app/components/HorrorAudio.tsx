'use client'
import { useEffect, useRef, useState } from 'react'

interface HorrorAudioProps {
  autoPlay?: boolean
  volume?: number
  onAudioReady?: () => void
}

const HorrorAudio = ({ 
  autoPlay = true, 
  volume = 0.3,
  onAudioReady 
}: HorrorAudioProps) => {
  const ambientAudioRef = useRef<HTMLAudioElement>(null)
  const zombieAudioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const startAudio = async () => {
      try {
        if (ambientAudioRef.current && zombieAudioRef.current) {
          ambientAudioRef.current.volume = volume
          zombieAudioRef.current.volume = volume * 0.7
          
          if (autoPlay) {
            // Try to auto-start audio immediately
            try {
              await ambientAudioRef.current.play()
              setIsPlaying(true)
              
              // Play zombie growl after 2 seconds
              setTimeout(async () => {
                try {
                  await zombieAudioRef.current?.play()
                } catch (error) {
                  console.log('Zombie audio play failed:', error)
                }
              }, 2000)
            } catch (error) {
              console.log('Autoplay blocked by browser:', error)
              
              // Simulate a click event to bypass autoplay restrictions
              setTimeout(() => {
                const clickEvent = new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true
                })
                document.body.dispatchEvent(clickEvent)
              }, 100)
              
              // If autoplay fails, try again on any user interaction
              const handleFirstInteraction = async () => {
                try {
                  await ambientAudioRef.current?.play()
                  setIsPlaying(true)
                  document.removeEventListener('click', handleFirstInteraction)
                  document.removeEventListener('keydown', handleFirstInteraction)
                } catch (err) {
                  console.log('Audio play failed on interaction:', err)
                }
              }
              document.addEventListener('click', handleFirstInteraction)
              document.addEventListener('keydown', handleFirstInteraction)
            }
          }
          
          onAudioReady?.()
        }
      } catch (error) {
        console.log('Audio setup failed:', error)
      }
    }

    // Add a small delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      startAudio()
    }, 500)

    return () => clearTimeout(timer)
  }, [autoPlay, volume, onAudioReady])

  const toggleAudio = async () => {
    if (!ambientAudioRef.current) return

    if (isPlaying) {
      ambientAudioRef.current.pause()
      zombieAudioRef.current?.pause()
      setIsPlaying(false)
    } else {
      try {
        await ambientAudioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.log('Audio play failed:', error)
      }
    }
  }

  return (
    <>
      {/* Hidden audio elements */}
      <audio
        ref={ambientAudioRef}
        loop
        preload="auto"
        onLoadedData={() => console.log('Ambient audio loaded')}
        onError={() => console.log('Ambient audio failed to load')}
      >
        <source src="/audio/zombie1.mp3" type="audio/mpeg" />
        {/* <source src="/audio/horror-ambient.ogg" type="audio/ogg" />
        <source src="/audio/transition.wav" type="audio/wav" /> */}
      </audio>

      <audio
        ref={zombieAudioRef}
        preload="auto"
        onLoadedData={() => console.log('Zombie audio loaded')}
        onError={() => console.log('Zombie audio failed to load')}
      >
        <source src="/audio/zombie1.mp3" type="audio/mpeg" />
        {/* <source src="/audio/zombie-growls.ogg" type="audio/ogg" />
        <source src="/audio/zombie-growls.wav" type="audio/wav" /> */}
      </audio>

      {/* Audio controls - Simple mute/unmute toggle */}
      <div className="audio-controls">
        <button 
          onClick={toggleAudio}
          className="toggle-audio-btn"
          title={isPlaying ? "Mute Audio" : "Unmute Audio"}
        >
          {isPlaying ? '🔇' : '🔊'}
        </button>
        
        <style jsx>{`
          .audio-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
          }
          
          .toggle-audio-btn {
            background: rgba(0, 0, 0, 0.8);
            color: #ff4444;
            border: 2px solid #ff4444;
            padding: 12px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s ease;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          
          .toggle-audio-btn:hover,
          .toggle-audio-btn:active {
            background: #ff4444;
            color: black;
            box-shadow: 0 0 15px #ff4444;
            transform: scale(1.1);
          }
          
          @media (max-width: 768px) {
            .audio-controls {
              top: 15px;
              right: 15px;
            }
            
            .toggle-audio-btn {
              width: 45px;
              height: 45px;
              font-size: 16px;
              padding: 10px;
            }
          }
          
          @media (max-width: 480px) {
            .audio-controls {
              top: 10px;
              right: 10px;
            }
            
            .toggle-audio-btn {
              width: 40px;
              height: 40px;
              font-size: 14px;
              padding: 8px;
              border-width: 1px;
            }
          }
          
          @media (hover: none) and (pointer: coarse) {
            .toggle-audio-btn:hover {
              transform: none;
              background: rgba(0, 0, 0, 0.8);
              color: #ff4444;
              box-shadow: none;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default HorrorAudio