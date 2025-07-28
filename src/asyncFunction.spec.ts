import { noPromise, okPromise } from "./asyncFunction";

test("okPromise 테스트", () => {
  const okSpy = jest.fn(okPromise);
  return expect(okSpy()).resolves.toBe("no"); // resolves 사용할 경우 return을 붙여야함
});

test("noPromise 테스트", () => {
  const noSpy = jest.fn(noPromise);
  return noSpy().catch((result) => {
    expect(result).toBe("no"); // 아니면 then을 붙여서 사용하면 됨
  });
});
