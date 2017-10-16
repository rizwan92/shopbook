import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const CityApi = new Mongo.Collection('city');
Meteor.methods({
  'city.insert'(city) {
    CityApi.insert({
      name:city.name,
      stateid:city.stateid,
      createdAt: new Date(), // current time
    });
  },
  'city.remove'(taskId) {
    check(taskId, String);
    CityApi.remove(taskId);    //Logic to delete the item
  },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});
if (Meteor.isServer) {
Meteor.publish('city', function userPublication() {
  return CityApi.find();
});}
