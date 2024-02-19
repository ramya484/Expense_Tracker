document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expense-form');
  const expenseTable = document.getElementById('expense-table');
  const expenseList = document.getElementById('expense-list');
  const totalAmountCell = document.getElementById('total-amount');

  // Retrieve expenses from local storage
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Render expenses
  function renderExpenses() {
    expenseList.innerHTML = '';
    let totalAmount = 0;
    expenses.forEach(function (expense, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td>
          <button onclick="editExpense(${index})">Edit</button>
          <button onclick="deleteExpense(${index})">Delete</button>
        </td>
      `;
      expenseList.appendChild(row);
      totalAmount += expense.amount;
    });

    // Update total amount cell
    totalAmountCell.textContent = totalAmount.toFixed(2);
  }

  // Add new expense
  expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nameInput = document.getElementById('expense-name');
    const amountInput = document.getElementById('expense-amount');
    const name = nameInput.value;
    const amount = parseFloat(amountInput.value);

    if (name && amount) {
      const expense = {
        name: name,
        amount: amount
      };
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
      nameInput.value = '';
      amountInput.value = '';
    }
  });

  // Edit expense
  window.editExpense = function (index) {
    const newName = prompt('Enter new expense name:', expenses[index].name);
    const newAmount = parseFloat(prompt('Enter new amount:', expenses[index].amount));

    if (newName !== null && newAmount !== null && !isNaN(newAmount)) {
      expenses[index].name = newName;
      expenses[index].amount = newAmount;
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
    } else {
      alert('Invalid input. Please enter valid values.');
    }
  };

  // Delete expense
  window.deleteExpense = function (index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  };

  // Initial render
  renderExpenses();
});
