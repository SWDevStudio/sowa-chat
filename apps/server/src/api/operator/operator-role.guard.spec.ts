import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/internal";
import type { OperatorRole } from "@sowa-chat/protocol";
import type { MockInstance } from "vitest";
import { ApiException } from "../../infra/http/api-exception.js";
import { RequestContext } from "../../infra/request-context/request-context.js";
import { OperatorRoleGuard } from "./operator-role.guard.js";
import { SupervisorOnly, supervisorOnlyMetadataKey } from "./supervisor-only.decorator.js";

class ProbeController {
  any(): void {}

  @SupervisorOnly()
  supervisorOnly(): void {}
}

@SupervisorOnly()
class SupervisorOnlyController {
  first(): void {}

  second(): void {}
}

interface GuardFixture {
  guard: OperatorRoleGuard;
  operator: MockInstance<RequestContext["operator"]>;
}

function createRequestContext(): RequestContext {
  return Object.create(RequestContext.prototype);
}

function createGuard(role: OperatorRole): GuardFixture {
  const requestContext = createRequestContext();
  const operator = vi
    .spyOn(requestContext, "operator")
    .mockReturnValue({ operatorId: "operator-1", role });
  return { guard: new OperatorRoleGuard(new Reflector(), requestContext), operator };
}

function contextOf(controller: new () => object, handler: () => void): ExecutionContextHost {
  return new ExecutionContextHost([], controller, handler);
}

function thrownBy(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
    return error;
  }
  return undefined;
}

describe("supervisorOnlyMetadataKey", () => {
  it("равен supervisorOnly", () => {
    expect(supervisorOnlyMetadataKey).toBe("supervisorOnly");
  });

  it("SupervisorOnly записывает true под этим ключом", () => {
    const reflector = new Reflector();

    expect(reflector.get(supervisorOnlyMetadataKey, ProbeController.prototype.supervisorOnly)).toBe(
      true,
    );
    expect(reflector.get(supervisorOnlyMetadataKey, ProbeController.prototype.any)).toBeUndefined();
  });
});

describe("OperatorRoleGuard", () => {
  describe("метод без SupervisorOnly", () => {
    it.each<OperatorRole>(["operator", "supervisor"])("пропускает роль %s", (role) => {
      const { guard } = createGuard(role);

      expect(guard.canActivate(contextOf(ProbeController, ProbeController.prototype.any))).toBe(
        true,
      );
    });

    it("не читает оператора из контекста запроса", () => {
      const { guard, operator } = createGuard("operator");

      guard.canActivate(contextOf(ProbeController, ProbeController.prototype.any));

      expect(operator).not.toHaveBeenCalled();
    });
  });

  describe("метод с SupervisorOnly", () => {
    const supervisorOnlyContext = () =>
      contextOf(ProbeController, ProbeController.prototype.supervisorOnly);

    it("пропускает supervisor", () => {
      const { guard } = createGuard("supervisor");

      expect(guard.canActivate(supervisorOnlyContext())).toBe(true);
    });

    it("отклоняет operator через ApiException со статусом 403", () => {
      const { guard } = createGuard("operator");

      const error = thrownBy(() => guard.canActivate(supervisorOnlyContext()));

      expect(error).toBeInstanceOf(ApiException);
      expect((error as ApiException).getStatus()).toBe(403);
    });

    it("в ошибке код forbidden и текст Supervisor role is required", () => {
      const { guard } = createGuard("operator");

      const error = thrownBy(() => guard.canActivate(supervisorOnlyContext()));

      expect((error as ApiException).code).toBe("forbidden");
      expect((error as ApiException).message).toBe("Supervisor role is required");
    });

    it("читает оператора из контекста запроса", () => {
      const { guard, operator } = createGuard("supervisor");

      guard.canActivate(supervisorOnlyContext());

      expect(operator).toHaveBeenCalledTimes(1);
    });

    it("без оператора в контексте пробрасывает ошибку контекста, а не 403", () => {
      const requestContext = createRequestContext();
      vi.spyOn(requestContext, "operator").mockImplementation(() => {
        throw new Error("Request operator is not set");
      });
      const guard = new OperatorRoleGuard(new Reflector(), requestContext);

      const error = thrownBy(() => guard.canActivate(supervisorOnlyContext()));

      expect(error).toBeInstanceOf(Error);
      expect(error).not.toBeInstanceOf(ApiException);
    });
  });

  describe("SupervisorOnly на классе", () => {
    it.each([
      ["first", SupervisorOnlyController.prototype.first],
      ["second", SupervisorOnlyController.prototype.second],
    ])("действует на метод %s", (_name, handler) => {
      const operatorGuard = createGuard("operator").guard;
      const supervisorGuard = createGuard("supervisor").guard;
      const context = contextOf(SupervisorOnlyController, handler);

      expect(thrownBy(() => operatorGuard.canActivate(context))).toBeInstanceOf(ApiException);
      expect(supervisorGuard.canActivate(context)).toBe(true);
    });
  });
});
