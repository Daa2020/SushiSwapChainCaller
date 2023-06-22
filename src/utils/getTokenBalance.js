// Retrieves the balance of a specific token
async function getTokenBalance(tokenAddress, accountAddress, signer) {
    
    const tokenABI = [
      "function balanceOf(address) view returns (uint256)"
    ];
  
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    const balance = await tokenContract.balanceOf(accountAddress);
  
    return balance;
  }

  module.exports = getTokenBalance;
