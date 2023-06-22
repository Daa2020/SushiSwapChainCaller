const { masterChefAddress, masterChefv2Address } = require("../constants");

const masterChefUserInfoABI = [
  "function userInfo(uint256, address) view returns (uint256, uint256)",
];

// Function to get liquidity tokens deposited in contract  
async function getLiquidityTokensDeposited(
  masterChefContractVersion,
  poolPosition,
  sushiSwapChainCallerAddress,
  signer
) {

  let masterChessVXAddress;

  if (masterChefContractVersion == 1) {
    masterChessVXAddress = masterChefAddress;
  } else if (masterChefContractVersion == 2) {
    masterChessVXAddress = masterChefv2Address;
  }

  const masterChefContract = await new ethers.Contract(
    masterChessVXAddress,
    masterChefUserInfoABI,
    signer
  );
  const userInfo = await masterChefContract.userInfo(
    poolPosition,
    sushiSwapChainCallerAddress
  );
  console.log(
    "Liquidity tokens deposited in contract: ",
    userInfo[0].toString()
  );

  return userInfo[0];
}

module.exports = getLiquidityTokensDeposited;
