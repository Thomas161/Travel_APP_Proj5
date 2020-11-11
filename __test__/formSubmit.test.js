// console.log("Test runs");

import { formSubmit } from "../src/client/js/formSubmit";

describe("check suite for formSubmit ", () => {
  test("Check that formSubmit exists", () => {
    expect(formSubmit()).toBeDefined();
  });
  test("Check that formSubmit has been called", () => {
    const formMock = jest.fn(() => true);
    formMock();
    expect(formMock).toHaveReturnedTimes(1);
  });

  test("Test truthiness for inner function", () => {
    expect(formSubmit()).toBeTruthy();
  });
});
