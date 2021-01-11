import React, { useState } from "react";
import { Worker, Interval } from "./Types";
import Button from "@material-ui/core/Button";

function CalculateQ3(workers: Worker[]): [] {
  const allInterval: any = [];
  const overlapIntervals: any = [];
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      allInterval.push(interval);
    });
  });

  console.log(allInterval);

  allInterval.forEach((interval: Interval, index: number) => {
    const startTime = allInterval[index].startTime;
    const endTime = allInterval[index].endTime;

    console.log(index + "Start time:  " + startTime);
    console.log("End time:  " + endTime);

    allInterval.forEach((interval: Interval, compIndex: number) => {
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

  // filters and removes duplicates
  const unique = overlapIntervals.filter(
    (value: any, index: number, a: any) => a.indexOf(value) === index
  );

  console.log("Here's a date" + unique);

  const intervalArray: any = [];
  unique.forEach((interval: Date, index: number) => {
    intervalArray.push(interval);
  });

  //console.log(intervalArray);

  return intervalArray;
}

const Question3 = (props: any): any => {
  const [answer, setAnswer] = useState<any | null>(null);

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setAnswer(CalculateQ3(props.workers))}
      >
        Answer 3
      </Button>

      {answer && (
        <ul>
          {answer.map((val: Date) => (
            <li key={answer}>Worker {val}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Question3;
