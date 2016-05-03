var mongorito = require('mongorito');
var Model = mongorito.Model;
var helpers = require('./helpers');

const LIMIT = 20;

var Tracks = Model.extend({
    collection: 'tracks'
});



module.exports = {
    create: function(params) {

         var track = new Tracks(params);
        return track.save().then(function(resp) {
            return track;
        });
    },
    find(query) {
        var tracks = Tracks;
        console.log('query');
        if(helpers.isObject(query)) {
            if(helpers.isObject(query.match)) {
                tracks = tracks.where(query.match);
            }
            if(helpers.isObject(query.sort)) {
                tracks = tracks.sort(query.sort);
            }
            if(query.limit) {
                tracks = tracks.limit(query.limit);
            } else {
                tracks = tracks.limit(LIMIT);
            }
            if(query.page) {
                tracks = tracks.skip(query.page * (query.limit || LIMIT))
            }
        }
        return tracks.find().then(function(resp) {
            return resp;
        });
    }
}