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
    sRow: number,
    eRow: number
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

    if (!env['S_ROW']) {
        throw createConfigError('S_ROW')
    }

    if (!env['E_ROW']) {
        throw createConfigError('E_ROW')
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
        sRow: env.S_ROW,
        eRow: env.E_ROW,
        nFolders: env.N_FOLDERS,
        folderPrefix: env.FOLDER_PREFIX
    })
}

export default getConfig()