console.log("Test runs");

describe("test ", () => {
  test("test to run", () => {
    let a = 12;
    let b = 12;
    let sum = a + b;
    expect(sum).toEqual(24);
  });
});
