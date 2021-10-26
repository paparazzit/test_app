// FORM VALIDATOR REGISTER

let registerBtn = document.querySelector("#registerBtn");
if (registerBtn) {
	let register = new FormValidator(
		"register",
		["name", "email", "password", "confirmPassword"],
		true
	);
	registerBtn.addEventListener("click", registerForm);
	function registerForm(e) {
		e.preventDefault();
		register.checkForm();
		if (Object.keys(register.formData).length > 0) {
			let sendData = new FormData();
			sendData.append("name", register.formData.name);
			sendData.append("email", register.formData.email);
			sendData.append("password", register.formData.password);
			registerUser(sendData);
		}
	}
}

let loginBtn = document.querySelector("#loginBtn");
if (loginBtn) {
	let loginForm = new FormValidator("loginUser", ["email", "password"], false);
	loginBtn.addEventListener("click", loginUserForm);
	function loginUserForm(e) {
		e.preventDefault();
		loginForm.checkForm();
		if (Object.keys(loginForm.formData).length > 0) {
			// console.log(loginForm.formData);
			sendData = new FormData();
			sendData.append("email", loginForm.formData.email);
			sendData.append("password", loginForm.formData.password);
			loginUser(sendData);
		}
	}
}

// Promise handlers
let regNotification = document.querySelector("#regNotification");

function registerUser(sendData) {
	DB.getRaw("POST", "backend/registerUser.php", sendData)
		.then(function (resolve) {
			regNotification.innerText = "";
			if (resolve === "success") {
				console.log(resolve);
				regNotification.innerHTML = `<p> Uspeli ste da se registujete. Sada treba da se ulogujete na <a href="login.php">Login stranici</a>`;
			} else {
				regNotification.innerHTML = `Registracija nije uspela: ${resolve}`;
			}
		})
		.catch(function (reject) {
			regNotification.innerText = "";
			if (reject) {
				regNotification.innerHTML = `Registracija nije uspela: ${reject}`;
			}
			console.log(reject, "Neuspesno");
		});
}

function loginUser(sendData) {
	DB.getAll("POST", "backend/loginUser.php", sendData)
		.then(function (resolve) {
			if (!resolve.role) {
				regNotification.style.border = "1px solid red";
				regNotification.innerText = resolve;
			} else {
				regNotification.style.border = "none";
				regNotification.innerText = "";
				window.location.href = "index.php";
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

let deleteUserBtns = document.querySelectorAll(".deleteUser");
if (deleteUserBtns) {
	deleteUserBtns.forEach((deleteUserBtn) => {
		deleteUserBtn.addEventListener("click", deleteUser);
	});
}

function deleteUser(e) {
	let deleteConf = confirm("Are you shure you want to delete user");

	if (deleteConf) {
		sendData = new FormData();
		sendData.append("id", this.id);
		DB.getRaw("POST", "backend/deleteUser.php", sendData)
			.then(function (resolve) {
				if (resolve === "ok") {
					window.location.href = "allUsers.php";
				}
			})
			.catch(function (reject) {
				console.log(reject);
			});
	}
}

let editUserBtns = document.querySelectorAll(".editUser");
let editModal = document.querySelector("#editModal");
if (editUserBtns) {
	editUserBtns.forEach((editUserBtn) => {
		editUserBtn.addEventListener("click", editUserSetup);
	});
}

function editUserSetup(e) {
	let userId = document.querySelector('input[name="id"]');
	let userName = document.querySelector('input[name="name"]');
	let userEmail = document.querySelector('input[name="email"]');
	let userRole = document.querySelector('select[name="role"]');
	id = this.getAttribute("data-id");
	console.log(this.getAttribute("data-id"));
	sendData = new FormData();
	sendData.append("id", id);
	DB.getRaw("POST", "backend/getSingleUser.php", sendData)
		.then(function (resolve) {
			let user = JSON.parse(resolve);
			userId.value = user.id;
			userName.value = user.name;
			userEmail.value = user.email;
			if (user.role === "admin") {
				userRole.innerHTML = `
						<option value="admin" selected>admin</option>
                        <option value="moderator" >Moderator</option>
                        <option value="guest" >guest</option>
				`.trim();
			}
			if (user.role === "moderator") {
				userRole.innerHTML = `
				<option value="admin" >admin</option>
				<option value="moderator" selected>Moderator</option>
				<option value="guest" >guest</option>
		`.trim();
			}
			if (user.role === "guest") {
				userRole.innerHTML = `
				<option value="admin" >admin</option>
				<option value="moderator" >Moderator</option>
				<option value="guest" selected>guest</option>
		`.trim();
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

let updateUserBtn = document.querySelector("#updateUser");
if (updateUserBtn) {
	updateUserBtn.addEventListener("click", editModalForm);
}

function editModalForm(e) {
	e.preventDefault();
	let role = document.querySelector('select[name="role"]');
	let email = document.querySelector('input[name="email"]');
	let name = document.querySelector('input[name="name"]');
	let id = document.querySelector('input[name="id"]');
	if (name.value === "" || email.value === "") {
		alert("Some fields are  empty");
	} else {
		let sendData = new FormData();
		sendData.append("name", name.value);
		sendData.append("email", email.value);
		sendData.append("role", role.value);
		sendData.append("id", id.value);

		updateUser(sendData);
	}
}

function updateUser(sendData) {
	DB.getAll("POST", "backend/updateUser.php", sendData)
		.then(function (resolve) {
			if (resolve === "ok") {
				window.location.href = "allUsers.php";
			} else {
				console.log(resolve);
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

// USER PROFILE EDITS

// change Name
let changeNameBtn = document.querySelector("#changeName");
if (changeNameBtn) {
	changeNameBtn.addEventListener("click", changeName);
}
function changeName() {
	id = this.getAttribute("data-id");
	let userNameValue = document.querySelector('input[name="editName"]');
	// console.log(userNameValue.value);
	let sendData = new FormData();
	sendData.append("id", id);
	sendData.append("name", userNameValue.value);
	DB.getRaw("POST", "backend/changeName.php", sendData)
		.then(function (response) {
			if (response === "ok") {
				changeNameBtn.className = "btn btn-success";
			} else {
				changeNameBtn.className = "btn btn-warning";
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

//change Email
let changeEmailBtn = document.querySelector("#changeEmail");
if (changeEmailBtn) {
	changeEmailBtn.addEventListener("click", changeEmail);
}
function changeEmail() {
	id = this.getAttribute("data-id");

	let userEmailValue = document.querySelector('input[name="editEmail"]');

	let sendData = new FormData();
	sendData.append("id", id);
	sendData.append("email", userEmailValue.value);
	DB.getRaw("POST", "backend/changeEmail.php", sendData)
		.then(function (response) {
			if (response === "ok") {
				changeEmailBtn.className = "btn btn-success";
			} else {
				changeEmailBtn.className = "btn btn-warning";
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

// change role

let userRoleSlct = document.querySelector('select[name ="userRole"]');

if (userRoleSlct) {
	userRoleSlct.addEventListener("change", changeUserRole);
}

function changeUserRole() {
	let newRole = this.value;
	let id = this.getAttribute("data-id");
	// console.log(newRole, " ", id);
	let sendData = new FormData();
	sendData.append("id", id);
	sendData.append("userRole", newRole);

	DB.getRaw("POST", "backend/changeRole.php", sendData)
		.then(function (response) {
			if (response === "ok") {
				console.log(response);
			} else {
				console.log(response);
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

// Change password

let changePassBtn = document.querySelector("#updatePassword");

if (changePassBtn) {
	let changePasswordForm = new FormValidator(
		"changePasswordForm",
		["oldPassword", "password", "confirmPassword"],
		true
	);
	changePassBtn.addEventListener("click", changePassword);

	function changePassword() {
		let id = this.getAttribute("data-id");
		changePasswordForm.checkForm();
		if (Object.keys(changePasswordForm.formData).length > 0) {
			sendData = new FormData();
			sendData.append("oldPassword", changePasswordForm.formData.oldPassword);
			sendData.append("password", changePasswordForm.formData.password);
			sendData.append(
				"confirmPassword",
				changePasswordForm.formData.confirmPassword
			);
			sendData.append("id", id);

			changeUserPassword(sendData);
		}
	}
}

function changeUserPassword(sendData) {
	let notification = document.querySelector("#regNotification");
	DB.getRaw("POST", "backend/changePassword.php", sendData)
		.then(function (response) {
			notification.innerText = "";
			if (response === "ok") {
				changePassBtn.className = "btn btn-success";
				notification.innerText = "Password Changed";
			} else {
				changePassBtn.className = "btn btn-danger";
				notification.innerText = "Password Not Changed";
			}
		})
		.catch(function (reject) {
			console.log(reject);
		});
}

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
			insertQuestion(sendData);
		}
	}

	function insertQuestion(sendData) {
		DB.getRaw("POST", "backend/insertQuestions.php", sendData)
			.then(function (response) {
				if (response === "ok") {
					addQuestionForm.clearForm();
					location.reload();
				}
			})
			.catch(function (reject) {
				console.log(reject);
			});
	}
}

// TESTOVI VIEW

// index

let profesoriBtn = document.querySelectorAll(".profesori");
let testovi = document.querySelector("#testovi");
if (profesoriBtn) {
	profesoriBtn.forEach((profBtn) => {
		profBtn.addEventListener("click", profSelect);
	});
	function profSelect(e) {
		console.log(this.getAttribute("data-prof"));
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

function createTestView(tests) {
	let text = "";
	tests.forEach((test) => {
		text += `
		<div class ="col-4 p-2">
		<div class="card">
		<div class="card-header">${test.testName}</div>
		<div class="card-body">Author: ${test.authorName}</div>
		<div class="card-footer"><button data-id="${test.id}" class="btn btn-info">Take test</button></div>
		</div>
		</div>
		`.trim();
	});
	testovi.innerHTML = text;
}
