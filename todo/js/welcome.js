const $login = document.getElementById('login');
const $loginForm = $login.firstElementChild;
const $username = $loginForm.children[1];

const $wrap = document.getElementById('wrap');

//환영인사(이름설정) 함수
const welcomeFn = (username) => {
	document.querySelector('h1>.user').textContent = username;
};

//로컬스토리지의 username값 유무에 따라 UI 선택
if (myTodo.username !== '') {
	welcomeFn(myTodo.username);
	$wrap.style.display = 'block'; //todo컨테이너 노출
	$login.style.display = 'none'; //로그인폼 숨김
} else {
	$wrap.style.display = 'none'; //todo컨테이너 숨김
	$login.style.display = 'block'; //로그인폼 노출
}

//input 박스에 엔터키를 누르면 submit 이벤트 발생
$loginForm.addEventListener('submit', function (evt) {
	evt.preventDefault(); //기본이벤트 제거

	const username = $username.value.trim();

	$wrap.style.display = 'block';
	$login.style.display = 'none';

	//로컬스토리지에 username값을 저장
	myTodo = { ...myTodo, username: username }; //로컬스토리지와 동기화
	saveMyTodofn();

	welcomeFn(username);
});

document.querySelector('.expire').addEventListener('click', function () {
	if (confirm('초기화 하면 작성한 모든 정보가 삭제됩니다. \n계속 진행하시겠습니까?')) {
		localStorage.removeItem('myTodo');
		location.reload(); //강제 새로고침
	} else {
		alert('데이터 초기화가 중지되었습니다. \n계속 이용해주세요~!');
	}
});
