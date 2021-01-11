import React, { useState } from "react";
import { Worker } from "./Types";
import { max } from "date-fns/esm/fp";
import Button from "@material-ui/core/Button";

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
  const [answer, setAnswer] = useState<Date | null>(null);
  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setAnswer(CalculateQ2(props.workers))}
      >
        Answer 2
      </Button>
      {answer && <h2>Answer 2: {JSON.stringify(answer)}</h2>}
    </div>
  );
};

export default Question2;
