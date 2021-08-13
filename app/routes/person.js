var express = require("express");
var router = express.Router();
const controllers = require("../controllers");
const auth = require("./auth/auth.service");
/* GET persons listing. */
router.get("/", controllers.person.index);
router.delete("/:id", auth.hasRole("admin"), controllers.person.destroy);
router.get("/:id", auth.isAuthenticated(), controllers.person.show);
router.post("/", controllers.person.create);
module.exports = router;
