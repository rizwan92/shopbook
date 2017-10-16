import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const HSNCode = new Mongo.Collection('hsnCode');
Meteor.methods({
  'hsn.insert'(hsn) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    HSNCode.insert({
      name:hsn.name,
      value:hsn.value,
      createdAt: new Date(), // current time
    });
  },
  'hsn.remove'(taskId) {
    check(taskId, String);
    HSNCode.remove(taskId);    //Logic to delete the item
  },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});
if (Meteor.isServer) {
  Meteor.publish('hsnCode', function userPublication() {
    return HSNCode.find();
  });
}
