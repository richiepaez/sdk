module.exports = function() {

    var r = {};

    r.init = function(app, callback) {
        return callback();
    };

    return r;

}();
