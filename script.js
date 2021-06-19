class Calculator
{
    constructor(previousOperandTextElement , currentOperandTextElement)
    {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear()
    {

        this.currentOperand = ''
        this.previousOperand = ''
        this.previousOperandTextElement.innerText = '';
        this.operation = undefined;

    }
    delete()
    {
       this.currentOperand = this.currentOperand.toString().slice(0 , -1);
       
    }
    appendnumber(number)
    { 
        if(number == '.' && this.currentOperand.includes('.') ) return;
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseoperation(operation)
    {
        if(this.currentOperand == "") return;
        if(this.previousOperand != "" )
        {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand= "";
    }
    compute() 
    {
        let computation;
        let prev  = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr) ) return;
        switch(this.operation){
            case '+' :
                computation = prev + curr;
                break;
            case '*' :
                computation = prev * curr;
                break;
            case '/' :
                computation = prev / curr;
                break;
            case '-' :
                computation = prev - curr;
                break;
            case '+' :
                computation = prev + curr;
                break;
            default:
                return;

        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
        this.previousOperandTextElement.innerText = '';

 
    }

    getdisplay(number)
    {
        const floatnub = parseFloat(number);
        if(isNaN(floatnub)) return '';

        return floatnub.toLocaleString('en');
    }
    updatedisplay()
    {
        this.currentOperandTextElement.innerText = this.getdisplay(this.currentOperand);
        if(this.operation != null)
        {
            this.previousOperandTextElement.innerText = 
                   this.getdisplay( this.previousOperand )+ " " + this.operation;
        }

    }
}



const numberButtons  = document.querySelectorAll("[data-number]");
const operationButtons  = document.querySelectorAll("[data-operation]");
const equalsButton  = document.querySelector('[data-equals]');
const deleteButton  = document.querySelector('[data-delete]');
const allclearButton  = document.querySelector('[data-all-clear]');
const previousOperandTextElement  = document.querySelector('[data-previous-operand]');
const currentOperandTextElement  = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement , currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendnumber(button.innerText);
        calculator.updatedisplay();
    } )
} )
operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseoperation(button.innerText);
        calculator.updatedisplay();
    } )
} )
equalsButton.addEventListener('click' ,button  => {
    calculator.compute();
    calculator.updatedisplay();
} )
allclearButton.addEventListener('click' , button => {
    calculator.clear();
    calculator.updatedisplay();
})
deleteButton.addEventListener('click' , button => {
    calculator.delete();
    calculator.updatedisplay();
})