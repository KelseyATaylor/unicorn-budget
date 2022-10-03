const baseURL = "http://localhost:4343";

// const newCategory = document.querySelector("new-category-form");

const loadCategory = document.querySelector("#load-category");
const addButton = document.querySelector("#addLine");

//Axios request to get my budget array
//Loop over that array
// Create budget lines for each item in the array

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
	//create div for class=task2
	const task_el_2 = document.createElement("div");
	task_el_2.classList.add("task2");

	const budgetLine = document.createElement("div");
	budgetLine.classList.add("budget-line");
	task_el_2.appendChild(budgetLine);

	const inputLine = document.createElement("form");
	inputLine.setAttribute("id", "inputLine-form");

	const input_category = document.createElement("input");
	input_category.classList.add("text2");
	input_category.type = "text";
	input_category.value = `${line.category}`;
	input_category.setAttribute("readonly", "readonly");

	inputLine.appendChild(input_category);

	const input_budgeted = document.createElement("input");
	input_budgeted.classList.add("text2");
	input_budgeted.type = "number";
	input_budgeted.value = `${line.amount}`;
	input_budgeted.setAttribute("readonly", "readonly");

	inputLine.appendChild(input_budgeted);

	const input_spent = document.createElement("input");
	input_spent.classList.add("text2");
	input_spent.type = "number";
	input_spent.value = `${line.spent}`;
	input_spent.setAttribute("readonly", "readonly");

	inputLine.appendChild(input_spent);

	// const available = document.createElement("input");
	// available.classList.add("text2");
	// available.value = `${line.amount - line.spent}`;
	// available.setAttribute("readonly", "readonly");

	// inputLine.appendChild(available);

	const edit_btn = document.createElement("button");
	edit_btn.classList.add("edit2");
	edit_btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
	// edit_btn.setAttribute("onclick", `editLine(${line.budget_id})`);

	inputLine.appendChild(edit_btn);

	budgetLine.appendChild(inputLine);

	edit_btn.addEventListener("click", (e) => {
		e.preventDefault();
		// let edit_btn = document.getElementById("primary_edit_btn");
		if (edit_btn.innerHTML == '<i class="fa-solid fa-pen-to-square"></i>') {
			edit_btn.innerHTML = `<i class="fa-solid fa-circle-plus" onclick="editLine_save(${line.budget_id})"></i>`;
			input_category.removeAttribute("readonly");
			input_budgeted.focus();
			input_budgeted.removeAttribute("readonly");
			input_spent.removeAttribute("readonly");
		} else {
			edit_btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
			input_category.setAttribute("readonly", "readonly");
			input_budgeted.setAttribute("readonly", "readonly");
			input_spent.setAttribute("readonly", "readonly");
		}
	});

	const delete_btn = document.createElement("button");
	delete_btn.classList.add("delete2");
	delete_btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	// delete_btn.setAttribute("onclick", `deleteLine(${line.budget_id})`);
	budgetLine.appendChild(delete_btn);

	delete_btn.addEventListener("click", () => {
		axios.delete(`${baseURL}/api/budget/${line.budget_id}`).then((res) => {
			loadCategory.innerHTML = "";
			displayBudget(res.data);
			location.reload();
		});
	});

	// delete_btn.addEventListener("submit", (e) => {
	// 	e.preventDefault();
	// 	window.alert("Category deleted successully!");
	// });

	loadCategory.appendChild(task_el_2);
};

// const deleteLine = (budget_id) => {
// 	axios.delete(`${baseURL}/api/budget/${budget_id}`).then((res) => {
// 		loadCategory.innerHTML = "";
// 		displayBudget(res.data);
// 	});
// };

const editLine_save = (budget_id) => {
	axios.put(`${baseURL}/api/budget/${budget_id}`).then((res) => {
		loadCategory.innerHTML = "";
		displayBudget(res.data);
	});
};

//TESTING THIS CODE FROM YT-TASK LIST
window.addEventListener("load", () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const budgetInput = document.querySelector("#new-budgeted-amount-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const task = input.value; // ??
		const taskb = budgetInput.value;

		//creates the div with class task
		const task_el = document.createElement("div");
		task_el.classList.add("task");

		//creates the div with class content and makes it the child of div class=task
		const task_content_el = document.createElement("div");
		task_content_el.classList.add("content");
		task_el.appendChild(task_content_el);

		//creates the input element with class 'text' - assigns the type to text, value and readonly. Then makes it the child of task_content (class = content)
		const task_input_el = document.createElement("input");
		task_input_el.classList.add("text");
		task_input_el.type = "text";
		task_input_el.value = task; //maybe this can be the ${}bit
		task_input_el.setAttribute("readonly", "readonly");
		task_content_el.appendChild(task_input_el);

		//BUDGET TEST INPUT
		const taskb_input_el = document.createElement("input");
		taskb_input_el.classList.add("text");
		taskb_input_el.type = "number";
		taskb_input_el.step = ".01";
		taskb_input_el.value = taskb;
		taskb_input_el.setAttribute("readonly", "readonly");
		task_content_el.appendChild(taskb_input_el);

		//creates actions class and edit & delete buttons
		const task_actions_el = document.createElement("div");
		task_actions_el.classList.add("actions");

		const task_edit_el = document.createElement("button");
		task_edit_el.classList.add("edit");
		task_edit_el.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

		const task_delete_el = document.createElement("button");
		task_delete_el.classList.add("delete");
		task_delete_el.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

		//turns edit and delete into child of class actions
		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		//appends task actions to class task, then appends that to list_el(query selector of #tasks)
		task_el.appendChild(task_actions_el);
		list_el.appendChild(task_el);

		input.value = "";

		task_edit_el.addEventListener("click", (e) => {
			if (task_edit_el.innerHTML == '<i class="fa-solid fa-pen-to-square"></i>') {
				task_edit_el.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
				task_input_el.removeAttribute("readonly");
				taskb_input_el.removeAttribute("readonly");
				task_input_el.focus();
				taskb_input_el.focus();
			} else {
				task_edit_el.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
				taskb_input_el.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
				task_input_el.setAttribute("readonly", "readonly");
				taskb_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener("click", (e) => {
			list_el.removeChild(task_el);
		});
	});
});

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
