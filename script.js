// script.js
function calculateEMI() {
  const amount = parseFloat(document.getElementById('amount').value);
  const rate = parseFloat(document.getElementById('rate').value) / 12 / 100;
  const tenure = parseFloat(document.getElementById('tenure').value);

  if (!amount || !rate || !tenure) {
    alert("Please fill all fields correctly.");
    return;
  }

  const emi = (amount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
  const total = emi * tenure;
  const interest = total - amount;

  document.getElementById('emi').innerText = emi.toFixed(2);
  document.getElementById('interest').innerText = interest.toFixed(2);
  document.getElementById('total').innerText = total.toFixed(2);
  document.getElementById('result').style.display = 'block';

  renderChart(amount, interest);
}

let chart;
function renderChart(principal, interest) {
  const ctx = document.getElementById('chart');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const emi = document.getElementById('emi').innerText;
  const interest = document.getElementById('interest').innerText;
  const total = document.getElementById('total').innerText;

  doc.text("MyEMICalc Report", 20, 20);
  doc.text("Monthly EMI: ₹" + emi, 20, 40);
  doc.text("Total Interest: ₹" + interest, 20, 50);
  doc.text("Total Payment: ₹" + total, 20, 60);
  doc.save("EMI_Report.pdf");
}

// Toggle dark/light mode
const toggle = document.getElementById('toggleMode');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggle.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
