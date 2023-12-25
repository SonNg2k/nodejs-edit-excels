import * as process from 'process'
import {CustomEnvVars} from './global'

class ConfigError extends Error {
    readonly name = 'ConfigError'
}

function createMissingConfigError(key: keyof CustomEnvVars): ConfigError {
    return new ConfigError(`❌ Missing environment variable ${key} in process.env`)
}

function createWrongConfigTypeError(key: keyof CustomEnvVars): ConfigError {
    return new ConfigError(`❌ The type of ${key} environment variable is incorrect`)
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
        throw createMissingConfigError('BOOK_FILE_NAME')
    }

    if (!env['SHEET_NAME']) {
        throw createMissingConfigError('SHEET_NAME')
    }

    if (!env['LINK_COL_ID']) {
        throw createMissingConfigError('LINK_COL_ID')
    }

    if (!env['S_ROW_ID']) {
        throw createMissingConfigError('S_ROW_ID')
    }

    if (!env['E_ROW_ID']) {
        throw createMissingConfigError('E_ROW_ID')
    }

    if (!env['N_FOLDERS']) {
        throw createMissingConfigError('N_FOLDERS')
    }

    if (!env['FOLDER_PREFIX']) {
        throw createMissingConfigError('FOLDER_PREFIX')
    }

    const sRowId = parseInt(env.S_ROW_ID, 10)
    const eRowId = parseInt(env.E_ROW_ID, 10)
    const nFolders = parseInt(env.N_FOLDERS, 10)

    if (isNaN(sRowId)) {
        throw createWrongConfigTypeError('S_ROW_ID')
    }
    if (isNaN(eRowId)) {
        throw createWrongConfigTypeError('E_ROW_ID')
    }
    if (isNaN(nFolders)) {
        throw createWrongConfigTypeError('N_FOLDERS')
    }

    return ({
        bookFileName: env.BOOK_FILE_NAME,
        sheetName: env.SHEET_NAME,
        linkColId: env.LINK_COL_ID,
        sRowId,
        eRowId,
        nFolders,
        folderPrefix: env.FOLDER_PREFIX
    })
}

export default getConfig()