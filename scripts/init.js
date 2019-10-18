const fs = require('fs')
const prompt = require('prompt-sync')()

let variables = [{
  name: 'SERVER_DOMAIN',
  default: 'selflessheroes.fr',
  value: '',
}, {
  name: 'SERVER_PROTOCOL',
  default: 'https',
  value: '',
}, {
  name: 'FB_APP_ID',
  default: '000000000000000',
  value: '',
}, {
  name: 'SERVER_HOST',
  default: 'example.com',
  value: '',
}, {
  name: 'SERVER_USER',
  default: 'sshloginexample',
  value: '',
}, {
  name: 'SERVER_FOLDER',
  default: '/var/www/destination/on/server',
  value: '',
}, ]

let deployEnvContent = "# Deploy env variables\n\n"
const envFile = 'deploy.env'

for (let envVariable of variables) {
  let question = `${envVariable.name} (Default: ${envVariable.default}):\n`
  envVariable.value = prompt(question)
}

for (let envVariable of variables) {
  let value = envVariable.value.length === 0 ? envVariable.default : envVariable.value
  deployEnvContent += `${envVariable.name}=${value}\n`
}

fs.writeFile(envFile, deployEnvContent, function(err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(envFile + " created.")
})