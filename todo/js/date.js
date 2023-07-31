//날짜정보를 가져오는 함수
const getDate = () => {
	const $date = document.querySelector('header > .datetime > .date');
	const $day = $date.nextElementSibling; //DOMTree를 타고 선택

	//날짜출력
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const zeroMonth = month < 10 ? `0${month}` : month; //삼항연산자
	const date = today.getDate();
	$date.textContent = `${year}.${zeroMonth}.${date}`;

	//요일출력
	const day = today.getDay(); //0~6(일~토)
	const dayName = ['일', '월', '화', ' 수', '목', '금', '토'];
	$day.textContent = dayName[day];

	//주말에 요일 강조
	if (day === 0 || day === 6) {
		$day.style.color = '#ff5757';
	}
};

getDate();
