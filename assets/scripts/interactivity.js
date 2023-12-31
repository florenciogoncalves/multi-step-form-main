export default {
	step2: function (father) {
		const yearly = document.querySelector(".switch .dot");
		yearly.addEventListener("change", () => {
			document.querySelectorAll(".option ._value").forEach((el) => {
				let intValue = parseInt(
					el.textContent.substring(1, el.textContent.length - 2)
				);
				el.textContent = `$${yearly.checked ? intValue * 10 : intValue / 10}/${
					yearly.checked ? "yr" : "mo"
				}`;
			});
			yearly.checked
				? father.classList.add("yearly-view")
				: father.classList.remove("yearly-view");
		});
	},
	step3: function () {
		// Radios
		if(sessionStorage.yearly != 'true') {
			document.querySelectorAll('.yearly-promotion').forEach(el => {
			el.textContent = '+$' + parseInt(el.textContent.replace(/[^\d.-]/g, ""))*10 + '/yr'
			})
			
		}
		document.querySelectorAll(".options .input-radio").forEach((el) => {
			el.addEventListener("change", () => {
				if (el.checked)
					el.parentNode.parentNode
						.querySelector(".checkout")
						.classList.add("checked");
				else
					el.parentNode.parentNode
						.querySelector(".checkout")
						.classList.remove("checked");
			});
		});
	},
};
