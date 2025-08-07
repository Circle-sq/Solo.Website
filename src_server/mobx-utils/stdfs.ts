import * as fs from 'fs';

export const readFile = async (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err: unknown, data: string) => {
            if (err) {
                reject(err);

                return;
            }

            resolve(data);
        });
    });
};

export const getListFromDirRaw = async (pathIn: string): Promise<Array<string>> => {
    return new Promise((resolve, reject) => {
        fs.readdir(pathIn, (err: unknown, files: Array<string>) => {
            if (err !== null) {
                reject(err);

                return;
            }

            resolve(files);
        });
    });
};

export const getListFromDir = async (pathIn: string): Promise<Array<string>> => {
    const out = await getListFromDirRaw(pathIn);

    return out.map((file) => `${pathIn}/${file}`);
};

export const lstat = async (path: string): Promise<'file' | 'dir'> => {
    return new Promise((resolve, reject) => {
        fs.lstat(path, (err, result) => {
            if (err !== null) {
                reject(err);

                return;
            }

            if (result.isDirectory()) {
                resolve('dir');

                return;
            }

            if (result.isFile()) {
                resolve('file');

                return;
            }

            reject(new Error(`Expected file or directory in ${path}`));
        });
    });
};
