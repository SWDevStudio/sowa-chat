import { runMain } from "./lib/args.mjs";
import { analysisInterval, analysisStatus } from "./lib/metrics.mjs";
import { mainRoot } from "./lib/paths.mjs";

function main() {
  const { number, merged, due } = analysisStatus(mainRoot());
  if (due) {
    console.log(`due ${number}`);
    return 0;
  }
  console.log(`wait ${merged}/${analysisInterval}`);
  return 0;
}

runMain(main);
