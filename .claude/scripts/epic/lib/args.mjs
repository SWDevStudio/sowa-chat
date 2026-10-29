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

export function parseOptions(usage, minPositional, repeatableOptions) {
  const args = process.argv.slice(2);
  const positional = [];
  const options = Object.fromEntries(repeatableOptions.map((name) => [name, []]));
  for (let index = 0; index < args.length; index++) {
    const name = args[index].replace(/^--/, "");
    if (args[index].startsWith("--") && name in options) {
      options[name].push(args[++index]);
    } else {
      positional.push(args[index]);
    }
  }
  if (positional.length < minPositional || Object.values(options).flat().includes(undefined)) {
    console.error(`Usage: ${usage}`);
    process.exit(64);
  }
  return { positional, options };
}
