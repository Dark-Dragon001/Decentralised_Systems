// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;

contract harvestContract
{

    // List of pre-defined goods, size, quality.
    string[10] goods = ["Apple", "Orange", "Banana", "Lemon", "Tomato", "Potato", "Cucumber", "Carrot", "Onion", "Mushroom"];
    string[3] goodsSize = ["Medium", "Large", "Extra-large"];
    string[4] goodsQuality = ["Raw", "Half-ripen", "Ripen", "Full-ripen"];


    function getGoods() public view returns (string[10] memory, string[3] memory, string[4] memory)
    {
        // View the product arrays.
        return (goods, goodsSize, goodsQuality);
    }


    function inputGood(string memory _goods) public view returns (string memory)
    {
        // Check whether the new product matches the products pre-defined in the goods array.
        for (uint i = 0; i < goods.length; i++)
        {
            if (keccak256(abi.encodePacked(_goods)) == keccak256(abi.encodePacked(goods[i])))
            {
                return _goods;
            }
        }
        return "Please enter from the products defined in the array.";
    }

    function inputGoodsSize(string memory _newGoodsSize) public view returns (string memory)
    {
        // // Checks whether the size of new product matches the product size  pre-defined in the goodsSize array.
        for (uint i = 0; i < goodsSize.length; i++)
        {
            if (keccak256(abi.encodePacked(_newGoodsSize)) == keccak256(abi.encodePacked(goodsSize[i])))
            {
                return _newGoodsSize;
            }
        }
        return "Please enter from the products defined in the array.";
    }

    function inputGoodsQuality(string memory _newGoodsQuality) public view returns (string memory)
    {
        // Checks whether the quality of the new product matches the product quality pre-defined in the goodsQuality array.
        for (uint i = 0; i < goodsQuality.length; i++)
        {
            if (keccak256(abi.encodePacked(_newGoodsQuality)) == keccak256(abi.encodePacked(goodsQuality[i])))
            {
                return _newGoodsQuality;
            }
        }
        return "Please enter from the products defined in the array.";
    }
}
