const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let INITIAL_MESSAGE = 'Hi there!';

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('should deploy the contract', () => {
        assert.ok(inbox.options.address, 'Contract should be deployed');
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('should allow a user to change the message', async () => {
        await inbox.methods.setMessage('teste mudança').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'teste mudança');
    });

});