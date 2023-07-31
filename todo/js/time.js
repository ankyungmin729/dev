//시간을 가져오는 함수
const getTime = () => {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();

	const ampm = hours < 12 ? 'am' : 'pm';

	//2자리 숫자로 변환
	const hours12 = hours % 12;
	const zeroHours = hours12 < 10 ? `0${hours12}` : hours12;
	const zeroMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const zeroSeconds = seconds < 10 ? `0${seconds}` : seconds;

	let time = '';
	if (hours12 > 0) {
		time = `(${zeroHours}:${zeroMinutes}:${zeroSeconds} ${ampm})`; //1시~11시
	} else {
		time = `(12:${zeroMinutes}:${zeroSeconds} ${ampm})`; //정각
	}

	const $time = document.querySelector('header > .datetime > .time ');

	$time.textContent = time;
};

getTime();

// setInterval(함수,시간) - 설정한 시간 간격으로 함수 호출
setInterval(getTime, 1000);
