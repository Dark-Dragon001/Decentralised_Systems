
const hre = require("hardhat");

async function main() {



        //const greeter = await Greeter.deploy("Hello, Hardhat!");
        // Harvesting Contract gets deployed.
    const harvesting = await hre.ethers.getContractFactory("harvesting");
    const harvest = await harvesting.deploy();


        // Processing Contract gets deployed.
    const processing = await hre.ethers.getContractFactory("processing");
    const process = await processing.deploy();


        // Shipment Contract gets deployed.
    const shipment = await hre.ethers.getContractFactory("shipment");
    const ship = await shipment.deploy();


        // Prints the address of Harvesting Contract.
    await harvest.deployed();
    console.log("Harvest Contract deployed in this address:", harvest.address);


        // Prints the address of Processing Contract.
    await process.deployed();
    console.log("Processing Contract deployed in this address:", process.address);


        // Prints the address of Shipment Contract.
    await ship.deployed();
    console.log("Shipment Contract deployed in this address:", ship.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });