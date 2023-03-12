// UI elements
// inputs
const loanFormUI = document.getElementById('loan-form'),
  amoutInputUI = document.getElementById('loan-amount'),
  interestInputUI = document.getElementById('loan-interest'),
  yearsInputUI = document.getElementById('loan-years');
//results
const loanResutlsUI = document.getElementById('loan-results'),
  monthlyRestulsUI = document.getElementById('monthly-result'),
  paymentResultsUI = document.getElementById('payment-result'),
  interestResultsUI = document.getElementById('interest-result');
//misc
const errMsgUI = document.getElementById('error'),
  loadingUI = document.getElementById('spinner');

// functions:
function onLoanFormSubmit(e) {
  e.preventDefault();

  resetUI();

  if (
    amoutInputUI.value === '' ||
    interestInputUI.value === '' ||
    yearsInputUI.value === ''
  ) {
    showError('please fill in all fields!');
    return;
  }

  const principal = parseFloat(amoutInputUI.value),
    monthlyInterest = parseFloat(interestInputUI.value),
    numberOfPayments = parseFloat(yearsInputUI.value);

  console.log(principal, monthlyInterest, numberOfPayments);

  calculateResult(principal, monthlyInterest, numberOfPayments);
}

function calculateResult(principal, monthlyInterest, numberOfPayments) {
  const x = Math.pow(1 + monthlyInterest, numberOfPayments);
  // monthly payment
  const monthly = ((principal * x * monthlyInterest) / (x - 1)).toFixed(2);
  // get total payment
  const total = (monthly * numberOfPayments).toFixed(2);
  // get total interest
  const interestTotal = (monthly * numberOfPayments - principal).toFixed(2);

  console.log(monthly, total, interestTotal);

  if (isNaN(monthly)) {
    showError('Please check your numbers');
    return;
  } else {
    addResultsToDOM(monthly, total, interestTotal);
  }
}

function addResultsToDOM(monthly, total, interestTotal) {
  monthlyRestulsUI.textContent = '$' + monthly;
  paymentResultsUI.textContent = '$' + total;
  interestResultsUI.textContent = '$' + interestTotal;

  showSpinnerAndResults(1);
}

function showSpinnerAndResults(seconds) {
  loadingUI.style.display = 'block';

  setTimeout(() => {
    loadingUI.style.display = 'none';
    loanResutlsUI.style.display = 'block';
    document.body.classList.remove('overflow-hidden');
  }, seconds * 1000);
}

function resetUI() {
  loanResutlsUI.style.display = 'none';
  monthlyRestulsUI.innerText = '';
  paymentResultsUI.innerText = '';
  interestResultsUI.innerText = '';
}

function showError(msg) {
  errMsgUI.style.transform = 'translateY(-450px) translateX(-50%)';
  errMsgUI.innerText = msg;

  setTimeout(() => {
    errMsgUI.style.transform = 'translateY(-1000px) translateX(-50%)';
  }, 3000);
}
// event listeners

function init() {
  loanFormUI.addEventListener('submit', onLoanFormSubmit);
}

init();
