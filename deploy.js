const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');

const { abi, evm } = require('./compile');

const MNEMONIC = 'truth skirt nothing already estate van cherry track execute frame divert absorb';
const INFURA_URL = 'https://goerli.infura.io/v3/cb24109983c044a489c9c4305c0dee57';

const provider = new HDWalletProvider(MNEMONIC, INFURA_URL);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: 1000000 });

    console.log(result.options.address);
};

deploy();
