var express = require("express");
var router = express.Router();
const controllers = require("../controllers");
const auth = require("./auth/auth.service");
/* GET companys listing. */
router.get("/", controllers.company.index);
router.delete("/:id", auth.hasRole("admin"), controllers.company.destroy);
router.get("/:id", auth.isAuthenticated(), controllers.company.show);
router.post("/", controllers.company.create);
module.exports = router;
