var hummus = require('hummus');
var path = require('path');
var extractText = require('./parser/text-extraction');

function pdfParser() {
	const termsToHide = ['anna', 'leach', 'laura', 'gonzalez', 'github'];
	const file = path.join(__dirname, '/../../test.pdf');

	const pdfReader = hummus.createReader(file);
	const pagesPlacements = extractText(pdfReader);
	const pdfWriter = hummus.createWriter(file);

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
		console.log('this happened');
		//const cxt = pdfWriter.startPageContentContext(page);
		console.log('context', cxt);
		// cxt.drawRectangle(left,bottom,width,height,[{options}])
		// ctx.drawRectangle(0,500, 200, 200, {type: 'fill', color: 'black'} )
	};

	console.log(pagesPlacements);
	// console.log("texts with kind ========>", blocksToHide)
	boxDrawer(pagesPlacements[0]);
	pdfWriter.end();
}

pdfParser();
