import { useState } from 'react'

const AFFIRMATIONS = [
  { category: 'Morning', text: 'Today is a new beginning. I welcome it with an open heart.' },
  { category: 'Morning', text: 'I give myself permission to move slowly and still move forward.' },
  { category: 'Morning', text: 'I do not need to have it all figured out to take one small step today.' },
  { category: 'Morning', text: 'I choose to be present in this moment, just as it is.' },
  { category: 'Self-Worth', text: 'I am worthy of love — not because of what I achieve, but because I exist.' },
  { category: 'Self-Worth', text: 'I am enough, exactly as I am right now.' },
  { category: 'Self-Worth', text: 'My worth is not determined by my productivity or my struggles.' },
  { category: 'Self-Worth', text: 'I deserve the same compassion I would give a friend.' },
  { category: 'Healing', text: 'Healing is not linear, and neither am I. That is okay.' },
  { category: 'Healing', text: 'I honour the progress I cannot yet see.' },
  { category: 'Healing', text: 'I am allowed to take up space in my own life.' },
  { category: 'Healing', text: 'I release the pressure to be fully healed right now.' },
  { category: 'Strength', text: 'I have survived every difficult day before this one.' },
  { category: 'Strength', text: 'I carry more resilience than I give myself credit for.' },
  { category: 'Strength', text: 'This feeling is temporary. I am not.' },
  { category: 'Strength', text: 'I am becoming someone I am proud of — one day at a time.' },
]

const GOAL_PHASES = [
  {
    number: '01',
    heading: 'Set Your Intention',
    items: [
      'Choose one goal at a time — not five. One focused step beats scattered effort.',
      'Make it specific: "Go for a 10-minute walk on Tuesday" beats "exercise more".',
      'Ask yourself: is this goal from fear, or from hope? Aim for hope.',
      'Write it down. Naming your intention out loud makes it real.',
    ]
  },
  {
    number: '02',
    heading: 'Build the Habit',
    items: [
      'Pair your goal with something you already do — stack new habits onto existing ones.',
      'Start smaller than feels necessary. Tiny and consistent outlasts big and irregular.',
      'Track progress lightly — celebrate streaks, but don\'t let missing one end everything.',
      'Tell one person you trust. Accountability is a gift, not a burden.',
    ]
  },
  {
    number: '03',
    heading: 'When You Fall Off Track',
    items: [
      'Missing a day is normal. Missing a week is normal. What matters is coming back.',
      'Ask: what made this hard? Change the plan, not your opinion of yourself.',
      '"If I miss a day, then I will restart the next morning — without guilt."',
      'Progress is rarely a straight line. Trust the direction, not the pace.',
    ]
  }
]

const GRATITUDE_PROMPTS = [
  'Name three things that brought you even a moment of peace today.',
  'Who is someone — past or present — who believed in you? What would you want to say to them?',
  'What is one thing your body did today that you can appreciate, however small?',
  'What is a challenge you\'ve faced that has quietly shaped who you are?',
  'What simple pleasure did you experience today — a taste, a sound, a texture, a colour?',
  'What is one thing about yourself you are grateful for, right now in this moment?',
  'Notice something beautiful in your environment right now. Sit with it for 30 seconds.',
]

export function AffirmationDeck() {
  const [index, setIndex] = useState(0)
  const current = AFFIRMATIONS[index]

  const prev = () => setIndex(i => (i - 1 + AFFIRMATIONS.length) % AFFIRMATIONS.length)
  const next = () => setIndex(i => (i + 1) % AFFIRMATIONS.length)
  const shuffle = () => {
    let n
    do { n = Math.floor(Math.random() * AFFIRMATIONS.length) } while (n === index)
    setIndex(n)
  }

  return (
    <div className="affirmation-deck">
      <span className="affirmation-category">{current.category}</span>
      <p className="affirmation-text" key={index}>"{current.text}"</p>
      <div className="affirmation-nav">
        <button className="affirmation-arrow" onClick={prev} aria-label="Previous">←</button>
        <button className="affirmation-shuffle" onClick={shuffle}>✦ Shuffle</button>
        <button className="affirmation-arrow" onClick={next} aria-label="Next">→</button>
      </div>
      <p className="affirmation-count">{index + 1} / {AFFIRMATIONS.length}</p>
    </div>
  )
}

export function GoalStepper() {
  const [open, setOpen] = useState(0)

  return (
    <div className="goal-stepper">
      {GOAL_PHASES.map((phase, i) => (
        <div key={i} className={`goal-phase ${open === i ? 'goal-phase--open' : ''}`}>
          <button className="goal-phase-header" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="goal-phase-number">{phase.number}</span>
            <span className="goal-phase-title">{phase.heading}</span>
            <span className="goal-phase-chevron">{open === i ? '▲' : '▼'}</span>
          </button>
          {open === i && (
            <ul className="goal-phase-items">
              {phase.items.map((item, ii) => <li key={ii}>{item}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export function GratitudePromptPicker() {
  const [index, setIndex] = useState(0)
  const next = () => setIndex(i => (i + 1) % GRATITUDE_PROMPTS.length)

  return (
    <div className="gratitude-prompt">
      <p className="gratitude-label">Today's Prompt</p>
      <p className="gratitude-text" key={index}>{GRATITUDE_PROMPTS[index]}</p>
      <div className="gratitude-footer">
        <span className="gratitude-count">{index + 1} of {GRATITUDE_PROMPTS.length}</span>
        <button className="gratitude-next" onClick={next}>Next Prompt →</button>
      </div>
    </div>
  )
}
