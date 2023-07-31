//console.log('연결완료');

const container = document.querySelector('.volcano');
const lava1 = document.querySelector('.lava1');
const lava2 = document.querySelector('.lava2');
const lava3 = document.querySelector('.lava3');
const lava4 = document.querySelector('.lava4');
const lava5 = document.querySelector('.lava5');
const lava6 = document.querySelector('.lava6');
const lava7 = document.querySelector('.lava7');
const lava8 = document.querySelector('.lava8');
const lava9 = document.querySelector('.lava9');

const volcano1 = document.querySelector('.volcano_01');

container.addEventListener('mousemove', (e) => {
	// console.log('마우스 움직임 감지');
	// console.log(e.pageX, e.pageY);
	// 오른쪽 1
	let xAxis = (window.innerWidth / 2 - e.pageX) / 18;
	let yAxis = (window.innerHeight / 2 - e.pageY) / 18;
	let xAxis2 = (window.innerWidth / 2 - e.pageX) / 16;
	let yAxis2 = (window.innerHeight / 2 + e.pageY) / 22;
	// 오른쪽 2
	let xAxis3 = (window.innerWidth / 2 + e.pageX) / 32;
	let yAxis3 = (window.innerHeight / 2 - e.pageY) / 20;
	let xAxis4 = (window.innerWidth / 2 + e.pageX) / 40;
	let yAxis4 = (window.innerHeight / 2 - e.pageY) / 20;
	let xAxis5 = (window.innerWidth / 2 - e.pageX) / 20;
	let yAxis5 = (window.innerHeight / 2 + e.pageY) / 20;

	// 오른쪽 3
	let xAxis6 = (window.innerWidth / 2 - e.pageX) / 20;
	let yAxis6 = (window.innerHeight / 2 + e.pageY) / 20;
	let xAxis7 = (window.innerWidth / 2 - e.pageX) / 20;
	let yAxis7 = (window.innerHeight / 2 - e.pageY) / 40;

	//왼쪽 1
	let xAxis8 = (window.innerWidth / 2 - e.pageX) / 10;
	let yAxis8 = (window.innerHeight / 2 - e.pageY) / 10;
	let xAxis9 = (window.innerWidth / 2 + e.pageX) / 20;
	let yAxis9 = (window.innerHeight / 2 - e.pageY) / 20;

	// lava1.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
	lava1.style.transform = `translateY(${yAxis2}%) translateX(${xAxis2}%)`;
	lava2.style.transform = `translateY(${yAxis}%) translateX(${xAxis}%)`;
	lava3.style.transform = `translateY(${yAxis3}%) translateX(${xAxis3}%)`;
	lava4.style.transform = `translateY(${yAxis4}%) translateX(${xAxis4}%)`;
	lava5.style.transform = `translateY(${yAxis5}%) translateX(${xAxis5}%)`;
	lava6.style.transform = `translateY(${yAxis6}%) translateX(${xAxis6}%)`;
	lava7.style.transform = `translateY(${yAxis7}%) translateX(${xAxis7}%)`;
	lava8.style.transform = `translateY(${yAxis8}%) translateX(${xAxis8}%)`;
	lava9.style.transform = `translateY(${yAxis9}%) translateX(${xAxis9}%)`;
});

function move() {
	// alert("움직일 예정입니다");
	volcano1.animate(
		[{ transform: 'scale(1,1.2)' }, { transform: 'scale(0.9,1)' }, { transform: 'scale(1,1.2)' }],
		{
			duration: 2000,
			iterations: Infinity,
		}
	);
}

move();

//스크롤
const home = document.querySelector('.logo');
const aboutMeBtn = document.querySelector('.mainmenu_container > li:nth-child(1)');
const skillsBtn = document.querySelector('.mainmenu_container > li:nth-child(2)');
const worksBtn = document.querySelector('.mainmenu_container > li:nth-child(3)');
// const experienceBtn = document.querySelector('.mainmenu_container > li:nth-child(4)');
const contactBtn = document.querySelector('.mainmenu_container > li:nth-child(4)');
const aboutMe = document.querySelector('#about-me');
const skills = document.querySelector('#skills');
const works = document.querySelector('#works');
const experience = document.querySelector('#experience');
const contact = document.querySelector('#contact');
home.addEventListener('click', function (e) {
	e.preventDefault();
	var body = document.getElementsByTagName('body')[0];
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: body.offsetTop,
	});
});

aboutMeBtn.addEventListener('click', function (e) {
	e.preventDefault();
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: aboutMe.offsetTop,
	});
});

skillsBtn.addEventListener('click', function (e) {
	e.preventDefault();
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: skills.offsetTop,
	});
});

worksBtn.addEventListener('click', function (e) {
	e.preventDefault();
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: works.offsetTop,
	});
});

contactBtn.addEventListener('click', function (e) {
	e.preventDefault();
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: contact.offsetTop,
	});
});

//메뉴 색상 바꾸기
window.addEventListener('scroll', function () {
	const aboutMeTop = aboutMe.getBoundingClientRect().top;
	const contactTop = contact.getBoundingClientRect().top;
	//console.log(aboutMeTop);
	//console.log(contactTop);

	if (aboutMeTop > 92) {
		document.querySelector('header').classList.remove('bg');
	} else if (aboutMeTop < 40 && 0 < contactTop) {
		document.querySelector('header').classList.add('bg');
	} else {
		document.querySelector('header').classList.remove('bg');
	}
});

//works
const worksContainer = document.querySelector('.worksList');
const worksItems = document.querySelectorAll('.worksList>li>a');
const worksArticles = document.querySelectorAll('article');
worksItems.forEach((worksItem, index) => {
	worksItem.addEventListener('click', function (evt) {
		evt.preventDefault();
		worksItems.forEach((item) => {
			item.parentElement.classList.remove('on');
		});
		this.parentElement.classList.add('on');

		worksArticles.forEach((worksArticle, articleIndex) => {
			if (index === articleIndex) {
				worksArticle.classList.add('show');
			} else {
				worksArticle.classList.remove('show');
			}
		});
	});
});

// 모달창
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap');
const closeBtn = document.getElementById('closeBtn');

btn.onclick = function () {
	modal.style.display = 'block';
};
closeBtn.onclick = function () {
	modal.style.display = 'none';
};

// todo 모달창 내용을 또다른 변수로 저장
const todoModal = document.getElementById('todoModalWrap');
const todoCloseBtn = document.getElementById('todoCloseBtn');

// todo 모달창을 열기/닫기하는 함수 정의
function openTodoModal() {
	todoModal.style.display = 'block';
}

function closeTodoModal() {
	todoModal.style.display = 'none';
}

// 버튼에 이벤트 리스너 추가
const todoBtn = document.getElementById('todoPopupBtn');
todoBtn.onclick = openTodoModal;
todoCloseBtn.onclick = closeTodoModal;

// 크리스피 모달창 내용을 또다른 변수로 저장
const krispyModal = document.getElementById('krispyModalWrap');
const krispyCloseBtn = document.getElementById('krispyCloseBtn');

// 크리스피 모달창을 열기/닫기하는 함수 정의
function openKrispyModal() {
	krispyModal.style.display = 'block';
}

function closeKrispyModal() {
	krispyModal.style.display = 'none';
}

// 버튼에 이벤트 리스너 추가
const krispyBtn = document.getElementById('krispyPopupBtn');
krispyBtn.onclick = openKrispyModal;
krispyCloseBtn.onclick = closeKrispyModal;

// 공모전 모달창 내용을 또다른 변수로 저장
const healthModal = document.getElementById('healthModalWrap');
const healthCloseBtn = document.getElementById('healthCloseBtn');

// 공모전 모달창을 열기/닫기하는 함수 정의
function openHealthModal() {
	healthModal.style.display = 'block';
}

function closeHealthModal() {
	healthModal.style.display = 'none';
}

// 버튼에 이벤트 리스너 추가
const healthBtn = document.getElementById('healthPopupBtn');
healthBtn.onclick = openHealthModal;
healthCloseBtn.onclick = closeHealthModal;

// 따릉이 모달창 내용을 또다른 변수로 저장
const bicycleModal = document.getElementById('bicycleModalWrap');
const bicycleCloseBtn = document.getElementById('bicycleCloseBtn');

// 따릉이 모달창을 열기/닫기하는 함수 정의
function openBicycleModal() {
	bicycleModal.style.display = 'block';
}

function closeBicycleModal() {
	bicycleModal.style.display = 'none';
}

// 버튼에 이벤트 리스너 추가
const bicycleBtn = document.getElementById('bicyclePopupBtn');
bicycleBtn.onclick = openBicycleModal;
bicycleCloseBtn.onclick = closeBicycleModal;

// 추가 모달창 바깥 영역을 클릭하면 모달창 닫기
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
	if (event.target == todoModal) {
		todoModal.style.display = 'none';
	}
	if (event.target == krispyModal) {
		krispyModal.style.display = 'none';
	}
	if (event.target == healthModal) {
		healthModal.style.display = 'none';
	}
	if (event.target == bicycleModal) {
		bicycleModal.style.display = 'none';
	}
};
