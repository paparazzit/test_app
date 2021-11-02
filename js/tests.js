// #region TESTS
// test view manager
//pregled testova

let sidebarList = document.querySelector(".sideBar-list");
let testViews = document.querySelectorAll(".view");
let allTestTable = document.querySelector("#testTableBody");
let editTestTable = document.querySelector("#editTestBody");
if (sidebarList) {
	sidebarList.addEventListener("click", testViewMng);
}
function testViewMng(e) {
	let currentView = e.target.getAttribute("data-view");
	testViews.forEach((testView) => {
		testView.style.display = "none";
		if (currentView === testView.id) {
			testView.style.display = "block";

			if (currentView === "allTestTable") {
				let tests = getAllTests();
			} else if (currentView === "editTestsView") {
				let tests = getTestByAuthorId();
			}
		}
	});
}
function clearAllViews() {
	testViews.forEach((view) => {
		view.style.display = "none";
	});
}

function getAllTests() {
	DB.getAll("POST", "backend/getAllTests.php")
		.then(function (response) {
			createTestTable(response);
		})
		.catch(function (reject) {
			console.log(reject);
		});
}
function getTestByAuthorId() {
	DB.getAll("POST", "backend/getAuthorsTests.php")
		.then(function (response) {
			createEditTestsTable(response);
		})
		.catch(function (reject) {
			console.log("Imamo REJECT");
			console.log(reject);
		});
}
function getSingleTest(id) {
	let sendData = new FormData();
	sendData.append("id", id);

	DB.getAll("POST", "backend/getSingleTest.php", sendData)
		.then(function (response) {
			// console.log("ODOBRENO");
			populateLastTest(response);

			return response;
		})
		.catch(function (reject) {
			console.log(reject);
			// console.log("odbijreno");
		});
}
function createTestTable(tests) {
	let text = "";
	tests.forEach((test) => {
		text += `
		<tr>
		<td>${test.testName}</td>
		<td>${test.testSbj}</td>
		<td>${test.authorName}</td>
		<td><button class = "btn btn-warning" data-id="${test.id}">take a test</td>
		

		</tr>
		`.trim();
	});
	allTestTable.innerHTML = text;
}
function createEditTestsTable(tests) {
	let text = "";
	tests.forEach((test) => {
		text += `
		<tr>
		<td>${test.testName}</td>
		<td>${test.testSbj}</td>
		<td>${test.authorName}</td>
		<td><a href="editMyTest.php?id=${test.id}" class="btn btn-info editTestBtn" >Edit test</a></td>
		</tr>
		`.trim();
	});
	editTestTable.innerHTML = text;
}

let createNewTestBtn = document.querySelector("#createNewTestBtn");
if (createNewTestBtn) {
	createNewTestBtn.addEventListener("click", createTestForm);
	let testForm = new FormValidator(
		"createTestForm",
		["testName", "testSbj", "id"],
		false
	);
	function createTestForm(e) {
		e.preventDefault();
		testForm.checkForm();
		if (Object.keys(testForm.formData).length > 0) {
			let sendData = new FormData();

			sendData.append("testName", testForm.formData.testName);
			sendData.append("testSbj", testForm.formData.testSbj);
			sendData.append("authorId", testForm.formData.id);

			testRequest(sendData, testForm.formData.id);
		}
	}
}

// EDIT TEST VIEW

// test Request
function testRequest(sendData) {
	DB.getAll("POST", "backend/createTest.php", sendData)
		.then(function (response) {
			regNotification.innerText = "";
			let testNotification = document.querySelector("#TestNotification");
			if (response === "failed") {
				regNotification.innerText = "VEC POSTOJI TEST POD TIM IMENOM";
			} else {
				testNotification.innerHTML = `Uspesno ste kreirali test <button class="btn btn-warning editLastTestBtn" data-view="editLastTest" data-name="${response.id}" >${response.testName}</button>`;
				// regNotification.innerHTML = "Uspeno kreiran test";

				let editLatTestBtn = document.querySelector(".editLastTestBtn");
				editLatTestBtn.addEventListener("click", showLastTest);
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

function showLastTest(e) {
	e.preventDefault();
	let testId = this.getAttribute("data-name");
	let current = this;
	lastTestView(current);
	getSingleTest(testId);
}
function populateLastTest(test) {
	let testCard = document.querySelector("#testCard");
	let cardHeader = testCard.firstElementChild;
	let testBody = document.querySelector(".testBody");
	cardHeader.innerText = test.testName;
	let text = `<tr>
	<td>${test.authorName}</td>
	<td>$Test points</td>
	<td>${test.testSbj}</td>
	</tr>`;
	testBody.innerHTML = text;
	// console.log(test.testName);
}

// #endregion
function lastTestView(current) {
	let currentTest = current.getAttribute("data-view");
	testViews.forEach((view) => {
		view.style.display = "none";
		if (view.id === currentTest) {
			view.style.display = "block";
		}
	});
}

// TEST QUESTIONs

let createQBtn = document.querySelector("#createQBtn");

if (createQBtn) {
	let editTest = new FormValidator(
		"editTestInfo",
		["testName", "testSbj", "id"],
		false
	);
	createQBtn.addEventListener("click", createQestions);
	function createQestions(e) {
		e.preventDefault();
		editTest.checkForm();
		if (Object.keys(editTest.formData).length > 0) {
			let sendData = new FormData();
			sendData.append("id", editTest.formData.id);
			sendData.append("testName", editTest.formData.testName);
			sendData.append("testSbj", editTest.formData.testSbj);
			updateTest(sendData);
		}
	}
}

function updateTest(sendData) {
	DB.getAll("POST", "backend/updateTest.php", sendData)
		.then(function (response) {
			if (response) {
				window.location.href = `createQuestions.php?id=${response.id}`;
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

let nextQBtn = document.querySelector("#nextQBtn");
let finishQBtn = document.querySelector("#finishQBtn");

if (nextQBtn) {
	nextQBtn.addEventListener("click", saveQuestion);
	finishQBtn.addEventListener("click", finishTest);
	let addQuestionForm = new FormValidator(
		"questionForm",
		["question", "answer_a", "answer_b", "points", "test_id"],
		false
	);

	function saveQuestion(e) {
		e.preventDefault();
		addQuestionForm.checkForm();
		if (Object.keys(addQuestionForm.formData).length > 0) {
			let test = addQuestionForm.formData;
			let sendData = new FormData();
			sendData.append("test_id", test.test_id);
			sendData.append("question", test.question);
			sendData.append("answer_a", test.answer_a);
			sendData.append("answer_b", test.answer_b);
			sendData.append("points", test.points);
			insertQuestion(sendData);
		}
	}
	function finishTest(e) {
		e.preventDefault();
		addQuestionForm.checkForm();
		if (Object.keys(addQuestionForm.formData).length > 0) {
			let test = addQuestionForm.formData;
			let sendData = new FormData();
			sendData.append("test_id", test.test_id);
			sendData.append("question", test.question);
			sendData.append("answer_a", test.answer_a);
			sendData.append("answer_b", test.answer_b);
			sendData.append("points", test.points);
			insertQuestion(sendData, true);
		}
	}

	function insertQuestion(sendData, finish) {
		DB.getRaw("POST", "backend/insertQuestions.php", sendData)
			.then(function (response) {
				if (response.trim() === "ok") {
					addQuestionForm.clearForm();
					if (!finish) {
						location.reload();
					} else {
						window.location.href = `index.php`;
					}
					// console.log(response);
				}
			})
			.catch(function (reject) {
				console.log(reject);
			});
	}
}

let questionBtns = document.querySelectorAll(".questionBtn");

if (questionBtns) {
	questionBtns.forEach((questionBtn) => {
		questionBtn.addEventListener("click", showQuestion);
	});
}

function showQuestion(e) {
	let id = this.getAttribute("data-question");
	let sendData = new FormData();
	sendData.append("id", id);
	getSingleQuestion(sendData);
}

function getSingleQuestion(sendData) {
	DB.getAll("POST", "backend/getSingleQuestion.php", sendData)
		.then(function (response) {
			editQuestionForm(response);
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

function editQuestionForm(response) {
	let editQuestion = document.querySelector("#editQuestion");
	let questionTxt = editQuestion.querySelector('input[name="question"]');
	let answer_a = editQuestion.querySelector('input[name="answer_a"]');
	let answer_b = editQuestion.querySelector('input[name="answer_b"]');
	let points = editQuestion.querySelector('input[name="points"]');
	let editBtn = editQuestion.querySelector("#updateQuestion");
	questionTxt.value = response.question;
	answer_a.value = response.answer_a;
	answer_b.value = response.answer_b;
	points.value = response.points;
	editBtn.addEventListener("click", (e) => {
		e.preventDefault();
		let sendData = new FormData();
		sendData.append("id", response.id);
		sendData.append("testId", response.testId);
		sendData.append("question", questionTxt.value);
		sendData.append("answer_a", answer_a.value);
		sendData.append("answer_b", answer_b.value);
		sendData.append("points", points.value);

		updateQuestion(sendData);
	});
}
function updateQuestion(sendData) {
	DB.getAll("POST", "backend/updateQuestion.php", sendData)
		.then(function (response) {
			if (response.trim() === "ok") {
				location.reload();
			} else {
				console.log("imamo gresku");
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

// URADI TEST

let takeAtestBtn = document.querySelector("#takeThisTest");
let start = 0;
if (takeAtestBtn) {
	takeAtestBtn.addEventListener("click", takeThisTest);
	let testIntro = document.querySelector("#test-intro");

	function takeThisTest() {
		testIntro.style.display = "none";
		testStart.classList.remove("d-none");
		let id = this.getAttribute("data-id");
		let sendData = new FormData();
		sendData.append("testId", id);
		sendData.append("page", 1);
		sendData.append("start", 0);
		DB.getAll("POST", "backend/getAllQuestForTest.php", sendData)
			.then(function (response) {
				// console.log(response);
				nextQuestionBtn.setAttribute("data-id", response.testId);
				startTheTest(response);
			})
			.catch(function (reject) {
				console.log(reject);
			});
	}
}
function startTheTest(response) {
	questionText.innerText = response.question;
}

let testStart = document.querySelector("#questions");
let questionText = document.querySelector("#question_text");
let nextQuestionBtn = document.querySelector("#nextQuestion");
let myAnswer = document.querySelector("#myAnswer");
let answers = [];

if (nextQuestionBtn) {
	nextQuestionBtn.addEventListener("click", nextQuestion);
	function nextQuestion(e) {
		e.preventDefault();

		start++;
		myAnswerVal = myAnswer.value;
		answers.push(myAnswerVal);
		let id = this.getAttribute("data-id");
		let sendData = new FormData();
		sendData.append("testId", id);
		sendData.append("page", 1);
		sendData.append("start", start);

		DB.getAll("POST", "backend/getAllQuestForTest.php", sendData)
			.then(function (response) {
				if (response.id) {
					myAnswer.value = "";
					startTheTest(response);
				} else {
					// console.log(response);
					checkAnswers(id);
				}
			})
			.catch(function (reject) {
				console.log(reject);
			});
	}
}

function checkAnswers(testId) {
	let id = testId;
	// console.log(testId);
	let sendData = new FormData();
	// sendData.append("testId", id);
	for (let i = 0; i < answers.length; i++) {
		sendData.append(`answ${i}`, answers[i]);
	}
	DB.getAll("POST", `backend/checkAnswers.php?testId=${id}`, sendData)
		.then(function (response) {
			alert(response);
		})
		.catch(function (reject) {
			console.log(reject);
		});
}
