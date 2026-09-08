import { PersonalizationData } from '../types';

export const initialPersonalizationData: PersonalizationData = {
  recipientName: 'Ranim',
  senderName: 'Omar',
  birthdayDateFormatted: 'September 19',
  birthdayCode: '19.09',

  distanceStats: {
    userCity: 'Sbiba',
    herCity: 'Sfax',
    distanceMiles: '210 KM',
    timeDifference: 'Same time',
    daysTalking: '39',
    firstMetDate: '19 August',
    estimatedMessages: '+10.000',
    callHoursCount: '5 hours',
  },

  openingMessages: {
    curiosityLine: 'Before you open this…',
    intimateLine: 'There are a few quiet things I wanted to write down for you.',
    buttonLabel: 'Open it',
  },

  introLetter: {
    headline: 'Some things are easier to build than to say.',
    body: [
      'I didn’t want to send a hurried paragraph over a chat screen that disappears in an hour.',
      'A year turns quietly, but certain people shift the gravity of everyday days without even making a sound. You did that.',
      'So instead of something conventional, I built this space. Take your time with it.',
    ],
    closingLine: 'September 19 — for you.',
  },

  timelineMoments: [
    {
      id: 'moment-1',
      tag: '01 / FIRST WORDS',
      title: 'The first conversation',
      date: '11 August',
      previewNote: 'Neither of us knew this wasn’t going to just be another random notification.',
      expandedStory:
        'We started talking without any dramatic preamble. Just a comment that could have ended in two lines, but somehow lingered until the evening turned cold.',
      chatSnippet: {
        speakerA: 'Omar',
        speakerB: 'Ranim',
        time: '11:42 PM',
        textA: 'Wink ranim cvv',
        textB: 'Hmdlhh\nWink etti',
      },
      locationOrContext: 'A quiet evening across screens',
    },
    {
      id: 'moment-2',
      tag: '02 / UNEXPECTED HUMOR',
      title: 'The first time you actually made me laugh',
      date: 'August',
      previewNote: 'Not a polite courtesy laugh. An actual, out-loud, catching-my-breath reaction.',
      expandedStory:
        'You have this dry, sudden way of observing things that completely disarms me. I remember re-reading what you sent and thinking, “Oh. She’s completely different.”',
      chatSnippet: {
        speakerA: 'Ranim',
        speakerB: 'Omar',
        time: '1:15 AM',
        textA: 'Fuck u',
        textB: 'byotifol',
      },
      locationOrContext: 'Midway through an ordinary Tuesday',
    },
    {
      id: 'moment-3',
      tag: '03 / MIDNIGHT DRIFT',
      title: 'The conversation that lasted way too long',
      date: 'Late August',
      previewNote: '“Haya nor9do a33333” — said hours before either of us actually slept.',
      expandedStory:
        'We kept finding new corners of thought to unravel. The room went pitch black, the screen glowed against the pillow, and neither of us wanted to be the one to surrender to sleep first.',
      locationOrContext: '3:47 AM / Both of us exhausted but refusing to hang up',
    },
    {
      id: 'moment-4',
      tag: '04 / THE SHIFT',
      title: 'The moment I realized I actually cared',
      date: 'August',
      previewNote: 'Something small went wrong in your day, and it genuinely altered mine.',
      expandedStory:
        'It wasn’t a grand realization with music swelling in the background. It was just an afternoon where you mentioned feeling drained, and I caught myself wishing I could step through the glass and hand you a warm drink.',
      locationOrContext: 'A sudden afternoon realization',
    },
    {
      id: 'moment-5',
      tag: '05 / UNFORGETTABLE',
      title: 'That random conversation I’ll probably never forget',
      date: 'August',
      previewNote: 'Completely unprompted, utterly specific, still sitting clear in my head.',
      expandedStory:
        'We ended up debating something completely ridiculous for forty-five minutes. You took your side with absolute conviction, and I realized how much I loved the way your brain works.',
      chatSnippet: {
        speakerA: 'Ranim',
        speakerB: 'Omar',
        time: '5:20 PM',
        textA: 'Mawdhou3 Abu Lahab yb9a fi jhanam wla le AHHAHHHAH',
        textB: 'I felt real connection w9tha',
      },
      locationOrContext: 'Unscripted and irreplaceable',
    },
  ],

  unsaidMessages: [
    {
      id: 'unsaid-1',
      category: 'unsaid',
      title: 'On quiet evenings',
      teaser: 'About the pauses between our messages…',
      fullMessage:
        'Sometimes when we’re both quiet, I don’t feel any rush to fill the silence. With most people, silence feels like distance. With you, it just feels like sitting in the same room while the world outside does its noise.',
      handwrittenNote: 'Took me a while to notice how rare that is.',
    },
    {
      id: 'unsaid-2',
      category: 'unsaid',
      title: 'The voice note effect',
      teaser: 'When you send an audio message instead of typing…',
      fullMessage:
        'Whenever you leave an audio clip, I almost never listen just once. The cadence of your voice, the way you breathe between sentences, how you laugh halfway through an explanation—it carries a reality that text never quite captures.',
      handwrittenNote: 'T3jbni kif t7ki blou8t el sfa9 😭😭',
    },
    {
      id: 'unsaid-3',
      category: 'unsaid',
      title: 'Re-reading without telling you',
      teaser: 'A small habit I never mentioned…',
      fullMessage:
        'On days when work is heavy or things feel gray, I sometimes scroll up to an exchange where you were making fun of me or talking excitedly about something you love. It resets my mood faster than anything else.',
      handwrittenNote: 'Guilty as charged.',
    },
    {
      id: 'unsaid-4',
      category: 'unsaid',
      title: 'The honest truth about distance',
      teaser: 'People always say online isn’t tangible…',
      fullMessage:
        'People who think a screen prevents depth don’t know what it’s like to share thoughts you wouldn’t tell anyone sitting next to you. The kilometers exist, sure. But the impact is real.',
      handwrittenNote: 'More real than most things.',
    },
  ],

  thingsILikeMessages: [
    {
      id: 'like-1',
      category: 'details',
      teaser: 'How you explain things you care about',
      fullMessage:
        'I like the sudden cadence shift when you talk about ur day. You talk a little faster, your explanations get animated, and you forget to be self-conscious.',
      handwrittenNote: 'Don’t ever hide that enthusiasm.',
    },
    {
      id: 'like-2',
      category: 'details',
      teaser: 'The way you notice tiny details',
      fullMessage:
        'You pick up on things that 99% of people glance right over. A subtle change in tone, a weird phrasing, or some tiny background detail in a picture.',
      handwrittenNote: 'It keeps me on my toes in the best way.',
    },
    {
      id: 'like-3',
      category: 'details',
      teaser: 'Your specific brand of stubbornness',
      fullMessage:
        'I like that you don’t just agree with me to be polite. When you believe something whether it’s about film or how coffee should be made you hold your ground.',
      handwrittenNote: 'Even when you’re technically wrong nfadlk.',
    },
    {
      id: 'like-4',
      category: 'details',
      teaser: 'Your unexpected sense of humor',
      fullMessage:
        'You can appear calm and composed, but then drop a deadpan one-liner so sharp it takes two seconds to register before I burst out laughing.',
      handwrittenNote: 'el fuck u mte3k hahahaha',
    },
    {
      id: 'like-5',
      category: 'details',
      teaser: 'How comfortable you make ordinary moments feel',
      fullMessage:
        'I like the way you somehow turn a completely normal, mundane conversation about grocery shopping or weather into something I find myself thinking about hours later.',
      handwrittenNote: 'A rare kind of magic.',
    },
    {
      id: 'like-6',
      category: 'details',
      teaser: 'The way you send multiple short messages in a row',
      fullMessage:
        'Seeing five notifications in three seconds with three-word sentences because your thoughts move faster than your keyboard.',
      handwrittenNote: 'Always makes me smile.',
    },
    {
      id: 'like-7',
      category: 'details',
      teaser: 'How thoughtful you are when someone is struggling',
      fullMessage:
        'You have an instinctive emotional radar. You don’t offer hollow clichés; you just offer genuine, steady presence.',
      handwrittenNote: 'A deeply gentle quality.',
    },
    {
      id: 'like-8',
      category: 'details',
      teaser: 'That one look / photo where you look completely yourself',
      fullMessage:
        'Not the posed, curated ones. The candid one where you were slightly looking away or caught mid-laugh. That’s the version of you that lives in my head.',
      handwrittenNote: 'Keep going byotifol',
    },
  ],

  photoMemories: [
    {
      id: 'photo-1',
      code: '1',
      caption: 'The quiet grace in every line',
      subtext: 'There is a stillness and patience in this piece that completely pulls you in. Every line feels intentional, delicate, and alive.',
      aspectRatio: 'portrait',
      rotation: -2,
      initialBlur: false,
      sampleImgUrl: 'https://i.ibb.co/V0YRT8gv/IMG-20260822-143216-714.jpg',
    },
    {
      id: 'photo-2',
      code: '2',
      caption: 'Shades of feeling',
      subtext: 'The way you handle tones, contours, and depth is mesmerizing. It carries a mood and warmth that words alone could never capture.',
      aspectRatio: 'portrait',
      rotation: 2.5,
      initialBlur: false,
      sampleImgUrl: 'https://i.ibb.co/20Nt130f/IMG-20260822-143150-716.jpg',
    },
    {
      id: 'photo-3',
      code: '3',
      caption: 'Between stillness and imagination',
      subtext: 'A window directly into how your mind perceives beauty. I could look at the subtle details here for hours and still discover something new.',
      aspectRatio: 'portrait',
      rotation: -1.5,
      initialBlur: false,
      sampleImgUrl: 'https://i.ibb.co/G4j4Gt25/IMG-20260822-143309-533.jpg',
    },
    {
      id: 'photo-4',
      code: '4',
      caption: 'Expressions held in ink',
      subtext: 'You have this rare gift of capturing vulnerability, emotion, and life in a single glance. It stays with me every time I see it.',
      aspectRatio: 'portrait',
      rotation: 2,
      initialBlur: false,
      sampleImgUrl: 'https://i.ibb.co/pB5dfNCT/IMG-20260822-143305-888.jpg',
    },
    {
      id: 'photo-5',
      code: '5',
      caption: 'Where your soul speaks',
      subtext: 'My favorite kind of art—the kind that comes straight from your hands, crafted with gentle devotion and unmistakable talent.',
      aspectRatio: 'portrait',
      rotation: -2,
      initialBlur: false,
      sampleImgUrl: 'https://i.ibb.co/JwGRcwLv/IMG-20260822-143307-810.jpg',
    },
  ],

  conversationPlaces: [
    {
      id: 'place-1',
      name: 'The First Clearing',
      coordinates: '00°01′N · First Words',
      atmosphere: 'Tentative curiosity, low ambient glow',
      story:
        'Where casual sentences crossed an invisible threshold. Nothing was promised yet, but the ground felt suddenly different underfoot.',
      insideJokePlaceholder: 'Our first topic',
      x: 18,
      y: 35,
    },
    {
      id: 'place-2',
      name: 'The 2:00 AM Archipelago',
      coordinates: '02°14′E · Midnight Quiet',
      atmosphere: 'Muted lamp light, half-whispers, heavy eyelids',
      story:
        'A sanctuary built of late-night hours where both of our daily filters fell away. We talked about fears, childhood memories, and things neither of us had said in years.',
      insideJokePlaceholder: '“Are you falling asleep?” — “No, I’m listening.”',
      x: 42,
      y: 68,
    },
    {
      id: 'place-3',
      name: 'The Ridge of Sudden Laughter',
      coordinates: '15°40′S · Unfiltered Humor',
      atmosphere: 'Sudden warmth, irrepressible giggles',
      story:
        'A bright, elevated peak where one of us said something completely absurd and the other couldn’t recover for five solid minutes.',
      insideJokePlaceholder: 'Mawdhou3 Abu Lahab 😭😭',
      x: 65,
      y: 28,
    },
    {
      id: 'place-4',
      name: 'The Harbor of Quiet Care',
      coordinates: '22°09′W · Steady Presence',
      atmosphere: 'Calm water, anchored security',
      story:
        'The moment when a bad day didn’t need solutions or advice—just someone on the other end of the line quietly staying until the storm passed.',
      insideJokePlaceholder: 'Whenever you need to vent, I’m always here',
      x: 80,
      y: 62,
    },
    {
      id: 'place-5',
      name: 'The Unfinished Terrace',
      coordinates: '19°09′ · September 19',
      atmosphere: 'Open horizon, twilight breeze, anticipation',
      story:
        'The place where all our future plans and unmade coffee dates wait. A reminder that what we have started is still only the opening chapter.',
      insideJokePlaceholder: 'Taybli Kafteji in person <3',
      x: 52,
      y: 42,
    },
  ],

  openWhenLetters: [
    {
      id: 'when-1',
      trigger: 'Open when you’re having a bad day',
      teaser: 'Take a deep breath first.',
      sealLabel: 'Deep breath',
      content: [
        'If today felt exhausting, heavy, or just unfair, stop for a second.',
        'You don’t have to prove anything today. You don’t have to have your life figured out by 10 PM.',
        'Drink a glass of water. Put on something soft. Remember that one bad day doesn’t erase how capable and resilient you are.',
        'And if you just need to vent without being given unsolicited advice, my notifications are always open for you.',
      ],
      postscript: 'P.S. You’re doing better than you think you are.',
    },
    {
      id: 'when-2',
      trigger: 'Open when you miss me',
      teaser: 'Across the miles.',
      sealLabel: 'Distance check',
      content: [
        'I know distance has moments where it feels like a dull weight.',
        'When you wish you could just grab my sleeve or nudge my arm across a table without having to type a message first.',
        'Whenever you feel that, know I’m likely looking at my phone or thinking about your laugh at that exact same time.',
        'Every conversation we have is closing a gap that won’t always be there.',
      ],
      postscript: 'Hold on to that. I certainly am.',
    },
    {
      id: 'when-3',
      trigger: 'Open when you need to smile',
      teaser: 'Emergency dose of ridiculousness.',
      sealLabel: 'Smile check',
      content: [
        'Remember [INSERT RIDICULOUS INSIDE JOKE OR MOMENT]?',
        'Think about the face you made when [INSERT SILLY STORY].',
        'You are entirely too serious sometimes. Untighten your jaw, drop your shoulders away from your ears, and smile.',
        'There. That’s better.',
      ],
      postscript: 'Yes, I know you just smiled.',
    },
    {
      id: 'when-4',
      trigger: 'Open when you’re wondering what I think about you',
      teaser: 'No games, just honesty.',
      sealLabel: 'True thoughts',
      content: [
        'I think you have a sharp mind and a tender heart, even if you sometimes pretend to be indifferent.',
        'I think you make my ordinary days significantly more interesting simply by existing in them.',
        'I think about what you said about [HER_SPECIAL_THOUGHT_OR_DREAM], and I genuinely admire your courage.',
        'You’re someone I am deeply, quietly glad to know.',
      ],
      postscript: 'That will not change tomorrow.',
    },
    {
      id: 'when-5',
      trigger: 'Open when you can’t sleep',
      teaser: 'For the quiet 3 AM ceiling stare.',
      sealLabel: 'Night quiet',
      content: [
        'It’s too late to solve whatever your mind is running laps around.',
        'Whatever is worrying you will still be there in the morning, but you’ll be much better equipped to handle it after resting.',
        'Let your screen dim. Close your eyes. Imagine us walking down a quiet street where neither of us has anywhere to be.',
      ],
      postscript: 'Sleep well. Talk to you tomorrow.',
    },
  ],

  quizQuestions: [
    {
      id: 'q-1',
      question: 'What was the exact vibe of our very first conversation?',
      options: [
        {
          text: 'Polite, slightly formal, and testing the waters',
          isCorrect: true,
          reaction: 'Exactly. Neither of us wanted to seem too eager, yet here we are.',
        },
        {
          text: 'Instant chaotic bickering like we knew each other for 10 years',
          isCorrect: false,
          reaction: 'That came about two days later, honestly.',
        },
        {
          text: 'One sentence exchanged and silence for a week',
          isCorrect: false,
          reaction: 'Thankfully no, or this website wouldn’t exist.',
        },
      ],
      explanation: 'Message bilel 😭😭😭',
    },
    {
      id: 'q-2',
      question: 'Who usually says “I have to go sleep” first vs. who actually sleeps first?',
      options: [
        {
          text: 'Enti dima t9oul nor9do 😭😭',
          isCorrect: false,
          reaction: 'Bhima zeyd.',
        },
        {
          text: 'I hang up immediately with zero sentimentality',
          isCorrect: false,
          reaction: 'You wish! You know I always wait for you.',
        },
        {
          text: 'Zouz nor9do frd w9t',
          isCorrect: true,
          reaction: 'Dima until now hahahahh',
        },
      ],
      explanation: 'Haya nor9do a33333',
    },
    {
      id: 'q-3',
      question: 'Which debate has caused the most disproportionate passion between us?',
      options: [
        {
          text: 'Coffee Style',
          isCorrect: false,
          reaction: 'Ken mawdhou3 t7foun ama nahh.',
        },
        {
          text: 'That one film / Tv show',
          isCorrect: false,
          reaction: 'Mzlt ntfkr awl recommendations mnk hahahhaha',
        },
        {
          text: 'Mawdhou3 Abu Lahab yb9a fi jhanam wla le AHHAHHHAH',
          isCorrect: true,
          reaction: 'I felt real connection w9tha',
        },
      ],
      explanation: 'Abu Lahab 😭😭😭😭',
    },
    {
      id: 'q-4',
      question: 'If we were magically in the same room right now, chnowa awl 7aja t3mlha?',
      options: [
        {
          text: 'Tadhrbni 😭😭😭',
          isCorrect: false,
          reaction: '7ram 3lik wlhhh 😭',
        },
        {
          text: 'Taybli Kafteji',
          isCorrect: true,
          reaction: 'Raw3a rakkkkk 😭😭',
        },
        {
          text: 'Argue about where to eat dinner',
          isCorrect: false,
          reaction: 'Motawa9a3 barcha hmmmm',
        },
      ],
      explanation: 'September 19 reminder: what’s virtual now won’t always be.',
    },
  ],

  finalLetter: {
    paragraphs: [
      'Birthdays have a strange way of prompting reflection. u measure the year not by the calendar pages, but by what surprised u along the way.',
      'Of all the unexpected turns this year took, u being in my daily life is the one I am most quietly grateful for wlhhh.',
      'Thank u for the humor that catches me off guard, for the patience during long weeks, and for turning arbitrary digital coordinates into a place that feels like home.',
      'I hope your upcoming year is generous to u. I hope it brings you quiet peace when u need it, electric excitement when you crave it, and the certainty that you are deeply appreciated.',
    ],
    scratchNote: 'Okay, I rewrote this part three times because words felt too stiff msatka wlh.',
    finalWish: 'Happy Birthday, Ranim. September 19 is a good day because of u <3.',
  },

  nightSkyStars: [
    {
      id: 'star-1',
      name: 'Alpha Memory',
      dateOrCode: 'Origin',
      magnitude: 1.8,
      x: 22,
      y: 26,
      message: 'The evening we spent talking about our childhood ambitions until the room turned light blue.',
    },
    {
      id: 'star-2',
      name: 'Inside Joke Cluster',
      dateOrCode: 'Nokta ki wjhk',
      magnitude: 1.4,
      x: 38,
      y: 45,
      message: '“If anyone saw our chat logs with zero context, we would both be committed.”',
    },
    {
      id: 'star-3',
      name: 'The Midnight Star',
      dateOrCode: '3:15 AM',
      magnitude: 1.6,
      x: 64,
      y: 22,
      message: 'The call where we fell asleep without hanging up. Waking up to the sound of soft breathing miles away.',
    },
    {
      id: 'star-4',
      name: 'Unspoken Horizon',
      dateOrCode: 'Next Chapter',
      magnitude: 2.1,
      x: 78,
      y: 52,
      message: 'All the coffee shops, train stations, and dinner tables we haven’t sat at yet.',
    },
    {
      id: 'star-5',
      name: 'The Shared Habit',
      dateOrCode: 'A7sn 7aja',
      magnitude: 1.3,
      x: 28,
      y: 72,
      message: 'Every time you send a song or a photo saying “thought of you.”',
    },
    {
      id: 'star-6',
      name: 'Constellation 19.09',
      dateOrCode: '19.09',
      magnitude: 3.2,
      x: 50,
      y: 48,
      message:
        'To the girl who makes distance feel like a temporary detail in a permanent story. Happy Birthday, Ranim.',
      isSpecialBirthdayStar: true,
    },
  ],
};
