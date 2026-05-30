import VillaLayout from '../components/VillaLayout'

export default function WellnessVilla() {
  return (
    <VillaLayout villa={{
      id: 5,
      name: 'Wellness Villa',
      emoji: '💆',
      color: '#f43f5e',
      colorLight: '#fda4af',
      tagline: 'Whole-person wellness — mind, body, and soul in harmony.',
      sections: [
        {
          icon: '🏃',
          title: 'Movement & Exercise',
          text: 'Discover how mindful movement — yoga, walking, stretching — can dramatically improve your mental health and emotional resilience.'
        },
        {
          icon: '🥗',
          title: 'Nourishment Guide',
          text: 'Explore the connection between nutrition and mental wellbeing. Simple, accessible guidance on eating in a way that supports your mood.'
        },
        {
          icon: '💧',
          title: 'Holistic Health',
          text: 'Hydration, sunlight, nature exposure — small daily habits that compound into remarkable improvements in how you think and feel.'
        },
        {
          icon: '📅',
          title: 'Wellness Routines',
          text: 'Build morning and evening routines that set you up for emotional stability and physical vitality every single day.'
        }
      ]
    }} />
  )
}