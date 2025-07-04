'use client'
import { useState } from 'react'
import ThingIntro from './components/zombieIntro'
import BloodText from './components/bloodText'
import GoldenText from './components/goldenText'
import HorrorAudio from './components/HorrorAudio'

export default function Home() {
  const [phase, setPhase] = useState<'blood' | 'gold' | 'done'>('blood')

  return (
    <div className='relative h-screen w-screen bg-black overflow-hidden'>
      <ThingIntro />
      <HorrorAudio volume={0.4} autoPlay={true} />
      <div className='absolute top-4 left-4 right-4 md:top-4 md:left-6 md:right-auto'>
        {phase === 'blood' && <BloodText onComplete={() => setPhase('gold')} />}
        {phase === 'gold' && <GoldenText />}
      </div>
      
      <style jsx global>{`
        @media (max-width: 768px) {
          html, body {
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .text-container {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}
