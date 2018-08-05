const path = require('path');
const fs = require('fs');
const solc = require('solc'); //Solidity compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox']; //exporting the contract object