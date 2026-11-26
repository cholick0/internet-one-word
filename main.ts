import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Gate from competition.yaml: /output/entry.txt is UTF-8 text of
// 1 to 30 characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 30;

// The internet in one word: doomscroll.
// One word, funny on its own, true about the whole internet,
// surprising next to the obvious picks, and it lands in one beat.
const ENTRY = "doomscroll";

function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.trim().split(/\s+/).length !== 1) {
    throw new Error("entry must be exactly one word");
  }
}

validateEntry(ENTRY);
const bytes = Buffer.from(ENTRY, "utf8");
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", bytes);
// Read it back and verify byte-for-byte.
const roundTrip = readFileSync("/output/entry.txt");
if (!Buffer.from(roundTrip).equals(bytes)) {
  throw new Error("read-back mismatch: entry.txt differs from the entry");
}
console.log(`Wrote /output/entry.txt (${[...ENTRY].length} chars, ${bytes.length} bytes, verified byte-for-byte): ${ENTRY}`);
