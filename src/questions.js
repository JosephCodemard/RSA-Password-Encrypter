const questionsEncrypt = [
    { type: 'input', name: 'name', message: 'What is your fullname?' },
    { type: 'input', name: 'email', message: 'What is your email adress? ' },
    { type: 'input', name: 'use', message: 'What is the password for? ' },
    { type: 'input', name: 'display_name', message: 'Password Name' },
    { type: 'input', name: 'display_description', message: 'Password Description' },
    { type: 'input', name: 'password', message: 'What is the password?' },
    { type: 'checkbox', choices: ['Write as file (encrypted)', 'print on screen (encrypted)'], name: 'options', message: 'What shall we do with the password?'}
]

const questionsDecrypt = [
    { type: 'input', name: 'path_key', message: 'Where are the keys located?', default: "./data" },
    { type: 'input', name: 'path_pass', message: 'Where is the encrypted password file?', default: "./secrets/password_name.encrypt" },
    { type: 'input', name: 'email', message: 'What is your email (It must match)' }

]

module.exports = { questionsEncrypt, questionsDecrypt };
