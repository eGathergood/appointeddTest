/// <reference types="react-scripts" />

// https://stackoverflow.com/questions/58661341/cant-find-module-ts2307-in-react
declare module '*.txt' {
    const content: string;
    export default content;
  }
