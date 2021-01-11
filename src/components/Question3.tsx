import React, { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { Worker, Interval } from "./Types";
import { max } from "date-fns/esm/fp";
import { areIntervalsOverlapping } from "date-fns";

function CalculateQ3(workers: Worker[]): any {
  const allInterval: any = [];
  const overlapIntervals: any = [];
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      allInterval.push(interval);
    });
  });

  console.log(allInterval);

  allInterval.forEach((interval: any, index: any) => {
    const startTime = allInterval[index].startTime;
    const endTime = allInterval[index].endTime;

    console.log(index + "Start time:  " + startTime);
    console.log("End time:  " + endTime);

    allInterval.forEach((interval: any, compIndex: any) => {
      const comparisonStartTime = allInterval[compIndex].startTime;
      const comparisonEndTime = allInterval[compIndex].endTime;

      console.log(index + "Start comparison time:  " + comparisonStartTime);
      console.log("End comparison time:  " + comparisonEndTime);

      if (
        startTime < comparisonEndTime &&
        endTime > comparisonStartTime &&
        index != compIndex
      ) {
        console.log("found match compid: " + compIndex + "realID" + index);
        overlapIntervals.push(
          new Date(Math.max(startTime, comparisonStartTime)).toISOString() +
            "/" +
            new Date(Math.min(endTime, comparisonEndTime)).toISOString()
        );
      }
    });
  });

  /*
  IF
  start time is earlier than the comapred end time : Starts before comparison ends
  AND
  end time is later than comparison start time : Ends after comparison starts
  AND
  Isn't the same id(interval)

  */

  // console.log(JSON.stringify(allInterval[1].startTime));
  const unique = overlapIntervals.filter(
    (v: any, i: any, a: any) => a.indexOf(v) === i
  );
  console.log("Here's a date" + unique);
  return allInterval;
}

const Question3 = (props: any): any => {
  const [answer, setAnswer] = useState<Date | null>(null);

  return (
    <div>
      <button onClick={() => setAnswer(CalculateQ3(props.workers))}>
        Answer 3
      </button>
      {answer && <h1>Answer 3: {JSON.stringify(answer)}</h1>}
    </div>
  );
};

export default Question3;
