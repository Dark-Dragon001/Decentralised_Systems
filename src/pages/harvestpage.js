import "./harvestpage.css";
import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {wait} from "@testing-library/user-event/dist/utils";



const HarvestPage = () => {


    const [products, setProducts] = useState("");
    const [productsQuality, setProductsQuality] = useState("");
    const [productsSize, setProductsSize] = useState("");

    const [productsValue, setProductsValue] = useState("");
    const [productsSizeValue, setProductsSizeValue] = useState("");
    const [productsQualityValue, setProductsQualityValue] = useState("");

    //const [harvestContractABI, setHarvestContractABI] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Contract address is defined here.
    const contractAddress = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

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
    const smartContract = new ethers.Contract(contractAddress, ABI, signer);


    const handleGoodsChange = (e) => {
            // Handles the change in the Goods form.
        setProductsValue(e.target.value);
    }

    const submitHandler = async (e) => {
            // Handles the change while the form is submitted.
        e.preventDefault();
        const productUpdate =  await smartContract.setGoods(productsValue, "", "");
        await productUpdate.wait();
        setProducts(productsValue);
        setProductsValue("");
        console.log(productsValue);
        console.log(productsValue);

    }



        // Take values from the form.
    const [values, setValues] = useState(
        { goods: "",
            goodSize: "",
            goodQuality: ""
        });

        // Controls the submit button reaction.
    const [submit, setSubmit] = useState(false);
    const [valid, setValid] = useState(false);





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

        // Ask to connect to metamask.
        const connectToWallet = async () => {
            await provider.send("eth_requestAccounts", []);
        }

        const inputProducts = async () => {
            const smartConProd = await smartContract.setGoods(productsValue, "", "");
            setProducts(smartConProd);
            console.log(products);

        }
        connectToWallet()
            .catch(console.error);
        inputProducts()
            .catch(console.error);
    });




    return  (
        <>
            <div className="harvestPage_Cont">
                <form className= "harvestForm" onSubmit={submitHandler}>

                    <h1 className="formTitle"> Harvesting Stage</h1>
                    <label className= "goodsLabel"> Please enter the type of goods. {}</label>
                    <input className= "goods"
                           onChange={handleGoodsChange}
                           value={productsValue}
                           placeholder= "Goods"
                           required
                    />

                    <input className="submitButton"
                            type="submit"
                           value="Send to Process"/>
                </form>



                <footer className="footerContainerApp">
                    <div className="footerHrContainer">
                        <hr/>
                    </div>
                    <div className="paragraphsContainer">
                        <p className="productsParagraph">
                            Goods requsted by the contractor are: {products}
                        </p>
                        <p className="productsParagraph">
                            Goods size requsted by the contractor are: {}
                        </p>
                        <p className="productsParagraph">
                            Goods quality requsted by the contractor are: {}
                        </p>
                    </div>
                </footer>


            </div>

        </>
    );
}

export default HarvestPage;