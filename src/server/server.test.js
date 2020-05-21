const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);

test("expect an OK response", () => {
  request.get("/weatherdate").expect(response => {
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    done();
  });
});
