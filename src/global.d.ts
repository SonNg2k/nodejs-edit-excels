namespace NodeJS {
    /**
     * Note that it is intended that all env vars are casted to Strings by default in Node.js.
     * All env vars ARE strings, by definition.
     * */
    interface ProcessEnv extends CustomEnvVars {
    }
}

export interface CustomEnvVars {
    BOOK_FILE_NAME?: string;
    SHEET_NAME?: string;
    LINK_COL_ID?: string;
    S_ROW_ID?: string;
    E_ROW_ID?: string
    N_FOLDERS?: string
    FOLDER_PREFIX?: string
}