const path = require("path");
const setTestConditions = require(path.join(__dirname, "setTestConditions"));
const retrieveParameters = require(path.join(__dirname, "retrieveParameters"));
const getLiquidityTokensDeposited = require(path.join(
  __dirname,
  "getLiquidityTokensDeposited"
));
const { setEventListeners, removeAllListeners } = require(path.join(
  __dirname,
  "eventLogger"
));

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Executes the test case
async function executeTestCase(
  testCase,
  tokenA,
  tokenAName,
  tokenB,
  tokenBName,
  amountInEthers,
  signer,
  sushiSwapChainCaller,
  poolParameter,
  masterchefvXContractVersionParameter
) {
  
  // Retrieves parameters for the contract calling
  [poolPosition, pairAddress, masterChefContractVersion] =
    await retrieveParameters(
      tokenA,
      tokenB,
      signer,
      poolParameter,
      masterchefvXContractVersionParameter
    );

  // Sets the event listeners
  setEventListeners(
    testCase,
    tokenA,
    tokenAName,
    tokenB,
    tokenBName,
    sushiSwapChainCaller.address,
    pairAddress,
    signer
  );

  // Sets test conditions
  [amountTokenA, amountTokenB] = await setTestConditions(
    tokenA,
    tokenAName,
    tokenB,
    tokenBName,
    amountInEthers,
    sushiSwapChainCaller.address,
    signer
  );

  // Begin test case
  console.log("\n*** Begin test case ***");

  // Calls the contract
  console.log("Calling the contract...");
  const amountAMin = amountTokenA.mul(900).div(1000);
  const amountBMin = amountTokenB.mul(900).div(1000);

  const sushiReceipt = await sushiSwapChainCaller.sushiSwapChainCall(
    tokenA,
    amountTokenA,
    tokenB,
    amountTokenB,
    amountAMin,
    amountBMin,
    masterChefContractVersion,
    pairAddress,
    poolPosition,
    { gasLimit: 1000000 }
  );

  await sushiReceipt.wait();

  // Gets the deposited LP tokens
  const depositedLT = await getLiquidityTokensDeposited(
    masterChefContractVersion,
    poolPosition,
    sushiSwapChainCaller.address,
    signer
  );

  // Wait for listeners
  await delay(5000);

  // Remove event listeners
  removeAllListeners();

  return depositedLT;  
}

module.exports = executeTestCase;
