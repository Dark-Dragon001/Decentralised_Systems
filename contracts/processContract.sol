// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.8.14 <0.9.0;

contract processContract
{

    struct washStruct
    {
        // A struct data type to take washed products with the temperature of the water they were washed in.
        string washingStatus;
        uint maxTemp;
        uint minTemp;
    }

    // Constructor || Setting struct values as string, uint, uint.
    washStruct wshStrct = washStruct("Washed", 10.0, 3.0);

    // This constant string makes sure that no chemical compounds were used in processing goods.
    string constant chemicalCompound = "No";

    // Acceptable methods of packaging for contractor.
    // Plastic packaging is not accepted.
    string[5] packagingMethods = ["Silicon", "Paper", "Carton", "Crate", "Foam"];


    function viewProcessContract() public view returns(string[5] memory, string memory, string memory, uint, uint)
    {
        // View the conditions under the products are going to be processed.
        return (packagingMethods, chemicalCompound, wshStrct.washingStatus, wshStrct.minTemp, wshStrct.maxTemp);
    }

    function checkWashStatus(string memory _washStatus, uint x) public view returns(string memory, uint, uint)
    {
        // Checks if the products have been washed or no.
        if(keccak256(abi.encodePacked(_washStatus)) == keccak256(abi.encodePacked(wshStrct.washingStatus)) &&
            (x >= wshStrct.minTemp && x <= wshStrct.maxTemp))
        {
            return (string.concat("The product  has been ",wshStrct.washingStatus, " in the water with temperature of: "), x, .0);
        }
        return ("The product has not  been washed, the min. and max. wash temperature is: ", wshStrct.minTemp, wshStrct.maxTemp);
    }

    function checkChemicalUsage(string memory _chemicalCompound) public pure returns(string memory)
    {
        // Check  if a product has been in touch with chemical compound or not during processing.
        if (keccak256(abi.encodePacked(_chemicalCompound)) != keccak256(abi.encodePacked(chemicalCompound)))
        {
            return "Only Non-chemically processed goods are accepted!";
        }
        return "Accepted!";

    }

    function checkPackagingMethod(string memory _packagingMethods) public view returns(string memory)
    {
        // Check  the method of packaging.
        for  (uint i = 0; i < packagingMethods.length; i++)
        {
            if (keccak256(abi.encodePacked(_packagingMethods)) == keccak256(abi.encodePacked(packagingMethods[i])))
            {
                return (string.concat(_packagingMethods, " method of packaging is accepted."));
            }
        }
        return ("Acceptable packaging methods are: Silicon, Paper, Carton, Crate, Foam");
    }
}