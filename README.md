# SushiSwap Chain Caller project

## Overview
This repository contains a smart contract and test cases designed to automate the process of participating in SushiSwap's liquidity mining program. The smart contract acts as a wallet and encapsulates all the actions required to participate in the program in a single transaction. The code supports both MasterChefV1 and MasterChefV2. 
The smart contract does not include the withdrawal functionality necessary for a complete cycle. 

## Test Cases
The test cases are located in the test directory. They ensure the functionality of the smart contract by simulating different scenarios. Each test case covers a specific deposit in either MasterChefV1 or MasterChefV2, using different token pairs. The test cases also include a log file that records events for testing and allows for verification of intermediate calls within the contract.
The code and test cases in this repository are configured to run in a forked Ethereum mainnet environment. 

## Installation

1. Clone the repository: git clone https://github.com/Daa2020/SushiSwapChainCaller
2. Navigate to the project directory: cd SushiSwapChainCaller
3. Install dependencies: npm install

## Configuration

1. Copy the '.env copy' file to '.env'.
2. Add your ALCHEMY API key for the Ethereum Mainnet to the '.env' file.

## Running test cases

To run the test cases, execute the following command: 

npx hardhat test
