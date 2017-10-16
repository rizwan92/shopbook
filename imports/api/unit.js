import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Unit = new Mongo.Collection('unit');
Meteor.methods({
  'unit.insert'(name) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Unit.insert({
      name:name,
      createdAt: new Date(), // current time
    });
  },
});
if (Meteor.isServer) {
Meteor.publish('unit', function userPublication() {
  return Unit.find();
});}
