import fs from 'fs';
import path from 'path';

export function loadData<T>(filePath: string): T {
    const resolvedPath = path.resolve(filePath);
    const fileContents = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(fileContents) as T;
}
