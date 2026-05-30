import { useNavigate } from 'react-router-dom'
import MaiaGuide from './MaiaGuide'

export default function VillaLayout({ villa }) {
  const navigate = useNavigate()

  return (
    <div className="villa-page" style={{ '--villa-color': villa.color, '--villa-color-light': villa.colorLight }}>
      
      {/* Animated background */}
      <div className="villa-bg">
        <div className="villa-bg-orb orb1" />
        <div className="villa-bg-orb orb2" />
        <div className="villa-bg-orb orb3" />
      </div>

      {/* Back button */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Island
      </button>

      {/* Hero section */}
      <div className="villa-hero">
        <div className="villa-emoji">{villa.emoji}</div>
        <div className="villa-tag">Villa {villa.id}</div>
        <h1 className="villa-title">{villa.name}</h1>
        <p className="villa-subtitle">{villa.tagline}</p>
      </div>

      {/* Content cards */}
      <div className="villa-content">
        {villa.sections.map((section, i) => (
          <div className="villa-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="card-icon">{section.icon}</div>
            <h3 className="card-title">{section.title}</h3>
            <p className="card-text">{section.text}</p>
            {section.videoUrl && (
              <div className="card-video">
                <iframe
                  src={section.videoUrl}
                  title={section.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            {section.localVideoUrl && (
              <div className="card-video card-video--local">
                <video controls preload="metadata">
                  <source src={section.localVideoUrl} type="video/mp4" />
                </video>
              </div>
            )}
            {section.component && (
              <div className="card-interactive">{section.component}</div>
            )}
            {section.script && (
              <details className="card-script">
                <summary className="card-script-toggle">📝 View AI Video Script</summary>
                <pre className="card-script-body">{section.script}</pre>
              </details>
            )}
            {section.action && (
              <button className="card-btn" onClick={section.action.onClick}>
                {section.action.label}
              </button>
            )}
          </div>
        ))}
      </div>

      <MaiaGuide villaId={villa.id} />
    </div>
  )
}