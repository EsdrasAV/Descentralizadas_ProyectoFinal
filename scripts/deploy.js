const hre = require("hardhat");

async function main() {
  console.log("Desplegando Store.sol...");

  const Store = await hre.ethers.getContractFactory("Store");
  const store = await Store.deploy();
  await store.deployed();
  console.log("Store desplegado en:", store.address);

  console.log("Desplegando Marketplace.sol...");

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const market = await Marketplace.deploy(store.address);
  await market.deployed();
  console.log("Marketplace desplegado en:", market.address);

  console.log("\nDirecciones de los contratos:");
  console.log(`STORE_ADDRESS=${store.address}`);
  console.log(`MARKET_ADDRESS=${market.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

