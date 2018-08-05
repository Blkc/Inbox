const assert = require('assert');
const ganache = require('ganache-cli'); //ethereum test network
const Web3 = require('web3'); //constructor for interacting with deployed contracts
const web3 = new Web3(ganache.provider()); //instance of Web3 with the network's provider
const { interface, bytecode } = require('../compile'); //properties of the contract object

let accounts;
let inbox;

beforeEach(async () => {
	//get a list of all accounts
	accounts = await web3.eth.getAccounts();

	//use one of those accounts to deploy the contact
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
	it('deploys a contact', () => {
		console.log(inbox);
	});
});