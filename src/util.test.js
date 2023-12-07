import { toMiles } from "./util";

test("converts meters to miles, to the nearest tenth", () => {
  expect(toMiles(10)).toBe(0);
  expect(toMiles(100)).toBe(0.1);
  expect(toMiles(2000)).toBe(1.2);
  expect(toMiles(8587)).toBe(5.3);
  expect(toMiles(10000)).toBe(6.2);
});
