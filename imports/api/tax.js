import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Tax = new Mongo.Collection('tax');
Meteor.methods({
  'tax.insert'(name,value) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tax.insert({
      name:name,
      value:value,
      createdAt: new Date(), // current time
    });
  },
});
if (Meteor.isServer) {
Meteor.publish('tax', function userPublication() {
  return Tax.find();
});}
