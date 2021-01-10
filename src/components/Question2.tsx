import React, { useState } from "react";
import { parseISO } from "date-fns";
import { Worker, Interval } from "./Types";
import { max } from "date-fns/esm/fp";

function CalculateQ2(workers: Worker[]): Date {
  const EndTimes: Date[] = [];
  console.log(workers);
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      EndTimes.push(interval.endTime);
      //   console.log("Added " + interval.endTime);
    });
  });
  console.log("The end date/time of the latest interval is: " + max(EndTimes));
  return max(EndTimes);
}

const Question2 = (props: any): any => {
  const [answer, setAnswer] = useState<Date | null>(new Date());
  return (
    <div>
      <h1>Answer 2: {JSON.stringify(answer)}</h1>
      <button onClick={() => setAnswer(CalculateQ2(props.workers))}> </button>
    </div>
  );
};

export default Question2;
