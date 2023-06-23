// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@sushiswap/core/contracts/uniswapv2/interfaces/IUniswapV2Router02.sol";


interface IMasterchef {
    function deposit(uint256 _pid, uint256 _amount) external;
}
interface IMasterchefv2 {
    function deposit(uint256 _pid, uint256 _amount, address to) external;
}

contract SushiSwapChainCaller is Ownable {
    address private immutable sushiSwapRouterAddress;
    address private immutable masterChefAddress;
    address private immutable masterChefv2Address;

    constructor(
        address _sushiSwapRouterAddress,
        address _masterchefAddress,
        address _masterchefv2Address
    ) {
        sushiSwapRouterAddress = _sushiSwapRouterAddress;
        masterChefAddress = _masterchefAddress;
        masterChefv2Address = _masterchefv2Address;
    }

    function sushiSwapChainCall(
        address _tokenAIn,
        uint _ammountAIn,
        address _tokenBIn,
        uint _ammountBIn,
        uint _ammountAMin,
        uint _ammountBMin,
        uint _masterChefVersion,
        address _SLPAddress,
        uint _poolId
    ) external onlyOwner {

        // Approve the SushiSwap router to use tokens
        IERC20(_tokenAIn).approve(sushiSwapRouterAddress, _ammountAIn);
        IERC20(_tokenBIn).approve(sushiSwapRouterAddress, _ammountBIn);

        // Provide liquidity on SushiSwap
        (, , uint liquidity) = IUniswapV2Router02(sushiSwapRouterAddress).addLiquidity(
            _tokenAIn,
            _tokenBIn,
            _ammountAIn,
            _ammountBIn,
            _ammountAMin,
            _ammountBMin,
            address(this),
            block.timestamp + 1
        );
    
        if (_masterChefVersion == 1) {
            // Approve the MasterChef smart contract to use tokens
            IERC20(_SLPAddress).approve(masterChefAddress, liquidity);
            // Deposit liquidity token (SLP)
            IMasterchef(masterChefAddress).deposit(_poolId, liquidity);
        } else if (_masterChefVersion == 2) {
            // Approve the MasterChef smart contract to use tokens
            IERC20(_SLPAddress).approve(masterChefv2Address, liquidity);
            // Deposit liquidity token (SLP)            
            IMasterchefv2(masterChefv2Address).deposit(_poolId, liquidity, address(this));
        } 
    }
}
