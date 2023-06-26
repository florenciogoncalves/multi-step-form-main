import interactivity from "./interactivity.js";

const form = document.querySelector(".content-area");

form.classList.contains("step-2")
	? interactivity.step2(form)
	: form.classList.contains("step-3")
	? interactivity.step3()
	: "";
// Forms pages
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
		document.querySelector(".dot").checked
			? (sessionStorage.yearly = true)
			: (sessionStorage.yearly = false);
		sessionStorage.plan = values.plan;
		sessionStorage.planValue = values.value;
		window.location.href = `../../add-ons.html`;
	}
	// Step-3
	if (form.classList.contains("step-3")) {
		interactivity.step3();
		let addOns = "[";
		let checkedRad = document.querySelectorAll(".input-radio:checked");
		checkedRad.forEach((el, idx) => {
			addOns += `{'name' : '${[el.name]}', 'value' : ${el.value}}${
				idx == checkedRad.length - 1 ? "" : ","
			}`;
		});
		addOns += "]";
		sessionStorage.addOns = addOns;
		window.location.href = "../../finishing.html";
	}
});
// Finishing page
if (document.querySelector(".finishing-values")) {
	// Finishing value
	let finishValue = parseInt(sessionStorage.planValue)
	const showValues = document.querySelector(".finishing-values");

	
	function update() {
		let planDurate = sessionStorage.yearly == "true" ? "yr" : "mo";
		// Show plan
		showValues.querySelector(".show-plan").textContent = `${
			sessionStorage.plan.charAt(0).toUpperCase() + sessionStorage.plan.slice(1)
		} (${planDurate == "yr" ? "Yearly" : "Monthly"})`;
		// Show plan value
		showValues.querySelector(".show-plan-value").textContent = `$${
			sessionStorage.planValue * (planDurate == "yr" ? 10 : 1)
		}/${planDurate}`;
		document.querySelector('.value-per').textContent = planDurate == 'yr' ? 'year' : 'month'
		// Change values on the screen based on yr or mo
		document.querySelectorAll('.change-value').forEach(val => {
			let txtContent = parseInt(val.textContent.replace(/[^\d.-]/g, ""))
			val.textContent = '+$' + parseInt(val.getAttribute('value')) *  (planDurate == 'yr' ? 10 : 1) + '/' + planDurate
			if (val.classList.contains('final-value'))
			val.textContent = '+$' + finishValue *  (planDurate == 'yr' ? 10 : 1) + '/' + planDurate
		})
	}
	

	// Show add-ons
		let planDurate = sessionStorage.yearly == "true" ? "yr" : "mo";
		let addOns = JSON.parse(sessionStorage.addOns.replace(/'/g, '"'));
		const insertAddOns = document.querySelector(".insert-values");
		// List selected add-ons on finishing page
		addOns.forEach((ele) => {
			insertAddOns.innerHTML += `<p class="text w-100 d-flex">${ele.name
				.split("-")
				.map(function (word) {
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join(" ")}<span class="title change-value month ms-auto" value="${ele.value}">+$${
				planDurate == "yr" ? ele.value * 10 : ele.value}/${planDurate}</span></p>`;
			finishValue += ele.value
		});
		// Show final montant
		document.querySelector('.final-value').textContent = '+$' + finishValue + '/' + planDurate
	update();
	// Change vizualization yr <-> mo
	document.querySelector(".change").addEventListener("click", () => {
		sessionStorage.yearly == "true"
			? sessionStorage.setItem("yearly", "false")
			: sessionStorage.setItem("yearly", "true");
		update();
	});
	document.querySelector('.btn.confirm').addEventListener('click', () => {
		window.location.href = '../../done.html'
	})
}	
