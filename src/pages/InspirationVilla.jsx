import VillaLayout from '../components/VillaLayout'
import { AffirmationDeck, GoalStepper, GratitudePromptPicker, StoriesOfHope } from '../components/InspirationInteractives'

export default function InspirationVilla() {
  return (
    <VillaLayout villa={{
      id: 6,
      name: 'Inspiration Villa',
      emoji: '\u2728',
      color: '#f97316',
      colorLight: '#fdba74',
      tagline: "You have everything within you. Let's help you remember that.",
      sections: [
        {
          icon: '\U0001F4A1',
          title: 'Daily Affirmations',
          text: 'Tap through these affirmations one at a time. Say it aloud, write it down, or just sit with it for a moment.',
          component: <AffirmationDeck />
        },
        {
          icon: '\U0001F4DA',
          title: 'Stories of Hope',
          text: 'Real experiences from people who have navigated mental health challenges and found their way through. Read a story, see yourself in it, and know — you are never alone in this.',
          component: <StoriesOfHope />
        },
        {
          icon: '\U0001F3AF',
          title: 'Goal Setting',
          text: "You don't need a 10-step plan. You need one honest intention and the willingness to begin. Open each phase when you're ready.",
          component: <GoalStepper />
        },
        {
          icon: '\U0001F305',
          title: 'Gratitude Practice',
          text: "Gratitude doesn't mean pretending everything is fine. It means finding one real thing worth noticing. A new prompt whenever you need one.",
          component: <GratitudePromptPicker />
        },
        {
          icon: '\U0001F3C5',
          title: 'Michael Phelps — The Most Decorated Olympian Who Almost Gave Up',
          text: 'Twenty-three gold medals. The most decorated Olympian in history. But behind the medals was a man fighting a battle nobody could see — depression, isolation, and thoughts of not wanting to be alive.',
          script: `Twenty-three gold medals. The most decorated Olympian in history.

When people hear the name Michael Phelps, they think of victory. Of a body built for water. Of a mind built to win.

But behind the medals was a man who had to fight a very different kind of battle — every single day.

Growing up with ADHD in a world that did not understand it, Michael felt different from an early age. He channelled everything into the pool. But the water could only hold so much.

After the 2012 London Olympics, Michael found himself at his lowest point. He locked himself in his room for days. He did not eat. He barely slept. He told himself he did not want to be alive anymore.

"I was a train-wreck," he later said. "I was a disaster."

A friend — former NFL player Ray Lewis — called him. And with that phone call, something began to shift.

Michael checked into a treatment centre. He started therapy. He began to sit with the emotions he had been swimming away from his entire life.

"I felt, for the first time, that I was not alone," he said.

He returned to the pool — not as an escape, but as a choice.

At the 2016 Rio Olympics, Michael Phelps won five more gold medals. But this time, it was not just about the medals. It was about showing the world what it looks like to fight for yourself — and win.

Today, Michael is one of the world's most vocal advocates for mental health. He speaks to lawmakers, athletes, and children — because he knows what it feels like to be drowning on dry land.

You are not your lowest moment.

Asking for help is not weakness. It is the bravest thing you will ever do.

If Michael Phelps could find his way back — so can you.`
        },
        {
          icon: '\U0001F4D6',
          title: 'J.K. Rowling — From Welfare to Wizards',
          text: 'Before Harry Potter changed the world, its author was a single mother on welfare, clinically depressed, and convinced she was the biggest failure she knew. Rock bottom became her foundation.',
          script: `Before Harry Potter changed the world, the woman who created him was sitting in a cafe — alone, exhausted, and barely getting by.

She was a single mother. Living on government welfare. Grieving the recent loss of her mother. Clinically depressed. And writing a story in longhand because she could not afford a typewriter.

"By every conventional measure," J.K. Rowling would later say, "I was the biggest failure I knew."

She had lost her marriage. She had no job. She had a baby daughter, a biro, and a story about a boy who did not know how powerful he was.

Twelve publishers rejected Harry Potter and the Philosopher's Stone.

Twelve times, someone looked at her work and said: not good enough. Not what we are looking for. Not what the world wants.

But a small publishing house — Bloomsbury — said yes.

And the world was never the same.

J.K. Rowling later said that her years of failure — as painful as they were — forced her to strip away everything that was not essential. What remained was her truest self. And her truest purpose.

"Failure meant a stripping away of the inessential," she told Harvard graduates in 2008. "I stopped pretending to myself that I was anything other than what I was — and began to direct all my energy into finishing the only work that mattered to me."

Your hardest chapter is not your last chapter.

Sometimes the story you are meant to tell can only be written from the broken places.

You have a story worth telling. Do not give up before the world gets to read it.`
        },
        {
          icon: '\U0001F393',
          title: "Maya's Story — When University Felt Like Too Much",
          text: "She left home excited and arrived at university terrified. What followed was a quiet unravelling that many students know — but few talk about. This is Maya's story of anxiety, courage, and finding her way back to herself.",
          script: `She had planned for this moment her entire life.

New city. New independence. New beginning.

What nobody told Maya was how loud the silence would be once her parents drove away.

In high school, she knew the rules. She knew the teachers. She knew where she stood.

University was different.

No one chased her for assignments. No one noticed if she missed a tutorial. The expectation was simple — and crushing: figure it out yourself.

The workload arrived like a wave she was not ready for.

Self-directed learning, they called it. Read the chapters. Form your own study schedule. Prepare for exams that were months away — or maybe weeks — it was hard to keep track.

She tried to keep up. She made lists. She rewrote her timetable three times.

But somewhere between the first assignment and the second, something started to shift.

She stopped sleeping well.

Not dramatically — just she would lie there, mind racing, replaying a seminar comment she had made, wondering if it sounded stupid, wondering if people had noticed, wondering if she was already falling behind.

Her shoulders ached. Her jaw was tight when she woke up.

She told herself it was just adjustment. Everyone felt this way.

The friendships she had imagined — easy, instant, like in the movies — had not quite materialised.

Her secondary school friends were at different universities, busy with their own new lives. The people in her dorm were friendly enough, but she felt like she was always slightly outside the joke.

She started declining invitations. It felt easier than the effort of pretending to be fine.

She did not have a name for what she was feeling.

It was not sadness, exactly. It was more like everything requiring twice as much energy as it should. Like she was walking through water. Like there was a low hum of dread underneath everything, all the time.

She Googled her symptoms at midnight: cannot sleep, muscle tension, constant worry, feeling disconnected.

The word that kept appearing was: anxiety.

She closed the tab.

In a call home, when her mum asked how university was going, Maya said: "Great. Really good."

She did not know how to explain something she did not fully understand herself.

She walked past a Student Counselling Services flyer eleven times before she took a photo of it.

She made an appointment, cancelled it, made it again.

When she finally sat down in the counsellor's office, she did not know what to say.

So she just said: I think I am not okay. And I do not know how long I have been not okay.

The counsellor listened. Not to fix. Not to minimise. Just — listened.

And then she said something Maya had never heard directed at her before:

"What you are describing is anxiety. It is very common — especially in the transition to university. And it is very treatable. You were right to come."

Over the following weeks, Maya began to understand herself differently.

She saw a psychiatrist, who helped her understand why her nervous system had been running on high alert for so long. She learned what anxiety actually was — not weakness, not failure, not a character flaw. A pattern. A signal. Something that could be worked with.

She started tracking her moods. Some days were hard. Some were surprisingly okay.

Slowly, carefully, she started letting people in.

She told her flatmate one evening, almost by accident. Her flatmate said: "Oh my god, me too. I have been losing it."

They laughed — really laughed — for the first time.

Maya did not suddenly become a different person.

She still found group projects stressful. She still overthought emails. She still had weeks where everything felt heavier than it should.

But she had something she did not have before.

She had words for what she was feeling. She had a counsellor she trusted. She had a flatmate who got it. And she had the knowledge — hard-won and real — that asking for help was not giving up.

It was the bravest thing she had ever done.

Recovery does not mean the anxiety disappears forever.

It means you learn to notice it. To understand it. To care for yourself well enough that it no longer runs your life.

It means checking in — not just once, but regularly. Tracking how you feel. Noticing patterns. Coming back to the tools that help.

If you are in the middle of your own transition — new place, new expectations, new version of yourself you have not quite met yet — know this:

What you are feeling is real. It has a name. And you do not have to carry it alone.

It is okay to have anxiety.

It is okay to need support.

It is okay to come back here — as many times as you need.`
        },
        {
          icon: '\U0001F3A4',
          title: 'Demi Lovato — Breaking the Silence',
          text: "A Disney star who was secretly battling bipolar disorder, an eating disorder, and self-harm. Demi Lovato didn't just survive — she turned her story into permission for millions to speak up about their own.",
          script: `She was a Disney star at fifteen. Millions of fans. Sold-out tours. Her face on magazine covers.

And she was completely falling apart.

By seventeen, Demi Lovato was struggling with an eating disorder, self-harm, and a bipolar disorder that no one had yet diagnosed. By eighteen, she was in treatment.

"I felt like I could not tell anyone," she has said. "I thought people would think I was weak."

In a world that celebrates perfection, she had become an expert at hiding.

After a breakdown in 2010, Demi checked into a treatment centre and stayed for three months.

For the first time, she learned to ask for help. To say the words out loud. To let people in.

When she came back, she did not pretend the breakdown had not happened.

She talked about it. She wrote songs about it. She stood on stage and said: I am not perfect. I have struggled. I am still here.

And something happened.

Millions of young people — who had been told, quietly and not so quietly, that mental illness was something to be hidden — felt seen for the very first time.

She has relapsed. She has been open about that too.

"I have been to treatment a few times," she said simply. "Each time, I have learned something new about myself."

Recovery is not a straight line. It is not a single moment where everything gets better and stays better.

What Demi Lovato gave the world was not a perfect recovery story.

She gave the world permission.

Permission to be struggling and still be worthy of love. Permission to fall down and still get back up. Permission to say: this is hard — and I am still here.

Your struggles do not disqualify you. They are part of your story.

And your story is not over.`
        }
      ]
    }} />
  )
}
