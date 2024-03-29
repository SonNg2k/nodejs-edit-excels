import {mkdir} from 'fs/promises'
import config from './config'

const {nFolders, folderPrefix} = config

run(nFolders).then(_ => null)

async function run(nFolders: number) {
    for (let nth = 1; nth <= nFolders; nth++) {
        const id = (1000 + nth).toString(10).substring(1)
        const prefixDir = `../generated_folders/${folderPrefix} (${id})`
        await mkdir(prefixDir)
        await Promise.all([mkdir(`${prefixDir}/Trước`), mkdir(`${prefixDir}/Sau`), mkdir(`${prefixDir}/Tái khám`)])
    }
    console.log(`${nFolders} folders are created successfully ✅`)
}
