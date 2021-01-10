import React, { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { Worker, Interval } from "./Types";
import { min } from "date-fns/esm/fp";

function CalculateQ1(workers: Worker[]): Date {
  const StartTimes: Date[] = [];
  console.log(workers);
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      StartTimes.push(interval.startTime);
      //  console.log("Added " + interval.startTime);
    });
  });
  console.log(
    "The start date/time of the earliest interval is: " + min(StartTimes)
  );
  return min(StartTimes);
}

const Question1 = (props: any): any => {
  const [answer, setAnswer] = useState<Date | null>(new Date());

  return (
    <div>
      <button onClick={() => setAnswer(CalculateQ1(props.workers))}>
        update
      </button>
      <h1>Answer 1: {JSON.stringify(answer)}</h1>
    </div>
  );
};

export default Question1;
