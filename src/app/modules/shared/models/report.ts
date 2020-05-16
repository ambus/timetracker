import { TimeInfo } from './timeInfo';

export interface Report extends TimeInfo {
  id: string;
  day: string;
  timeSum: number;
}
