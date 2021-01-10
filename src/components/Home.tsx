import { worker, workers } from "cluster";
import React, { useState, useEffect } from "react";
import InputData from "../data/input.txt";
import TestData from "../data/testInput.txt";
import { parseISO } from "date-fns";
import { InvalidatedProject } from "typescript";
import { max, min } from "date-fns/esm";

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

function question1(workers: Worker[]): Date {
  const StartTimes: Date[] = [];
  console.log(workers);
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      StartTimes.push(interval.startTime);
      console.log("Added " + interval.startTime);
    });
  });
  console.log(
    "The start date/time of the earlies interval is: " + min(StartTimes)
  );
  return min(StartTimes);
}

function question2(workers: Worker[]): Date {
  const EndTimes: Date[] = [];
  console.log(workers);
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      EndTimes.push(interval.endTime);
      console.log("Added " + interval.endTime);
    });
  });
  console.log("The end date/time of the latest interval is: " + max(EndTimes));
  return max(EndTimes);
}

const Home = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  useEffect(() => {
    fetch(TestData)
      .then((response) => response.text())
      .then((data) => {
        setWorkers(getWorkers(data.toString().split("\n")));
      });
  }, [setWorkers]);
  return (
    <div>
      <h1>Workers</h1>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            Worker {worker.id} has {worker.intervals.length} free intervals
          </li>
        ))}
      </ul>
      <button onClick={() => question1(workers)}>Question 1 </button>
      <button onClick={() => question2(workers)}>Question 2 </button>
    </div>
  );
};

/*
loop through workers =>
loop through intervals
add to array/we 

Q1: call min on array
Q2: call max on array

Q3
worker1 has intervals
Worker2 has intervals
For each worker*, loop through each interval to find if there is any overlap?
Datefns https://date-fns.org/v1.30.1/docs/isWithinRange

"Does Worker 1 interval starDate overlap with worker 2's interval. 
If YES then the "free time" is worker1 startDate - worker2 endDate (for that specific interval)"
*/

export default Home;
