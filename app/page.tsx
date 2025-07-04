'use client'
import { useState, Suspense, lazy } from 'react'
import LoadingScreen from './components/LoadingScreen'

// Lazy load heavy components
const ThingIntro = lazy(() => import('./components/zombieIntro'))
const BloodText = lazy(() => import('./components/bloodText'))
const GoldenText = lazy(() => import('./components/goldenText'))
const HorrorAudio = lazy(() => import('./components/HorrorAudio'))

export default function Home() {
  const [phase, setPhase] = useState<'loading' | 'blood' | 'gold' | 'done'>('loading')

  const handleLoadComplete = () => {
    setPhase('blood')
  }

  if (phase === 'loading') {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />
  }

  return (
    <div className='relative h-screen w-screen bg-black overflow-hidden'>
      <Suspense fallback={<div className="bg-black h-full w-full" />}>
        <ThingIntro />
        <HorrorAudio volume={0.4} autoPlay={true} />
        <div className='absolute top-4 left-4 right-4 md:top-4 md:left-6 md:right-auto'>
          <Suspense fallback={<div className="text-white">Loading text...</div>}>
            {phase === 'blood' && <BloodText onComplete={() => setPhase('gold')} />}
            {phase === 'gold' && <GoldenText />}
          </Suspense>
        </div>
      </Suspense>
      
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
