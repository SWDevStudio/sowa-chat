import { emptyCell, formatDate, writeLine, writeTable } from "./cli-output.js";

function captureStdout(action: () => void): string {
  let captured = "";
  const spy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
    captured += String(chunk);
    return true;
  });
  try {
    action();
  } finally {
    spy.mockRestore();
  }
  return captured;
}

describe("cli-output", () => {
  describe("emptyCell", () => {
    it("равен дефису", () => {
      expect(emptyCell).toBe("-");
    });
  });

  describe("writeLine", () => {
    it("пишет текст в stdout с переводом строки", () => {
      expect(captureStdout(() => writeLine("hello"))).toBe("hello\n");
    });

    it("пишет пустую строку как одиночный перевод строки", () => {
      expect(captureStdout(() => writeLine(""))).toBe("\n");
    });

    it("не пишет ничего в stderr", () => {
      const spy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
      try {
        captureStdout(() => writeLine("hello"));

        expect(spy).not.toHaveBeenCalled();
      } finally {
        spy.mockRestore();
      }
    });
  });

  describe("writeTable", () => {
    it("выводит заголовок и строки, ячейки через табуляцию", () => {
      const output = captureStdout(() =>
        writeTable(
          ["name", "createdAt"],
          [
            ["main", "2026-01-01T00:00:00.000Z"],
            ["second", "-"],
          ],
        ),
      );

      expect(output).toBe("name\tcreatedAt\nmain\t2026-01-01T00:00:00.000Z\nsecond\t-\n");
    });

    it("без строк выводит только заголовок", () => {
      expect(captureStdout(() => writeTable(["name", "prefix"], []))).toBe("name\tprefix\n");
    });

    it("одна колонка не получает табуляции", () => {
      expect(captureStdout(() => writeTable(["name"], [["main"]]))).toBe("name\nmain\n");
    });
  });

  describe("formatDate", () => {
    it("null даёт emptyCell", () => {
      expect(formatDate(null)).toBe(emptyCell);
      expect(formatDate(null)).toBe("-");
    });

    it("дата даёт строку ISO 8601", () => {
      const date = new Date("2026-10-29T12:34:56.789Z");

      expect(formatDate(date)).toBe("2026-10-29T12:34:56.789Z");
    });
  });
});
