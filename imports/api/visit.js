import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const VisitApi = new Mongo.Collection('visit');

Meteor.methods({

  'visit.checkinsertupdate'(shopid) {

    let visit = VisitApi.findOne({shopid});
    if (visit) {
      VisitApi.update({shopid},{
        $inc : { visit : 1 },
        $set:{createdAt:new Date()},
      });
    }else {
      VisitApi.insert({
        shopid:shopid,
        visit:1,
        createdAt: new Date(),
      });
    }
    return visit;
   },
  'visit.check'(shopid) {
  let visit = VisitApi.findOne({shopid});
    return visit;
  },
  // 'visit.update'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});
if (Meteor.isServer) {
  Meteor.publish('visit', function userPublication() {
    return VisitApi.find();
  });
}
