// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.8.14 <0.9.0;

contract shipment
{


    // Contract conditions.
    uint8 constant shipmentMaxTime = 48;  // Time in hours.
    uint8[2] temperatureValue = [10, 0];
    uint8 constant shipmentLoadAmount = 50;
    string[10] shipmentLoadProuct = ["Apple", "Orange", "Banana", "Lemon", "Tomato", "Potato", "Cucumber", "Carrot", "Onion", "Mushroom"];



    // Getter variables.
    uint8 shipMaxTime;
    uint8  loadAmount;
    uint8 tempValue;
    string loadProduct;



    function setShipmentData(uint8 _shipMaxTime, uint8 _loadAmount, uint8 _tempValue, string memory _loadProdut) public
    {
        // Sets the user data to the getter variables.
        shipMaxTime = _shipMaxTime;
        loadAmount = _loadAmount;
        tempValue = _tempValue;
        loadProduct = _loadProdut;

    }


    function getShipmentMaxTime() public view returns(string memory){
        // Checks shipment time condition.
        if (shipMaxTime <= shipmentMaxTime )
        {
            return "Time Accepted!";
        }
        return "Time too long";
    }

    function checkLoadAmount() public view returns (string memory)
    {
        // Checks the amount of shipment product.
        if(loadAmount == shipmentLoadAmount)
        {
            return "Amount Accepted";
        }
        return "Amount of 50KG is acceptable.";

    }


    function checkLoadProduct() public  view returns(string memory)
    {
        for(uint i = 0; i < shipmentLoadProuct.length; i++)
        {
            // Takes the list of loaded products.
            if(keccak256(abi.encodePacked(loadProduct)) == keccak256(abi.encodePacked(shipmentLoadProuct[i])))
            {
                return ("Product Accepted!");
            }
        }
        return ("Invalid Product");
    }

    function checkTemperature() public view returns (string memory)
    {
        // Checks the temprature.
        if(tempValue <= temperatureValue[0] && tempValue >= temperatureValue[1])
        {
            return "Acceptable temperature condition";
        }
        return "Temperature too high or too low!";
    }

}

