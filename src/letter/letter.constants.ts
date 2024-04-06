import { globals } from '../global.constants';
import fs from 'fs';
import path from 'path';
import type { Letters, LetterModule } from './letter.types';

export var LETTERS: Letters;

async function findLetterFiles(directory: string) {
  const letterFiles = [];
  try {
    const files = await fs.promises.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.promises.stat(filePath);

      if (stats.isDirectory()) {
        const nestedFiles = await findLetterFiles(filePath);
        letterFiles.push(...nestedFiles);
      } else if (file.includes('.letter.')) {
        letterFiles.push(filePath);
      }
    }
  } catch (error) {
    console.error('💀 Error reading directory:', error);
  }
  return letterFiles;
}

async function importLetterModules(letterFiles: string[]) {
  const letterModules = await Promise.all(
    letterFiles.map(async (file) => {
      const module: LetterModule = await import(file);
      return module;
    })
  );
  return letterModules;
}

export async function indexLetters() {
  const localEnvs = [globals.ENVS.LOCAL, globals.ENVS.TEST] as string[];
  const srcDirName = localEnvs.includes(process.env.NODE_ENV) ? 'src' : 'dist';
  const srcDir = path.resolve(process.cwd(), srcDirName);
  const letterFiles = await findLetterFiles(srcDir);
  const letterModules = await importLetterModules(letterFiles);
  const letters = letterModules.reduce((acc: Letters, letterModule) => {
    const letter = {
      Component: letterModule[letterModule.LETTER_NAME],
      requiredProps: letterModule.requiredProps,
    };
    acc[letterModule.LETTER_NAME] = letter;
    return acc;
  }, {});
  LETTERS = letters;
}
