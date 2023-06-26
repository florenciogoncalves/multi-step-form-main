import interactivity from "./interactivity.js";

const form = document.querySelector(".content-area");

form.classList.contains('step-2') ? interactivity.step2(form) : form.classList.contains('step-3') ? interactivity.step3() : '';

form.addEventListener("submit", (evt) => {
	evt.preventDefault();
	// Step-1
	if (form.classList.contains("step-1")) {
		// Get inputs
		const name = form.querySelector("input[name='name']");
		const email = form.querySelector("input[name='email'");
		const tel = form.querySelector("input[name='tel'");
		// On submit
		let pass = true;
		// Validate name
		if (validateName() && validateEmail() && validateTel()) {
			sessionStorage.name = name.value;
			sessionStorage.email = email.value;
			sessionStorage.tel = tel.value;
			window.location.href = `../../select-plan.html?name=${name.value}&email=${email.value}&tel=${tel.value}`;
		} else {
			validateName();
			validateEmail();
			validateTel();
		}
		// Inputs events
		function setWrong(el, cond = true) {
			if (cond) {
				el.parentNode.classList.add("wrong");
			} else {
				el.parentNode.classList.remove("wrong");
			}
		}
		function validateName() {
			setWrong(name);
			let value = name.value;
			if (value.length > 0) {
				setWrong(name, false);
				return true;
			}
			return false;
		}
		function validateEmail() {
			setWrong(email);
			let value = email.value;
			if (value.includes("@") && value.includes(".")) {
				setWrong(email, false);
				return true;
			}
			return false;
		}
		function validateTel() {
			setWrong(tel);
			let value = tel.value;
			if (value.length > 9) {
				setWrong(tel, false);
				return true;
			}
			return false;
		}
		function addEventValidate(element, func) {
			element.addEventListener("input", func);
		}

		addEventValidate(name, validateName);
		addEventValidate(email, validateEmail);
		addEventValidate(tel, validateTel);
	}
	// Step-2
	if (form.classList.contains("step-2")) {
		evt.preventDefault();
		let values = JSON.parse(
			document.querySelector("[name='option']:checked").value.replace(/'/g, '"')
		);
		if (document.querySelector(".dot").checked) {
			sessionStorage.yearly = true;
			values.value *= 10;
		}
		else {
			sessionStorage.yearly = false;
		}
		sessionStorage.plan = values.plan;
		sessionStorage.planValue = values.value;
		window.location.href = `../../add-ons.html`;
	}
	// Step-3
	if (form.classList.contains("step-3")) {
		interactivity.step3();
		let addOns = '{'
		document.querySelectorAll('.input-radio:checked').forEach(el => {
			addOns += (`"${[el.name]}" : ${sessionStorage.yearly == 'true' ? el.value * 10 : el.value},`)
		})
		addOns += '}'
		console.log(addOns)
		sessionStorage.addOns = addOns
		window.location.href = '../../finishing.html'
	}
});
