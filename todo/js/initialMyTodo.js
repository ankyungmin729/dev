//로컬스토리지로 부터 myTodo 값 추출
let myTodo = localStorage.getItem('myTodo');

if (myTodo !== null) {
	myTodo = JSON.parse(myTodo); //불러온 데이터가 문자열이므로 객체로 변환
} else {
	//myTodo 프로젝트에서 로컬스토리지에 저장할 초기 데이터
	myTodo = {
		username: '',

		Dday: [],
		nextDdayId: 0,

		todos: [],
		nextTodoId: 0,
	};
}

//현재상태를 로컬스토리지에 저장
const saveMyTodoFn = () => {
	localStorage.setItem('myTodo', JSON.stringify(myTodo));
};
