class Calculator{
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear() //clears output on startup
    }

    clear() { //AC. Clear screen
        this.previousOperand=''  //placeholder
        this.currentOperand = ''  
        this.operation=undefined
    }

    delete() { //Del. Remove number from right
        this.currentOperand=this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) { //Add number from right 
        if (number === '.' && this.currentOperand.includes('.')) return //not allowing more than 1 decimal point
        this.currentOperand=this.currentOperand.toString() + number.toString() //show current selection
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return //value w/ no operation selected
        if (this.previousOperand !== '') {  //after pressing equals, press any operation
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand=''
    }

    compute() { //Compute the output
        let computation
        const prev = parseFloat(this.previousOperand)//parseFloat is string to int
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) { //else
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOperand = computation //display output
        this.operation = undefined //clear operation
        this.previousOperand='' //clear previous data
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) //before decimal
        const decimalDigits = stringNumber.split('.')[1] //after decimal
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0}) //no more decimal after converting to string
        }
        if (decimalDigits != null) {
            return integerDisplay + '.' + decimalDigits
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = this.getDisplayNumber(this.previousOperand) + this.operation
        } else {
            this.previousOperandText.innerText=''
        }
    }
}

const numButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous]')
const currentOperandText = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText) //String inside button to number using inner_text.
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText) //String inside button to number using inner_text.
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {  //equals
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {  //AC
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {  //DEL
    calculator.delete()
    calculator.updateDisplay()
})