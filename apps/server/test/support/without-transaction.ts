import { TransactionHost } from "@nestjs-cls/transactional";

export function runWithoutTransaction(): void {
  vi.spyOn(TransactionHost, "getInstance").mockReturnValue({
    withTransaction: (...args: unknown[]) => {
      const run = args.at(-1) as () => Promise<unknown>;
      return run();
    },
  } as unknown as TransactionHost);
}
