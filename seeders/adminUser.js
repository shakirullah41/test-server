var User = require("../app/models/user.js");
var config = require("../config");
var mongoose = require("mongoose");

const data = {
  firstname: "admin",
  lastname: "user",
  email: "admin@test.com",
  role: "admin",
  password: "123",
};

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/anna-server-dev",
  {
    db: {
      safe: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
var newUser = new User(data);
// newUser.provider = 'local';
// newUser.role = 'user';
return newUser
  .save()
  .then((user) => user)
  .catch((e) => console.log(e));
