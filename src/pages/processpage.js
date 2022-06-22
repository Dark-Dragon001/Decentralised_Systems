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
    const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

        // The Contract Application Binary Interface (ABI).
    const ABI = [
        {
            "inputs": [],
            "name": "checkChemicalUsage",
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
            "inputs": [],
            "name": "checkWashStatus",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_pkgMethod",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_chemicalComp",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_washingStatus",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "_washTemp",
                    "type": "uint8"
                }
            ],
            "name": "setProcess",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "viewProcessContract",
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
                },
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
            ];


    async function requestAccount()
    {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        //await provider.send("eth_requestAccounts", []);

    }

    async function setProcess(e)
    {
            // Sets the data for packaging methods, chemical compound usage, wash status and water temperature used in washing products for smart contract.
        e.preventDefault();
        if (!packagingMethod && !chemicalUsage && !washStatus && ! washTemp) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, ABI, signer)
            const transaction = await contract.setProcess(packagingMethod, chemicalUsage, washStatus, washTemp)
            console.log("Transaction done.");
            setPackagingMethod(transaction);
            setPackagingMethod("");
            setChemicalUsage("");
            setWashStatus("");
            setWashTemp("");
            await transaction.wait()
            fetchProcesed()
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
                const packagingData = await contract.checkPackagingMethod()
                const chemicalUsageData = await contract.checkChemicalUsage()
                const washData = await contract.checkWashStatus()
               // const checkGoodsQualityCont = await contract.checkGoodsQuality()
                console.log('data: ', packagingData, chemicalUsageData, washData)
                setContPackagingMethod(packagingData);
                setContChemicalUsage(chemicalUsageData);
                setContWashStatus(washData);
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
                        <label className="contPackagingLabel">{contPackagingMethod}</label>
                        <input className="packagingMethods"
                               onChange={(e) => {setPackagingMethod(e.target.value)}}
                               value={packagingMethod}
                               placeholder="Packaging Method"
                        />

                        <label className= "chemicalUsageLabel"> Please enter chemical usage status:</label>
                        <label className="contChemicalLabel">{contChemicalUsage}</label>
                        <input className= "chemicalUsageStatus"
                               onChange={(e) => {setChemicalUsage(e.target.value)}}
                               value={chemicalUsage}
                               placeholder= "Chemical Usage Status"
                        />

                        <label className= "washStatusLabel"> Please enter wash status:</label>
                        <label className="contWashLabel">{contWashStatus}</label>
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
                    </form>

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