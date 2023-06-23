const path = require("path");
const { sushiV2FactoryAddress } = require(path.join(__dirname, "..", "constants"));
const findPoolInfoPosition = require(path.join(__dirname, "findPoolInfoPosition"));
const sushiV2FactoryABI = [
  "function getPair(address tokenAAddress, address tokenBAddress) view returns (address)",
];

// Function to retrieve necessary parameters for the call to the MasterChefvX contract
// Gets the pair address to obtain the version of the MasterChef contract and its position in the pool
async function retrieveParameters(tokenA, tokenB, signer, poolParameter, 
  masterchefvXContractVersionParameter) {

  console.log("\n*** Retrieving necessary parameters ... ***");  

  const sushiV2FactoryContract = new ethers.Contract(
    sushiV2FactoryAddress,
    sushiV2FactoryABI,
    signer
  );
  const sushiV2Factory = sushiV2FactoryContract.connect(signer);
  const pairAddress = await sushiV2Factory.getPair(tokenA, tokenB);

  [poolPosition, contract] = await findPoolInfoPosition(pairAddress, poolParameter, masterchefvXContractVersionParameter);

  console.log("Parameter Pair Address:", pairAddress);
  console.log("Parameter Pool Position:", poolPosition);
  console.log("Parameter MasterchefvX Contract:", contract);

  return [poolPosition, pairAddress, contract];
}

module.exports = retrieveParameters;
