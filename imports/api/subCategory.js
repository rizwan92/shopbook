import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const SubCategoryApi = new Mongo.Collection('subCategory');
Meteor.methods({
  'subcategory.insert'(subCategory,catid) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    SubCategoryApi.insert({
      name:subCategory,
      catid:catid,
      createdAt: new Date(), // current time
    });
  },
  'subcategory.remove'(taskId) {
    check(taskId, String);
    SubCategoryApi.remove(taskId);    //Logic to delete the item
  },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});

if (Meteor.isServer) {
    Meteor.publish('subCategory', function userPublication() {
    return SubCategoryApi.find();
    });
  }
