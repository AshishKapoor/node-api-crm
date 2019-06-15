const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.times");
const db = require("./models");
const apiPost = require("./app/api/post");
const apiAuthor = require("./app/api/author");
const apiCart = require("./app/api/cart");
const apiUser = require("./app/api/user");
const apiProduct = require("./app/api/product");
const apiLogin = require("./app/api/login");
const apiOrder = require("./app/api/order");

const app = express();
app.use(bodyParser.json());
app.use(express.static("app/public"));

apiPost(app, db);
apiAuthor(app, db);
apiCart(app, db);
apiUser(app, db);
apiProduct(app, db);
apiLogin(app, db);
apiOrder(app, db);

db.sequelize.sync().then(() => {
  // populate author table with dummy data
  db.author.bulkCreate(
    times(10, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  );
  // populate post table with dummy data
  db.post.bulkCreate(
    times(10, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: random(1, 10)
    }))
  );
  app.listen(8080, () => console.log("App listening on port 8080!"));
});
