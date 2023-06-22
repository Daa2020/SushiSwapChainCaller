// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const sushiSwapChainCaller = await ethers.getContractFactory("sushiSwapChainCaller");
  const sushiSwapChainCaller = await sushiSwapChainCaller.deploy();    //{ nonce : 16 } 

  console.log("sushiSwapChainCaller address:", sushiSwapChainCaller.address);
  /*console.log("SushiCalls sushiCalls.gasPrice:", sushiCalls.gasPrice);
  console.log("sushiCalls:", sushiCalls);*/

  await sushiSwapChainCaller.deployed();

  console.log("Deployed");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
