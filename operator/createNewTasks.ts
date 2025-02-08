import { ethers } from "ethers";
import * as dotenv from "dotenv";
const fs = require('fs');
const path = require('path');
dotenv.config();

// Setup env variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
/// TODO: Hack
let chainId = 31337;

const avsDeploymentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../contracts/deployments/hello-world/${chainId}.json`), 'utf8'));
const helloWorldServiceManagerAddress = avsDeploymentData.addresses.helloWorldServiceManager;
const helloWorldServiceManagerABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abis/HelloWorldServiceManager.json'), 'utf8'));
// Initialize contract objects from ABIs
const helloWorldServiceManager = new ethers.Contract(helloWorldServiceManagerAddress, helloWorldServiceManagerABI, wallet);


// Function to generate random tasks
function generateRandomTasks(): string {
    const adjectives = ['Clean up', 'Paint the', 'Fix the', 'Build the', 'Take picture of the'];
    const nouns = ['Bathroom', 'Kitchen', 'Living Room', 'Shop', 'Basement'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomTasks = `${adjective} ${noun}`;
    return randomTasks;
  }

// async function createNewTask(taskName: string) {
//   try {
//     // Send a transaction to the createNewTask function
//     const tx = await helloWorldServiceManager.createNewTask(taskName);
    
//     // Wait for the transaction to be mined
//     const receipt = await tx.wait();
    
//     console.log(`Transaction successful with hash: ${receipt.hash}`);
//   } catch (error) {
//     console.error('Error sending transaction:', error);
//   }
// }

async function createNewTask() {
  try {
    // Send a transaction to the createNewTask function

    const tx = await helloWorldServiceManager.createNewTask("Hackathon", "345 Blue Street");
    // const tx = await helloWorldServiceManager.createNewTask("125 W 18th St, New York, NY 10011, United States");
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    
    console.log(`Transaction successful with hash: ${receipt.hash}`);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}


async function readTravelEvent() {
  try {
    const eventnames = await helloWorldServiceManager.getTravelEvents();
    console.log(eventnames);
  } catch (error) {
    console.error('Error reading event names:', error);
  }
}

// Function to create a new task with a random name every 15 seconds
// function startCreatingTasks() {
//   setInterval(() => {
//     const randomTasks = generateRandomTasks();
//     console.log(`Creating new task: ${randomTasks}`);
//     createNewTask(randomTasks);
//   }, 24000);
// }

// Start the process
// startCreatingTasks();


// For testing
readTravelEvent();
// createNewTask();