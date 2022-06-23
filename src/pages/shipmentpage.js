import "./shipementpage.css";
import React, {useState} from "react";
import {ethers} from "ethers";



function ShipmentPage() {


    // Frontend user data getter and setter.
    const [products, setProducts] = useState("");
    const [productsSize, setProductsSize] = useState("");
    const [productsQuality, setProductsQuality] = useState("");

    // Contract data getter  and setter.
    const [contractProducts, setContractProducts] = useState("");
    const [contractProductSize, setContractProductSize] = useState("");
    const [contractProductsQuality, setContractProductsQuality] = useState("");

    // Acceptable products and qualities by smart-contract.
    const goodsList = "Apple, Orange, Banana, Lemon, Tomato, Potato, Cucumber, Carrot, Onion, Mushroom";
    const goodsSizeList = "Medium, Large, Extra-large";
    const goodsQualityList = "Raw, Half-ripen, Ripen, Full-ripen";



    //const [harvestContractABI, setHarvestContractABI] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();



    // Contract address is defined here.
    const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

    // The Contract Application Binary Interface (ABI).
    const ABI = [
        {
            "inputs": [],
            "name": "checkGood",
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
            "name": "checkGoodsQuality",
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
            "name": "checkGoodsSize",
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
            "name": "getContractConditions",
            "outputs": [
                {
                    "internalType": "string[10]",
                    "name": "",
                    "type": "string[10]"
                },
                {
                    "internalType": "string[3]",
                    "name": "",
                    "type": "string[3]"
                },
                {
                    "internalType": "string[4]",
                    "name": "",
                    "type": "string[4]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getGoods",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
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
                    "internalType": "string",
                    "name": "_enterGoods",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_enterGoodsSize",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_enterGoodsQuality",
                    "type": "string"
                }
            ],
            "name": "setGoods",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];


    // The Contract object
    //const smartContract = new ethers.Contract(contractAddress, ABI, signer);



    const handleGoodsChange = (e) => {
        // Handles the change in the Goods form.
        setProducts(e.target.value);
    }

    const handleGoodsSizeChange = (e) => {
        // Handles the change in the GoodsSize form.
        setProductsSize(e.target.value);
    }

    const handleGoodsQualityChange = (e) => {
        // Handles the change in the GoodsQuality form.
        setProductsQuality(e.target.value);
    }

    async function requestAccount()
    {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //await provider.send("eth_requestAccounts", []);

    }


    async function setGoods(e)
    {
        // Sets the data of Goods, Goods Size, Goods Quality for smart contract.
        e.preventDefault();
        if (!products && !productsSize && !productsQuality) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const transaction = await contract.setGoods(products, productsSize, productsQuality)
            setProducts(transaction);
            setProducts("");
            setProductsSize("");
            setProductsQuality("");
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
                const checkGoodsCont = await contract.checkGood()
                const checkGoodsSizeCont = await contract.checkGoodsSize()
                const checkGoodsQualityCont = await contract.checkGoodsQuality()
                setContractProducts(checkGoodsCont);
                setContractProductSize(checkGoodsSizeCont);
                setContractProductsQuality(checkGoodsQualityCont);
                console.log('Contract Goods: ', checkGoodsCont)
                console.log('Contract Goods Size: ', checkGoodsSizeCont)
                console.log('Contract Goods Quality: ', checkGoodsQualityCont)
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
                    <label className="shipmentLabel"> Please enter the type of goods.</label>
                    <label className="conShipmentLabel">{contractProducts} </label>
                    <input className="shipmentFormOne"
                           onChange={handleGoodsChange}
                           value={products}
                           placeholder="Product"
                    />

                    <label className= "shipmentLabel"> Please enter the size of goods.</label>
                    <label className="conShipmentLabel">{contractProductSize}</label>
                    <input className= "shipmentFormTwo"
                           onChange={handleGoodsSizeChange}
                           value={productsSize}
                           placeholder= "Product Size"
                    />

                    <label className= "shipmentLabel"> Please enter goods quality.</label>
                    <label className="conShipmentLabel">{contractProductsQuality}</label>
                    <input className= "shipmentFormThree"
                           onChange={handleGoodsQualityChange}
                           value={productsQuality}
                           placeholder= "Product Quality"
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
                            Goods requested by the contractor are: {goodsList}
                        </p>
                        <p className="productsParagraph">
                            Goods size requested by the contractor are: {goodsSizeList}
                        </p>
                        <p className="productsParagraph">
                            Goods quality requested by the contractor are: {goodsQualityList}
                        </p>
                    </div>
                </footer>
            </div>

        </>
    );
}


export default ShipmentPage;