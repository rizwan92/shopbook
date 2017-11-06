import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const LinkApi = new Mongo.Collection('link');

Meteor.methods({

  'link.insert'(link) {

    return  LinkApi.insert({
        name:link.name,
        category:link.category,
        description:link.description,
        length:link.length,
        rating:link.rating,
        quality:link.quality,
        sizein:link.sizein,
        size:link.size,
        image:link.imageLink,
        dlink:link.dlink,
        status:1,
        createdAt: new Date(),
      });
   },
  'link.check'(shopid) {
  let visit = LinkApi.findOne({shopid});
    return visit;
  },
  'link.update'(linkid,link) {
      return LinkApi.update(linkid, { $set: {
        name:link.name,
        category:link.category,
        description:link.description,
        length:link.length,
        rating:link.rating,
        quality:link.quality,
        sizein:link.sizein,
        size:link.size,
        image:link.imageLink,
        dlink:link.dlink,
       } });
  },
  'link.remove'(linkid) {
    LinkApi.remove(linkid);    //Logic to delete the item
  },
});
if (Meteor.isServer) {
  Meteor.publish('link', function userPublication() {
    return LinkApi.find({}, {sort: {createdAt: -1}});
  });
  Meteor.publish('linkbyid', function userPublication(linkid) {
    return LinkApi.find({_id:linkid});
  });


}
