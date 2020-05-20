import { TimeInfo } from './timeInfo';

export interface Report extends TimeInfo {
  id: string;
  day: string;
  time: number;
  project: string;
}
