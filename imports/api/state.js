import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const StateApi = new Mongo.Collection('state');
Meteor.methods({
  'state.insert'(state) {
    StateApi.insert({
      name:state.name,
      code:state.code,
      createdAt: new Date(), // current time
    });
  },
  'state.remove'(taskId) {
    check(taskId, String);
    StateApi.remove(taskId);    //Logic to delete the item
  },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});
if (Meteor.isServer) {
Meteor.publish('state', function userPublication() {
  return StateApi.find();
});}
