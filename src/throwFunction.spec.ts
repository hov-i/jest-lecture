import { CustomError, customError, error } from "./throwFunction";

test("error가 잘 난다.", () => {
  expect(error()).toThrow(Error); // error()에서 에러가 나서 그냥 toThrow가 실행이 안됨
});

test("error가 잘 난다.", () => {
  expect(() => error()).toThrow(Error); // 그래서 함수로 한번 더 감싸줘야함
  expect(() => customError()).toThrow(CustomError);
});

test("error가 잘 난다. (try/catch)", () => {
  try {
    error();
  } catch (err) {
    expect(err).toStrictEqual(new Error()); // catch로 와서 error객체가 에러를 일으키지 않기 때문에 toStrictEqual로 에러와 동일한 객체인지 확인한다.
  }
});
