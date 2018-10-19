var hummus = require('hummus');
var path = require('path');
var extractText = require('./parser/text-extraction');
const fs = require('fs');

function pdfParser(file, redactedFile, termsToHide) {
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

	const boxDrawer = (page, index) => {
		const pageModifier = new hummus.PDFPageModifier(pdfWriter, index);
		const ctx = pageModifier.startContext().getContext();
		page.forEach(word => {
			console.log('global b box ===>', ...word.globalBBox);
			ctx.drawRectangle(
				word.globalBBox[0],
				word.globalBBox[1],
				word.globalBBox[2] - word.globalBBox[0],
				word.globalBBox[3] - word.globalBBox[1],
				{ type: 'fill', color: 'black' }
			);
		});
		pageModifier.endContext().writePage();
	};

	// console.log('texts with kind ========>', blocksToHide);

	blocksToHide.forEach((block, index) => {
		boxDrawer(block, index);
	});

	pdfWriter.end();
}

module.exports = pdfParser;
