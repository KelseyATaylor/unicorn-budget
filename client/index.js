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

	let available = `${line.amount - line.spent}`;

	const inputLine = document.createElement("form");
	inputLine.setAttribute("id", "inputLine-form");

	// const someToggleName = () => {
	// };

	inputLine.innerHTML = `
    <input type="text" name="category" class="text2" id="test1" value="${line.category}" readonly></input>
	<input type="number" name="amount" class="text2" value="${line.amount}" step=".01" readonly></input>
	<input type="number" name="spent" class="text2" value = "${line.spent}" readonly ></input>
	<input type="number" name="available" value="${available}" readonly></input>
	
    <button id='primary_edit_btn'><i class="fa-solid fa-pen-to-square"></i></button>

	`;
	budgetLine.appendChild(inputLine);

	inputLine.addEventListener("submit", (e) => {
		e.preventDefault();
		let edit_btn = document.getElementById("primary_edit_btn");
		// let editCategory = document.querySelector("#test1");
		if (edit_btn.innerHTML == '<i class="fa-solid fa-pen-to-square"></i>') {
			edit_btn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
		} else {
			edit_btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
		}
	});

	const delete_btn = document.createElement("button");
	delete_btn.classList.add("delete2");
	delete_btn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
	delete_btn.setAttribute("onclick", `deleteLine(${line.budget_id})`);
	budgetLine.appendChild(delete_btn);

	delete_btn.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	// const input_test = document.createElement("input");
	// input_test.classList.add("text2");
	// input_test.type = "text";
	// input_test.value = `${line.category}`;
	// input_test.setAttribute("readonly", "readonly");
	// budgetLine.appendChild(input_test);

	// Removed this from above - not sure how to make it work but I don't want to delete it just in case
	// <button onclick="updateLine(${line.budget_id})">
	// 		<i class="fa-solid fa-pen-to-square"></i>
	// 	</button>;

	//creates the actions class + edit & delete buttons
	// const actions_el = document.createElement("div");
	// actions_el.classList.add("actions2");

	// const edit_el = document.createElement("button");
	// edit_el.classList.add("edit2");
	// // edit_el.setAttribute("id", "edit-id");
	// edit_el.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

	// const delete_el = document.createElement("button");
	// delete_el.classList.add("delete2");
	// delete_el.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

	// //turns edit & delete into children of class Actions
	// actions_el.appendChild(edit_el);
	// actions_el.appendChild(delete_el);

	// //appends actions to task_el_2 (needs a new name) then that appends to loadCategory
	// task_el_2.appendChild(actions_el);

	//EventListener
	// const editToggle = document.getElementById("edit-id");
	// const getTextInput = document.getElementById("test1");

	// edit_el.addEventListener("click", (e) => {
	// 	if (edit_el.innerHTML == '<i class="fa-solid fa-pen-to-square"></i>') {
	// 		edit_el.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';

	// 		budgetLine.removeAttribute("readonly");
	// 		budgetLine.focus();
	// 	} else {
	// 		edit_el.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
	// 		budgetLine.setAttribute("readonly", "readonly");
	// 	}
	// });
	loadCategory.appendChild(task_el_2);
};

const deleteLine = (budget_id) => {
	axios.delete(`${baseURL}/api/budget/${budget_id}`).then((res) => {
		loadCategory.innerHTML = "";
		displayBudget(res.data);
	});
};

const editLine = (budget_id) => {
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
	let spentInput = document.querySelector("#spentInput");

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
	});
};

addButton.addEventListener("click", addLine);

showBudget();
