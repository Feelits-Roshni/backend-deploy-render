const productModel=require("../model/product.model");

const viewProducts=async(req,res)=>{
    try {
const vproducts=await productModel.find();
if(!vproducts || vproducts.length===0) {
    return res.status(400).json({success:false, message:"no products found"});
}
return res.status(200).json({success:true, message:"Products details displayed",vproducts});
    }
    catch(err)
    {
        return res.status(500).json({success:false, message:"view products operation failed"})
    }
}

const addProduct = async(req,res) =>{
    try {

        const {pname,price,quantity,image}=req.body;
        if(!pname || !price || !quantity || !image){
            return res.status(400).json({success:false, message:"Product details Missing"});
        }

        const addedProduct=await productModel.create({pname,price,quantity,image});
        return res.status(200).json({success:true, message:"Product added Successfully", addedProduct});

    }

    catch(err)
    {
        return res.status(500).json({success:false, message:"Product is not added"});
    }
}

const updateProduct = async(req,res)=>{
    try {
       const {pname,price,quantity,image} =req.body;
       
       const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedProduct) {
            return res.status(400).json({success:false, message:"Product is not available"}); 
        }
       return res.status(200).json({success:true, message:"Product updated Successfully", updatedProduct});
    }

    catch(err) {
        return res.status(500).json({success:false, message:"Product cannot be updated"});
    }
}

const deleteProduct =async(req,res)=>{
    try {

        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if(!deletedProduct) {
            return res.status(400).json({success:false, message:"Product is not available"}); 
        }

         return res.status(200).json({success:true, message:"Product deleted successfully", deletedProduct});

    }

    catch(err) {
        return res.status(500).json({success:false, message:"Product cannot be deleted"});
    }
}

module.exports={viewProducts, addProduct, updateProduct, deleteProduct};