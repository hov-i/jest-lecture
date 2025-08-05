import { obj } from "./mockFunction";

let spyFn;
test("obj.minus 함수가 1번 호출되었다", () => {
  spyFn = jest.spyOn(obj, "minus"); // 변형시키면 mock함수가 됨
  const result = obj.minus(1, 2); // 이렇게 사용 가능
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
  spyFn.mockClear(); // Times, With 초기화
  spyFn.mockReset(); // mockClear + mockImplementation(() => {})
  spyFn.mockRestore(); // 아예 전부 없애버림
});

test("obj.minus에 스파이도 심고 실행도 안되게", () => {
  spyFn = jest.spyOn(obj, "minus").mockImplementation(); // 변형시키면 mock함수가 됨
  const result = obj.minus(1, 2); // 이렇게 사용 가능
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(undefined);
});

// 만약 함수가 데이터베이스에 요청을 보내는 함수라면? 하지만 실행되는지만 테스트 하고 싶다면? 그럼 함수를 바꿔서 실행이 되는지만 테스트하자!
test("obj.minus에 스파이도 심고 리턴 값이 다르게 나오도록", () => {
  spyFn = jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b); // 변형시키면 mock함수가 됨, 이러면 obj.minus함수는 더하는 함수로 변경됨
  const result = obj.minus(1, 2); // 이렇게 사용 가능
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(3);
});
// mock을 어떻게 활용하냐, 실제 유저 데이터를 가져오는 로직에서 다음 로직에 유저 데이터가 필요하다면? mock을 통해 임시 유저 데이터를 넣은 후 테스트가 가능하다! 실제로 api는 가지 않는다.

test("obj.minus에 스파이도 심고 리턴 값이 다르게 나오도록", () => {
  spyFn = jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b) // 바뀐 mock을 한번만 적용
    .mockImplementationOnce(() => 5) // 바뀐 mock을 한번만 적용
    .mockImplementation(() => 3);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(3);
});

test("obj.minus에 스파이도 심고 리턴 값이 다르게 나오도록(mockReturnValue, mockReturnValueOnce)", () => {
  spyFn = jest
    .spyOn(obj, "minus")
    .mockReturnValueOnce(5) // 함수를 교체하는게 아닌 값만 바꾸고 싶을때 한번만 실행됨
    .mockReturnValueOnce(3) // 함수를 교체하는게 아닌 값만 바꾸고 싶을때 한번만 실행됨
    .mockReturnValue(8); // 함수를 교체하는게 아닌 값만 바꾸고 싶을때
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(5);
  expect(result2).toBe(3);
  expect(result3).toBe(8);
});

beforeAll(() => {
  console.log("이 파일의 준비사항 실행");
}); //어떤 한 파일의 모든 테스트를 수행하기전에

beforeEach(() => {
  console.log("각 테스트 전에 실행됨");
}); // 매번 실행 전에

afterEach(() => {
  console.log("각 테스트 후에 실행됨");
  spyFn.mockRestore();
  jest.restoreAllMocks(); // jest mockClear + mockImplementation(() => {})
  jest.clearAllMocks() //jest 한방 Times, With 초기화
  jest.restoreAllMocks() // jest 한방 없애버림 
}); // 매번 실행 후에

afterAll(() => {
  console.log("모든 테스트 후에 실행");
}); //어떤 한 파일의 모든 테스트를 수행하고 난 후에
