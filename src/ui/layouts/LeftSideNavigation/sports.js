import General from '../../sports/General/General';

const x = {
    default: General,
};

// Add also switcher for test-specific sports
const y = {};

Object.keys(x)
    .filter((x) => x !== 'default')
    .forEach((id) => {
        y[`test${id}`] = x[id];
    });

export default { ...x, ...y };
