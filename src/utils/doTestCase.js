const setTestConditions = require("./setTestConditions");
const retrieveParameters = require("./retrieveParameters");

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

async function doTestCase(
  tokenA,
  tokenAName,
  tokenB,
  tokenBName,
  amountInEthers,
  sushiSwapChainCallerAddress,
  signer,
  sushiSwapChainCaller, 
  poolParameter, 
  masterchefvXContractVersionParameter
) {

  // Sets test conditions
  [amountTokenA, amountTokenB] = await setTestConditions(
    tokenA,
    tokenAName,
    tokenB,
    tokenBName,
    amountInEthers,
    sushiSwapChainCallerAddress,
    signer
  );

  // Retrieves parameters for the contract calling
  [poolPosition, pairAddress, masterChefContractVersion] = await retrieveParameters(
    tokenA,
    tokenB,
    signer, 
    poolParameter, 
    masterchefvXContractVersionParameter
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

  await delay(5000);

  // Finish test case
  console.log("\n*** FInish test case ***\n");
}

module.exports = doTestCase;
