import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Invoice = new Mongo.Collection('invoice');

Meteor.methods({
  'invoice.insert'(userid,shopid,name,number,products) {
    Invoice.insert({
      userid:userid,
      shopid:shopid,
      to:name,
      tonumber:number,
      products:products,
      createdAt: new Date(), // current time
    });
  },
  'invoice.remove'(taskId) {
    check(taskId, String);
    Invoice.remove(taskId);    //Logic to delete the item
  },
  'invoice.get'(invoiceid) {
    let invoice = Invoice.findOne({_id:invoiceid});
    return invoice;
  },
});
if (Meteor.isServer) {
  Meteor.publish('invoice', function userPublication() {
    return Invoice.find();
  });
}
