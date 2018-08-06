const assert = require('assert');
const ganache = require('ganache-cli'); //ethereum local test network
const Web3 = require('web3'); //constructor for interacting with deployed contracts

//instance of Web3 with the network's provider
const provider = ganache.provider();
const web3 = new Web3(provider); 

const { interface, bytecode } = require('../compile'); //properties of the contract object

let accounts;
let inbox;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts(); //get a list of all accounts

	//use one of those accounts to deploy the contact
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] }) //arguments for the constructor function
		.send({ from: accounts[0], gas: '1000000' })

	inbox.setProvider(provider);
});

describe('Inbox', () => {
	it('deploys a contact', () => {
		assert.ok(inbox.options.address); //verify that there is an address after deployment
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
	    assert.equal(message, 'Hi there!'); //verify that the initial argument is in the contract
	});

	it('can change the message', async () => {
		await inbox.methods.setMessage('bye').send({ from: accounts[0] }); //receives transaction hash (like a receipt)
		const message = await inbox.methods.message().call(); //have to call method again to verify
		assert.equal(message, 'bye');
	});
});