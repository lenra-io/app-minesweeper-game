// import { serve, file, write } from "bun";

const BASE_PATH = "./build";

Bun.serve({
    port: 3000,
    async fetch(req) {
        console.log("req", req);
      let requestPath = new URL(req.url).pathname;
      if (requestPath==="/") {
        requestPath = "/index.html";
      }
      const filePath = BASE_PATH + requestPath;
      const file = Bun.file(filePath);
      if (file.exists()) {
        const headers = {};
        // if (requestPath.endsWith(".js")) {
        //   headers["content-type"] = "text/javascript";
        //   headers["source-map"] = requestPath + ".map";
        // }
        return new Response(file, {
          headers,
        });
      }
      return new Response(null, {
        status: 404,
      });
    }
});

console.log("Server started: http://localhost:3000");