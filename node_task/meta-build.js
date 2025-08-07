'use strict';

const path = require('path');
const process = require('child_process');
const fs = require('fs');
const dateFns = require('date-fns');

// Get last commit
process.exec('git log -1 --pretty=format:"%H"', { cwd: __dirname }, function (err, lastCommit) {
    // Get API version
    const data = {
        name: 'gpp-website',
        buildTime: dateFns.format(new Date(), 'MMM d, yyyy h:mm:ss a'),
        lastCommit,
    };

    fs.writeFileSync(path.join(__dirname, '../build/meta-build.json'), JSON.stringify(data), 'utf8');
});
