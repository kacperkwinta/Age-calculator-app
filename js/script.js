"use strict";

// Get input elements and output elements
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const dayOutput = document.querySelector(".days");
const monthOutput = document.querySelector(".months");
const yearOutput = document.querySelector(".years");

// Get error message element
const errorMessage = document.querySelector(".input-error--message");

// Get calculate button and attach click event listener
const btn = document.querySelector(".btn");
btn.addEventListener("click", calcDate);

// Function to calculate date difference and display the result
function calcDate() {
	// Validate input fields
	const inputIsValid = validateInput(day, month, year);
	if (!inputIsValid) return;
	// Convert input date and current date to dayjs objects
	const inputDate = dayjs(`${year.value}-${month.value}-${day.value}`);
	const now = dayjs();

	// Calculate the difference in years, months and days
	const years = now.diff(inputDate, "year");
	const months = now.diff(inputDate, "month") % 12;
	const days = now.diff(inputDate, "day") % 30;

	// Display the result in output elements
	yearOutput.textContent = years;
	monthOutput.textContent = months;
	dayOutput.textContent = days;
}

// Function to validate input fields
function validateInput(day, month, year) {
	let isValid = true;
	const inputs = [day, month, year];
	inputs.forEach((input) => {
		const value = input.value;
		const label = input.previousElementSibling;
		const error = input.nextElementSibling;
		if (value === "") {
			error.textContent = "This field is required!";
			label.classList.add("input-error--label");
			input.classList.add("input-error--border");
			isValid = false;
		} else {
			const dayValue = Number(day.value);
			const monthValue = Number(month.value);
			const yearValue = Number(year.value);
			const date = dayjs(`${yearValue}-${monthValue}-${dayValue}`);
			if (date.isValid() && date.endOf("month").date() >= dayValue) {
				error.textContent = "";
				label.classList.remove("input-error--label");
				input.classList.remove("input-error--border");
			} else {
				error.textContent = "Invalid date!";
				label.classList.add("input-error--label");
				input.classList.add("input-error--border");
				isValid = false;
			}
		}
	});
	return isValid;
}
