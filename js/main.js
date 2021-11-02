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

let regNotification = document.querySelector("#regNotification");

function registerUser(sendData) {
	DB.getRaw("POST", "backend/registerUser.php", sendData)
		.then(function (resolve) {
			regNotification.innerText = "";
			if (resolve.trim() === "success") {
				console.log(resolve);
				regNotification.innerHTML = `<p> Uspeli ste da se registujete. Sada treba da se ulogujete na <a href="login.php">Login stranici</a>`;
			} else {
				regNotification.innerHTML = `Registracija nije uspela: ${resolve} Verovatno treba jaca lozinka`;
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

// LOGIN
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

// DELETE USER
function deleteUser(e) {
	e.preventDefault();
	let deleteConf = confirm("Are you shure you want to delete user");

	if (deleteConf) {
		sendData = new FormData();
		sendData.append("id", this.id);
		DB.getRaw("POST", "backend/deleteUser.php", sendData)
			.then(function (resolve) {
				if (resolve.trim() === "ok") {
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

// SPREMANJE TABELE ZA EDITOVANJE USERA SA ADMIN DOZVOLOM
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

// TABELA ZA EDITOVANJE USERA BS MODAL
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

// SNIMANJE IZMENA ZA USERA
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
			console.log(response);
			if (response.trim() === "ok") {
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
