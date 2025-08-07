const { spawn } = require('child_process');
const fs = require('fs');

const outputFile = 'test-output.txt';
const outputStream = fs.createWriteStream(outputFile);

// Force color output for most CLI applications
const env = { ...process.env, FORCE_COLOR: 'true' };

const testProcess = spawn('npm', ['run', 'test:unit:coverage'], { env });

// skip first 5 lines of output (they are not part of the test output)
/*
> gpp-website@1.1.0 test
> node tests/test-runner.js


> gpp-website@1.1.0 test:unit:coverage
> npm run test:unit -- --coverage


> gpp-website@1.1.0 test:unit
> vitest --run --coverage


 RUN  v0.34.6 /Users/vandries/sm-workspace/skycity/work/sc-website
      Coverage enabled with v8
 */
let forthTime = 0;
testProcess.stdout.on('data', (data) => {
    if (forthTime < 5) {
        forthTime++;
        process.stdout.write(`\n`);
    }
    const key = data.toString().split(' ')[1];
    process.stdout.write(key ?? ''); // Write to console
    //        process.stdout.write(data); // Write to console
    outputStream.write(data); // Write to file
});

testProcess.stderr.on('data', (data) => {
    process.stderr.write(data); // Write to console
    outputStream.write(data); // Write to file
});

testProcess.on('close', (code) => {
    outputStream.end();

    const output = fs.readFileSync(outputFile, 'utf-8');
    const warningCount = (output.match(/Warning:/g) || []).length;
    const errorCount = (output.match(/Error:/g) || []).length;

    if (errorCount > 0) {
        console.error('\n\x1b[31m', `${errorCount} Error(s) found in test output! Naughty, naughty!`, '\x1b[0m');
    }

    if (warningCount > 0) {
        console.error('\n\x1b[31m', 'Warnings found in test output! Naughty, naughty!', '\x1b[0m');
    }

    if (errorCount > 0 || warningCount > 0) {
        process.exit(1);
    }

    if (code === 0) {
        console.log('\n\x1b[32m', `No warnings, no errors in background. Tests passed. Good job!`, '\x1b[0m');
    } else if (code === 1) {
        console.log('\n\x1b[32m', `No warnings, no errors in background. `, '\x1b[0m');
        console.error('\n\x1b[31m', 'Nonetheless tests failed. You can do better!', '\x1b[0m');
    }

    process.exit(code);
});
