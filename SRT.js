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
let remainingTime = [];
let isDone = [];
let totalTime = 0;
let avgTurnArrowTime = 0;
let avgWaitingTime = 0;


function shortestRemainingTime() {
   
   for (let i = 0; i < numberOfProcess; i++) {
      remainingTime[i] = serviceTime[i];
      isDone[i] = 0;
      totalTime += serviceTime[i];
   }

   function indexOfShortestRemain(time) {
      let res = -1;
      let min = 2147483647;
      for (let i = 0; i < numberOfProcess; i++) {
         // Process hasn't arrived yet or has done => skip
         if(arrivalTime[i] > time || isDone[i]) 
            continue;
         
         // Process is arrived and has't done yet => compare to min
         if(remainingTime[i] < min) {
            min = remainingTime[i];
            res = i;
         }
      }
      return res;
   };

   for (let time = 0; time < totalTime; time++) {
      let index = indexOfShortestRemain(time);
      remainingTime[index]--;
      if(remainingTime[index] == 0) {
         isDone[index] = 1;
         turnArrowTime[index] = time - arrivalTime[index] + 1;
         waitingTime[index] = turnArrowTime[index] - serviceTime[index];
      }
   }

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
}


(main = () => {
   console.log("Shortest Remaining Time First Scheduling Algorithm");
   shortestRemainingTime();
   calcAvgTime();
   printResult();
})();