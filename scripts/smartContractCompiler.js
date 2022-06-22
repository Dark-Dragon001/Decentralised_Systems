
const hre = require("hardhat");

async function main() {



  //const greeter = await Greeter.deploy("Hello, Hardhat!");
    // Harvesting Contract gets deployed.
  const harvestContract = await hre.ethers.getContractFactory("harvestContract");
  const harvestCont = await harvestContract.deploy();

    // Processing Contract gets deployed.
  const processContract = await hre.ethers.getContractFactory("processContract");
  const processCont = await processContract.deploy();

    // Prints the address of Harvesting Contract.
  await harvestCont.deployed();
  console.log("Harvest Contract deployed in this address:", harvestCont.address);

    // Prints the address of Processing Contract.
  await harvestCont.deployed();
  console.log("Processing Contract deployed in this address:", processCont.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
