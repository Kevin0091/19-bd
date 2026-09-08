export interface TimelineMoment {
  id: string;
  tag: string;
  title: string;
  date: string;
  previewNote: string;
  expandedStory: string;
  chatSnippet?: {
    speakerA: string;
    speakerB: string;
    time: string;
    textA: string;
    textB: string;
  };
  photoPlaceholder?: string;
  locationOrContext?: string;
}

export interface SpecificMessage {
  id: string;
  category: 'unsaid' | 'details';
  title?: string;
  teaser: string;
  fullMessage: string;
  handwrittenNote?: string;
  isCustomPlaceholder?: boolean;
}

export interface PhotoMemory {
  id: string;
  code: string; // e.g. "1", "2", "3"
  caption: string;
  subtext: string;
  date?: string;
  location?: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  rotation: number;
  initialBlur: boolean;
  sampleImgUrl: string;
}

export interface ConversationPlace {
  id: string;
  name: string;
  coordinates: string;
  atmosphere: string;
  story: string;
  insideJokePlaceholder?: string;
  x: number; // percentage on map (0 - 100)
  y: number; // percentage on map (0 - 100)
}

export interface OpenWhenLetter {
  id: string;
  trigger: string;
  teaser: string;
  sealLabel: string;
  content: string[];
  postscript?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    reaction: string;
  }[];
  explanation: string;
}

export interface CelestialStar {
  id: string;
  name: string;
  dateOrCode: string;
  magnitude: number;
  x: number; // percentage
  y: number; // percentage
  message: string;
  isSpecialBirthdayStar?: boolean;
}

export interface PersonalizationData {
  recipientName: string;
  senderName: string;
  birthdayDateFormatted: string; // e.g., "September 19"
  birthdayCode: string; // e.g., "19.09"
  distanceStats: {
    userCity: string;
    herCity: string;
    distanceMiles: string;
    timeDifference: string;
    daysTalking: string;
    firstMetDate: string;
    estimatedMessages: string;
    callHoursCount: string;
  };
  openingMessages: {
    curiosityLine: string;
    intimateLine: string;
    buttonLabel: string;
  };
  introLetter: {
    headline: string;
    body: string[];
    closingLine: string;
  };
  timelineMoments: TimelineMoment[];
  unsaidMessages: SpecificMessage[];
  thingsILikeMessages: SpecificMessage[];
  photoMemories: PhotoMemory[];
  conversationPlaces: ConversationPlace[];
  openWhenLetters: OpenWhenLetter[];
  quizQuestions: QuizQuestion[];
  finalLetter: {
    paragraphs: string[];
    scratchNote: string;
    finalWish: string;
  };
  nightSkyStars: CelestialStar[];
}
