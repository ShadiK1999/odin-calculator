const numbers  = document.querySelectorAll('.number');
const operators  = document.querySelectorAll('.operator');
const displayScreen = document.getElementById('display');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');

class Calculator{
    constructor(displayScreen){
        this.displayScreen = displayScreen;
    }

    clear(){
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
    }

    deleteNumber(){
        this.currentNumber = this.currentNumber.slice(0, -1);
    }

    addNumber(number){
        if(this.currentNumber == undefined || this.currentNumber == 0) {this.currentNumber = '';}
        if(number === '.' && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    addOperator(operator){
        if(this.currentNumber === '' || this.currentNumber == undefined) return;
        if(this.previousNumber != '') {
            this.operate();
        }
        this.operator = operator;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '0';
    }

    updateDisplay(){
        this.displayScreen.textContent = this.currentNumber;
    }

    operate(){
        const prevNumber = parseFloat(this.previousNumber);
        const currNumber = parseFloat(this.currentNumber);

        if(isNaN(prevNumber) || isNaN(currNumber)) return;

        switch(this.operator){
            case '+':
                this.add(prevNumber, currNumber);
                break;
            case '-':
                this.subtract(prevNumber, currNumber);
                break;
            case '/':
                this.divide(prevNumber, currNumber);
                break;
            case 'x':
                this.multiply(prevNumber, currNumber);
                break;
        }

        this.updateDisplay();
    }

    add(a, b) {
        this.currentNumber = a + b;
        console.log(this.currentNumber);
    };
    
    subtract(a, b) {
        this.currentNumber = a - b;
    };

    multiply(a, b) {
        this.currentNumber = a * b;
    };

    divide(a, b) {
        if (b == 0){
            this.currentNumber = 'Try that again and I\'ll hit ya';
            return;
        } 

        this.currentNumber = a / b;
    }

}

const calculator = new Calculator(displayScreen)

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.addNumber(number.textContent);
        calculator.updateDisplay(); 
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        //console.log(operator.textContent);
        calculator.addOperator(operator.textContent);
        calculator.updateDisplay(); 
    })
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
} )

equalsButton.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay;
    calculator.clear();
})

deleteButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
})

