import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VILLA_GUIDES = {
  1: {
    title: '🏛️ You\'re at the Concierge Villa!',
    message: 'This is your personal welcome and orientation hub. Take your time exploring each section — there\'s no rush here, and every step you take matters. Setting your intentions is a beautiful beginning to your journey.',
  },
  2: {
    title: '📓 Welcome to the Mood Diary Centre',
    message: 'Recording how you feel — even just a word or two — is a deeply powerful act of self-awareness. Whatever you\'re feeling is valid and welcome here. Be gentle with yourself as you explore.',
  },
  3: {
    title: '🧘 You\'re in the Mindfulness Villa',
    message: 'You can explore any practice here at your own pace. Even one minute of mindful breathing can gently shift how you feel. There\'s no right or wrong way — simply being present is already more than enough.',
  },
  4: {
    title: '🌿 Welcome to the Relaxation Villa',
    message: 'This is your space to fully soften and let go. Find a comfortable position, take a gentle breath, and allow yourself to simply rest. You deserve this time to restore — no doing, just being.',
  },
  5: {
    title: '💆 You\'re in the Wellness Villa',
    message: 'Small, consistent acts of care matter far more than big leaps. Be kind to yourself as you explore what supports your wellbeing. Every gentle habit you build is a loving act toward yourself.',
  },
  6: {
    title: '✨ Welcome to the Inspiration Villa',
    message: 'Let these words and tools gently remind you of your own quiet strength. You have come further than you know — even being here today shows incredible courage. You are more resilient than you realise.',
  },
}

function MaiaSvg({ width = 100, height = 125 }) {
  return (
    <svg viewBox="0 0 80 100" width={width} height={height}>
      <defs>
        <radialGradient id="mg2-body" cx="42%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="55%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <radialGradient id="mg2-face" cx="38%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#fef9ee" />
          <stop offset="65%" stopColor="#fde8d0" />
          <stop offset="100%" stopColor="#fcd9ae" />
        </radialGradient>
        <radialGradient id="mg2-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pulsing warm aura */}
      <circle cx="40" cy="54" r="36" fill="url(#mg2-glow)">
        <animate attributeName="r" values="33;40;33" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Floating petal accents */}
      <ellipse cx="7" cy="48" rx="5.5" ry="2.2" fill="#f97316" opacity="0.5" transform="rotate(-42,7,48)" />
      <ellipse cx="73" cy="43" rx="5" ry="2" fill="#f97316" opacity="0.45" transform="rotate(38,73,43)" />
      <ellipse cx="4" cy="65" rx="4" ry="1.8" fill="#fbbf24" opacity="0.45" transform="rotate(-25,4,65)" />
      <ellipse cx="76" cy="63" rx="4" ry="1.8" fill="#fbbf24" opacity="0.4" transform="rotate(28,76,63)" />

      {/* Body / gown */}
      <ellipse cx="40" cy="73" rx="22" ry="22" fill="url(#mg2-body)" />
      <path d="M18,80 Q40,98 62,80 Q52,94 40,97 Q28,94 18,80Z" fill="#d97706" opacity="0.5" />

      {/* Neck */}
      <rect x="35" y="52" width="10" height="9" rx="3" fill="#fde68a" />

      {/* Head */}
      <circle cx="40" cy="36" r="22" fill="url(#mg2-face)" />

      {/* Hair */}
      <ellipse cx="40" cy="18" rx="22" ry="11" fill="#2d1b00" />
      <ellipse cx="40" cy="20" rx="18" ry="8" fill="#3d2314" />
      <path d="M18,26 Q10,40 14,55" stroke="#2d1b00" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M62,26 Q70,40 66,55" stroke="#2d1b00" strokeWidth="8" fill="none" strokeLinecap="round" />

      {/* Flower crown */}
      <circle cx="31" cy="15" r="3.5" fill="#fb923c" opacity="0.9" />
      <circle cx="40" cy="11" r="4.2" fill="#f9a8d4" opacity="0.95" />
      <circle cx="49" cy="15" r="3.5" fill="#fb923c" opacity="0.9" />
      <circle cx="31" cy="15" r="1.8" fill="white" opacity="0.75" />
      <circle cx="40" cy="11" r="2.2" fill="white" opacity="0.75" />
      <circle cx="49" cy="15" r="1.8" fill="white" opacity="0.75" />

      {/* Eyes */}
      <ellipse cx="31" cy="34" rx="5" ry="6" fill="white" opacity="0.95" />
      <ellipse cx="49" cy="34" rx="5" ry="6" fill="white" opacity="0.95" />
      <ellipse cx="31.5" cy="35.5" rx="3.2" ry="4" fill="#78350f" />
      <ellipse cx="49.5" cy="35.5" rx="3.2" ry="4" fill="#78350f" />
      <circle cx="33" cy="34" r="1.4" fill="white" />
      <circle cx="51" cy="34" r="1.4" fill="white" />

      {/* Eyelashes */}
      <path d="M26,29 Q28,26 31,29" stroke="#2d1b00" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M44,29 Q46,26 49,29" stroke="#2d1b00" strokeWidth="1.1" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="21" cy="39" rx="5" ry="3.5" fill="#fda4af" opacity="0.4" />
      <ellipse cx="59" cy="39" rx="5" ry="3.5" fill="#fda4af" opacity="0.4" />

      {/* Smile */}
      <path d="M28,45 Q40,56 52,45" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9" />

      {/* Nose */}
      <circle cx="40" cy="42" r="1.2" fill="rgba(255,255,255,0.4)" />

      {/* Heart glow */}
      <path d="M36,66 Q40,62 44,66 Q44,73 40,77 Q36,73 36,66Z" fill="white" opacity="0.2" />

      {/* Waving left arm */}
      <g className="guide-wave-arm" style={{ transformOrigin: '18px 60px' }}>
        <path d="M18,60 Q8,50 6,37" stroke="#fde68a" strokeWidth="9" fill="none" strokeLinecap="round" />
        <circle cx="6" cy="36" r="6.5" fill="#fef3c7" opacity="0.9" />
        <circle cx="6" cy="36" r="3.5" fill="white" opacity="0.55" />
      </g>

      {/* Right arm */}
      <path d="M62,60 Q72,54 74,62" stroke="#fde68a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="74.5" cy="63" r="5.5" fill="#fef3c7" opacity="0.85" />

      {/* Shadow */}
      <ellipse cx="40" cy="98" rx="18" ry="3" fill="rgba(0,0,0,0.12)" />
    </svg>
  )
}

export default function MaiaGuide({ villaId }) {
  const navigate = useNavigate()
  const [bubbleOpen, setBubbleOpen] = useState(true)

  const guide = VILLA_GUIDES[villaId]
  if (!guide) return null

  return (
    <div className="welcome-avatar-wrapper">
      {bubbleOpen && (
        <div className="welcome-bubble">
          <div className="bubble-header">
            <span className="bubble-guide-name">Maia</span>
            <button className="welcome-bubble-close" onClick={() => setBubbleOpen(false)}>×</button>
          </div>
          <p className="bubble-step-title">{guide.title}</p>
          <p className="welcome-bubble-text">{guide.message}</p>
          <button className="welcome-bubble-cta" onClick={() => navigate('/')}>
            ← Back to Island Map
          </button>
        </div>
      )}

      <div className="welcome-avatar-figure" onClick={() => setBubbleOpen(v => !v)} title="Click to chat with Maia">
        <MaiaSvg />
      </div>

      {!bubbleOpen && (
        <div className="maia-name-tag" onClick={() => setBubbleOpen(true)}>Maia 🌸</div>
      )}
    </div>
  )
}
