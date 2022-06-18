import "./header.css";
import React, {useEffect, useState} from "react";
import {ethers} from "ethers";

function Header ()
{
    // Views the balance of user wallet
    const [balance, setBalance] = useState();

    // Metamask connection types.
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();


    useEffect(() => {
        // Ask to connect to metamask.
        const connectToWallet = async () => {
            await provider.send("eth_requestAccounts", []);
        }
        const getBalance = async () => {
            // Views account balance from an address.
            const balance = await provider.getBalance("0x2BB20F4E26d02ddFa7DD29Be11075897cd448017")
            // Views the balance of an account in a human-readable format.
            const balanceFormat = ethers.utils.formatEther(balance)
            setBalance(balanceFormat);
        }
        connectToWallet()
            .catch(console.error);
        getBalance()
            .catch(console.error)
    });

    return (
        <>
            <div className="headerContainer">
                <div className= "leftBar">
                <span className= "headerTitle">
                    <h1> Digital Food Certificate </h1>
                </span>
                    <span className= "headerPicture">
                </span>
                </div>
                <div className="rightBar">
                    <div className="accountInfoContainer">
                        <h2>Current balance: {balance} ETH</h2>
                    </div>
                </div>
                <div className="headerHrContainer">
                    <hr/>
                </div>
            </div>
        </>
    );
}

export default Header;