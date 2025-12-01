export interface GiftIdea {
  title: string;
  description: string;
  estimatedPrice: string;
  reasoning: string;
  searchQuery: string;
}

export interface GiftResponse {
  giftIdeas: GiftIdea[];
}

export enum AppView {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface UserInput {
  description: string;
  budget: string;
}