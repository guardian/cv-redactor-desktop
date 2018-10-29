const { basename, extname } = require('path');

const getFileName = path => {
	return basename(path);
};

const getRedactedFileName = path => {
	const fileName = getFileName(path);
	const ext = extname(fileName);
	return [basename(fileName, ext), 'redacted', ext.substr(1)].join('.');
};

module.exports = { getFileName, getRedactedFileName };
