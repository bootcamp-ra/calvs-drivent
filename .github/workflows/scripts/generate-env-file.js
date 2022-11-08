const fs = require('fs');
const path = require('path');

function generateProductionEnv() {
  const envObj = loadEnvAsObjFromJson();
  const envStr = convertFromObjToEnvString(envObj);
  saveEnvStrToFile(envStr);
  removeEnvJson();
}

function envJsonFilepath() {
  return path.resolve(__dirname, './env.json');
}

function loadEnvAsObjFromJson() {
  const filepath = envJsonFilepath();
  const envFile = fs.readFileSync(filepath);
  return JSON.parse(envFile);
}

function convertFromObjToEnvString(envObj) {
  const keys = Object.keys(envObj).sort();
  return keys.reduce((envStr, key) => {
    const value = envObj[key];

    const row = `${key}="${value.replace(/(\n|\r\n)/g, '\\n')}"`;
    return envStr + row + '\n';
  }, '');
}

function saveEnvStrToFile(envStr) {
  const filepath = path.resolve(process.cwd(), '.env');
  fs.writeFileSync(filepath, envStr);
}

function removeEnvJson() {
  fs.rmSync(envJsonFilepath());
}

generateProductionEnv();
