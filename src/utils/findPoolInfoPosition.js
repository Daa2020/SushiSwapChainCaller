const endpointMasterChef =
  "https://api.thegraph.com/subgraphs/name/sushiswap/master-chef";
const endpointMasterChefv2 =
  "https://api.thegraph.com/subgraphs/name/sushiswap/master-chefv2";

async function findPoolInfoPosition(
  targetAddress,
  poolParameter,
  masterchefvXContractVersionParameter
) {

  // Function to search a specific target address in an endpoint
  async function searchEndpoint(targetAddress, endpoint) {

    // For testing purposes and performance the poolLength is set to 500
    // Currently, the MasterChef pool has 362 pairs, while the MasterChefV2 pool has 65 pairs.
    const poolLength = 500;

    // Commented code for testing purposes and performance
    /*const queryPoolCount = `  
      {
        masterChefs {
          poolCount
        }
      }
    `;

    // Code for retrieving poolLength
     
    let response;
    let data;

    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryPoolCount }),
    });

    data = await response.json();

    const poolLength = data.data.masterChefs[0].poolCount;
    console.log("poolCount:", poolLength); */

    // Query to retrieve pools
    const queryPools = `  
      {
        pools(first: ${poolLength}) {
          id
          pair
        }
      }
    `;

    // Fetchs pools from endpoint
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryPools }),
    });

    const data = await response.json();
    const pools = data.data.pools;

    // Processes the pools array
    const pair = pools.find(
      (item) => item.pair.toLowerCase() === targetAddress.toLowerCase()
    );
    return pair ? pair.id : -1;
  }

  try {

    // Searches for a pool in MasterChef
    const poolInfoMasterChef = await searchEndpoint(
      targetAddress,
      endpointMasterChef
    );

    if (poolInfoMasterChef !== -1) {
      // Returns pool position and MasterChef version
      return [poolInfoMasterChef, 1];
    }

    // Searches for a pool in MasterChefv2
    const poolInfoMasterChefv2 = await searchEndpoint(
      targetAddress,
      endpointMasterChefv2
    );

    if (poolInfoMasterChefv2 !== -1) {
      // Returns pool position and MasterChef version
      return [poolInfoMasterChefv2, 2];
    }
  } catch (error) {
    // Returns manual parameters
    console.log(
      "*** Error fetching parameters - Setting parameters manually ***"
    );
    return [poolParameter, masterchefvXContractVersionParameter];
  }
}

module.exports = findPoolInfoPosition;
