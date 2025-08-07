import * as fs from 'fs';
import { getTranslationsFromDirOrFile } from './langs/getTranslations';
import { ReportSortedMap } from './langs/ReportSortedMap';

const allowDuplicate: Set<string> = new Set();

const main = async (src_path: string): Promise<void> => {
    const list = await getTranslationsFromDirOrFile(src_path, src_path);

    const result = new ReportSortedMap(list, allowDuplicate);

    const dirPath = `${__dirname}/../build`;
    const outCsvFile = `${dirPath}/lang.csv`;

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    result.show();
    result.saveAsCsvToFile(outCsvFile);
};

main('./src').catch((err) => {
    console.error(err);
    process.exit(1);
});
