let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let chart;

const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");
const todoList = document.getElementById("todoList");
const progress = document.getElementById("progress");

function save(){
localStorage.setItem("expenses",JSON.stringify(expenses));
localStorage.setItem("todos",JSON.stringify(todos));
}

function renderExpenses(){
expenseList.innerHTML="";
let total=0;
const categories={};

expenses.forEach((e,i)=>{
total+=e.amount;
categories[e.category]=(categories[e.category]||0)+e.amount;

expenseList.innerHTML+=`
<div class="expense-item">
<strong>${e.name}</strong> - ${e.amount} so‘m
<br>Sana: ${e.date} | ${e.category}
<div class="actions">
<button onclick="editExpense(${i})">Edit</button>
<button onclick="deleteExpense(${i})">Delete</button>
</div>
</div>`;
});

totalEl.textContent=total;
renderChart(categories);
}

function deleteExpense(i){
expenses.splice(i,1);
save();
renderExpenses();
}

function editExpense(i){
const newAmount=prompt("Yangi summa:",expenses[i].amount);
if(newAmount){
expenses[i].amount=Number(newAmount);
save();
renderExpenses();
}
}

function renderTodos(){
todoList.innerHTML="";
let doneCount=0;

todos.forEach((t,i)=>{
if(t.done) doneCount++;

todoList.innerHTML+=`
<div>
<input type="checkbox" ${t.done?"checked":""}
onclick="toggleTodo(${i})">
<span class="${t.done?"done":""}">
${t.text} (${t.date})
</span>
<button onclick="deleteTodo(${i})">X</button>
</div>`;
});

progress.textContent=
todos.length?Math.round(doneCount/todos.length*100):0;
}

function toggleTodo(i){
todos[i].done=!todos[i].done;
save();
renderTodos();
}

function deleteTodo(i){
todos.splice(i,1);
save();
renderTodos();
}

function renderChart(categories){
if(chart) chart.destroy();

chart=new Chart(document.getElementById("chart"),{
type:"pie",
data:{
labels:Object.keys(categories),
datasets:[{data:Object.values(categories)}]
}
});
}

document.getElementById("addExpense").onclick=()=>{
const name=name.value;
const amount=Number(amount.value);
const date=date.value;
const category=category.value;

if(!name||!amount||!date) return alert("To‘ldiring");

expenses.push({name,amount,date,category});
save();
renderExpenses();
};

document.getElementById("addTodo").onclick=()=>{
const text=todoText.value;
const date=todoDate.value;
if(!text||!date) return alert("To‘ldiring");

todos.push({text,date,done:false});
save();
renderTodos();
};

document.getElementById("themeToggle").onclick=()=>{
document.body.classList.toggle("dark");
localStorage.setItem("theme",
document.body.classList.contains("dark")?"dark":"light");
};

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
}

renderExpenses();
renderTodos();