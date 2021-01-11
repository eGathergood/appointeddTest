import React, { useState } from "react";
import { Worker } from "./Types";
import { min } from "date-fns/esm/fp";
import Button from "@material-ui/core/Button";

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
  const [answer, setAnswer] = useState<Date | null>(null);

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setAnswer(CalculateQ1(props.workers))}
      >
        Answer 1
      </Button>
      {answer && <h2>Answer 1: {JSON.stringify(answer)}</h2>}
    </div>
  );
};

export default Question1;
