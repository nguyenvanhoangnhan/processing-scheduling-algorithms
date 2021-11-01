/*
 * Run this app with NodeJS
 * This file and input.json must be in the same folder
 * The input file contain number of processing, arrival time and service time of each processing. 
 */

var inputData = require("./input.json");

let numberOfProcessing = inputData.numberOfProcessing;
let arrivalTime = inputData.arrivalTime;
let serviceTime = inputData.serviceTime;
let waitingTime = [];
let turnArrowTime = [];
let meanTime = 0;
let totalTime = 0;
let avgTurnArrowTime = 0;
let avgWaitingTime = 0;


function FirstComeFirstServe() {
   for (let i = 0; i < numberOfProcessing; i++) {
      if(meanTime <= arrivalTime[i]) {
         meanTime - arrivalTime[i];
      }
      waitingTime[i] = meanTime - arrivalTime[i];
      meanTime += serviceTime[i];
      turnArrowTime[i] = waitingTime[i] + serviceTime[i];
   }
   totalTime = meanTime;
}

function calcAvgTime() {
   for (let i = 0; i < numberOfProcessing; i++) {
      avgTurnArrowTime += turnArrowTime[i];
      avgWaitingTime += waitingTime[i];
   }
   avgTurnArrowTime /= numberOfProcessing;
   avgWaitingTime /= numberOfProcessing;
}

function printResult() {
   console.table([ ["Service Time:"].concat(serviceTime), ["Waiting Time:"].concat(waitingTime),["TurnArrow Time:"].concat(turnArrowTime)])
   console.log("Total time:", totalTime);
   console.log("Avg TurnArrow Time:", avgTurnArrowTime);
   console.log("Avg Waiting Time:", avgWaitingTime);
}


(main = () => {
   console.log("First Come First Serve Scheduling Algorithm");
   FirstComeFirstServe();
   calcAvgTime();
   printResult();
})();