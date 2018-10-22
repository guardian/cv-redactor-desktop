const { basename, extname } = require('path');

const getFileName = path => {
	return basename(path);
};

const getRedactedFileName = path => {
	const fileName = getFileName(path);
	const ext = extname(fileName);
	return [basename(fileName, ext), 'redacted', ext].join('.');
};

module.exports = { getFileName, getRedactedFileName };
