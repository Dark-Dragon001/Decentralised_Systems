import "./header.css";
import React, {useEffect, useState} from "react";
import {ethers} from "ethers";;

function Header ()
{
    // Views the balance of user wallet
    const [balance, setBalance] = useState();

    // Metamask connection types.
    const provider = new ethers.providers.Web3Provider(window.ethereum);


    useEffect(() => {

        const getBalance = async () => {
            // Views account balance from an address.
            const balance = await provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
            // Views the balance of an account in a human-readable format.
            setBalance(ethers.utils.formatEther(balance));
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        }
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