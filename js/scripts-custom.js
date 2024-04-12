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
};

const stringCoundown = 'Повторно запросить код через <span data-countdown-submit="true"></span>';
let remainingTime = 60;

function countDownSubmit() {

	const $countDownPlace = document.querySelector('[data-place-countdown]');

	if( !$countDownPlace ) return;

	$countDownPlace.innerHTML = stringCoundown;

	const $countDownTimerPlace = document.querySelector('[data-countdown-submit]');
	const $submitBtn = document.querySelector('[data-resend-code]');

	$submitBtn.classList.add('disabled-submit');

	const timer = setInterval(() => {
		const minutes = Math.floor(remainingTime / 60);
		const seconds = remainingTime % 60;

		$countDownTimerPlace.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		remainingTime--;

		if (remainingTime < 0) {
			clearInterval(timer);
			$countDownTimerPlace.innerText = '00:00';

			$submitBtn.classList.remove('disabled-submit');
			$countDownPlace.innerHTML = '';
		}
	}, 1000);

}