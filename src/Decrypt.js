const NodeRSA = require('node-rsa');
const fs = require('fs-extra');
var readline = require('readline');

const cliProgress = require('cli-progress');

const { questionsDecrypt } = require('./questions.js');
const inquirer = require('inquirer');
 
const decrypt = async () => {

  console.log(" This will Decrypt your personal details (RSA encryption) ");
  console.log("----------------------------------------------------------");

  const answers = await inquirer.prompt(questionsDecrypt)


  const keyData = await fs.readFile(answers.path_pass, 'utf8');
  const private = await fs.readFile(answers.path_key + '/' + 'private.txt', 'utf8');

  const key = new NodeRSA();

  key.importKey(private, 'private');

  console.log("✔️  Key Imported");

  var decrypted = key.decrypt(keyData, 'utf8');
  decrypted = JSON.parse(decrypted);

  if(answers.email !== decrypted.email){
    console.log("❌  Emails did not match");
  }else{
    console.log("✔️  Printing Info");
    PrintInfo(decrypted);
  }
};


const PrintInfo = (decrypted) => {
  process.stdout.write("\n----------------------------");
  process.stdout.write("\nOwner: " + decrypted.name);
  process.stdout.write("\nEmail: " + decrypted.email);
  process.stdout.write("\nUse: " + decrypted.use);
  process.stdout.write("\nName: " + decrypted.display_name);
  process.stdout.write("\nDescription: " + decrypted.display_description);
  process.stdout.write("\n---------------------------");
  process.stdout.write("\nPassword: " + decrypted.password);
  
}


module.exports = { decrypt }