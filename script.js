const amt = document.querySelector("#amt");
const cashGiven = document.querySelector("#cashGiven");
const errorDiv = document.querySelector(".errorMsg");
const cashGivenDiv = document.querySelector(".cashGivenInput");
const changeReturnDiv = document.querySelector(".changeReturn");
const output= document.querySelector("#output");
const nextBtn = document.querySelector("#next-Btn");
const checkBtn = document.querySelector("#check-Btn");
const noOfNotes= document.querySelectorAll(".noOfNotes");
const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];


function hideError(){
    errorDiv.style.display = "none";
}
function showError(text){
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    errorDiv.style.color = "red";
    changeReturnDiv.style.display = "none";
}


nextBtn.addEventListener('click', ()=>{
    hideError(); //hiding error message
    if(Number(amt.value)>0){

        nextBtn.style.display = "none";
        cashGivenDiv.style.display = "block";
    }
    else{
        showError("Please enter valid bill amount");
    }
} )



checkBtn.addEventListener('click', ()=>{
    clearNoOfNotes();
    hideError(); //hiding error message
    let amtReceived= Number(amt.value);
    let cashReceived= Number(cashGiven.value);

    if(amtReceived>0 && cashReceived>0){

        if(!Number.isInteger(cashReceived)){
            showError("Enter valid amount in cash given field");
            return;
        }
        if(amtReceived > cashReceived){
            showError("Cash is less than bill, please enter right amount");
            return;
        }
        //if input valid calculate no. of notes
        calculateNotes(amtReceived, cashReceived);
    } else{
        showError("Enter valid bill amount and cash given to continue");
        }
})


function calculateNotes(bill, cash){
    let returnAmt = cash-bill;
    
    if(returnAmt<1){
        showError("No amount should be returned");
        return;
    }
    changeReturnDiv.style.display = "block";

    for(let i=0; i<arrayNoteAmt.length; i++){
        returnAmt= compare(returnAmt, arrayNoteAmt[i], i);
    }
    
}


function compare(remainder, noteAmt, index){

    if(remainder >= noteAmt){
        let notes = Math.floor(remainder/noteAmt);
        remainder = remainder - notes*noteAmt;
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder
}


function clearNoOfNotes(){
    for(let notes of noOfNotes){
        notes.innerText = "";
    }
}



