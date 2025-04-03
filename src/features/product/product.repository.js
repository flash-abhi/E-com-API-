import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongoDB.js";
import { ApplicationError } from "../../Error-Handling/application-error.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("products",productSchema);
const ReviewModel = mongoose.model("review",reviewSchema);
const CategoryModel = mongoose.model("category",categorySchema);
class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(productData) {
    try {
      // 1. Add the product 
      console.log(productData)
      const newProduct =  new ProductModel(productData);
      console.log(newProduct);
      const savedProduct = await newProduct.save();
      // 2. Update the category 
      await CategoryModel.updateMany(
        {_id : {$in : newProduct.categories}},
        {$push: {products: new ObjectId(savedProduct._id)}}
      )
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database...", 500);
    }
  }

  async getAll() {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const result = await collection.find().toArray();
      return result;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database...", 500);
    }
  }

  async get(id) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return result;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database...", 500);
    }
  }
  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        }; // it will be stored like this { "price": { "$gte": 100, "$lte": 500 } }
      }
      if (category) {
        filterExpression.category = category;
      }
      return await collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database...", 500);
    }
  }
  // async rateProduct(userId,productId,rating){
  //     try{
  //         const db = getDb();
  //         const collection = db.collection(this.collection);
  //         // 1. Find the product.
  //         const product = await collection.findOne({_id:new ObjectId(productId)});
  //         // 2. Check for rating.
  //         const userRating = product?.ratings?.find(r => r.userId == userId);
  //       if(userRating){
  //         // 3. Update the rating.
  //         await collection.updateOne({
  //             _id: new ObjectId(productId),"ratings.userId": new ObjectId(userId)
  //         },{
  //             $set: {
  //                 "ratings.$.rating": rating
  //             }
  //         })
  //       }else{
  //         await collection.updateOne({
  //             _id:new ObjectId(productId)
  //         },{
  //             $push:{ratings: {userId:new ObjectId(userId),rating}}
  //         })
  //       }
  //     }catch(err){
  //         console.log(err);
  //         throw new ApplicationError("Something went wrong with database...",500);
  //     }
  // }

  async rateProduct(userId, productId, rating) {
    // try {
    //   const db = getDb();
    //   const collection = db.collection(this.collection);
    //   await collection.updateOne(
    //     {
    //         _id: new ObjectId(productId)
    //     },{
    //         $pull: {ratings: {userId: new ObjectId(userId)}}
    //     }
    //   )
    //   await collection.updateOne(
    //     {
    //       _id: new ObjectId(productId)
    //     },
    //     {
    //       $push: { ratings: { userId: new ObjectId(userId), rating } },
    //     }
    //   );
    // } 
    try{
      // 1. check if Product exists
      const productToUpdate = await ProductModel.findById(productId);
      if(!productToUpdate){
        throw new Error("product not found");
      }
      // 2. Get the existing reiview 
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productId), user: new ObjectId(userId)
      });
      if(userReview){
        userReview.rating = rating;
        await userReview.save();
      }else{
        const newReview  = new ReviewModel({
          product : new ObjectId(productId),
          user : new ObjectId(userId),
          rating : rating
        });
       await newReview.save();
       productToUpdate.reviews.push(newReview._id);
      //  console.log(productToUpdate);
       await productToUpdate.save();
       return newReview;
      }
    }
    catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database...", 500);
    }
  }
  async averageProductPrice(){
    try{
      const db = getDb();
      return await db.collection(this.collection).aggregate([
        // Stage 1: Get Average price per category
        {
          $group:{
          _id:"$category",
          averagePrice:{$avg:"$price"}
          }
        }
      ]).toArray()
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database...", 500);
    }
  }
}
export default ProductRepository;