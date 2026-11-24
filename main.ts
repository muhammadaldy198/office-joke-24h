// One-Line Office Joke: 24-Hour Sprint — entry program.
// Writes exactly one line of text to /output/entry.txt.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const LINE =
  "The office clock is ten minutes fast, which makes it the only thing in this building that's ever ahead of schedule.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function assertOneLine(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (/[\u00a0\u200b\ufeff]/.test(text)) {
    throw new Error("entry must not contain invisible characters");
  }
}

assertOneLine(LINE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");
chmodSync(OUT_FILE, 0o644);
// Read back and verify the written file is byte-identical to LINE.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the entry line");
}
