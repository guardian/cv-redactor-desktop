var hummus = require('hummus');
var path = require('path');
var extractText = require('./parser/text-extraction');
const fs = require('fs');

function pdfParser() {
	const termsToHide = ['anna', 'leach', 'laura', 'gonzalez', 'github'];
	const file = path.join(__dirname, '/../../test.pdf');
	const redactedFile = path.join(__dirname, '/../../test.redacted.pdf');

	const pdfReader = hummus.createReader(file);
	const pagesPlacements = extractText(pdfReader);
	const pdfWriter = hummus.createWriterToModify(file, {
		modifiedFilePath: redactedFile,
	});

	// 1. duplicate file
	// 2. grab duplicate
	// 3. modify duplicate
	// 4. save in redacted-pdfs

	const findWords = page => {
		return page.filter(block => {
			let txt = block['text'].toLowerCase();
			let matchArr = termsToHide.map(term => txt.includes(term));
			return matchArr.includes(true);
		});
	};

	const blocksToHide = pagesPlacements.map(page => findWords(page));

	const boxDrawer = page => {
		const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);
		const ctx = pageModifier.startContext().getContext();
		page.forEach(word => {
			ctx.drawRectangle(...word.globalBBox, { type: 'fill', color: 'black' });
		});
		pageModifier.endContext().writePage();
	};

	console.log('texts with kind ========>', blocksToHide);
	boxDrawer(pagesPlacements[2]);
	pdfWriter.end();
}

pdfParser();
