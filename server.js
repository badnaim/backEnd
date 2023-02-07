const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { readFile } = require("fs/promises");
// const { response } = require("express");

const app = express();
const port = 2020;
app.use(cors());
app.use(bodyParser.json());

app.get("/products", (request, response) => {
  console.log("GET products huselt orj irlee");
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(404).send({ message: err });
    } else {
      response.status(200).send(JSON.parse(data));
    }
  });
  // response.status(200).send(products);
}); //router of backend

app.get("/product/:id", async (request, response) => {
  const prodId = request.params.id;
  const products = await readFile("./data/products.json");
  const foundProduct = products.find((product) => product.id === prodId);
  if (foundProduct) {
    response.json(foundProduct);
  } else {
    response.status(404).send({ message: "Product not found" });
  }
});

app.post("/product/add", (request, response) => {
  console.log("POST huselt orj irlee: ", request.body);
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      products.push(request.body);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response.status(200).send({ message: "prod successfully added" });
        }
      });
    }
  });
});

app.get("/users", (request, response) => {
  console.log("get product huslet orj irlee");
  response.send("one");
  response.status(200).send("products one");
});

app.delete("/products/delete/:id", (req, response) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      response.status(500).send({ message: err });
    } else {
      const datas = JSON.parse(data);
      const leftDatas = datas.filter((data) => data.id !== id);
      fs.writeFile("./data/products.json", JSON.stringify(leftDatas), (err) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response.status(200).send({ message: "succesfully deleted" });
        }
      });
    }
  });
});

app.put("/products/edit/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const products = JSON.parse(data);
      const index = products.findIndex((data) => data.id === id);
      products[index] = {
        ...products[index],
        ...update,
      };
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "succesfully edited" });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server is starting in ${port} port`);
});

// app.get("/products", (request, response) => {
//   console.log("GET products huselt orj irlee 1");
//   response.status(200).send("products");
// d
// });

//api - access point interface - newtreh tseg
