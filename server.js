// import { serve, file, write } from "bun";

const BASE_PATH = "./build";

Bun.serve({
    port: 3000,
    async fetch(req) {
        console.log("req", req);
      let filePath = new URL(req.url).pathname;
      if (filePath.endsWith("/") || filePath.endsWith(".html")) {
        filePath = "/index.html";
      }
      filePath = BASE_PATH + filePath;
      const file = Bun.file(filePath);
      if (file.exists()) {
        return new Response(file);
      }
      return new Response(null, {
        status: 404,
      });
    }
});

console.log("Server started: http://localhost:3000");