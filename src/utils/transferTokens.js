const tokenABI = [
  "function transfer(address dst, uint wad) public returns (bool)",
];

// Transfers tokens to the contract
async function transferTokens(
  tokenAddress,
  recipient,
  amount,
  signer
) 
{
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

  console.log(
    `Transferring ${amount} tokens from ${signer._address} to ${recipient}`
  );

  const tx = await tokenContract
    .transfer(recipient, amount, { gasLimit: 1000000 });
  await tx.wait();

  console.log("Tokens transferred successfully");
}

module.exports = transferTokens;
