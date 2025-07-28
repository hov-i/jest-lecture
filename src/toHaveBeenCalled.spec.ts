import { sum, obj } from "./toHaveBeenCalled";

test("sum 함수가 호출되었다.", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalled();
});

test("sum 함수가 1번 호출되었다", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledTimes(1);
});

test("sum 함수가 1,2와 함께 호출되었다", () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2);
  expect(sumSpy).toHaveBeenCalledWith(1, 2);
});

test("obj.minus 함수가 1번 호출되었다", () => {
  const minusSpy = jest.fn(obj.minus);
  minusSpy(1, 2);
  expect(minusSpy).toHaveBeenCalledTimes(1);
});
// 이렇게 하면 spy의 객체를 그냥 하나 더 만들어서 사용하는 것, obj.minus가 변형되지 않음

test("obj.minus 함수가 1번 호출되었다", () => {
  jest.spyOn(obj, "minus"); // 변형시키면 mock함수가 됨
  const result = obj.minus(1, 2); // 이렇게 사용 가능
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});
// 이렇게 하면 안의 메소드에 spy를 심어서 작동시키는 것, obj.minus가 변형되는 것임
