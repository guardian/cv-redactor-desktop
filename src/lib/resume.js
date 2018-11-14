const { basename, extname } = require('path');
const uniqid = require('uniqid');
const slugify = require('slugify');

const getFileName = path => {
	return basename(path);
};

const getRedactedFileName = (path, position) => {
	const fileName = getFileName(path);
	const ext = extname(fileName);
	return [slugify(position), uniqid.time(), ext.substr(1)]
		.filter(_ => _.length > 0)
		.join('.');
};

module.exports = { getFileName, getRedactedFileName };
