const { sushiSwapRouterAddress, masterChefAddress, masterChefv2Address } = require("../src/constants");
const setEventListeners = require("../src/utils/setEventListeners");
const doTestCase = require("../src/utils/doTestCase");

describe("sushiSwapChainCaller test", function () {

  let sushiSwapChainCaller;
  let signer;

  before(async () => {

    // Deploys sushiSwapChainCaller contract
    const SushiSwapChainCaller = await ethers.getContractFactory("SushiSwapChainCaller");
    sushiSwapChainCaller = await SushiSwapChainCaller.deploy(sushiSwapRouterAddress, masterChefAddress, masterChefv2Address);

    // Gets provider and signer
    const provider = ethers.provider;
    const accounts = await ethers.provider.listAccounts();
    signer = await provider.getSigner(accounts[0]);

    console.log("\nEOA address:", signer._address);
    console.log("SushiSwapChainCaller address:", SushiSwapChainCaller.address);

    // Sets event listeners for test verifications 
    await setEventListeners(provider);     
  });

  it("Should deposit in MasterChefV1 LINK/WETH LP", async function () {

    // Addresses from a MasterchefV1 pool (LINK, WETH)
    const tokenA = "0x514910771AF9Ca656af840dff83E8264EcF986CA"; 
    const tokenAName = 'LINK';
    const tokenB = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; 
    const tokenBName = 'WETH';
    const amountInEthers = .01;

    // Manual data for testing purposes in case the pool fetch fails
    const poolParameter = 8
    const masterchefvXContractVersionParameter = 1;

    // Executes the test case
    await doTestCase(tokenA, tokenAName, tokenB, tokenBName, amountInEthers, sushiSwapChainCaller.address, signer, sushiSwapChainCaller, poolParameter, masterchefvXContractVersionParameter);
  });

  it("Should deposit in MasterChefV1 NEAR/WETH LP", async function () {

    console.log("\nEOA address:", signer._address);
    console.log("sushiSwapChainCaller address:", sushiSwapChainCaller.address);

    // Addresses from a MasterchefV1 pool (NEAR, WETH)
    const tokenA = "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4"; 
    const tokenAName = 'NEAR';
    const tokenB = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; 
    const tokenBName = 'WETH';
    const amountInEthers = .01;

    // Manual data for testing purposes in case the pool fetch fails
    const poolParameter = 269
    const masterchefvXContractVersionParameter = 1;

    // Executes the test case
    await doTestCase(tokenA, tokenAName, tokenB, tokenBName, amountInEthers, sushiSwapChainCaller.address, signer, sushiSwapChainCaller, poolParameter, masterchefvXContractVersionParameter);

  });

  it("Should deposit in MasterChefV2 WETH/HOP LP", async function () {

    console.log("\nEOA address:", signer._address);
    console.log("sushiSwapChainCaller address:", sushiSwapChainCaller.address);

    // Addresses from a MasterchefV2 pool (WETH, HOP)
    const tokenA = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; 
    const tokenAName = 'WETH';
    const tokenB = "0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"; 
    const tokenBName = 'HOP';
    const amountInEthers = .01;

    // Manual data for testing purposes in case the pool fetch fails
    const poolParameter = 58
    const masterchefvXContractVersionParameter = 2;

    // Executes the test case
    await doTestCase(tokenA, tokenAName, tokenB, tokenBName, amountInEthers, sushiSwapChainCaller.address, signer, sushiSwapChainCaller, poolParameter, masterchefvXContractVersionParameter);
  });

  it("Should deposit in MasterChefV2 cvxCRV/CRV LP", async function () {

    console.log("\nEOA address:", signer._address);
    console.log("sushiSwapChainCaller address:", sushiSwapChainCaller.address);

    // Addresses from a MasterchefV2 pool (cvxCRV, CRV)
    const tokenA = "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7"; 
    const tokenAName = 'cvxCRV';
    const tokenB = "0xD533a949740bb3306d119CC777fa900bA034cd52"; 
    const tokenBName = 'CRV';
    const amountInEthers = .01;

    // Manual data for testing purposes in case the pool fetch fails
    const poolParameter = 2
    const masterchefvXContractVersionParameter = 2;

    // Executes the test case
    await doTestCase(tokenA, tokenAName, tokenB, tokenBName, amountInEthers, sushiSwapChainCaller.address, signer, sushiSwapChainCaller, poolParameter, masterchefvXContractVersionParameter);
  }); 

  it("Should deposit in MasterChefV2 PRIMATE/APE LP", async function () {

    console.log("\nEOA address:", signer._address);
    console.log("sushiSwapChainCaller address:", sushiSwapChainCaller.address);

    // Addresses from a MasterchefV2 pool (PRIMATE, APE)
    const tokenA = "0x46e98FFE40E408bA6412bEb670507e083C8B95ff"; 
    const tokenAName = 'PRIMATE';
    const tokenB = "0x4d224452801ACEd8B2F0aebE155379bb5D594381"; 
    const tokenBName = 'APE';
    const amountInEthers = .01;

    // Manual data for testing purposes in case the pool fetch fails
    const poolParameter = 57
    const masterchefvXContractVersionParameter = 2;

    // Executes the test case
    await doTestCase(tokenA, tokenAName, tokenB, tokenBName, amountInEthers, sushiSwapChainCaller.address, signer, sushiSwapChainCaller, poolParameter, masterchefvXContractVersionParameter);
  });    
});
