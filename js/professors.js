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
