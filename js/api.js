function FormValidator(formName, inputs, checkPassword) {
	this.form = document.querySelector(`#${formName}`);
	this.formErrors = {};
	this.registerCheck = checkPassword;

	for (let i = 0; i < inputs.length; i++) {
		this[inputs[i]] = inputs[i];

		this[inputs[i]] = this.form.querySelector(`input[name="${inputs[i]}"]`);
		this.inputContainer = this[inputs[i]].parentElement;
		this[inputs[i] + "Error"] = document.createElement("div");
		this[inputs[i] + "Error"].className = `${inputs[i]}Error`;
		this.inputContainer.append(this[inputs[i] + "Error"]);
	}

	this.sendFromData = function () {
		if (Object.keys(this.formErrors).length < 1) {
			for (let i = 0; i < inputs.length; i++) {
				this.formData[inputs[i]] = this[inputs[i] + "Value"];
			}
		}
		regNotification.innerText = "";
	};

	this.checkForErrors = function () {
		for (let i = 0; i < inputs.length; i++) {
			this[inputs[i] + "Value"] = this[inputs[i]].value;
			if (this[inputs[i] + "Value"] === "") {
				this[inputs[i]].classList.add("error");
				this.formErrors[inputs[i] + "Error"] = `${inputs[i]} Error`;
				this[inputs[i] + "Error"].innerText = `${inputs[
					i
				].toUpperCase()} is required`;
			} else {
				this[inputs[i]].classList.remove("error");
				delete this.formErrors[inputs[i] + "Error"];
				this[inputs[i] + "Error"].innerText = "";
			}
		}
	};

	this.checkForm = function () {
		this.formData = {};

		if (this.registerCheck) {
			this.checkForErrors();

			if (this.password.value && this.confirmPassword.value) {
				if (this.password.value === this.confirmPassword.value) {
					this.sendFromData();
					this.removePassErrors();
				} else {
					this.passErrors();
				}
			} else {
				this.passErrors();
			}
		} else {
			this.checkForErrors();
			this.sendFromData();
		}
	};
	this.passErrors = function () {
		this.password.classList.add("error");
		this.confirmPassword.classList.add("error");
	};
	this.removePassErrors = function () {
		this.password.classList.remove("error");
		this.confirmPassword.classList.remove("error");
	};
	this.clearForm = function () {
		for (let i = 0; i < inputs.length; i++) {
			this[inputs[i]].value = "";
		}
	};
}

// PROMISES

// MISLIM DA SE PROBLEM NALAZI OVDE KOD POGRESNOG HANDLOVANJA ERRORA odnosno rejecta
class DB {
	static getAll(method, url, sendData) {
		let data = new Promise(function (resolve, reject) {
			let xml = new XMLHttpRequest();
			xml.open(method, url);
			// xml.onreadystatechange = function () {
			// 	if (xml.readyState === 4) {
			// 		if (xml.status === 200) {
			// 			resolve(JSON.parse(xml.responseText));
			// 		} else {
			// 			reject("NEKI ERROR");
			// 		}
			// 	}
			// };
			xml.onload = function () {
				// console.log("ready: ", xml.readyState);
				if (xml.status === 200) {
					// console.log("ready: ", xml.readyState);
					resolve(JSON.parse(xml.responseText));
				} else {
					reject("NEKI ERROR");
				}
			};
			xml.send(sendData);
		});
		return data;
	}

	static getRaw(method, url, sendData) {
		let data = new Promise(function (resolve, reject) {
			let xml = new XMLHttpRequest();
			xml.open(method, url);
			// xml.onreadystatechange = function () {
			// 	if (xml.readyState === 4) {
			// 		if (xml.status === 200) {
			// 			resolve(xml.responseText);
			// 		} else {
			// 			reject("NEKI ERROR");
			// 		}
			// 	}
			// };
			// console.log("ready: ", xml.readyState);
			xml.onload = function () {
				if (xml.status === 200) {
					// console.log("ready: ", xml.readyState);
					resolve(xml.responseText);
				} else {
					reject("NEKI ERROR");
				}
			};

			xml.send(sendData);
		});
		return data;
	}
}
