import { mkdir } from "fs/promises";

async function run() {
  for (let nth = 1; nth <= 400; nth++) {
    const id = (1000 + nth).toString(10).substring(1);
    const prefixDir = `../2022 Photos/D22HN${id}`;
    await mkdir(prefixDir);
    await Promise.all([mkdir(`${prefixDir}/Trước`), mkdir(`${prefixDir}/Sau`)]);
  }
}
run();
