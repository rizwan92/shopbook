import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const ProductMasterApi = new Mongo.Collection('productMaster');
Meteor.methods({
  'product.insert'(product) {
    ProductMasterApi.insert({
      shopid:product.shopid,
      name:product.name,
      costprice:product.cprice,
      sellprice:product.sprice,
      tax:product.tax,
      discount:product.discount,
      image:product.imageLink,
      stock:product.stock,
      status:1,
      createdAt: new Date(),
    });
  },
  'product.remove'(taskId) {
    check(taskId, String);
    ProductMasterApi.remove(taskId);    //Logic to delete the item
  },
  'product.singleitem'(productid) {
    let product = ProductMasterApi.findOne({_id:productid});
    return product;
  },
  'product.update'(product) {
   ProductMasterApi.update(product._id, product);
  },
  'product.updatequantity'(productid,productquantity) {
    let product = ProductMasterApi.findOne({_id:productid});
    let productQuantity= parseFloat(product.stock);
    let newproductQuantity= productQuantity-productquantity;
    product.stock=newproductQuantity
   ProductMasterApi.update(productid, product);
  },
});
if (Meteor.isServer) {
  Meteor.publish('productMaster', function userPublication() {
    return ProductMasterApi.find();
  });
}
