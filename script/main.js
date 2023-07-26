import { arrayOfButtons, numbers, operations } from './constants';

let firstNumber = '';
let secondNumber = '';
let selectedOperation = '';
let isFinish = false;

const screen = document.getElementById('screen');
const field = document.getElementById('field');

// Creating field with calculator's buttons
for (let i = 0; i < arrayOfButtons.length; i++) {
  let btn = document.createElement('button');
  btn.className = 'field__btn';
  btn.innerHTML = arrayOfButtons[i];
  field.appendChild(btn);
}

function allClean() {
  firstNumber = '';
  secondNumber = '';
  selectedOperation = '';
  isFinish = false;
  screen.value = '';
}

function changeSign(number) {
  if (number[0] !== '-') {
    number = '-' + number;
  } else {
    number = number.slice(1, number.length);
  }
  screen.value = number;
  return number;
}

const calcButtons = document.querySelectorAll('.field__btn');

calcButtons.forEach((button) => {
  button.addEventListener('click', (elem) => {
    const buttonContent = elem.target.textContent;
    switch (buttonContent) {
      case '⌫':
        screen.value = screen.value.slice(0, -1);
        break;
      case 'AC':
        allClean();
        screen.value = '';
        break;

      case numbers.find((item) => item === buttonContent):
        if (secondNumber === '' && selectedOperation === '') {
          if (buttonContent === '±') {
            firstNumber = changeSign(firstNumber);
            break;
          }
          firstNumber += buttonContent;
          screen.value = firstNumber;
        } else if (isFinish) {
          if (buttonContent === '±') {
            firstNumber = changeSign(firstNumber);
            break;
          }
          allClean();
          firstNumber = buttonContent;
          screen.value = firstNumber;
        } else {
          if (buttonContent === '±') {
            secondNumber = changeSign(secondNumber);
            break;
          }
          secondNumber += buttonContent;
          screen.value = secondNumber;
        }
        break;

      case operations.find((item) => item === buttonContent):
        if (isFinish) {
          secondNumber = '';
          isFinish = false;
        }
        selectedOperation = buttonContent;
        screen.value += ' ' + buttonContent;
        break;

      case '=':
        if (!secondNumber) {
          secondNumber = firstNumber;
        }
        switch (selectedOperation) {
          case '+':
            firstNumber = `${+firstNumber + +secondNumber}`;
            break;
          case '-':
            firstNumber = `${firstNumber - secondNumber}`;
            break;
          case '÷':
            firstNumber = `${firstNumber / secondNumber}`;
            break;
          case '×':
            firstNumber = `${firstNumber * secondNumber}`;
            break;
        }
        screen.value = firstNumber;
        isFinish = true;
        break;
      default:
        screen.value += buttonContent;
    }
    console.log(firstNumber, selectedOperation, secondNumber);
  });
});
