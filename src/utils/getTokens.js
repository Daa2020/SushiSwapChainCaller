const { sushiSwapRouterAddress } = require("../constants");
const getTokenBalance = require("./getTokenBalance");

const sushiSwapRouterABI = [
  "function swapExactETHForTokens(uint256 amountOutMin, address[] memory path, address to, uint256 deadline) payable returns (uint256[] memory amounts)" 
];
const wethContractABI = [
  "function deposit() payable returns ()"
];

// Function for swaping tokens or get WETH
async function getTokens(tokenToPurchase, amountInEthers, signer) {

  let tokenBalance;

  // WETH must be deposited
  if (tokenToPurchase == "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2") {

    const wethContract = new ethers.Contract(
      tokenToPurchase,
      wethContractABI,
      signer
    );

    // Deposit ETH into WETH
    const tx = await wethContract.deposit({ value: ethers.utils.parseEther(amountInEthers.toString()) });

    await tx.wait();
    console.log("ETH deposited into WETH successfully!");

    tokenBalance = await getTokenBalance(
      tokenToPurchase,
      signer._address,
      signer
    );

  } else {

    // Gets tokens by swapping in SushiSwap
    const sushiSwapRouterContract = new ethers.Contract(
      sushiSwapRouterAddress,
      sushiSwapRouterABI,
      signer
    );
  
    const amountOutMin = 0; 
    const path = [
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH address needed for the swap
      tokenToPurchase,
    ]; 
    const to = signer._address; 
    // Deadline of 5 minutes
    const deadline = Math.floor(Date.now() / 1000) + 300; 

    const tx = await sushiSwapRouterContract.swapExactETHForTokens(
      amountOutMin,
      path,
      to,
      deadline,
      {
        value: ethers.utils.parseEther(amountInEthers.toString()),
        gasLimit: 1000000,
      } 
    );

    await tx.wait();
    console.log("Tokens swapped successfully!");

    tokenBalance = await getTokenBalance(
      tokenToPurchase,
      signer._address,
      signer
    );
  }

  console.log("Token balance: " + tokenBalance);
  return tokenBalance;
}

module.exports = getTokens;
