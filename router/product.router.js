const express=require("express");
const router=express.Router();
const productController=require("../controller/product.controller");
const authMiddleWare=require("../middleware/authMiddleware");

router.get("/view", authMiddleWare(), productController.viewProducts);
router.post("/save", authMiddleWare("admin"), productController.addProduct);
router.put("/update/:id", authMiddleWare("admin"), productController.updateProduct);
router.delete("/delete/:id",authMiddleWare("admin"), productController.deleteProduct);

module.exports=router;