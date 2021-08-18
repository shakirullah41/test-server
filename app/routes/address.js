var express = require("express");
var router = express.Router();
const controllers = require("../controllers");
const auth = require("./auth/auth.service");
/* GET addresss listing. */
router.get("/", controllers.address.index);
router.delete("/:id", auth.hasRole("admin"), controllers.address.destroy);
router.get("/:id", auth.isAuthenticated(), controllers.address.show);
router.post("/", controllers.address.create);
module.exports = router;
