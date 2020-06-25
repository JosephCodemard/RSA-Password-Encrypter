const NodeRSA = require('node-rsa');
const fs = require('fs-extra');

const genKey = async () => {
  const key = new NodeRSA();
  key.generateKeyPair();
  await fs.outputFile('./data/public.txt', key.exportKey('public'));
  console.log("✔️   Public Key Written")
  await fs.outputFile('./data/private.txt', key.exportKey('private'));
  console.log("✔️   Private Key Written")
};

module.exports = { genKey }