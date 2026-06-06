import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MaiaAvatarSvg, loadMaiaAvatar } from './MaiaAvatar'

const VILLA_GUIDES = {
  1: {
    title: '🏝️ Concierge Villa',
    message: "This is your starting point. Take your time exploring — there's no rush. Every step here is a step toward yourself.",
  },
  2: {
    title: '📓 Mood Diary Centre',
    message: "Recording how you feel — even just a word or two — is a powerful act. Whatever you're feeling is valid here. Be gentle with yourself.",
  },
  3: {
    title: '🧘 Mindfulness Villa',
    message: "Even one minute of mindful breathing can shift how you feel. There's no right or wrong way — simply being present is already enough.",
  },
  4: {
    title: '🌿 Relaxation Villa',
    message: "This is your space to soften and let go. Allow yourself to simply rest. You deserve this time — no doing, just being.",
  },
  5: {
    title: '💚 Wellness Villa',
    message: "Small, consistent acts of care matter far more than big leaps. Be kind to yourself. Every habit you build is a loving act toward yourself.",
  },
  6: {
    title: '✨ Inspiration Villa',
    message: "Let these words gently remind you of your own quiet strength. Being here today shows incredible courage. You are more resilient than you realise.",
  },
  7: {
    title: '🤖 AI Companion',
    message: "You can say anything here. I am here to listen, reflect, and support you — without judgment, without rush.",
  },
}

export default function MaiaGuide({ villaId }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const avatarCfg = loadMaiaAvatar()
  const guide = VILLA_GUIDES[villaId]
  if (!guide) return null

  return (
    <div className="welcome-avatar-wrapper">
      {open && (
        <div className="welcome-bubble">
          <div className="bubble-header">
            <span className="bubble-guide-name">Maia</span>
            <button className="welcome-bubble-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <p className="bubble-step-title">{guide.title}</p>
          <p className="welcome-bubble-text">{guide.message}</p>
          <button className="welcome-bubble-cta" onClick={() => navigate('/')}>
            🗺️ Back to Island Map
          </button>
        </div>
      )}

      <div className="welcome-avatar-figure" onClick={() => setOpen(v => !v)} title="Click to chat with Maia">
        <MaiaAvatarSvg config={avatarCfg} width={100} height={125} animated={true} />
      </div>

      {!open && (
        <div className="maia-name-tag" onClick={() => setOpen(true)}>Maia 🌼</div>
      )}
    </div>
  )
}
