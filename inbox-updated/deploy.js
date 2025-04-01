const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'rubber inflict print ticket razor fly select artefact autumn museum sudden frame',
    'https://sepolia.infura.io/v3/4747f9aa693343959ca8febbc46403d2'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
}

deploy();