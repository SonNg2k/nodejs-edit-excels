import {CellHyperlinkValue, Workbook} from "exceljs";

import driveFolders from "./json/driveFolders.json";

interface MigrateToOneDriveParams {
  bookFileName: string;
  sheetName: string;
  linkColId: string;
  sRow: number;
  eRow: number;
  folderWebUrls: Array<string>;
}

async function migrateToOneDrive(args: MigrateToOneDriveParams) {
  const {bookFileName, sheetName, linkColId, sRow, eRow, folderWebUrls} = args
  const workbook = new Workbook();
  await workbook.xlsx.readFile(`../excels/${bookFileName}`);
  const worksheet = workbook.getWorksheet(sheetName);

  for (let rowNth = sRow; rowNth <= eRow; rowNth++) {
    const cell = worksheet.getCell(linkColId + rowNth);
    cell.value = {
      text: "Link " + (rowNth - sRow + 1),
      hyperlink: folderWebUrls[rowNth - sRow],
    } as CellHyperlinkValue
  }
  await workbook.xlsx.writeFile(`../excels/${bookFileName}`);
  console.log(`Migration for ${bookFileName} is complete ✅`);
}

console.log('Number of folders on Google Drive: ', driveFolders.files.length)

// const folderListSortedByName = driveFolders.files
// .sort(
//   (a, b) =>
//     extractNumberFromFilename(a.name) - extractNumberFromFilename(b.name)
// )
// .map((folderInfo) => folderInfo.webViewLink);
// migrateToOneDrive({
//   bookFileName: "2022 — Quản lí khách hàng.xlsx",
//   sheetName: "2022",
//   linkColId: "K",
//   sRow: 3,
//   eRow: 802,
//   folderWebUrls: folderListSortedByName,
// }).then(_ => null);

/// Only used for filenames that end with the substring '(number)'
function extractNumberFromFilename(filename: string): number {
  const startIdx = filename.indexOf("(") + 1;
  const endIdx = filename.indexOf(")");
  const parsed = parseInt(filename.substring(startIdx, endIdx), 10);
  if (isNaN(parsed)) return -1;
  return parsed;
}

// import { readFile, utils, writeFile } from "xlsx";
// const workbook2020 = readFile("../excels/2020-customers.xlsx", {
//   cellStyles: true,
// });
// const worksheet2020 = workbook2020.Sheets["2020"];

// utils.sheet_add_aoa(worksheet2020, [["test"]], { origin: "M3" });
// writeFile(workbook2020, "../excels/2020-customers.xlsx", { cellStyles: true });

// console.log(JSON.stringify(workbook2020.SheetNames, null, 2));
