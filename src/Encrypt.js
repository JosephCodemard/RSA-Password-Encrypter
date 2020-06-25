const inquirer = require('inquirer');
const NodeRSA = require('node-rsa');
const fs = require('fs-extra');
const cliProgress = require('cli-progress');

const { questionsEncrypt } = require('./questions.js');

const encrypt = async () => {
    console.log("  This will encrypt your personal details (RSA encryption)  ");
    console.log("------------------------------------------------------------");

    const answers = await inquirer.prompt(questionsEncrypt);

    const answers_obj = {
        name: answers.name,
        email: answers.email,
        use: answers.use,
        display_name: answers.display_name,
        display_description: answers.display_description,
        password: answers.password
    }

    console.log(answers_obj);
    const e_answers = await _encrypt(answers_obj);
    
    if(answers.options.includes('print on screen (encrypted)')){
        console.log("---------- copy below ----------\n");
        console.log(e_answers);
        console.log("\n---------- copy above ----------");
    }
    if(answers.options.includes('Write as file (encrypted)')){
        const path = await inquirer.prompt({ type: 'input', name: 'path', message: 'What is the filename path? ', default: './secrets' });
        

        const file_path = (path.path).concat('/', answers.display_name, '.encrypt');
        
        if (!fs.existsSync(path.path)){
            fs.mkdirSync(path.path);
        }
        fs.writeFile(file_path, e_answers).then(() => {
            console.log("✔️   File Written")
        }).catch(() => {
            console.log("❌   A unknown error occured")
        })
    }
};


  
const _encrypt = async (item) => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(100, 0);

    const keyData = await fs.readFile('./data/public.txt', 'utf8');

    progressBar.update(33);

    const key = NodeRSA();
    key.importKey(keyData);

    progressBar.update(66);

    const encrypted = key.encrypt(item, 'base64');

    progressBar.update(100);

    progressBar.stop();
    console.log("✔️   Encrypted")

    return encrypted;
} 

module.exports = { encrypt }