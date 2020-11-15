/**
 * @jest-environment jsdom
 */

const app = require("../src/server/index");
const supertest = require("supertest");
const request = supertest(app);
// let server = app.listen(port, () =>
//   console.log(`Listening on this port ${port}`)
// );
describe("Test the endpoint", () => {
  test("/test", async (done) => {
    const response = await request.get("/test");
    expect(response.status).toBe(200);
    done();
  });
});
