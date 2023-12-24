import * as process from 'process'

export interface Config {
    bookFileName: string,
    sheetName: string,
    linkColId: string,
    sRow: number,
    eRow: number
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

    return ({
        bookFileName: env.BOOK_FILE_NAME,
        sheetName: env.SHEET_NAME,
        linkColId: env.LINK_COL_ID,
        sRow: env.S_ROW,
        eRow: env.E_ROW
    })
}

export default getConfig()

class ConfigError extends Error {
    readonly name = 'ConfigError'
}

function createConfigError(key: string): ConfigError {
    return new ConfigError(`Missing environment variable ${key} in process.env`)
}