const express = require("express");
const { getlocation ,createlocation} = require("../controllers/locationController");

const router = express.Router();

router.get('/',getlocation);
router.post('/',createlocation);


module.exports = router;