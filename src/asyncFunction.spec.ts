import * as fns from "./asyncFunction";

test("okPromise 테스트1", () => {
  const okSpy = jest.fn(fns.okPromise);
  return expect(okSpy()).resolves.toBe("ok"); // resolves 사용할 경우 return을 붙여야함
});

test("okPromise 테스트2", () => {
  const okSpy = jest.fn(fns.okPromise);
  return okSpy().then((result) => {
    expect(result).toBe("ok"); // 아니면 then을 붙여서 사용하면 됨
  });
});

test("okPromise 테스트3", async () => {
  // async await 가능
  const okSpy = jest.fn(fns.okPromise);
  const result = await okSpy();
  expect(result).toBe("ok");
});

test("noPromise 테스트1", () => {
  const noSpy = jest.fn(fns.noPromise);
  return expect(noSpy()).rejects.toBe("no"); // reject 사용할 경우 return을 붙여야함
});

test("noPromise 테스트2", () => {
  const noSpy = jest.fn(fns.noPromise);
  return noSpy().catch((result) => {
    expect(result).toBe("no"); // 아니면 catch 붙여서 사용하면 됨
  });
});

test("noPromise 테스트3", async () => {
  // async await 가능, reject이니 try/catch 문
  const noSpy = jest.fn(fns.noPromise);
  try {
    const result = await noSpy();
  } catch (err) {
    expect(err).toBe("no");
  }
});

test("okAsync 테스트1", () => {
  const okSpy = jest.fn(fns.okAsync);
  return expect(okSpy()).resolves.toBe("ok"); // resolves 사용할 경우 return을 붙여야함
});

test("okPromise 테스트 (스파이심기) + 모킹", () => {
  jest.spyOn(fns, "okPromise").mockResolvedValue("ok"); // resolved를 Return하는 mockResolvedValue, once 가능
  return expect(fns.okPromise).resolves.toBe("ok"); // resolves 사용할 경우 return을 붙여야함
});

test("noPromise 테스트 (스파이심기) + 모킹", () => {
  jest.spyOn(fns, "noPromise").mockRejectedValue("no"); // reject을 Return하는 mockRejectedValue, once 가능
  return expect(fns.noPromise).rejects.toBe("no"); // reject 사용할 경우 return을 붙여야함
});
