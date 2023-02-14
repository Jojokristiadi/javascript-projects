const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader('X-Powered-By', 'NodeJs');
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200; //ok
      response.end(JSON.stringify({
        message :'Ini adalah halaman Homepage!'
      }))
    } else {
      response.statusCode = 400; //bad request
      response.end(JSON.stringify({
        message : `Halaman dengan ${method} tidak dapat ditemukan!`
      }));
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end(JSON.stringify({
        message : 'Halo, ini adalah halaman About!'
      }));
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200; //ok
        response.end(JSON.stringify({
          message : `Halo ${name}, ini adalah halaman About!`
        }));
      });
    } else {
      response.statusCode = 400; //bad request
      response.end(JSON.stringify({
        message : `Halaman ini tidak dapat diakses dengan ${method}`
      }));
    }
  } else {
    response.statusCode = 404; //not found
    response.end(JSON.stringify({
      //JSON.stringfy digunakan untuk ubah javascript jadi JSON.
      message : 'Halaman tidak ditemukan!',
    }))
  }
};
// if (method === "GET") {
//   response.end("<h1>Hello!</h1>");
// }

// if (method === "POST") {
//   let body = [];

//   request.on("data", (chunk) => {
//     body.push(chunk);
//   });

//   request.on("end", () => {
//     body = Buffer.concat(body).toString();
//     //      response.end(`<h1>Hai, ${body}!</h1>`);

//     const { name } = JSON.parse(body);
//     response.end(`Hai, ${name}!`);
//   });

//curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Dicoding\"}"
//hasil yang didapatkan <h1>Hai, {"name": "Dicoding"}!</h1>
//masih berupa JSON
//kita akan ubah menjadi string dari JSON

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
