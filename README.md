# Instructions to run this project

Download the project and open it with a text editor or ide. 

```shell
npm install 
npm run start
```
The first command "npm install" installs all the required libraries for the project.
The second command "npm run starts" the client side or UI.


In a second terminal run the following code:

```shell
npx hardhat node
npx hardhat compile
npx hardhat run scripts/smartContractCompiler.js
```
The first command "npx hardhat node" starts hardhat server witt 20 ethereum accounts, make sure that of these accounts are connected with your metamask.
Now, run the second command "npx hardhat compile" to compile the smart contracts. Copy the address of each smart-contract and past it to their pages in contract address section.
Lastly, run the third command "npx hardhat run scripts/smartContractCompiler.js " to run the compiled smart-contracts.

It should be working fine now

Note: using separate terminals are strongly recommended. Especially, for "npm run start" and "npx hardhat node" these two needs to be running in order for the project to work.