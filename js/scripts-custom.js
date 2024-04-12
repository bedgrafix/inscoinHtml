if( document.querySelector('.pin-code-wrap') ) {

	const $inputs = document.querySelector('.pin-code-wrap').querySelectorAll('input');

	$inputs.forEach( (input, index) => {

		input.addEventListener('paste', function(event) {
			event.preventDefault();
			const clipboardData = event.clipboardData || window.clipboardData;
			const pastedText = clipboardData.getData('text');
			
			for (let i = 0; i < pastedText.length && index + i < $inputs.length; i++) {
				$inputs[index + i].value = pastedText[i];
			}

			if (index + pastedText.length < $inputs.length) {
				$inputs[index + pastedText.length].focus();
			}

			if(index + pastedText.length == $inputs.length) $inputs[pastedText.length - 1].focus();
		});

	});



}