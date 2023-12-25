import * as process from 'process'

class ConfigError extends Error {
    readonly name = 'ConfigError'
}

function createConfigError(key: string): ConfigError {
    return new ConfigError(`❌ Missing environment variable ${key} in process.env`)
}

export interface Config {
    bookFileName: string,
    sheetName: string,
    linkColId: string,
    sRowId: number,
    eRowId: number
    nFolders: number
    folderPrefix: string
}

function getConfig(): Config {
    const env = process.env

    if (!env['BOOK_FILE_NAME']) {
        throw createConfigError('BOOK_FILE_NAME')
    }

    if (!env['SHEET_NAME']) {
        throw createConfigError('SHEET_NAME')
    }

    if (!env['LINK_COL_ID']) {
        throw createConfigError('LINK_COL_ID')
    }

    if (!env['S_ROW_ID']) {
        throw createConfigError('S_ROW_ID')
    }

    if (!env['E_ROW_ID']) {
        throw createConfigError('E_ROW_ID')
    }

    if (!env['N_FOLDERS']) {
        throw createConfigError('N_FOLDERS')
    }

    if (!env['FOLDER_PREFIX']) {
        throw createConfigError('FOLDER_PREFIX')
    }

    return ({
        bookFileName: env.BOOK_FILE_NAME,
        sheetName: env.SHEET_NAME,
        linkColId: env.LINK_COL_ID,
        sRowId: env.S_ROW_ID,
        eRowId: env.E_ROW_ID,
        nFolders: env.N_FOLDERS,
        folderPrefix: env.FOLDER_PREFIX
    })
}

export default getConfig()