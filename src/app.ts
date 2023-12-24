import config, {Config} from '@app/config'
import {CellHyperlinkValue, Workbook} from 'exceljs'

import driveFolders from './json/driveFolders.json'

import 'dotenv/config'

console.log('Number of folders on Google Drive: ', driveFolders.files.length)

const folderListSortedByName = driveFolders.files
.toSorted(
    (a, b) =>
        extractNumberFromFilename(a.name) - extractNumberFromFilename(b.name)
)
.map((folderInfo) => folderInfo.webViewLink)

const {bookFileName, sheetName, linkColId, sRow, eRow} = config
editExcel({
    folderWebUrls: folderListSortedByName,
    bookFileName,
    sheetName,
    linkColId,
    sRow,
    eRow
}).then(_ => null)

class FileError extends Error {
    readonly name = 'FileError'
}

type EditExcelFnParams = Config
    &
    {
        folderWebUrls: Array<string>
    }

/**
 * @throws FileError
 * */
async function editExcel(args: EditExcelFnParams) {
    const {bookFileName, sheetName, linkColId, sRow, eRow, folderWebUrls} = args
    const filePath = `../excels/${bookFileName}`
    const workbook = new Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(sheetName)

    if (!worksheet) {
        throw new FileError(`The Excel worksheet file ${filePath} is not found`)
    }

    for (let rowNth = sRow; rowNth <= eRow; rowNth++) {
        const cell = worksheet.getCell(linkColId + rowNth)
        cell.value = {
            text: 'Link ' + (rowNth - sRow + 1),
            hyperlink: folderWebUrls[rowNth - sRow]
        } as CellHyperlinkValue
    }
    await workbook.xlsx.writeFile(`../excels/${bookFileName}`)
    console.log(`Migration for ${bookFileName} is complete ✅`)
}

/**
 * Only used for filenames that include the substring '(<number>)'
 * @throws FileError
 * */
function extractNumberFromFilename(filename: string): number {
    const startIdx = filename.indexOf('(') + 1
    const endIdx = filename.indexOf(')')
    const parsed = parseInt(filename.substring(startIdx, endIdx), 10)
    if (isNaN(parsed)) {
        throw new FileError('File name is not valid, must contain the substring \'(<number>)\'')
    }
    return parsed
}
