import { basename, extname } from 'path';

export class Resume {
	constructor(fileName) {
		this.fileName = fileName;
		this.baseFileName = basename(fileName);
		const ext = extname(this.baseFileName);
		this.redactedFileName = [
			basename(this.fileName, ext) + 'redacted' + ext,
		].join('.');

		this.name = null;
	}
	setName(name) {
		this.name = name;
	}
}
