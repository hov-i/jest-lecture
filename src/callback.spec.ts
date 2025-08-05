import { timer } from "./callback";

test("타이머 잘 실행되나?", () => {
  timer((message: string) => {
    expect(message).toBe("success");
  });
});

test("타이머 잘 실행되나?", () => {
  timer((message: string) => {
    expect(message).toBe("fail"); // fail넣어도 성공?, 비동기 특성상 타이머 3초를 못기다림
  });
});

test("타이머 잘 실행되나?", (done) => {
  timer((message: string) => {
    expect(message).toBe("fail"); // fail넣어도 성공?, 비동기 특성상 타이머 3초를 못기다림
    done();
  });
}); // done 매개변수를 사용해서 3초를 기다리게함, 근데 콜백 함수 쓰지말고 promise로 만들어 쓰는게 낫다.
