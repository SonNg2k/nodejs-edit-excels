import * as console from 'console'
import {CellHyperlinkValue, Workbook} from 'exceljs'
import config, {Config} from './config'

import driveFolders from './json/driveFolders.json'

console.log('Number of folders on Google Drive: ', driveFolders.files.length)

const folderListSortedByName = driveFolders.files
.toSorted(
    (a, b) =>
        extractNumberFromFilename(a.name) - extractNumberFromFilename(b.name)
)
.map((folderInfo) => folderInfo.webViewLink)

const {bookFileName, sheetName, linkColId, sRowId, eRowId} = config
editExcel({
    folderWebUrls: folderListSortedByName,
    bookFileName,
    sheetName,
    linkColId,
    sRowId,
    eRowId
}).then(_ => null)

class FileError extends Error {
    readonly name = 'FileError'
}

type EditExcelFnParams = Pick<Config, 'bookFileName' | 'sheetName' | 'linkColId' | 'sRowId' | 'eRowId'>
    &
    {
        folderWebUrls: Array<string>
    }

/**
 * @throws FileError
 * */
async function editExcel(args: EditExcelFnParams) {
    const {bookFileName, sheetName, linkColId, sRowId, eRowId, folderWebUrls} = args
    const filePath = `../excels/${bookFileName}`
    const workbook = new Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(sheetName)

    if (!worksheet) {
        throw new FileError(`❌ The Excel worksheet is not found`)
    }

    for (let rowNth = sRowId; rowNth <= eRowId; rowNth++) {
        const cell = worksheet.getCell(linkColId + rowNth)
        cell.value = {
            text: 'Link ' + (rowNth - sRowId + 1),
            hyperlink: folderWebUrls[rowNth - sRowId]
        } as CellHyperlinkValue
    }
    await workbook.xlsx.writeFile(`../excels/${bookFileName}`)
    console.log(`"${bookFileName}" is edited successfully ✅`)
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
