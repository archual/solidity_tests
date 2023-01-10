const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, evm } = require('../compile');
const web3= new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
      .send({ from: accounts[0], gas: 1000000 });
});

describe('Inbox tests', () => {
  it('should create and deploy contract', () => {
    assert.ok(inbox.options.address);
  });

  it('should set initial message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('should set new message correctly', async () => {
    await inbox.methods.setMessage('New').send({ from: accounts[1] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'New');
  });

  it('should return message by getMessage', async () => {
    const message = await inbox.methods.getMessage().call();
    assert.equal(message, 'Hi there!');
  });
})