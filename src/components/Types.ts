export interface Worker {
    id: string;
    intervals: Interval[];
  }

  export interface Interval {
    startTime: Date;
    endTime: Date;
  }