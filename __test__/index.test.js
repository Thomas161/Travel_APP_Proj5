const app = require("../src/server/index");
const request = require("supertest");
let server = app.listen(port, () =>
  console.log(`Listening on this port ${port}`)
);
describe("Test the endpoint", () => {
  afterEach(() => {
    server.close();
  });
  it("/test", async () => {
    const response = await request.get(app).get("/test");
    expect(response.status).toBe(200);
  });
});
