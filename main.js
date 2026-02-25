let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let chart;

function saveData(){
localStorage.setItem("expenses",JSON.stringify(expenses));
localStorage.setItem("todos",JSON.stringify(todos));
}

function addExpense(){
let title=document.getElementById("title").value;
let amount=document.getElementById("amount").value;
let date=document.getElementById("date").value;
let category=document.getElementById("category").value;

if(!title || !amount || !date) return alert("Ma'lumot to'liq kiriting");

expenses.push({id:Date.now(),title,amount:+amount,date,category});
saveData();
loadExpenses();
clearInputs();
}

function clearInputs(){
document.getElementById("title").value="";
document.getElementById("amount").value="";
}

function loadExpenses(list=expenses){
let container=document.getElementById("expenseList");
container.innerHTML="";
let total=0;

list.forEach(exp=>{
total+=exp.amount;
container.innerHTML+=`
<div class="expense-item">
<div>
<b>${exp.title}</b><br>
${exp.category} | ${exp.date}
</div>
<div>
${exp.amount} so'm
<button onclick="deleteExpense(${exp.id})">❌</button>
</div>
</div>
`;
});

document.getElementById("total").innerText=total;
updateChart();
}

function deleteExpense(id){
expenses=expenses.filter(e=>e.id!==id);
saveData();
loadExpenses();
}

function filterByDate(){
let date=document.getElementById("filterDate").value;
let filtered=expenses.filter(e=>e.date===date);
loadExpenses(filtered);
}

function updateChart(){
let categories={};

expenses.forEach(e=>{
categories[e.category]=(categories[e.category]||0)+e.amount;
});

let ctx=document.getElementById("chart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:Object.keys(categories),
datasets:[{
data:Object.values(categories)
}]
}
});
}

/* TODO */

function addTodo(){
let text=document.getElementById("todoInput").value;
if(!text) return;
todos.push({id:Date.now(),text,completed:false});
saveData();
loadTodos();
document.getElementById("todoInput").value="";
}

function loadTodos(){
let container=document.getElementById("todoList");
container.innerHTML="";
todos.forEach(todo=>{
container.innerHTML+=`
<div class="todo-item ${todo.completed?"completed":""}">
<span onclick="toggleTodo(${todo.id})">${todo.text}</span>
<button onclick="deleteTodo(${todo.id})">❌</button>
</div>
`;
});
}

function toggleTodo(id){
todos=todos.map(t=>t.id===id?{...t,completed:!t.completed}:t);
saveData();
loadTodos();
}

function deleteTodo(id){
todos=todos.filter(t=>t.id!==id);
saveData();
loadTodos();
}

/* Theme */

document.getElementById("themeToggle").onclick=()=>{
document.body.classList.toggle("dark");
};

/* INIT */
loadExpenses();
loadTodos();