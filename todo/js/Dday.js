const $delAll = document.querySelector('.Dday h2>small');
const $btnDdayAdd = document.querySelector('.Dday>.tit>.add');
const $inputBox = document.querySelector('.Dday>.inputBox');

const $addtit = document.querySelector('.Dday>.inputBox input[name=addTit]');
const $editTit = document.querySelector('.Dday>.inputBox input[name=editTit]');

const $addDate = document.querySelector('.Dday>.inputBox input[name=addDate]');
const $editDate = document.querySelector('.Dday>.inputBox input[name=editDate]');

const $frmDdayAdd = document.querySelector('.Dday>.inputBox>form[name="frmAdd"]');
const $frmDdayEdit = document.querySelector('.Dday>.inputBox>form[name="frmEdit"]');

const $list = $inputBox.nextElementSibling;

let editDdayId = null; //수정할 항목의 id

//디데이 입력창 보이기/숨기기
$btnDdayAdd.addEventListener('click', function () {
	if (!$frmDdayEdit.classList.contains('on')) {
		//.show클래스가 없으면 붙이고, 있으면 삭제
		$inputBox.classList.toggle('show');
	}

	$frmDdayAdd.classList.add('on'); //새목표 추가폼 노출
	$frmDdayEdit.classList.remove('on'); //수정폼 숨김

	$addtit.focus();
});

//로컬스토리지에 저장된 Dday 데이터 삭제함수
const clearDdayAllFn = () => {
	myTodo.Dday = [];
	saveMyTodoFn();
};

//전체데이터 삭제
$delAll.addEventListener('click', function () {
	clearDdayAllFn();
	reRenderDdayFn();
});

//로컬스토리지에 저장된 데이터를 화면에 출력
const reRenderDdayFn = () => {
	//ul.list 안의 내용을 모두 삭제 $list.innerHTML = '';
	while ($list.childElementCount > 0) {
		$list.removeChild($list.firstElementChild);
	}

	//for문을 이용해서 배열에 저장된 Dday 목록을 화면에 출력
	for (let i = 0; i < myTodo.Dday.length; i++) {
		const Dday = myTodo.Dday[i];
		// {id:1, tit: '투두포폴제작', date:new Date().valueOf() }

		//동적으로 ul.list에 추가할 태그를 생성
		const $li = document.createElement('li');
		$li.id = Dday.id;

		//삭제아이콘
		const $del_i = document.createElement('i');
		$del_i.classList.add('fas', 'fa-times-circle');

		const $h3 = document.createElement('h3'); //D-1
		const $p = document.createElement('p');

		//수정아이콘
		const $edit_i = document.createElement('i');
		$edit_i.classList.add('fas', 'fa-edit');

		//Dday 계산
		const today = new Date().valueOf();
		const savedDday = parseInt(Dday.date);
		const millPerDay = 24 * 60 * 60 * 1000; //하루에 해당하는 밀리세컨즈
		const remainDay = Math.floor((savedDday - today) / millPerDay) + 1; //오늘 기준으로 남아있는 날 수

		//생성한 태그에 내용을 삽입
		$h3.textContent = `D-${remainDay}`;

		//남은 날 수에 다른 제목 색상
		if (remainDay < 3) {
			$h3.style.color = 'red';
		} else if (remainDay < 7) {
			$h3.style.color = 'orange';
		}

		$p.textContent = Dday.tit;

		//완성된 태그 i, h3, p를 $li에 추가하여 조립
		$li.append($del_i, $h3, $p, $edit_i);

		//완성된 태그 li를 $list에 추가하여 조립
		$list.appendChild($li);
	} //end of for

	//수정버튼에 대한 클릭이벤트 구문
	const $editIcons = document.querySelectorAll('.Dday>.list i:last-child');
	$editIcons.forEach(function ($editIcon, idx) {
		$editIcon.addEventListener('click', function () {
			//수정창 노출
			$inputBox.classList.toggle('show', true);
			$frmDdayAdd.classList.remove('on');
			$frmDdayEdit.classList.add('on');

			editDdayId = parseInt(this.parentElement.id);
			/**
			 * myTodo.Dday 배열의 원소중 id 속성값이 editDdayId와 일치하는 원소의 tit를 가져온다.
			 * 그러기 위해서는 .findIndex()로 index를 알아내어
			 * map() 함수로 새로운 배열을 할당후
			 * 로컬스토리지에 저장한다.
			 */

			/*
				배열명.findIndex(콜백함수)

				1. 조건에 맞는 데이터가 몇번째 원소인지 index 값을 추출
        2. 만약 조건에 맞는 데이터가 없으면 -1을 리턴
        3. 조건에 맞는 데이터가 여러개일 경우 첫번재 요소에 대한 index를 반환  

				문제) 10보다 큰 값을 가진 첫번째 원소의 index를 구하시오 
				const nums = [3, 12, 6, 9, 15];
				const resultIdx = nums.findIndex((item, idx, arr) => {
					return item > 12;
				});
				alert(resultIdx);
			*/

			const idx = myTodo.Dday.findIndex(function (Dday) {
				return Dday.id == editDdayId;
			});

			//날짜추출후 input[type=date] 값 형식에 맞게 변환 : 2023-07-15
			let savedDate = new Date(myTodo.Dday[idx].date);
			//년월일 추출
			let year = savedDate.getFullYear();
			let month = savedDate.getMonth() + 1; //0~11
			let date = savedDate.getDate();

			month = month < 10 ? `0${month}` : month;
			date = date < 10 ? `0${date}` : date;

			savedDate = `${year}-${month}-${date}`;
			//alert(savedDate);

			$editTit.value = myTodo.Dday[idx].tit; //제목
			$editDate.value = savedDate; //날짜

			$editTit.focus();
		});
	});

	//삭제버튼에 대한 클릭이벤트 구문
	const delIcons = document.querySelectorAll('.Dday>.list i:first-child');
	//console.log('delIcons =', delIcons);
	delIcons.forEach(function (delIcon, idx) {
		delIcon.addEventListener('click', function () {
			const $li = this.parentElement;
			$li.style.textDecoration = 'line-through #a799ff'; //삭제표시

			//0.5초 후 삭제 예약
			setTimeout(function () {
				$li.remove(); //해당 li요소를 삭제함(DOMTree에서만...)

				//로컬스토리지에서도 삭제
				myTodo.Dday = myTodo.Dday.filter((Dday) => Dday.id !== parseInt($li.id));
				saveMyTodoFn(); //로컬스토리지에 반영
			}, 500);
		});
	});
};

reRenderDdayFn();

//디데이 추가버튼에 대한 클릭이벤트
$frmDdayAdd.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $addtit.value.trim();
	const inputDate = new Date($addDate.value);
	const today = new Date();

	const gapDay = inputDate - today; //오늘이후의 날짜 선택하면 양수, 오늘이전 날짜 선택하면 음수
	console.log(`gapDay = ${gapDay}`);

	if (tit === '' || tit === null) {
		alert('D-Day 제목을 입력해 주세요');
		$addtit.focus();
	} else if (gapDay <= 0) {
		alert('오늘 이후의 날짜를 설정해야 합니다.');
		$addDate.focus();
	} else if (isNaN(gapDay)) {
		alert('날짜를 선택해 주세요');
		$addDate.focus();
	} else {
		//데이터를 myTodo.Dday 배열에 저장
		const newDday = {
			id: myTodo.nextDdayId,
			/*tit: 생략*/ tit,
			date: inputDate.valueOf(),
		};

		myTodo = { ...myTodo, nextDdayId: myTodo.nextDdayId + 1 };

		myTodo.Dday.push(newDday);
		//console.log('myTodo.Dday =', myTodo.Dday);

		saveMyTodoFn(); //로컬스토리지에 데이터를 저장하는 함수

		//false 옵션을 주면 .show클래스를 무조건 삭제
		$inputBox.classList.toggle('show', false);

		$addDate.value = '';
		$addtit.value = '';

		reRenderDdayFn();
	} //end of if
});

//디데이 수정버튼에 대한 클릭이벤트
$frmDdayEdit.addEventListener('submit', function (evt) {
	evt.preventDefault();

	const tit = $editTit.value.trim();
	const inputDate = new Date($editDate.value);
	const today = new Date();

	const gapDay = inputDate - today; //오늘이후의 날짜 선택하면 양수, 오늘이전 날짜 선택하면 음수
	console.log(`gapDay = ${gapDay}`);

	if (tit === '' || tit === null) {
		alert('D-Day 제목을 입력해 주세요');
		$editTit.focus();
	} else if (gapDay <= 0) {
		alert('오늘 이후의 날짜를 설정해야 합니다.');
		$editDate.focus();
	} else if (isNaN(gapDay)) {
		alert('날짜를 선택해 주세요');
		$editDate.focus();
	} else {
		//수정된 입력값을 myTodo에 반영
		myTodo.Dday = myTodo.Dday.map((Dday) =>
			Dday.id !== editDdayId ? Dday : { ...Dday, tit, date: inputDate.valueOf() }
		);

		saveMyTodoFn(); //로컬스토리지에 데이터를 저장하는 함수

		//false 옵션을 주면 .show클래스를 무조건 삭제
		$inputBox.classList.toggle('show', false);

		$frmDdayAdd.classList.add('on'); //새목표 추가폼 노출
		$frmDdayEdit.classList.remove('on'); //수정폼 숨김

		reRenderDdayFn(); //로컬스토리지에 저장된 데이터를 화면에 출력하는 함수
	} //end of if
});
