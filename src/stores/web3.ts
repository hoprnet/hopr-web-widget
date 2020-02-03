import Web3 from "src/models/Web3";

const web3 = Web3.create();

// initialize immediately
web3.initialize().catch(console.error);

export default web3;
