const inquirer = require('inquirer');

const { encrypt } = require('./Encrypt.js');
const { decrypt } = require('./Decrypt.js');
const { genKey } = require('./Utils/keyGen.js');

const main = async () => {
    const answer = await inquirer.prompt ([
        { type: 'checkbox', choices: ['Encrypt', 'Decrypt', 'Generate Key'], name: 'options', message: 'What do you wish to do?'}
    ]);

    if(answer.options.includes('Encrypt')){
        await encrypt();
    }
    if(answer.options.includes('Decrypt')){
        await decrypt();
    }
    if(answer.options.includes('Generate Key')){
        await genKey();
    }
}

main();