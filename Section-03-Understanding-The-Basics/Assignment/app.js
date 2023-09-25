const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Add A New User</title></head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username" /> <button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users Page</title></head>");
    res.write("<body><ul><li>User 1</li></ul></body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      body.push(chunck);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split("=")[1];
      console.log(userName);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});

server.listen(3000);
