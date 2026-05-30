import VillaLayout from '../components/VillaLayout'
import { AffirmationDeck, GoalStepper, GratitudePromptPicker } from '../components/InspirationInteractives'

export default function InspirationVilla() {
  return (
    <VillaLayout villa={{
      id: 6,
      name: 'Inspiration Villa',
      emoji: '✨',
      color: '#f97316',
      colorLight: '#fdba74',
      tagline: 'You have everything within you. Let\'s help you remember that.',
      sections: [
        {
          icon: '💡',
          title: 'Daily Affirmations',
          text: 'Tap through these affirmations one at a time. Say it aloud, write it down, or just sit with it for a moment.',
          component: <AffirmationDeck />
        },
        {
          icon: '📚',
          title: 'Stories of Hope',
          text: 'Real stories from real people who have navigated mental health challenges and emerged stronger. You are never alone in your journey.'
        },
        {
          icon: '🎯',
          title: 'Goal Setting',
          text: 'You don\'t need a 10-step plan. You need one honest intention and the willingness to begin. Open each phase when you\'re ready.',
          component: <GoalStepper />
        },
        {
          icon: '🌅',
          title: 'Gratitude Practice',
          text: 'Gratitude doesn\'t mean pretending everything is fine. It means finding one real thing worth noticing. A new prompt whenever you need one.',
          component: <GratitudePromptPicker />
        },
        {
          icon: '🏅',
          title: 'Michael Phelps — The Most Decorated Olympian Who Almost Gave Up',
          text: 'Twenty-three gold medals. The most decorated Olympian in history. But behind the medals was a man fighting a battle nobody could see — depression, isolation, and thoughts of not wanting to be alive.',
          script: `[SCENE: Slow motion underwater footage — a swimmer gliding through still water. Soft ambient music begins.]

NARRATOR (warm, steady):
Twenty-three gold medals. The most decorated Olympian in history.

When people hear the name Michael Phelps, they think of victory. Of a body built for water. Of a mind built to win.

But behind the medals was a man who had to fight a very different kind of battle — every single day.

[SCENE: Quiet locker room. Empty podium. A lone figure sitting in shadow.]

Growing up with ADHD in a world that didn't understand it, Michael felt different from an early age. He channelled everything into the pool. But the water could only hold so much.

After the 2012 London Olympics, Michael found himself at his lowest point. He locked himself in his room for days. He didn't eat. He barely slept. He told himself he didn't want to be alive anymore.

"I was a train-wreck," he later said. "I was a disaster."

[SCENE: A phone lighting up on a dark table. A hand reaching for it.]

A friend — former NFL player Ray Lewis — called him. And with that phone call, something began to shift.

Michael checked into a treatment centre. He started therapy. He began to sit with the emotions he'd been swimming away from his entire life.

"I felt, for the first time, that I wasn't alone," he said.

[SCENE: Michael back in the water — this time his expression is different. Peaceful. Present.]

He returned to the pool — not as an escape, but as a choice.

At the 2016 Rio Olympics, Michael Phelps won five more gold medals. But this time, it wasn't just about the medals. It was about showing the world what it looks like to fight for yourself — and win.

Today, Michael is one of the world's most vocal advocates for mental health. He speaks to lawmakers, athletes, and children — because he knows what it feels like to be drowning on dry land.

[SCENE: Warm light. Still water. A slow breath.]

You are not your lowest moment.

Asking for help is not weakness. It is the bravest thing you will ever do.

If Michael Phelps could find his way back — so can you.

[FADE TO: Recovery Island logo / tagline]`
        },
        {
          icon: '📖',
          title: 'J.K. Rowling — From Welfare to Wizards',
          text: 'Before Harry Potter changed the world, its author was a single mother on welfare, clinically depressed, and convinced she was the biggest failure she knew. Rock bottom became her foundation.',
          script: `[SCENE: A rainy window. A small café in Edinburgh. A woman writing by hand, a baby asleep in a pram beside her.]

NARRATOR (gentle, unhurried):
Before Harry Potter changed the world, the woman who created him was sitting in a café — alone, exhausted, and barely getting by.

She was a single mother. Living on government welfare. Grieving the recent loss of her mother. Clinically depressed. And writing a story in longhand because she couldn't afford a typewriter.

[SCENE: Handwritten pages stacking up. The rain outside getting heavier.]

"By every conventional measure," J.K. Rowling would later say, "I was the biggest failure I knew."

She had lost her marriage. She had no job. She had a baby daughter, a biro, and a story about a boy who didn't know how powerful he was.

It's hard not to wonder — did she know she was writing about herself?

[SCENE: A stack of rejection letters. Twelve of them. Each one a quiet no.]

Twelve publishers rejected Harry Potter and the Philosopher's Stone.

Twelve times, someone looked at her work and said: not good enough. Not what we're looking for. Not what the world wants.

But a small publishing house — Bloomsbury — said yes.

And the world was never the same.

[SCENE: Bookshop windows. Children reading. Lights in the rain.]

J.K. Rowling later said that her years of failure — as painful as they were — forced her to strip away everything that wasn't essential. What remained was her truest self. And her truest purpose.

"Failure meant a stripping away of the inessential," she told Harvard graduates in 2008. "I stopped pretending to myself that I was anything other than what I was — and began to direct all my energy into finishing the only work that mattered to me."

[SCENE: A blank page. A pen. Morning light beginning to appear.]

Your hardest chapter is not your last chapter.

Sometimes the story you are meant to tell can only be written from the broken places.

You have a story worth telling. Don't give up before the world gets to read it.

[FADE TO: Recovery Island logo / tagline]`
        },
        {
          icon: '🎤',
          title: 'Demi Lovato — Breaking the Silence',
          text: 'A Disney star who was secretly battling bipolar disorder, an eating disorder, and self-harm. Demi Lovato didn\'t just survive — she turned her story into permission for millions to speak up about their own.',
          script: `[SCENE: Stage lights. A microphone stand. Then — quiet. A young woman offstage, alone.]

NARRATOR (warm, candid):
She was a Disney star at fifteen. Millions of fans. Sold-out tours. Her face on magazine covers.

And she was completely falling apart.

[SCENE: A hallway backstage. Muffled crowd noise. The silence between heartbeats.]

By seventeen, Demi Lovato was struggling with an eating disorder, self-harm, and a bipolar disorder that no one had yet diagnosed. By eighteen, she was in treatment.

"I felt like I couldn't tell anyone," she has said. "I thought people would think I was weak."

In a world that celebrates perfection, she had become an expert at hiding.

[SCENE: Hands folded. A quiet room. Someone finally ready to talk.]

After a breakdown in 2010, Demi checked into a treatment centre and stayed for three months.

For the first time, she learned to ask for help. To say the words out loud. To let people in.

[SCENE: Studio lights. A mic. A voice beginning to fill the room again.]

When she came back, she didn't pretend the breakdown hadn't happened.

She talked about it. She wrote songs about it. She stood on stage and said: I am not perfect. I have struggled. I am still here.

And something happened.

Millions of young people — who had been told, quietly and not so quietly, that mental illness was something to be hidden — felt seen for the very first time.

[SCENE: A crowd of faces. Some with tears. Some with relief.]

She has relapsed. She has been open about that too.

"I've been to treatment a few times," she said simply. "Each time, I've learned something new about myself."

Recovery is not a straight line. It is not a single moment where everything gets better and stays better.

[SCENE: Stage lights returning. Softer now. Steadier.]

What Demi Lovato gave the world was not a perfect recovery story.

She gave the world permission.

Permission to be struggling and still be worthy of love. Permission to fall down and still get back up. Permission to say: this is hard — and I am still here.

Your struggles do not disqualify you. They are part of your story.

And your story is not over.

[FADE TO: Recovery Island logo / tagline]`
        }
      ]
    }} />
  )
}