export function readArgs(usage, minCount) {
  const args = process.argv.slice(2);
  if (args.length < minCount) {
    console.error(`Usage: ${usage}`);
    process.exit(64);
  }
  return args;
}

export function runMain(main) {
  try {
    const exitCode = main();
    process.exit(exitCode ?? 0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
