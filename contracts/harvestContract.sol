// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;

contract harvestContract
{

    // List of pre-defined goods, size, quality.
    string[10] goods = ["Apple", "Orange", "Banana", "Lemon", "Tomato", "Potato", "Cucumber", "Carrot", "Onion", "Mushroom"];
    string[3] goodsSize = ["Medium", "Large", "Extra-large"];
    string[4] goodsQuality = ["Raw", "Half-ripen", "Ripen", "Full-ripen"];

    // Variables that are supposed to take data form the user.
    string storeGoods;
    string storeGoodsSize;
    string storeGoodsQuality;


    function getContractConditions() public view returns (string[10] memory, string[3] memory, string[4] memory)
    {
        // View the product arrays.
        return (goods, goodsSize, goodsQuality);
    }

    function setGoods(string memory _enterGoods, string memory _enterGoodsSize, string memory _enterGoodsQuality) public
    {
        // Takes inputs from the user and sets the value of strings above.
        storeGoods = _enterGoods;
        storeGoodsSize = _enterGoodsSize;
        storeGoodsQuality = _enterGoodsQuality;
    }

    function getGoods() public view returns(string memory, string memory, string memory)
    {
        // Views the values entered by the user
        return (storeGoods, storeGoodsSize, storeGoodsQuality);
    }

    function checkGood() public view returns(string memory )
    {
        // Check whether the new product matches the products pre-defined in the goods array.
        for (uint i = 0; i < goods.length; i++)
        {
            if (keccak256(abi.encodePacked(storeGoods)) == keccak256(abi.encodePacked(goods[i])))
            {
                return "Product accepted!";
            }
        }
        return "Please enter from the products defined in the array.";
    }


    function checkGoodsSize() public view returns (string memory)
    {
        // Checks whether the size of new product matches the product size  pre-defined in the goodsSize array.
        for (uint i = 0; i < goodsSize.length; i++)
        {
            if (keccak256(abi.encodePacked(storeGoodsSize)) == keccak256(abi.encodePacked(goodsSize[i])))
            {
                return "Product size accepted!";
            }
        }
        return "Please enter from the products defined in the array.";
    }

    function checkGoodsQuality() public view returns (string memory)
    {
        // Checks whether the quality of the new product matches the product quality pre-defined in the goodsQuality array.
        for (uint i = 0; i < goodsQuality.length; i++)
        {
            if (keccak256(abi.encodePacked(storeGoodsQuality)) == keccak256(abi.encodePacked(goodsQuality[i])))
            {
                return "Product quality accepted!";
            }
        }
        return "Please enter from the products defined in the array.";
    }
}
