import { CellHyperlinkValue, Workbook } from "exceljs";
import folders2020 from "./cloud-storage-folders/2020-folders.json";

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
  console.log("Migration Complete ✅");
}

migrateToOneDrive({
  bookName: "2020 Customers.xlsx",
  sheetName: "2020",
  col: "M",
  sRow: 3,
  eRow: 108,
  folderWebUrls: folders2020.files.map((folderInfo) => folderInfo.webViewLink),
});

// import { readFile, utils, writeFile } from "xlsx";
// const workbook2020 = readFile("../excels/2020-customers.xlsx", {
//   cellStyles: true,
// });
// const worksheet2020 = workbook2020.Sheets["2020"];

// utils.sheet_add_aoa(worksheet2020, [["test"]], { origin: "M3" });
// writeFile(workbook2020, "../excels/2020-customers.xlsx", { cellStyles: true });

// console.log(JSON.stringify(workbook2020.SheetNames, null, 2));
