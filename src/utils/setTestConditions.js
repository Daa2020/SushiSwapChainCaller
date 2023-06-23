const path = require("path");
const getTokens = require(path.join(__dirname, "getTokens"));
const transferTokens = require(path.join(__dirname, "transferTokens"));
const getTokenBalance = require(path.join(__dirname, "getTokenBalance"));

// Sets up test conditions
async function setTestConditions(
  tokenA,
  tokenAName,
  tokenB,
  tokenBName,
  amountInEthers,
  contractAddress,
  signer
) {
  console.log("\n*** Setting up test conditions... ***");

  // Calls the function to get the tokens
  console.log(`Buying test tokenA (${tokenAName})...`);
  const tokenABalance = await getTokens(tokenA, amountInEthers, signer);

  console.log(`Buying test tokenB (${tokenBName})...`);
  const tokenBBalance = await getTokens(tokenB, amountInEthers, signer);

  // Sends tokens to contract
  console.log("Sending tokens to contract...");

  await transferTokens(tokenA, contractAddress, tokenABalance, signer);
  await transferTokens(tokenB, contractAddress, tokenBBalance, signer);
  
  const tokenAInContract = await getTokenBalance(tokenA, contractAddress, signer);
  const tokenBInContract = await getTokenBalance(tokenB, contractAddress, signer);

  console.log(`TokenA (${tokenAName}) in contract wallet: ${tokenAInContract}`);
  console.log(`TokenB (${tokenBName}) in contract wallet: ${tokenBInContract}`);

  return [tokenAInContract, tokenBInContract];
}

module.exports = setTestConditions;
