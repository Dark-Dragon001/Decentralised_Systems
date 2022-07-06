import "./shipementpage.css";
import React, {useState} from "react";
import {ethers} from "ethers";



function ShipmentPage() {


    // Frontend user data getter and setter.
    const [shipProducts, setShipProducts] = useState("");
    const [productsAmount, setProductsAmount] = useState("");
    const [temperature, setTemperature] = useState("");
    const [shipTime, setShipTime] = useState("");

    // Contract data getter  and setter.
    const [contShipProducts, setContShipProducts] = useState("");
    const [contProductAmount, setContProductAmount] = useState("");
    const [contTemperature, setContTemperature] = useState("");
    const [contShipTime, setContShipTime] = useState("");

    // Acceptable products and qualities by smart-contract.
    const goodsList = "Apple, Orange, Banana, Lemon, Tomato, Potato, Cucumber, Carrot, Onion, Mushroom";


    //const [harvestContractABI, setHarvestContractABI] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();



    // Contract address is defined here.
    const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    // The Contract Application Binary Interface (ABI).
    const ABI = [
        {
            "inputs": [],
            "name": "checkLoadAmount",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "checkLoadProduct",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "checkTemperature",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getShipmentMaxTime",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "_shipMaxTime",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "_loadAmount",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "_tempValue",
                    "type": "uint8"
                },
                {
                    "internalType": "string",
                    "name": "_loadProdut",
                    "type": "string"
                }
            ],
            "name": "setShipmentData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];


    // The Contract object
    //const smartContract = new ethers.Contract(contractAddress, ABI, signer);


    async function requestAccount()
    {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //await provider.send("eth_requestAccounts", []);

    }


    async function setGoods(e)
    {
        // Sets the data of Goods, Goods Size, Goods Quality for smart contract.
        e.preventDefault();
        if (! shipProducts&& !productsAmount && !temperature && ! shipTime) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const transaction = await contract.setShipmentData(shipTime, productsAmount, temperature, shipProducts)
            setShipProducts(transaction);
            setShipProducts("");
            setProductsAmount("");
            setTemperature("");
            setShipTime("");
            await transaction.wait()
            fetchGoods()



        }
    }


    async function fetchGoods()
    {
        // Gets the data from the smart contract.
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            try {
                const loadProduct = await contract.checkLoadProduct()
                const loadAmount = await contract.checkLoadAmount()
                const tempData = await contract.checkTemperature()
                const timeDate = await contract.getShipmentMaxTime()
                console.log('data: ', loadProduct, loadAmount, tempData, timeDate)
                setContShipProducts(loadProduct);
                setContProductAmount(loadAmount);
                setContTemperature(tempData);
                setContShipTime(timeDate);
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }


    return (
        <>
            <div className="shipmentPageCont">
                <form className="shipmentForm" onSubmit={setGoods}>

                    <h1 className="shipmentFormTitle"> Shipment Stage</h1>
                    <label className="shipmentProductLabel"> Please enter the type of product.</label>
                    <label className="conShipmentLabel">{contShipProducts} </label>
                    <input className="shipmentProductForm"
                           onChange={(e) => {setShipProducts(e.target.value)}}
                           value={shipProducts}
                           placeholder="Product"
                    />

                    <label className= "shipmentProductAmountLabel"> Please enter amount of the product in Kg.</label>
                    <label className="conShipmentLabel">{contProductAmount}</label>
                    <input className= "shipmentProductAmountForm"
                           onChange={(e) => {setProductsAmount(e.target.value)}}
                           value={productsAmount}
                           placeholder= "Product Amount"
                    />

                    <label className= "shipmentTempLabel"> Please enter shipment container temperature.</label>
                    <label className="conShipmentLabel">{contTemperature}</label>
                    <input className= "shipmentTempForm"
                           onChange={(e) => {setTemperature(e.target.value)}}
                           value={temperature}
                           placeholder= "Temperature"
                    />

                    <label className= "shipmentTimeLabel"> Please enter shipment time.</label>
                    <label className="conShipmentLabel">{contShipTime}</label>
                    <input className= "shipmentTimeForm"
                           onChange={(e) => {setShipTime(e.target.value)}}
                           value={shipTime}
                           placeholder= "Shipment Time"
                    />

                    <input className="shipmentSubmitButton"
                           type="submit"
                           value="Check Shipment"/>
                </form>

                <footer className="footerContainerApp">
                    <div className="footerHrContainer">
                        <hr/>
                    </div>
                    <div className="paragraphsContainer">
                        <p className="productsParagraph">
                            Acceptable goods for shipment: {goodsList}.
                        </p>
                        <p className="productsParagraph">
                            Product amount requested: 50Kg.
                        </p>
                        <p className="productsParagraph">
                            Acceptable shipment temperature: 0C - 10C.
                        </p>
                        <p className="productsParagraph">
                            Maximum shipment time: 48Hrs.
                        </p>
                    </div>
                </footer>
            </div>

        </>
    );
}


export default ShipmentPage;