// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;

contract processContract
{

    // stored in defined temprature
    uint     maxTemp = 10;
    uint  minTemp = 5;

    // This constant string makes sure that no chemical compounds were used in processing goods.
    string constant chemicalCompound = "No";

    // Acceptable methods of packaging for contrator.
    // Palstic packaging is not accpeted.
    string[5] packagingMethods = ["Silicon", "Paper", "Carton", "Crate","Foam"];


    function checkChemicalUseage(string memory _chemicalCompound) public pure returns(string memory)
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
        // Check  the mehod of packaging.
        for  (uint i = 0; i < packagingMethods.length; i++)
        {
            if (keccak256(abi.encodePacked(_packagingMethods)) == keccak256(abi.encodePacked(packagingMethods[i])))
            {
                return "Accepted!";
            }
        }
        return "Not Accepted!";
    }
    /*

        function getGoods() public view returns (string[10] memory, string[3] memory, string[4] memory)
        {
            // View the product arrays.
            return (goods, goodsSize, goodsQuality);
        }

        function inputGood(string memory _goods) public view returns (string memory)
        {
            // Check whether the new product ma
        }
            function foodProcess() public view returns(uint,uint,bool,bool) {
            return (maxTemp, minTemp,notChemCompund,packaging);
        }
        function inputTem(string memory _maxTem) public view returns (string memory){
             for (uint i = 0; i < goods.length; i++)
                 if (keccak256(abi.encodePacked(_maxTem)) == keccak256(abi.encodePacked(maxTemp[i])))
                 {
                     "go to process";
                 }
        }
        return "not good for process";
        */

}