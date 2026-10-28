#!/usr/bin/env node
import { runCliCommand } from "./cli/cli-runner.js";

process.exitCode = await runCliCommand(process.argv.slice(2));
