const inquirer = require('inquirer');

const { encrypt } = require('./Encrypt.js');
const { decrypt } = require('./Decrypt.js');
const { genKey } = require('./Utils/keyGen.js');

const main = () => {
    const answer = inquirer.prompt ([
        { type: 'checkbox', choices: ['Encrypt', 'Decrypt', 'Generate Key'], name: 'options', message: 'What do you wish to do?'}
    ]);

    if(answer.options.includes('Encrypt')){
        encrypt();
    }
    if(answer.options.includes('Decrypt')){
        decrypt();
    }
    if(answer.options.includes('Generate Key')){
        genKey();
    }
}

main();