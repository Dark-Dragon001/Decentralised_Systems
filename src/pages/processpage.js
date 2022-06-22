import "./processpage.css";
import React, {useEffect, useState} from "react";
import {ethers} from "ethers";



function ProcessPage() {


        // Frontend user data getter and setter.
    const [packagingMethod, setPackagingMethod] = useState("");
    const [chemicalUsage, setChemicalUsage] = useState("");
    const [washStatus, setWashStatus] = useState("");
    const [washTemp, setWashTemp] = useState("");

        // Contract data getter  and setter.
    const [contPackagingMethod, setContPackagingMethod] = useState("");
    const [contChemicalUsage, setContChemicalUsage] = useState("");
    const [contWashStatus, setContWashStatus] = useState("");
    const [contWashTemp, setContWashTemp] = useState("");

        // Acceptable packaging method.
    const packagingMethods = "Silicon, Paper, Carton, Crate, Foam";



        //const [harvestContractABI, setHarvestContractABI] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

        // Contract address is defined here.
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        // The Contract Application Binary Interface (ABI).
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_chemicalCompound",
                    "type": "string"
                }
            ],
            "name": "checkChemicalUsage",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_packagingMethods",
                    "type": "string"
                }
            ],
            "name": "checkPackagingMethod",
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
                    "internalType": "string",
                    "name": "_washStatus",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "checkWashStatus",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "viewProcessContract",
            "outputs": [
                {
                    "internalType": "string[5]",
                    "name": "",
                    "type": "string[5]"
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
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

        // The Contract object
    //const smartContract = new ethers.Contract(contractAddress, ABI, signer);


/*
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

    */

    async function requestAccount()
    {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //await provider.send("eth_requestAccounts", []);

    }

    async function setProcess(e)
    {
            // Sets the data of Goods, Goods Size, Goods Quality for smart contract.
        e.preventDefault();
        if (!packagingMethod && !chemicalUsage && !washStatus && ! washTemp) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const transaction = await contract.setGoods(packagingMethod, chemicalUsage, washStatus, washTemp)
            console.log({packagingMethod, chemicalUsage, washStatus, washTemp}+ " Was done.");
            //setPackagingMethod(transaction);
            //setPackagingMethod("");
            //setChemicalUsage("");
            //setWashStatus("");
            //setWashTemp("");
            await transaction.wait()
            fetchProcesed()
            if (packagingMethod !== "Product accepted!"
                && chemicalUsage !== "Product accepted!"
                && washStatus !== "Product accepted!"
                && washTemp !== "Product accepted!")
            {
                return setProcess()
            }
            console.log("Sent for processing");


        }
    }


    async function fetchProcesed()
    {
            // Gets the data from the smart contract.
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            try {
                const data = await contract.viewProcessContract()
                //const checkGoodsCont = await contract.checkGood()
                //const checkGoodsSizeCont = await contract.checkGoodsSize()
               // const checkGoodsQualityCont = await contract.checkGoodsQuality()
                console.log('data: ', data)
                //setContPackagingMethod(checkGoodsCont);
                //setContChemicalUsage(checkGoodsSizeCont);
                //setContWashStatus(checkGoodsQualityCont);
                //setWashTemp()
                //console.log('Contract Goods: ', checkGoodsCont)
                //console.log('Contract Goods Size: ', checkGoodsSizeCont)
                //console.log('Contract Goods Quality: ', checkGoodsQualityCont)
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }


    return (
            <>
                <div className="processPageCont">
                    <form className="processForm" onSubmit={setProcess}>

                        <h1 className="processFormTitle"> Harvesting Stage</h1>
                        <label className="packagingLabel"> Please enter the packaging method:</label>
                        <input className="packagingMethods"
                               onChange={(e) => {setPackagingMethod(e.target.value)}}
                               value={packagingMethod}
                               placeholder="Packaging Method"
                        />

                        <label className= "chemicalUsageLabel"> Please enter chemical usage status:</label>
                        <input className= "chemicalUsageStatus"
                               onChange={(e) => {setChemicalUsage(e.target.value)}}
                               value={chemicalUsage}
                               placeholder= "Chemical Usage Status"
                        />

                        <label className= "washStatusLabel"> Please enter wash status:</label>
                        <input className= "washStatus"
                               onChange={(e) => {setWashStatus(e.target.value)}}
                               value={washStatus}
                               placeholder= "Wash Status"
                        />

                        <label className= "washTemperatureLabel"> Please enter water temperature:</label>
                        <input className= "washTemperature"
                               onChange={(e) => {setWashTemp(e.target.value)}}
                               value={washTemp}
                               placeholder= "Wash Temperature"
                        />

                        <input className="processSubmitButton"
                               type="submit"
                               value="Prepare fo shipment"/>
                        <button onClick={fetchProcesed}>Fetch data</button>
                    </form>

                    <h2>This is {packagingMethod + chemicalUsage + washStatus + washTemp}</h2>


                    <footer className="footerContainerApp">
                        <div className="footerHrContainer">
                            <hr/>
                        </div>
                        <div className="paragraphsContainer">
                            <p className="productsParagraph">
                                Acceptable packaging methods: {packagingMethods}
                            </p>
                            <p className="productsParagraph">
                                Chemical compound usage in processing the goods is not accepted.
                            </p>
                            <p className="productsParagraph">
                                Both washed and non-washed goods are accepted, water temperature for goods are max: 10C min: 3C.
                            </p>
                        </div>
                    </footer>
                </div>

            </>
        );
}


export default ProcessPage;