'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastfm = function lastfm(api_key, resource, name, method, params, callback) {
	var prependAndKeyEquals = _ramda2.default.mapObjIndexed(function (value, key, object) {
		return '&' + key + '=' + value;
	});
	var add = function add(a, b) {
		return a + b;
	};
	var paramStr = _ramda2.default.compose(_ramda2.default.reduce(add, ''), _ramda2.default.values, prependAndKeyEquals);
	var queryStr = 'http://ws.audioscrobbler.com/2.0/?api_key=' + api_key + '&method=' + resource + '.' + method + '&' + resource + '=' + name + paramStr(params);
	//console.log(queryStr);
	var result = undefined;
	http.get(queryStr, function (res) {
		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function () {
			callback(JSON.parse(body));
		});
	}).on('error', function (e) {
		callback('Error: ' + e);
	});
	return result;
};

var curryfm = _ramda2.default.curry(lastfm);
exports.default = curryfm;