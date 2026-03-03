import { useState, useEffect, useRef, useCallback } from 'react'
import './index.css'

// ─── Flashcard Data ──────────────────────────────────────────────────────────
interface FlashCard {
  id: number
  photo: string | null // filename from /public, e.g. "photo1.jpg"
  decorImage: string   // our generated decorative image
  decorAlt: string
  line: string
  subline: string
  accent: string       // emoji accent
  cardColor: string    // tailwind-like gradient class or inline style
  tagline: string      // small tag at top
}

const CARDS: FlashCard[] = [
  {
    id: 1,
    photo: null,
    decorImage: '/cover_card.png',
    decorAlt: 'Bear with heart balloon',
    line: "Hey Sreeparna 🐻",
    subline: "This little stack of cards is made just for you — filled with everything I love about us. Click through, my love! 🌻",
    accent: '💌',
    cardColor: 'linear-gradient(135deg, #fff0f7 0%, #ffecd2 100%)',
    tagline: '✨ made with lots of love ✨'
  },
  {
    id: 2,
    photo: 'photo1.jpg',
    decorImage: '/bear_sunflower.png',
    decorAlt: 'Cute bear with sunflowers',
    line: "You are my sunshine 🌻",
    subline: "On the cloudiest days, just thinking of your smile makes everything warm and golden again.",
    accent: '🌟',
    cardColor: 'linear-gradient(135deg, #fff9c4 0%, #ffecd2 100%)',
    tagline: '🌻 card 01 of 12'
  },
  {
    id: 3,
    photo: 'photo2.jpg',
    decorImage: '/orchid_illustration.png',
    decorAlt: 'Pink orchids',
    line: "You're as rare as an orchid 🌸",
    subline: "Delicate, elegant, breathtaking — that's you. Not everyone deserves you, but I'll spend my life trying to.",
    accent: '💜',
    cardColor: 'linear-gradient(135deg, #f0e6ff 0%, #ffd6e7 100%)',
    tagline: '🌸 card 02 of 12'
  },
  {
    id: 4,
    photo: 'photo3.jpg',
    decorImage: '/sunflower_bouquet.png',
    decorAlt: 'Sunflower bouquet',
    line: "I'd pick you every single time 💐",
    subline: "In a field of every flower in the world, I'd still find my way back to you — always you.",
    accent: '🌹',
    cardColor: 'linear-gradient(135deg, #fffde7 0%, #fff0f7 100%)',
    tagline: '🌻 card 03 of 12'
  },
  {
    id: 5,
    photo: 'photo4.jpg',
    decorImage: '/bear_sunflower.png',
    decorAlt: 'Bear with flowers',
    line: "My favourite adventure is with you 🐾",
    subline: "I don't care where we go or what we do — as long as you're beside me, it's the best day ever.",
    accent: '🗺️',
    cardColor: 'linear-gradient(135deg, #e8f5e9 0%, #ffd6e7 100%)',
    tagline: '🐻 card 04 of 12'
  },
  {
    id: 6,
    photo: 'photo5.jpg',
    decorImage: '/orchid_illustration.png',
    decorAlt: 'Orchid flowers',
    line: "You're my safe place 🏡",
    subline: "Whenever the world feels too loud, just being with you feels like home — cozy, warm, and mine.",
    accent: '🤍',
    cardColor: 'linear-gradient(135deg, #fce4ec 0%, #e8d5ff 100%)',
    tagline: '💜 card 05 of 12'
  },
  {
    id: 7,
    photo: 'photo6.jpg',
    decorImage: '/sunflower_bouquet.png',
    decorAlt: 'Sunflowers',
    line: "I love how you love things ✨",
    subline: "The way your eyes light up about the things you care about — I could watch you talk forever.",
    accent: '⭐',
    cardColor: 'linear-gradient(135deg, #fff8e1 0%, #ffd6e7 100%)',
    tagline: '✨ card 06 of 12'
  },
  {
    id: 8,
    photo: 'photo7.jpg',
    decorImage: '/bear_sunflower.png',
    decorAlt: 'Cute bear',
    line: "Even my bear is jealous 🧸",
    subline: "Because every hug from a plushie reminds me it's not as warm, soft, or perfect as yours.",
    accent: '🧸',
    cardColor: 'linear-gradient(135deg, #fff3e0 0%, #ffd6e7 100%)',
    tagline: '🐻 card 07 of 12'
  },
  {
    id: 9,
    photo: 'photo8.jpg',
    decorImage: '/orchid_illustration.png',
    decorAlt: 'Orchid bloom',
    line: "Thank you for choosing me 🫶",
    subline: "Out of everyone in the world, you chose to be with me. That's the most beautiful thing I've ever been given.",
    accent: '💖',
    cardColor: 'linear-gradient(135deg, #fce4ec 0%, #e8f5e9 100%)',
    tagline: '🌸 card 08 of 12'
  },
  {
    id: 10,
    photo: 'photo9.jpg',
    decorImage: '/sunflower_bouquet.png',
    decorAlt: 'Sunflower bouquet',
    line: "You make ordinary days magical 🌈",
    subline: "A text from you, a silly video, a random call — somehow you turn the most mundane Tuesday into something special.",
    accent: '🌈',
    cardColor: 'linear-gradient(135deg, #e3f2fd 0%, #ffd6e7 100%)',
    tagline: '✨ card 09 of 12'
  },
  {
    id: 11,
    photo: 'photo10.jpg',
    decorImage: '/bear_sunflower.png',
    decorAlt: 'Bear and sunflowers',
    line: "I'm so proud of you 🌟",
    subline: "For every time you kept going when it was hard, for every small win, every brave thing — I see it all and I'm so proud.",
    accent: '🏆',
    cardColor: 'linear-gradient(135deg, #fff9c4 0%, #f3e5f5 100%)',
    tagline: '💛 card 10 of 12'
  },
  {
    id: 12,
    photo: null,
    decorImage: '/cover_card.png',
    decorAlt: 'Bear with heart',
    line: "Keep this forever, okay? 💝",
    subline: "These words, these feelings — they're all yours. I love you, Sreeparna. Now and always and a bit more than that. 🌻🐻💕",
    accent: '💝',
    cardColor: 'linear-gradient(135deg, #ffd6e7 0%, #e8d5ff 50%, #ffecd2 100%)',
    tagline: '💝 card 12 of 12'
  }
]

// ─── Floating Particles ──────────────────────────────────────────────────────
const EMOJIS = ['🌸', '✨', '💕', '🌻', '🌷', '⭐', '💖', '🍀', '🌺', '💫']

interface Particle {
  id: number
  emoji: string
  left: number
  duration: number
  delay: number
  size: number
}

function useParticles(count: number) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const ps: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      size: 14 + Math.random() * 18,
    }))
    setParticles(ps)
  }, [count])

  return particles
}

// ─── Confetti ────────────────────────────────────────────────────────────────
interface ConfettiPiece {
  id: number
  left: number
  color: string
  duration: number
  delay: number
  size: number
  shape: 'circle' | 'rect'
}

const CONFETTI_COLORS = ['#ff7eb3', '#ffec99', '#e8d5ff', '#b5d5c5', '#ffd6e7', '#ffb3d1']

function triggerConfetti(): ConfettiPiece[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: Date.now() + i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 1,
    size: 8 + Math.random() * 10,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
  }))
}

// ─── Photo Component ─────────────────────────────────────────────────────────
function PhotoSlot({ photo, alt }: { photo: string | null; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!photo || error) {
    return (
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden photo-slot">
        <img
          src="/photo_placeholder.png"
          alt="Photo frame"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl mb-2">📸</span>
          <p className="font-handwritten text-pink-400 text-lg font-semibold">our photo here!</p>
          <p className="font-cute text-pink-300 text-xs mt-1">add to /public folder</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
      {!loaded && (
        <div className="absolute inset-0 photo-slot flex items-center justify-center">
          <span className="text-3xl animate-spin">🌸</span>
        </div>
      )}
      <img
        src={`/${photo}`}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {/* Washi tape decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 washi-tape"
        style={{
          width: 60,
          background: 'linear-gradient(90deg, #ffb3d1aa, #ffecd2aa, #ffb3d1aa)',
          top: -4,
        }}
      />
    </div>
  )
}

// ─── Single Flashcard ─────────────────────────────────────────────────────────
interface FlashCardProps {
  card: FlashCard
  isEntering: boolean
  isExiting: boolean
  direction: 'forward' | 'back'
  onClick: (e: React.MouseEvent) => void
}

function FlashCardView({ card, isEntering, isExiting, direction, onClick }: FlashCardProps) {
  let animClass = ''
  if (isExiting) animClass = 'card-exit'
  else if (isEntering) animClass = 'card-enter'

  return (
    <div
      className={`w-full max-w-sm glass-card rounded-3xl cursor-pointer select-none relative overflow-hidden ripple-container ${animClass}`}
      style={{ background: card.cardColor, animationDirection: direction === 'back' && isEntering ? 'reverse' : 'normal' }}
      onClick={onClick}
    >
      {/* Top tagline */}
      <div className="flex items-center justify-center pt-5 pb-1">
        <span className="font-cute text-pink-400 text-xs font-semibold tracking-widest uppercase opacity-70">
          {card.tagline}
        </span>
      </div>

      {/* Decorative top sticker */}
      <div className="flex justify-center py-2">
        <img
          src={card.decorImage}
          alt={card.decorAlt}
          className="sticker"
          style={{ width: 110, height: 110, objectFit: 'contain' }}
        />
      </div>

      {/* Photo slot */}
      <div className="px-6 pb-4">
        <div className="polaroid mx-auto" style={{ maxWidth: 220 }}>
          <PhotoSlot photo={card.photo} alt={`Memory on card ${card.id}`} />
          <div className="text-center mt-2">
            <span className="font-handwritten text-gray-400 text-sm">~ us ~</span>
          </div>
        </div>
      </div>

      {/* Love line */}
      <div className="px-7 pb-4 text-center">
        <p className="font-romantic text-3xl text-pink-600 leading-tight mb-2" style={{ textShadow: '0 1px 4px rgba(255,126,179,0.2)' }}>
          {card.line}
        </p>
        <p className="font-cute text-pink-500 text-sm leading-relaxed opacity-90">
          {card.subline}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="flex items-center justify-between px-7 pb-6">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span key={i} className="text-pink-300 text-xs" style={{ animationDelay: `${i * 0.4}s` }}>♥</span>
          ))}
        </div>
        <span className="text-2xl heartbeat">{card.accent}</span>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span key={i} className="text-pink-300 text-xs">♥</span>
          ))}
        </div>
      </div>

      {/* Click hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-40">
        <span className="text-pink-400 text-xs font-cute">tap to continue</span>
        <span className="text-pink-400 text-xs">→</span>
      </div>
    </div>
  )
}

// ─── Title Screen ──────────────────────────────────────────────────────────────
function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen title-screen px-6 py-12 relative overflow-hidden">
      {/* Background card image */}
      <div className="absolute inset-0 opacity-20">
        <img src="/card_background.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 slide-in-up">
        {/* Bear sticker */}
        <div className="sway">
          <img
            src="/bear_sunflower.png"
            alt="Cute bear"
            className="sticker"
            style={{ width: 180, height: 180, objectFit: 'contain' }}
          />
        </div>

        {/* Main title */}
        <div className="text-center">
          <p className="font-cute text-pink-400 text-sm tracking-widest uppercase mb-2 opacity-70">
            ✦ a love letter in cards ✦
          </p>
          <h1 className="font-romantic text-6xl text-pink-600 leading-tight" style={{ textShadow: '0 2px 12px rgba(255,126,179,0.3)' }}>
            For Sreeparna
          </h1>
          <p className="font-handwritten text-pink-400 text-2xl mt-2">
            with love, always 🐻💕
          </p>
        </div>

        {/* Description */}
        <div className="glass-card rounded-2xl p-5 max-w-xs text-center" style={{ background: 'rgba(255,255,255,0.65)' }}>
          <p className="font-cute text-pink-500 text-sm leading-relaxed">
            12 little cards made just for you 🌻 Each one has a memory and a word from my heart. Click through slowly, okay? 💌
          </p>
        </div>

        {/* Decorative flowers row */}
        <div className="flex gap-3 items-center">
          <img src="/orchid_illustration.png" alt="" style={{ width: 48, height: 48, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
          <img src="/sunflower_bouquet.png" alt="" style={{ width: 56, height: 56, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
          <img src="/orchid_illustration.png" alt="" style={{ width: 48, height: 48, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
        </div>

        {/* Start button */}
        <button className="btn-cute text-lg px-10 py-4" onClick={onStart} id="start-btn">
          Open My Cards 💝
        </button>

        <p className="font-handwritten text-pink-400 text-lg opacity-60">~ tap to unwrap ~</p>
      </div>
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`progress-dot ${i < current ? 'completed' : ''} ${i === current ? 'active' : ''}`}
          />
        ))}
      </div>
      <p className="font-handwritten text-pink-400 text-sm">
        {current + 1} of {total} 💕
      </p>
    </div>
  )
}

// ─── End Screen ───────────────────────────────────────────────────────────────
function EndScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-6 bounce-in text-center">
        <div className="heartbeat">
          <img src="/cover_card.png" alt="Bear" style={{ width: 200, height: 200, objectFit: 'contain' }} className="sticker" />
        </div>
        <h2 className="font-romantic text-5xl text-pink-600" style={{ textShadow: '0 2px 10px rgba(255,126,179,0.3)' }}>
          The End 💝
        </h2>
        <div className="glass-card rounded-2xl p-6 max-w-sm">
          <p className="font-handwritten text-2xl text-pink-500 mb-3">Dear Sreeparna,</p>
          <p className="font-cute text-pink-500 text-sm leading-relaxed">
            Thank you for being you. For reading through all of these. For being the reason I smile without even realising it. I love you — more than all the sunflowers and orchids in the world, more than all the plushies, more than I know how to say. 🌻🐻💕
          </p>
          <p className="font-handwritten text-xl text-pink-400 mt-4">forever yours 💌</p>
        </div>
        <div className="flex gap-4 mt-2">
          <button className="btn-cute-secondary" onClick={onRestart} id="restart-btn">
            🔁 Read Again
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<'title' | 'cards' | 'end'>('title')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEntering, setIsEntering] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const particles = useParticles(18)
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const confettiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleStart = () => {
    setCurrentIndex(0)
    setIsEntering(true)
    setScreen('cards')
    setTimeout(() => setIsEntering(false), 600)
    // Confetti on start
    const pieces = triggerConfetti()
    setConfetti(pieces)
    confettiTimerRef.current = setTimeout(() => setConfetti([]), 4000)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScreen('title')
  }

  const addRipple = useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'ripple-effect'
    ripple.style.left = e.clientX - rect.left + 'px'
    ripple.style.top = e.clientY - rect.top + 'px'
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 900)
  }, [])

  const goNext = useCallback((e: React.MouseEvent) => {
    addRipple(e)
    if (isExiting || isEntering) return

    setDirection('forward')
    setIsExiting(true)
    exitTimerRef.current = setTimeout(() => {
      setIsExiting(false)
      if (currentIndex + 1 >= CARDS.length) {
        setScreen('end')
        const pieces = triggerConfetti()
        setConfetti(pieces)
        confettiTimerRef.current = setTimeout(() => setConfetti([]), 4000)
      } else {
        setCurrentIndex(prev => prev + 1)
        setIsEntering(true)
        setTimeout(() => setIsEntering(false), 600)
      }
    }, 420)
  }, [addRipple, isExiting, isEntering, currentIndex])

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current)
    }
  }, [])

  const card = CARDS[currentIndex]

  return (
    <div className="relative">
      {/* Global floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map(p => (
          <span
            key={p.id}
            className="absolute select-none"
            style={{
              left: `${p.left}%`,
              bottom: '-5%',
              fontSize: p.size,
              animation: `rise ${p.duration}s ${p.delay}s linear infinite`,
              opacity: 0,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            top: '-20px',
            width: c.size,
            height: c.shape === 'circle' ? c.size : c.size * 0.6,
            borderRadius: c.shape === 'circle' ? '50%' : '2px',
            background: c.color,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      {/* Background watercolor */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <img src="/card_background.png" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Screens */}
      <div className="relative z-10">
        {screen === 'title' && <TitleScreen onStart={handleStart} />}

        {screen === 'cards' && (
          <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4 gap-5">
            {/* Header */}
            <div className="text-center slide-in-up">
              <p className="font-romantic text-3xl text-pink-500" style={{ textShadow: '0 1px 6px rgba(255,126,179,0.25)' }}>
                For my Sreeparna 🌸
              </p>
              <p className="font-handwritten text-pink-400 text-lg opacity-70">flip through our little love story</p>
            </div>

            {/* Progress */}
            <ProgressBar current={currentIndex} total={CARDS.length} />

            {/* Card */}
            <FlashCardView
              card={card}
              isEntering={isEntering}
              isExiting={isExiting}
              direction={direction}
              onClick={goNext}
            />

            {/* Navigation hint */}
            <div className="flex items-center gap-8 mt-2">
              {currentIndex > 0 && (
                <button
                  className="btn-cute-secondary text-sm px-5 py-2"
                  id="prev-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    addRipple(e)
                    if (isExiting || isEntering) return
                    setDirection('back')
                    setIsExiting(true)
                    setTimeout(() => {
                      setIsExiting(false)
                      setCurrentIndex(prev => Math.max(0, prev - 1))
                      setIsEntering(true)
                      setTimeout(() => setIsEntering(false), 600)
                    }, 420)
                  }}
                >
                  ← prev
                </button>
              )}
              <p className="font-handwritten text-pink-400 text-base opacity-60">tap card to go next →</p>
            </div>

            {/* Decorative bottom stickers */}
            <div className="flex gap-4 items-center mt-2 opacity-60">
              <img src="/orchid_illustration.png" alt="" style={{ width: 36, objectFit: 'contain' }} />
              <span className="text-pink-300 font-handwritten text-2xl">made with ♡</span>
              <img src="/sunflower_bouquet.png" alt="" style={{ width: 36, objectFit: 'contain' }} />
            </div>
          </div>
        )}

        {screen === 'end' && <EndScreen onRestart={handleRestart} />}
      </div>
    </div>
  )
}