import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const PurchaseApi = new Mongo.Collection('purchase');

Meteor.methods({
  'purchase.insert'(userid,shopid,name,number,products) {
    PurchaseApi.insert({
      userid:userid,
      shopid:shopid,
      cname:name,
      cnumber:number,
      products:products,
      createdAt: new Date(), // current time
    });
  },
  'purchase.remove'(taskId) {
    check(taskId, String);
    PurchaseApi.remove(taskId);    //Logic to delete the item
  },
  'purchase.get'(invoiceid) {
    let invoice = PurchaseApi.findOne({_id:invoiceid});
    return invoice;
  },
});
if (Meteor.isServer) {
  Meteor.publish('purchase', function userPublication() {
    return PurchaseApi.find();
  });
}
