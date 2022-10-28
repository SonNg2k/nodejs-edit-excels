import {mkdir} from "fs/promises";

interface RunParams {
  sNth: number;
  eNth: number
}

async function run(args: RunParams) {
  const {sNth, eNth} = args
  for (let nth = sNth; nth <= eNth; nth++) {
    const id = (1000 + nth).toString(10).substring(1);
    const prefixDir = `../2022 Photos/D22 (${id})`;
    await mkdir(prefixDir);
    await Promise.all([mkdir(`${prefixDir}/Trước`), mkdir(`${prefixDir}/Sau`)]);
  }
}

run({sNth: 497, eNth: 600}).then(_ => null);
