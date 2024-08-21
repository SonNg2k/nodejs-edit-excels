import { mkdir } from "fs/promises";
import config from "./config";

const { sFolderId, nFolders, folderPrefix, bookFileName } = config;

run(nFolders).then((_) => null);

async function run(nFolders: number) {
  for (let nth = sFolderId; nth <= sFolderId + nFolders - 1; nth++) {
    const id = (1000 + nth).toString(10).substring(1);
    const prefixDir = `../generated_folders/${folderPrefix}_${id}`;
    await mkdir(prefixDir);
    await Promise.all([
      mkdir(`${prefixDir}/Trước`),
      mkdir(`${prefixDir}/Sau`),
      ...(!bookFileName.toLowerCase().includes("spa")
        ? [mkdir(`${prefixDir}/Tái khám`)]
        : []),
    ]);
  }
  console.log(`${nFolders} folders are created successfully ✅`);
}
