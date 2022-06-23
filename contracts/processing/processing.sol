// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.8.14 <0.9.0;

contract processing
{


    // Acceptable methods of packaging for contractor.
    // Plastic packaging is not accepted.
    string[5] packagingMethods = ["Silicon", "Paper", "Carton", "Crate", "Foam"];

    struct washStruct
    {
        // A struct data type to take washed products with the temperature of the water they were washed in.
        string washingStatus;
        uint8 maxTemp;
        uint8 minTemp;
    }

    // Constructor || Setting struct values as string, uint, uint.
    washStruct wshStrct = washStruct("Washed", 10.0, 3.0);

    // This constant string makes sure that no chemical compounds were used in processing goods.
    string constant chemicalCompound = "No";

    // Data getter variables.
    string packMethod;
    string washStatusGet;
    string chemicStatus;
    uint8 washTemperature;



    function viewProcessContract() public view returns(string memory, string memory, string memory, uint8)
    {
        // View the conditions under the products are going to be processed.
        return (packMethod, chemicStatus, washStatusGet, washTemperature);
    }


    function setProcess(string memory _pkgMethod, string memory _chemicalComp, string memory _washingStatus, uint8 _washTemp) public
    {
        // Gets data from the user and sets it to the vriables defined above.
        packMethod = _pkgMethod;
        washStatusGet = _washingStatus;
        chemicStatus = _chemicalComp;
        washTemperature = _washTemp;
    }


    function checkWashStatus() public view returns(string memory, uint8)
    {
        // Checks if the products have been washed or no.
        if(keccak256(abi.encodePacked(washStatusGet)) == keccak256(abi.encodePacked(wshStrct.washingStatus)) &&
            (washTemperature >= wshStrct.minTemp && washTemperature <= wshStrct.maxTemp))
        {
            return ("Accepted Wash Status", washTemperature);
        }
        return ("The product has not  been washed, the min. and max. wash temperature is:", washTemperature);
    }


    function checkChemicalUsage() public view returns(string memory)
    {
        // Check  if a product has been in touch with chemical compound or not during processing.
        if (keccak256(abi.encodePacked(chemicStatus)) != keccak256(abi.encodePacked(chemicalCompound)))
        {
            return "Only Non-chemically processed goods are accepted!";
        }
        return "Accepted Chemical Status!";
    }


    function checkPackagingMethod() public view returns(string memory)
    {
        // Check  the method of packaging.
        for  (uint i = 0; i < packagingMethods.length; i++)
        {
            if (keccak256(abi.encodePacked(packMethod)) == keccak256(abi.encodePacked(packagingMethods[i])))
            {
                return "Packaging Method Accepted";
            }
        }
        return ("Acceptable packaging methods are: Silicon, Paper, Carton, Crate, Foam");
    }
}