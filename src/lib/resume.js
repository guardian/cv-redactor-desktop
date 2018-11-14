const { basename, extname } = require('path');
const uniqid = require('uniqid');
const slugify = require('slugify');

const getFileName = path => {
	return basename(path);
};

const getRedactedFileName = (
	prefix,
	id = uniqid
		.time()
		.split('')
		.reverse()
		.join('')
) => {
	return [slugify(prefix), id, 'pdf'].filter(_ => _.length > 0).join('.');
};

module.exports = { getFileName, getRedactedFileName };
