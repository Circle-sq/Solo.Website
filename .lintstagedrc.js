module.exports = {
    '*.{js,ts}{,x}': ['prettier --write', 'eslint --config ./eslint.precommit.mjs --fix', 'vitest related --run'],
    '*.ts{,x}': [() => 'tsc --skipLibCheck --noEmit'],
};
