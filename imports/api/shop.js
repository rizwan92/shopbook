import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
export const ShopApi = new Mongo.Collection('shop');

Meteor.methods({
  'shop.insert' (shop) {
    ShopApi.insert({
      userid: shop.userid,
      sname: shop.sname,
      sadd: shop.sadd,
      scode: shop.scode,
      image: shop.image,
      userdetail: shop.userdetail,
      lat: shop.lat,
      long: shop.long,
      country: shop.country,
      states: shop.states,
      city: shop.city,
      pc: shop.pc,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'shop.remove' (taskId) {
    check(taskId, String);
    ShopApi.remove(taskId); //Logic to delete the item
  },
  'shop.get' (shopid) {
    let invoice = ShopApi.findOne({_id:shopid});
    return invoice;
  },
  'shop.check' (userid) {
    let shop = ShopApi.findOne({userid});
    return shop;
  }
});
if (Meteor.isServer) {
  Meteor.publish('shop', function userPublication() {
    return ShopApi.find();
  });
}
