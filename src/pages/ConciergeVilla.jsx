import VillaLayout from '../components/VillaLayout'

export default function ConciergeVilla() {
  return (
    <VillaLayout villa={{
      id: 1,
      name: 'Concierge Villa',
      emoji: '🏛️',
      color: '#f59e0b',
      colorLight: '#fcd34d',
      tagline: 'Your journey to wellness begins here. Let us guide you to the right destination.',
      sections: [
        {
          icon: '🗺️',
          title: 'Welcome to Serenity Island',
          text: 'This is your starting point. Our concierge team is here to help you navigate all seven villas and find the support that resonates most with you.'
        },
        {
          icon: '💬',
          title: 'Personalised Guidance',
          text: 'Not sure where to begin? Share how you\'re feeling and we\'ll suggest the best villa for your current state of mind and wellness goals.'
        },
        {
          icon: '📋',
          title: 'Your Wellness Plan',
          text: 'Build a personalised wellness journey by exploring each villa at your own pace. Every step you take here is a step toward a healthier, happier you.'
        },
        {
          icon: '🔔',
          title: 'Daily Check-ins',
          text: 'Start each day with a gentle check-in here. Track how you\'re feeling over time and watch your wellness journey unfold beautifully.'
        }
      ]
    }} />
  )
}