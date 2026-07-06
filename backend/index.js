const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();

// to allow cross-origin requests from the client
app.use(cors());

// to accept json data in the body of the request
app.use(express.json());

// to accept url encoded data in the body of the request
app.use(express.urlencoded({ extended: true }));

const mysqlConnection = mysql.createConnection({
  user: "myDBuser",
  password: "123456",
  host: "127.0.0.1",
  database: "myDB",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //path to mysql sock in MAMP
});

mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected");
});

app.get("/", (req, res) => {
  res.send("Server is up and running...");
});

//Install: Create the tables necessary
app.get("/install", (req, res) => {
  let createProducts = `CREATE TABLE if not exists Products(
      product_id int auto_increment,
      product_url varchar(255) not null,
      product_name varchar(255) not null,
      PRIMARY KEY (product_id)
  )`;
  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,    
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;

  mysqlConnection.query(createProducts, (err, results, fields) => {
    if (err) console.log(err);
  });

  mysqlConnection.query(createProductDescription, (err, results, fields) => {
    if (err) console.log(err);
  });

  mysqlConnection.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(err);
  });

  res.end("Tables Created");
});

// Insert a new iPhone
app.post("/addiphones", (req, res) => {
  let {
    iphoneId: Id,
    imgPath: img,
    iphoneLink: Url,
    iphoneTitle: Title,
    briefDescription: Brief,
    StartPrice,
    priceRange: PriceRange,
    fullDescription: Description,
  } = req.body;

  // To use it as a foreign key
  let addedProductId = 0;

  let sqlAddToProducts = `INSERT INTO Products (product_url, product_name) VALUES ('${Id}', '${Title}')`;

  mysqlConnection.query(sqlAddToProducts, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  mysqlConnection.query(
    `SELECT * FROM Products WHERE product_url = "${Id}"`,
    (err, rows, fields) => {
      addedProductId = rows[0].product_id;
      console.log(addedProductId);
      if (err) console.log(err);

      if (addedProductId != 0) {
        let sqlAddToProductDescription = `INSERT INTO ProductDescription (product_id,product_brief_description, product_description, product_img, product_link) VALUES ("${addedProductId}", "${Brief}", "${Description}", "${img}", "${Url}")`;

        let sqlAddToProductPrice = `INSERT INTO ProductPrice (product_id,starting_price, price_range) VALUES ("${addedProductId}", "${StartPrice}", "${PriceRange}")`;

        mysqlConnection.query(
          sqlAddToProductDescription,
          function (err, result) {
            if (err) throw err;
            console.log("Product description inserted");
          },
        );

        mysqlConnection.query(sqlAddToProductPrice, function (err, result) {
          if (err) throw err;
          console.log("Product price inserted");
        });
      }
    },
  );
  res.end("Product added");
});

// Get all iphones
app.get("/iphones", (req, res) => {
  mysqlConnection.query(
    `SELECT * 
		 FROM Products 
		 JOIN ProductDescription ON Products.product_id = ProductDescription.product_id 
		 JOIN ProductPrice       ON Products.product_id = ProductPrice.product_id`,

    (err, rows) => {
      if (!err) res.json({ products: rows });
      else console.log(err);
    },
  );
});

// get single product
app.get("/iphones/:product_id", (req, res) => {
  const productID = req.params.product_id;
  // console.log(productID);

  mysqlConnection.query(
    `SELECT * 
		 FROM Products 
		 JOIN ProductDescription ON Products.product_id = ProductDescription.product_id 
		 JOIN ProductPrice ON Products.product_id = ProductPrice.product_id 
		 WHERE Products.product_id = ${productID}`,

    (err, rows) => {
      if (!err) res.json({ products: rows });
      else console.log(err);
    },
  );
});

const port = 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
