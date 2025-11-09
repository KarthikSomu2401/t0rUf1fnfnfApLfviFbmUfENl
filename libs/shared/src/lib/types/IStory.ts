export interface IStory {
  by: string;
  id: number;
  descendants: number; 
  kids: number[];
  score: number;
  time: number;
  text?: string;
  title: string;
  type: string;
  url: string;
}