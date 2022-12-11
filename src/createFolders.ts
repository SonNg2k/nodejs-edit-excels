import {mkdir} from "fs/promises";

interface RunParams {
  sNth: number;
  eNth: number
}

async function run(args: RunParams) {
  const {sNth, eNth} = args
  for (let nth = sNth; nth <= eNth; nth++) {
    const id = (1000 + nth).toString(10).substring(1);
    // Add 'HN' and add nothing for 'HCM"
    const prefixDir = `../generated_folders/BSDHN2023 (${id})`;
    await mkdir(prefixDir);
    await Promise.all([mkdir(`${prefixDir}/Trước`), mkdir(`${prefixDir}/Sau`)]);
  }
  console.log(`✅ Done created ${eNth - sNth + 1} folders`)
}

run({sNth: 1, eNth: 200}).then(_ => null);
