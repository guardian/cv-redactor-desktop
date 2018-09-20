const init = () => {
	['dragover', 'drop'].forEach(evType => {
		document.addEventListener(
			evType,
			event => {
				event.preventDefault();
				return false;
			},
			false
		);
	});
};

module.exports = init;
