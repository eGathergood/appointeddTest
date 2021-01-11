import React, { useState, useEffect } from "react";
import InputData from "../data/input.txt";
import TestData from "../data/testInput.txt";
import { parseISO } from "date-fns";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";

const EXTRACT_INTERVALS_REGEX = /[^[\]]+(?=])/; // Get the content between [ ]

interface Worker {
  id: string;
  intervals: Interval[];
}

interface Interval {
  startTime: Date;
  endTime: Date;
}

function getWorkers(testingData: any): Worker[] {
  const workers: Worker[] = [];

  testingData.forEach((value: string, index: number) => {
    const worker: Worker = { id: value.split("@")[0], intervals: [] };
    // @ts-ignore: Object is possibly 'null'
    const unformattedIntervals = EXTRACT_INTERVALS_REGEX.exec(value)[0].split(
      ","
    );

    unformattedIntervals.forEach((entry) => {
      const start = entry.split("/")[0];
      const end = entry.split("/")[1];
      const interval: Interval = {
        startTime: parseISO(start),
        endTime: parseISO(end),
      };
      worker.intervals.push(interval);
    });
    console.log(worker);
    workers.push(worker);
  });
  return workers;
}

const Home = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [showModal, toggleModal] = useState(false);
  useEffect(() => {
    fetch(TestData)
      .then((response) => response.text())
      .then((data) => {
        setWorkers(getWorkers(data.toString().split("\n")));
      });
  }, [setWorkers]);

  return (
    <div>
      <Question1 workers={workers} />
      <Question2 workers={workers} />
      <Question3 workers={workers} />
    </div>
  );
};

{
  /* <h1>Workers</h1>
<ul>
  {workers.map((worker) => (
    <li key={worker.id}>
      Worker {worker.id} has {worker.intervals.length} free intervals
    </li>
  ))}
</ul> */
}

/*
loop through workers =>
loop through intervals
add to array/we 

Q1: call min on array
Q2: call max on array

Q3gst
worker1 has intervals
Worker2 has intervals
For each worker*, loop through each interval to find if there is any overlap?
Datefns https://date-fns.org/v1.30.1/docs/isWithinRange

"Does Worker 1 interval starDate overlap with worker 2's interval. 
If YES then the "free time" is worker1 startDate - worker2 endDate (for that specific interval)"
*/

export default Home;
