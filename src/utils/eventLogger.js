const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "..", "..", "test", "event.log");

const { masterChefAddress, masterChefv2Address } = require(path.join(
  __dirname,
  "..",
  "constants"
));
const masterChefEventABI = [
  "event Deposit(address indexed user, uint256 indexed pid, uint256 amount)",
];
const masterChefv2EventABI = [
  "event Deposit(address indexed user, uint256 indexed pid, uint256 amount, address indexed to)",
];

const erc20ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

const listeners = [];

// Function to set event listeners
async function setEventListeners(
  testCase,
  tokenA,
  tokenAName,
  tokenB,
  tokenBName,
  sushiSwapAddress,
  pairAddress,
  signer
) {
  // Function to set an event listener
  function setListener(
    contractAddress,
    contractABI,
    signer,
    event,
    consoleLogFunction
  ) {
    const existingListener = listeners.find(
      (listener) =>
        listener.contract.address == contractAddress && listener.event == event
    );

    if (existingListener) {
      return;
    }

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    contract.on(event, consoleLogFunction);

    listeners.push({ contract, event, consoleLogFunction });
  }

  function isMatchingAddress(address) {
    return (
      address == signer._address ||
      address == sushiSwapAddress ||
      address == tokenA ||
      address == tokenB
    );
  }

  // Log test case name
  fs.appendFileSync(logFile, `\n\nTest Case: ${testCase}\n`);

  // Event listener - Token transfer approvals
  setListener(
    tokenA,
    erc20ABI,
    signer,
    "Approval",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Approval in token ${tokenAName} - Address: ${eventParameter1} approved address ${eventParameter2} to transfer ${eventParameter3} tokens.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  setListener(
    tokenB,
    erc20ABI,
    signer,
    "Approval",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Approval in token ${tokenBName} - Address: ${eventParameter1} approved address ${eventParameter2} to transfer ${eventParameter3} tokens.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  // Event listener - Token transfers
  setListener(
    tokenA,
    erc20ABI,
    signer,
    "Transfer",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Transfer in token ${tokenAName} - Address: ${eventParameter1} transferred ${eventParameter3} tokens to ${eventParameter2}.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  setListener(
    tokenB,
    erc20ABI,
    signer,
    "Transfer",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Transfer in token ${tokenBName} - Address: ${eventParameter1} transferred ${eventParameter3} tokens to ${eventParameter2}.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  setListener(
    pairAddress,
    erc20ABI,
    signer,
    "Transfer",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Transfer in SLP token ${pairAddress} - Address: ${eventParameter1} transferred ${eventParameter3} tokens to ${eventParameter2}.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  // Event listener - Token transfer approvals
  setListener(
    tokenA,
    erc20ABI,
    signer,
    "Approval",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Approval in token ${tokenAName} - Address: ${eventParameter1} approved address ${eventParameter2} to transfer ${eventParameter3} tokens.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  setListener(
    tokenB,
    erc20ABI,
    signer,
    "Approval",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Approval in token ${tokenBName} - Address: ${eventParameter1} approved address ${eventParameter2} to transfer ${eventParameter3} tokens.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  setListener(
    pairAddress,
    erc20ABI,
    signer,
    "Approval",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Approval in SLP token ${pairAddress} - Address: ${eventParameter1} approved address ${eventParameter2} to transfer ${eventParameter3} tokens.`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  // Event listener - Deposit liquidity token (SLP) in MasterChefV1
  setListener(
    masterChefAddress,
    masterChefEventABI,
    signer,
    "Deposit",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Deposit in MasterChefV1 - Address: ${eventParameter1} deposited in pool: ${eventParameter2} of MasterChefV1 ${eventParameter3} SLP Tokens`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );

  // Event listener - Deposit liquidity token (SLP) in MasterChefV2
  setListener(
    masterChefv2Address,
    masterChefv2EventABI,
    signer,
    "Deposit",
    (eventParameter1, eventParameter2, eventParameter3) => {
      if (
        isMatchingAddress(eventParameter1) ||
        isMatchingAddress(eventParameter2) ||
        isMatchingAddress(eventParameter3)
      ) {
        const logMessage = `\nEvent Deposit in MasterChefV2 - Address: ${eventParameter1} deposited in pool: ${eventParameter2} of MasterChefV2 ${eventParameter3} SLP Tokens`;

        fs.appendFileSync(logFile, logMessage);
      }
    }
  );  
}

// Function to remove all listeners
async function removeAllListeners() {
  listeners.forEach(({ contract, event, consoleLogFunction }) => {
    contract.off(event, consoleLogFunction);
  });
  listeners.length = 0;
}

// Function to initialize the event logger
async function initializeLogFile() {
  fs.writeFileSync(logFile, "\n**** Event logger initialized ****");
}

module.exports = { setEventListeners, removeAllListeners, initializeLogFile };
