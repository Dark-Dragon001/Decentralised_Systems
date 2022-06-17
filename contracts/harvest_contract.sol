// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract harvestContract
{
    // List of pre-defined good, size, quality.
    string[10] goods = ["Apple", "Orange", "Banana", "Lemon", "Tomato", "Potato", "Cucumber", "Carrot", "Onion", "Mushroom"];
    string[3] goodsSize = ["Medium", "Large", "Extra Large"];
    string[4] goodsQuality = ["Raw", "Half-ripen", "Ripen", "Full-ripen"];



    function getGoods() public view returns (string[10] memory, string[3] memory, string[4] memory)
    {
        // View the product arrays.
        return (goods, goodsSize, goodsQuality);
    }

    function inputGood(string memory _goods) public view returns (string memory)
    {
        // Compare new items with goods string wheather if it matches or not
        for (uint i = 0; i < goods.length; i++)
        {
            if (keccak256(abi.encodePacked(_goods)) == keccak256(abi.encodePacked(goods[i])))
            {
                return "Matched!";
            }

        }
        return "Not Matched";

    }

    function inputGoodsSize(string memory _goodsSize) public view returns (string memory)
    {
        // Compare new items with goodsSize string wheather if it matches or not
        for (uint i = 0; i < goods.length; i++)
        {
            if (keccak256(abi.encodePacked(_goodsSize)) == keccak256(abi.encodePacked(goodsSize[i])))
            {
                return "Matched!";
            }

        }
        return "Not Matched";

    }

    function inputGoodsQuality(string memory _goodsQuality) public view returns (string memory)
    {
        // Compare new items with goodsQuality string wheather if it matches or not
        for (uint i = 0; i < goods.length; i++)
        {
            if (keccak256(abi.encodePacked(_goodsQuality)) == keccak256(abi.encodePacked(goodsSize[i])))
            {
                return "Matched!";
            }

        }
        return "Not Matched";

    }



    // Precess Steps

    //  Max 20C Min 10C     Washed
    //  Plastic, Foam, Carton, Paper, Wooden Box             Packing
    //  Chemical componds



}
