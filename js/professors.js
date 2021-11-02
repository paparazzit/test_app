let profesoriBtn = document.querySelectorAll(".profesori");
let testovi = document.querySelector("#testovi");
let allProfesori = document.querySelector(".profesoriAll");

if (allProfesori) {
	allProfesori.addEventListener("click", getTests);
}
if (profesoriBtn) {
	profesoriBtn.forEach((profBtn) => {
		profBtn.addEventListener("click", profSelect);
	});
	function profSelect(e) {
		let profId = this.getAttribute("data-prof");
		let sendData = new FormData();
		sendData.append("userId", profId);
		getProfTests(sendData);
	}

	getTests();
}

function getTests() {
	DB.getAll("POST", "backend/getAllTests.php")
		.then(function (response) {
			createTestView(response);
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

function getProfTests(sendData) {
	DB.getAll("POST", "backend/getTestByProfId.php", sendData)
		.then(function (response) {
			createTestView(response);
		})
		.catch(function (reject) {
			console.log(reject);
		});
}
function getTestPoints(sendData) {
	DB.getAll("POST", "backend/getTestPoints.php", sendData)
		.then(function (response) {
			// console.log(response);
		})
		.catch(function (reject) {
			// console.log(reject);
		});
}

function createTestView(tests) {
	let text = "";
	tests.forEach((test) => {
		getPoints(test.id);
		text += `
		<div class ="col-4 p-2">
		<div class="card">
		<div class="card-header">${test.testName}</div>
		<div class="card-body">Author: ${test.authorName} <br>
							   Max points: ${test.totalPoints}</div>
		<div class="card-footer">
	
		<a href ="takeATest.php?id=${test.id}" class="btn btn-info takeTest">Take test</a>
	
		</div>
		</div>
		</div>
		`.trim();
	});
	if (testovi) {
		testovi.innerHTML = text;
	}
}

function getPoints(testId) {
	let sendData = new FormData();
	sendData.append("testId", testId);
	getTestPoints(sendData);
}
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
// function checkAnswer(answer_a, answer_b) {
// 	let myAnswer = answer_a;
// 	console.log(myAnswer);
// }
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
