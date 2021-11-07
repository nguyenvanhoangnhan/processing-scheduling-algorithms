/*
 * Run this app with NodeJS
 * This file and input.json must be in the same folder
 * The input file contain number of Process, arrival time and service time of each Process. 
 */

var inputData = require("./input.json");

let numberOfProcess = inputData.numberOfProcess;
let arrivalTime = inputData.arrivalTime;
let serviceTime = inputData.serviceTime;
let waitingTime = [];
let turnArrowTime = [];
let isDone = [];
let serveOrder = [];
let meanTime = 0;
let totalTime = 0;
let avgTurnArrowTime = 0;
let avgWaitingTime = 0;

function shortestJobFirst() {
   
   for (let i = 0; i < numberOfProcess; i++) {
      isDone[i] = 0;
   }

   function isAllDone() {
      return isDone.indexOf(0) == -1;
   }

   function indexOfShortestAvailableJob() {
      let res = -1;
      let min = 2147483647;
      for (let i = 0; i < numberOfProcess; i++) {
         // Process has't arrived yet or has done => skip
         if(meanTime < arrivalTime[i] || isDone[i]) 
            continue;
         
         // Process is arrived and has't done yet => compare to min
         if(serviceTime[i] < min) {
            min = serviceTime[i];
            res = i;
         }
      }
      return res;
   }

   while(!isAllDone()) {
      let index = indexOfShortestAvailableJob();
      serveOrder.push(index + 1);
      waitingTime[index] = meanTime - arrivalTime[index];
      meanTime += serviceTime[index];
      turnArrowTime[index] = waitingTime[index] + serviceTime[index];
      isDone[index] = 1;
   }
   totalTime = meanTime;
}

function calcAvgTime() {
   for (let i = 0; i < numberOfProcess; i++) {
      avgTurnArrowTime += turnArrowTime[i];
      avgWaitingTime += waitingTime[i];
   }
   avgTurnArrowTime /= numberOfProcess;
   avgWaitingTime /= numberOfProcess;
}

function printResult() {
   console.table([ ["Service Time:"].concat(serviceTime), ["Waiting Time:"].concat(waitingTime),["TurnArrow Time:"].concat(turnArrowTime)])
   console.log("Total time:", totalTime);
   console.log("Avg TurnArrow Time:", avgTurnArrowTime);
   console.log("Avg Waiting Time:", avgWaitingTime);
   console.log("Serve Order: ",serveOrder.join(" => "));
}


(main = () => {
   console.log("Shortest Job First Scheduling Algorithm");
   shortestJobFirst();
   calcAvgTime();
   printResult();
})();
