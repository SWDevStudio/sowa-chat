import { Inject, Injectable, Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ClsModule, ClsService } from "nestjs-cls";
import { RequestContext } from "./request-context.js";
import { RequestContextModule } from "./request-context.module.js";

const pause = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

describe("RequestContext", () => {
  let cls: ClsService;
  let context: RequestContext;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ClsModule.forRoot({ global: true }), RequestContextModule],
    }).compile();
    cls = moduleRef.get(ClsService);
    context = moduleRef.get(RequestContext);
  });

  it("projectId возвращает записанный проект", () => {
    cls.run(() => {
      context.setProjectId("p-1");

      expect(context.projectId()).toBe("p-1");
    });
  });

  it("setProjectId заменяет прежний проект", () => {
    cls.run(() => {
      context.setProjectId("p-1");
      context.setProjectId("p-2");

      expect(context.projectId()).toBe("p-2");
    });
  });

  it("operator возвращает записанного оператора", () => {
    cls.run(() => {
      const operator = { operatorId: "o-1", role: "supervisor" as const };
      context.setOperator(operator);

      expect(context.operator()).toEqual(operator);
    });
  });

  it("проект и оператор хранятся независимо", () => {
    cls.run(() => {
      context.setProjectId("p-1");

      expect(() => context.operator()).toThrow("Request operator is not set");

      context.setOperator({ operatorId: "o-1", role: "operator" });

      expect(context.projectId()).toBe("p-1");
      expect(context.operator()).toEqual({ operatorId: "o-1", role: "operator" });
    });
  });

  it("visitor возвращает записанного посетителя", () => {
    cls.run(() => {
      const visitor = { visitorId: "v-1" };
      context.setVisitor(visitor);

      expect(context.visitor()).toEqual(visitor);
    });
  });

  it("setVisitor заменяет прежнего посетителя", () => {
    cls.run(() => {
      context.setVisitor({ visitorId: "v-1" });
      context.setVisitor({ visitorId: "v-2" });

      expect(context.visitor()).toEqual({ visitorId: "v-2" });
    });
  });

  it("visitor без записи бросает Request visitor is not set", () => {
    cls.run(() => {
      expect(() => context.visitor()).toThrow(new Error("Request visitor is not set"));
    });
  });

  it("ошибка отсутствия посетителя — обычный Error, а не HttpException", () => {
    cls.run(() => {
      let thrown: unknown;
      try {
        context.visitor();
      } catch (error) {
        thrown = error;
      }

      expect((thrown as Error).constructor).toBe(Error);
    });
  });

  it("вне контекста visitor бросает, а не возвращает чужое значение", () => {
    expect(() => context.visitor()).toThrow("Request visitor is not set");
  });

  it("запись посетителя не задаёт проект и оператора", () => {
    cls.run(() => {
      context.setVisitor({ visitorId: "v-1" });

      expect(() => context.projectId()).toThrow("Request project is not set");
      expect(() => context.operator()).toThrow("Request operator is not set");
    });
  });

  it("запись проекта и оператора не задаёт посетителя", () => {
    cls.run(() => {
      context.setProjectId("p-1");
      context.setOperator({ operatorId: "o-1", role: "operator" });

      expect(() => context.visitor()).toThrow("Request visitor is not set");
    });
  });

  it("проект, оператор и посетитель хранятся вместе и не мешают друг другу", () => {
    cls.run(() => {
      context.setProjectId("p-1");
      context.setOperator({ operatorId: "o-1", role: "supervisor" });
      context.setVisitor({ visitorId: "v-1" });
      context.setVisitor({ visitorId: "v-2" });

      expect(context.projectId()).toBe("p-1");
      expect(context.operator()).toEqual({ operatorId: "o-1", role: "supervisor" });
      expect(context.visitor()).toEqual({ visitorId: "v-2" });
    });
  });

  it("посетитель не переживает контекст", () => {
    cls.run(() => {
      context.setVisitor({ visitorId: "v-1" });
    });

    cls.run(() => {
      expect(() => context.visitor()).toThrow("Request visitor is not set");
    });
  });

  it("параллельные контексты не видят посетителя друг друга", async () => {
    const request = async (visitorId: string, delays: number[]) =>
      cls.run(async () => {
        context.setVisitor({ visitorId });
        const seen: string[] = [];
        for (const delay of delays) {
          await pause(delay);
          seen.push(context.visitor().visitorId);
        }
        return seen;
      });

    const [first, second] = await Promise.all([
      request("v-1", [5, 15, 5]),
      request("v-2", [10, 5, 20]),
    ]);

    expect(first).toEqual(["v-1", "v-1", "v-1"]);
    expect(second).toEqual(["v-2", "v-2", "v-2"]);
  });

  it("посетитель в одном параллельном контексте не появляется в другом", async () => {
    const withVisitor = cls.run(async () => {
      context.setVisitor({ visitorId: "v-1" });
      await pause(15);
      return context.visitor();
    });
    const withoutVisitor = cls.run(async () => {
      await pause(5);
      expect(() => context.visitor()).toThrow("Request visitor is not set");
      await pause(20);
      expect(() => context.visitor()).toThrow("Request visitor is not set");
    });

    const [visitor] = await Promise.all([withVisitor, withoutVisitor]);

    expect(visitor).toEqual({ visitorId: "v-1" });
  });

  it("projectId без записи бросает Request project is not set", () => {
    cls.run(() => {
      expect(() => context.projectId()).toThrow(new Error("Request project is not set"));
    });
  });

  it("operator без записи бросает Request operator is not set", () => {
    cls.run(() => {
      expect(() => context.operator()).toThrow(new Error("Request operator is not set"));
    });
  });

  it("ошибка отсутствия значения — обычный Error, а не HttpException", () => {
    cls.run(() => {
      let thrown: unknown;
      try {
        context.projectId();
      } catch (error) {
        thrown = error;
      }

      expect(thrown).toBeInstanceOf(Error);
      expect((thrown as Error).constructor).toBe(Error);
    });
  });

  it("вне контекста projectId и operator бросают, а не возвращают чужое значение", () => {
    expect(() => context.projectId()).toThrow("Request project is not set");
    expect(() => context.operator()).toThrow("Request operator is not set");
  });

  it("значение не переживает контекст", () => {
    cls.run(() => {
      context.setProjectId("p-1");
    });

    cls.run(() => {
      expect(() => context.projectId()).toThrow("Request project is not set");
    });
  });

  it("параллельные контексты не видят проект и оператора друг друга", async () => {
    const request = async (projectId: string, operatorId: string, delays: number[]) =>
      cls.run(async () => {
        context.setProjectId(projectId);
        context.setOperator({ operatorId, role: "operator" });
        const seen: string[] = [];
        for (const delay of delays) {
          await pause(delay);
          seen.push(`${context.projectId()}:${context.operator().operatorId}`);
        }
        return seen;
      });

    const [first, second] = await Promise.all([
      request("p-1", "o-1", [5, 15, 5]),
      request("p-2", "o-2", [10, 5, 20]),
    ]);

    expect(first).toEqual(["p-1:o-1", "p-1:o-1", "p-1:o-1"]);
    expect(second).toEqual(["p-2:o-2", "p-2:o-2", "p-2:o-2"]);
  });
});

@Injectable()
class ContextConsumer {
  constructor(@Inject(RequestContext) readonly context: RequestContext) {}
}

@Module({ providers: [ContextConsumer], exports: [ContextConsumer] })
class ConsumerModule {}

describe("RequestContextModule", () => {
  it("глобальный: модуль без импорта получает RequestContext", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ClsModule.forRoot({ global: true }), RequestContextModule, ConsumerModule],
    }).compile();
    const cls = moduleRef.get(ClsService);
    const consumer = moduleRef.get(ContextConsumer);

    cls.run(() => {
      consumer.context.setProjectId("p-9");

      expect(moduleRef.get(RequestContext).projectId()).toBe("p-9");
    });
  });

  it("RequestContext один на приложение", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ClsModule.forRoot({ global: true }), RequestContextModule, ConsumerModule],
    }).compile();

    expect(moduleRef.get(ContextConsumer).context).toBe(moduleRef.get(RequestContext));
  });
});
