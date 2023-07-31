const $frmTodoAdd = document.querySelector('.todo form[name="frmTodoAdd"]');
const $frmTodoEdit = document.querySelector('.todo form[name="frmTodoEdit"]');

const $addTaskInput = $frmTodoAdd.lastElementChild;
const $editTaskInput = $frmTodoEdit.lastElementChild;

const $todoList = document.querySelector('.todo>.list');

let editTodoId = null; //수정할 항목의 id

//로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
const reRenderTodoFn = function () {
	//ul.list 안의 내용을 모두 삭제 $list.innerHTML = '';
	while ($todoList.childElementCount > 0) {
		$todoList.removeChild($todoList.firstElementChild);
	}

	//for문을 이용해서 todos 배열에 저장된 목록을 화면에 출력
	for (let i = 0; i < myTodo.todos.length; i++) {
		//console.log(myTodo.todos[i]);

		const todo = myTodo.todos[i];

		//동적으로 ul.list에 추가할 태그를 생성
		const $li = document.createElement('li');
		$li.id = todo.id;

		const $chk_i = document.createElement('i');
		if (todo.complete) {
			$chk_i.classList.add('insert', 'far', 'fa-check-square');
		} else {
			$chk_i.classList.add('insert', 'far', 'fa-square');
		}

		const $h3 = document.createElement('h3');
		$h3.textContent = todo.tit;

		//완료여부에 따른 색상표시
		if (todo.complete) {
			$h3.classList.add('complete');
		} else {
			$h3.classList.remove('complete');
		}

		const $edit_i = document.createElement('i');
		$edit_i.classList.add('far', 'fa-edit');

		const $del_i = document.createElement('i');
		$del_i.classList.add('del', 'fas', 'fa-times-circle');

		$li.append($chk_i, $h3, $edit_i, $del_i);

		$todoList.appendChild($li);
	} //end of for

	//완료체크버튼에 대한 click 이벤트 구문
	const chkIcons = document.querySelectorAll('.todo>.list i:nth-of-type(1)');
	chkIcons.forEach(function (chkIcon) {
		chkIcon.addEventListener('click', function () {
			editTodoId = parseInt(this.parentElement.id);

			/**
			 * map() 함수를 이용하여 myTodo.todos 배열의 원소중
			 * id 속성값이 editTodoId와 일치하는 원소의 complete 속성값을
			 * 현재값의 반대로 변환후 로컬스토리지에 저장한다.
			 */
			myTodo.todos = myTodo.todos.map(function (todo) {
				return todo.id !== editTodoId ? todo : { ...todo, complete: !todo.complete };
			});

			saveMyTodoFn(); //로컬스토리지에 데이터를 저장하는 함수

			reRenderTodoFn();
		});
	});

	//삭제버튼에 대한 click 이벤트 구문
	const delIcons = document.querySelectorAll('.todo>.list i:nth-of-type(3)');

	delIcons.forEach(function (delIcon) {
		delIcon.addEventListener('click', function () {
			const $li = this.parentElement;
			$li.remove(); //화면에서 해당 li요소를 삭제

			//myTodo 배열에서도 삭제처리
			myTodo.todos = myTodo.todos.filter((todo) => todo.id != parseInt($li.id));

			saveMyTodoFn(); //로컬스토리지에 데이터를 저장하는 함수

			reRenderTodoFn();

			$addTaskInput.focus();
		});
	});

	//수정버튼에 대한 click 이벤트 구문
	const editIcons = document.querySelectorAll('.todo>.list i:nth-of-type(2');
	editIcons.forEach(function (editIcon) {
		editIcon.addEventListener('click', function () {
			$frmTodoEdit.classList.add('on');
			$frmTodoAdd.classList.remove('on');

			editTodoId = parseInt(this.parentElement.id);

			/**
			 * myTodo.todos 배열의 원소중 id 속성값이 editTodoId와 일치하는 원소의 tit를 가져온다.
			 * 그러기 위해서는 .findIndex()로 index를 알아야 한다.
			 */

			const idx = myTodo.todos.findIndex((todo) => todo.id === editTodoId);

			$editTaskInput.value = myTodo.todos[idx].tit; //수정할 항목의 제목

			$editTaskInput.focus();
		});
	});
};

reRenderTodoFn();

//할일 추가 폼에 대한 submit 이벤트 구문
$frmTodoAdd.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $addTaskInput.value.trim();

	if (tit === '' || tit === null) {
		alert('Todo 제목을 입력해 주세요');
		$addTaskInput.focus();
		return false;
	} else {
		$addTaskInput.value = '';

		const newTodo = {
			id: myTodo.nextTodoId,
			tit,
			complete: false,
		};

		myTodo.todos.push(newTodo);

		//다음번에 추가될 할일항목에 적용할 id값을 1증가
		myTodo = { ...myTodo, nextTodoId: myTodo.nextTodoId + 1 };

		saveMyTodoFn(); //현재상태를 로컬스토리지에 저장

		//console.log(myTodo);

		reRenderTodoFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
	}
});

//할일 수정폼에 대한 submit 이벤트 구문
$frmTodoEdit.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $editTaskInput.value.trim();

	if (tit === '' || tit === null) {
		alert('Todo 제목을 입력해 주세요');
		$addTaskInput.focus();
		return false;
	} else {
		$editTaskInput.value = '';

		myTodo.todos = myTodo.todos.map((todo) => (todo.id != editTodoId ? todo : { ...todo, tit }));

		$frmTodoAdd.classList.add('on'); //todo 입력폼 노출
		$frmTodoEdit.classList.remove('on'); //todo 수정폼 숨김

		$addTaskInput.focus();

		saveMyTodoFn(); //현재상태를 로컬스토리지에 저장

		//console.log(myTodo);

		reRenderTodoFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
	}
});
