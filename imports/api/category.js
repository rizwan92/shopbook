import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const CategoryApi = new Mongo.Collection('category');

Meteor.methods({
  'category.insert'(name) {
      return CategoryApi.insert({
      name:name,
      createdAt: new Date(), // current time
    });
  },
  'category.remove'(taskId) {
    CategoryApi.remove(taskId);    //Logic to delete the item
  },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});
if (Meteor.isServer) {
  Meteor.publish('category', function userPublication() {
    return CategoryApi.find();
  });
}
