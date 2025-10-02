import { readdir, renameSync } from "fs";
import { extname, join, basename } from "path";
import { execSync } from "child_process";

let SOURCE_DIR = "src-icons-svg/icons";
let OUTPUT_DIR = "src/icons";

const args = process.argv.slice(2);
const [source, output] = args;

if (source) {
    SOURCE_DIR = source;
}

if(output) {
    OUTPUT_DIR = output;
}

const toPascalCase = (name) => name.replace(/(^\w|[-_][a-z])/g, (char) => {
    return char.toUpperCase();
});

readdir(SOURCE_DIR, (err, icons) => {
    if (err) {
        console.error("Error reading source directory:", err);
        return;
    }

    icons.forEach((icon) => {
        if (extname(icon) === ".svg") {
            console.log(`Processing icon: ${icon}`);
            const iconPath = join(SOURCE_DIR, icon);

            execSync(`npx svgr --typescript --jsx-runtime automatic --icon --no-index --template ./tools/template.js --out-dir ${OUTPUT_DIR} --ignore-existing ${iconPath}`);

            const fileName = toPascalCase(basename(icon, ".svg")).replace(/[_-]/g, '');
            renameSync(join(OUTPUT_DIR, fileName + '.tsx'), join(OUTPUT_DIR, `${fileName}Icon.tsx`));
        }
    });
});
