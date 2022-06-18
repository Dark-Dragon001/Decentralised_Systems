import "./harvestpage.css";
import React, {useEffect, useState} from "react";
import {ethers} from "ethers";


const HarvestPage = () => {
    // Take values from the form.
    const [values, setValues] = useState(
        { goods: "",
            goodSize: "",
            goodQuality: ""
        });
    // Controls the submit button reaction.
    const [submit, setSubmit] = useState(false);
    const [valid, setValid] = useState(false);

    //const [harvestContractABI, setHarvestContractABI] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Contract address is defined here.
    const contractAddress = "0x395b07Eb6AFe5B218BBBe63099B53dbb276a13FE";

    const ABI = [
            {
                "inputs": [],
                "name": "getGoods",
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
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_goods",
                        "type": "string"
                    }
                ],
                "name": "inputGood",
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
                        "name": "_newGoodsQuality",
                        "type": "string"
                    }
                ],
                "name": "inputGoodsQuality",
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
                        "name": "_newGoodsSize",
                        "type": "string"
                    }
                ],
                "name": "inputGoodsSize",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
    ];

    // The Contract object
    const smartContract = new ethers.Contract(contractAddress, ABI, signer);

    // Event handler for Goods, GoodsSize, GoodsQuality.
    const handleGoodsInputChange = async (event) => {
        const updateGoods = await smartContract.inputGoods(values.goods)
        await updateGoods.wait()
        setValues({...values, goods: event.target.value})

    }
    const handleGoodSizeInputChange = (event) => {
        setValues({...values, goodSize: event.target.value})
        console.log(values.goodSize);
    }
    const handleGoodsQualityInputChange = (event) => {
        setValues({...values, goodQuality: event.target.value})
        console.log(values.goodQuality);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if ( values.goods && values.goodSize && values.goodQuality )
        {
            setValid(true);

        }
        setSubmit(true)
        console.log("Operation Successful!")
    }

    useEffect(() => {
        // Calling inputGoods method from smartContract.
        const inputGoods = async () => {
            const _inputGoods = await smartContract.inputGood();
            setValues({...values, goods: _inputGoods})
        }
        inputGoods()
            .catch(console.log)
    });

    return  (
        <>
            <div className="harvestPage_Cont">
                <form className= "harvestForm" onSubmit={handleSubmit}>
                    {submit && valid ?
                            <div className="submitNotification"> The goods have been moved to processing.</div>
                            :
                            null
                    }
                    <h1 className="formTitle"> Harvesting Stage</h1>
                    <label className= "goodsLabel"> Please enter the type of goods.</label>
                    <input className= "goods"
                           onChange={handleGoodsInputChange}
                           value={values.goods}
                           placeholder= "Goods"
                           required
                    />
                    {submit && values.goods ?
                                            <span className="enterGoods">Please enter one of the Goods above.</span>
                                            :
                                            null
                    }
                    <label className= "goodsSizeLabel"> Please enter the size of goods.</label>
                    <input className= "goodsSize"
                           onChange={handleGoodSizeInputChange}
                           value={values.goodSize}
                           placeholder= "Goods Size"
                           required
                    />
                    {submit && values.goodSize ?
                                                <span className="enterGoods">Please enter one of the Goods above.</span>
                                                :
                                                null
                    }
                    <label className= "goodQualityLabel"> Please enter goods quality.</label>
                    <input className= "goodQuality"
                           onChange={handleGoodsQualityInputChange}
                           value={values.goodQuality}
                           placeholder= "Goods Quality"
                           required
                    />
                    {submit && values.goodQuality ?
                                 <span className="enterGoods">Please enter one of the Goods above.</span>
                                :
                                 null
                    }
                    <input className="submitButton"
                            type="submit"
                           value="Send to Process"/>
                </form>
            </div>

        </>
    );
}

export default HarvestPage;