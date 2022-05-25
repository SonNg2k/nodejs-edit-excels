import { CellHyperlinkValue, Workbook } from "exceljs";
// import driveFolders from "./json/driveFolders.json";

async function migrateToOneDrive(args: {
  bookName: string;
  sheetName: string;
  col: string;
  sRow: number;
  eRow: number;
  folderWebUrls: Array<string>;
}) {
  const workbook = new Workbook();
  await workbook.xlsx.readFile(`../excels/${args.bookName}`);
  const worksheet = workbook.getWorksheet(args.sheetName);

  for (let rowNth = args.sRow; rowNth <= args.eRow; rowNth++) {
    const cell = worksheet.getCell(args.col + rowNth);
    const newCellValue: CellHyperlinkValue = {
      text: "Link " + (rowNth - args.sRow + 1),
      hyperlink: args.folderWebUrls[rowNth - args.sRow],
    };
    cell.value = newCellValue;
  }
  await workbook.xlsx.writeFile(`../excels/${args.bookName}`);
  console.log(`Migration for ${args.bookName} is complete ✅`);
}

// const folderListSortedByName = driveFolders.files
//   .sort(
//     (a, b) =>
//       extractNumberFromFilename(a.name) - extractNumberFromFilename(b.name)
//   )
//   .map((folderInfo) => folderInfo.webViewLink);
// migrateToOneDrive({
//   bookName: "2022 — Quản lí khách hàng.xlsx",
//   sheetName: "2022",
//   col: "K",
//   sRow: 3,
//   eRow: 498,
//   folderWebUrls: folderListSortedByName,
// });

/// Only used for filenames that contains '(number)'
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
