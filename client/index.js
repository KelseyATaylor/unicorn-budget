const baseURL = "http://localhost:4343";

// const newCategory = document.querySelector("new-category-form");

const loadCategory = document.querySelector("#load-category");
const addButton = document.querySelector("#addLine");

const displayBudget = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		createBudgetLine(arr[i]);
	}
};

const showBudget = () => {
	axios
		.get(`${baseURL}/api/budget`)
		.then((res) => {
			displayBudget(res.data);
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const createBudgetLine = (line) => {
	//div
	const budget_line = document.createElement("div");
	budget_line.classList.add("budget-line");
	loadCategory.appendChild(budget_line);

	//form
	const inputLine = document.createElement("form");
	inputLine.classList.add("inputLine");

	//CATEGORY
	const ic = document.createElement("div");
	ic.classList.add("currency-wrap");
	const input_category = document.createElement("input");
	// input_category.classList.add("text-input");
	input_category.classList.add("cat-input");
	input_category.type = "text";
	input_category.value = `${line.category}`;
	input_category.setAttribute("readonly", "readonly");
	input_category.setAttribute("id", `category-input-${line.budget_id}`);

	ic.appendChild(input_category);
	inputLine.appendChild(ic);

	//AMOUNT BUDGETED
	const ib = document.createElement("div");
	ib.classList.add("currency-wrap");
	const ib_c = document.createElement("span");
	ib_c.classList.add("currency-code");
	ib_c.innerHTML = "$";
	const input_budgeted = document.createElement("input");
	input_budgeted.classList.add("text-input");
	input_budgeted.classList.add("budg-input");

	input_budgeted.type = "number";
	input_budgeted.value = `${line.amount}`;
	input_budgeted.setAttribute("readonly", "readonly");
	input_budgeted.setAttribute("id", `amount-input-${line.budget_id}`);
	input_budgeted.setAttribute("step", "0.01");

	//This will display the amount values in the correct currency format, but as a string. Alas. So--saving for later in case I want to figure out an if-else toggle option to display a string on save vs input number on edit
	// let formatted_ib = new Intl.NumberFormat("en-US", {
	// 	style: "currency",
	// 	currency: "USD",
	// }).format(`${line.amount}`);
	// input_budgeted.value = formatted_ib;

	ib.appendChild(ib_c);
	ib.appendChild(input_budgeted);
	inputLine.appendChild(ib);

	//SPENT
	const is = document.createElement("div");
	is.classList.add("currency-wrap");
	const is_c = document.createElement("span");
	is_c.classList.add("currency-code");
	is_c.innerHTML = "$";
	const input_spent = document.createElement("input");
	input_spent.classList.add("text-input");
	input_spent.classList.add("spt-input");

	input_spent.type = "number";
	input_spent.value = `${line.spent}`;
	input_spent.setAttribute("readonly", "readonly");
	input_spent.setAttribute("id", `spent-input-${line.budget_id}`);
	input_spent.setAttribute("step", "0.01");

	is.appendChild(is_c);
	is.appendChild(input_spent);
	inputLine.appendChild(is);

	//AVAILABLE
	const av = document.createElement("div");
	av.classList.add("currency-wrap");
	const av_c = document.createElement("span");
	av_c.classList.add("currency-code");
	av_c.innerHTML = "$";
	const available = document.createElement("input");
	available.classList.add("text-input");
	available.classList.add("av-input");

	available.value = `${line.amount - line.spent}`;
	available.setAttribute("readonly", "readonly");
	available.setAttribute("step", "0.01");
	available.setAttribute("id", `available-${line.budget_id}`);

	av.appendChild(av_c);
	av.appendChild(available);
	inputLine.appendChild(av);

	if (available.value === 0) {
		available.classList.add("available-color-no");
	}

	//EDIT BUTTON
	const edit_btn = document.createElement("button");
	edit_btn.classList.add("edit-btn");
	edit_btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
	// edit_btn.setAttribute("onclick", `editLine(${line.budget_id})`);

	inputLine.appendChild(edit_btn);
	budget_line.appendChild(inputLine);

	edit_btn.addEventListener("click", (e) => {
		e.preventDefault();

		if (edit_btn.innerHTML == '<i class="fa-solid fa-pen-to-square"></i>') {
			edit_btn.innerHTML = `<i class="fa-solid fa-floppy-disk save-floppy" onclick="editLine_save(${line.budget_id})"></i>`;
			input_category.removeAttribute("readonly");
			input_budgeted.removeAttribute("readonly");
			input_spent.removeAttribute("readonly");
			input_spent.focus();
			available.removeAttribute("readonly");

			// DELETE BUTTON & functionality
			const delete_btn = document.createElement("button");
			delete_btn.classList.add("delete-btn");
			delete_btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
			delete_btn.setAttribute("id", "delete-btn");

			inputLine.appendChild(delete_btn);

			delete_btn.addEventListener("click", () => {
				window.confirm("Are you sure you want to delete?");
				axios.delete(`${baseURL}/api/budget/${line.budget_id}`).then((res) => {
					loadCategory.innerHTML = "";
					displayBudget(res.data);
					// location.reload();
				});
			});
		} else {
			edit_btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
			input_category.setAttribute("readonly", "readonly");
			input_budgeted.setAttribute("readonly", "readonly");
			input_spent.setAttribute("readonly", "readonly");
			available.setAttribute("readonly", "readonly");

			const delete_btn = document.getElementById("delete-btn");
			inputLine.removeChild(delete_btn);
		}
	});

	const av_amt = document.getElementById(`available-${line.budget_id}`);
	if (av_amt.value > 0) {
		av_amt.classList.add("available-color-yes");
	} else {
		av_amt.classList.remove("avilable-color-yes");
	}

	// const toBeBudgeted_input = document.getElementById(to_be_budgeted);

	// delete_btn.addEventListener("submit", (e) => {
	// 	e.preventDefault();
	// 	window.alert("Category deleted successully!");
	// });
};

const editLine_save = (budget_id) => {
	//access the ids & make them the values of my object
	const cat_input = document.getElementById(`category-input-${budget_id}`);
	const amt_input = document.getElementById(`amount-input-${budget_id}`);
	const spt_input = document.getElementById(`spent-input-${budget_id}`);

	let edit_object = {
		category: cat_input.value,
		amount: amt_input.value,
		spent: spt_input.value,
	};
	axios.put(`${baseURL}/api/budget/${budget_id}`, edit_object).then((res) => {
		loadCategory.innerHTML = "";
		displayBudget(res.data);
		location.reload();
	});
};

// Add a line
const addLine = () => {
	let categoryInput = document.querySelector("#categoryInput");
	let amountInput = document.querySelector("#amountInput");
	// let spentInput = document.querySelector("#spentInput");

	let newLine = {
		category: categoryInput.value,
		amount: amountInput.value,
		// spent: spentInput.value,
	};

	axios.post(`${baseURL}/api/budget`, newLine).then((res) => {
		loadCategory.innerHTML = "";

		categoryInput.innerHTML = "";
		amountInput.innerHTML = "";
		// spentInput.innerHTML = "";
		displayBudget(res.data);
		location.reload();
	});
};

addButton.addEventListener("click", addLine);

showBudget();
