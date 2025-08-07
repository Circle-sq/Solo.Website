import fs from 'fs';
import path from 'path';
import keys from 'lodash/keys';
import difference from 'lodash/difference';
import dotenv, { DotenvParseOutput } from 'dotenv';

const baseDir = path.join(__dirname, '..');
const envFile = path.join(baseDir, '.env');
const envExampleFile = path.join(baseDir, '.env.example');

class CustomError extends Error {
    constructor(message: string) {
        const fullMessage = `${message}\nFor more information read Setup guide in wiki pages.\n`;

        super(fullMessage);
    }
}

const parseEnvFile = (path: string): DotenvParseOutput => {
    if (!fs.existsSync(path)) {
        throw new CustomError(`Can't find ${path}.`);
    }

    const data = fs.readFileSync(path, 'utf8');

    return dotenv.parse(data);
};

const main = () => {
    const envExampleConfig = parseEnvFile(envExampleFile);
    const envConfig = parseEnvFile(envFile);

    const missingVariables = difference(keys(envExampleConfig), keys(envConfig));

    if (missingVariables.length > 0) {
        const variables = missingVariables.join('\n');

        throw new CustomError(`Some variables are missing from ${envFile} file:\n\n${variables}\n`);
    }
};

main();
