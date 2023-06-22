const { masterChefAddress, masterChefv2Address } = require("../constants");
const masterChefEventABI = [
  "event Deposit(address indexed user, uint256 indexed pid, uint256 amount)",
];
const masterChefv2EventABI = [
  "event Deposit(address indexed user, uint256 indexed pid, uint256 amount, address indexed to)",
];

// Function to set event listeners
async function setEventListeners(signer) {
  async function setListener(
    contractAddress,
    contractABI,
    signer,
    event,
    consoleLogFunction
  ) {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    contract.on(event, consoleLogFunction);
  }

  // Event listener - Deposit liquidity token (SLP) in MasterChefV1
  await setListener(
    masterChefAddress,
    masterChefEventABI,
    signer,
    "Deposit",
    (eventParameter1, eventParameter2, eventParameter3) => {
      console.log(
        `\nEvent Deposit in MasterChefV1 - Address: ${eventParameter1} deposited in pool: ${eventParameter2} of MasterChefV1 ${eventParameter3} SLP Tokens`
      );
    }
  );

  // Event listener - Deposit liquidity token (SLP) in MasterChefV2
  await setListener(
    masterChefv2Address,
    masterChefv2EventABI,
    signer,
    "Deposit",
    (eventParameter1, eventParameter2, eventParameter3) => {
      console.log(
        `\nEvent Deposit in MasterChefV2 - Address: ${eventParameter1} deposited in pool: ${eventParameter2} of MasterChefV2 ${eventParameter3} SLP Tokens`
      );
    }
  );  
}

module.exports = setEventListeners;
