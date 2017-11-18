import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const PropertyApi = new Mongo.Collection('property');
Meteor.methods({
  'property.insert'(prperty,subcatid) {
    return PropertyApi.insert({
      name:prperty,
      subcatid:subcatid,
      createdAt: new Date(), // current time
    });
  },
  'property.remove'(taskId) {
    PropertyApi.remove(taskId);    //Logic to delete the item
  },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});

if (Meteor.isServer) {
    Meteor.publish('property', function userPublication() {
    return PropertyApi.find();
    });
    Meteor.publish('propertysubcatid', function userPublication(subcatid) {
    return PropertyApi.find({subcatid});
    });
  }
