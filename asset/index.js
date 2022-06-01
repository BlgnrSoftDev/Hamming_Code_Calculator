'use strict';

const convertBtn = document.getElementById("convert-button");
const changeBtn = document.getElementById("change-button");
const rawBinaryInput = document.getElementById("hamming-input");
const errorCodeInput = document.getElementById("error-input");
const outputScreen = document.getElementById("output-screen");

let binaryString;
let syndromeCode;
let changedCodeString;

convertBtn.addEventListener("click", handleBinaryInput);
changeBtn.addEventListener("click", handleErrorInput);



function handleBinaryInput()
{
    if(!rawBinaryInput.value)
        alert("You cannot send empty input!!");

    binaryString = (rawBinaryInput.value + "").trim();
    if( !isTextBinaryNumber( binaryString ) )
    {
        alert("Please Enter Valid Input !!");
    }
    else
    {
        calculateSyndromeCode();
    }
}

function handleErrorInput()
{
    if(!errorCodeInput.value)
        alert("You cannot send empty input!!");

    changedCodeString = (errorCodeInput.value + "").trim();

    if( !isTextBinaryNumber( changedCodeString ) )
    {
        alert("Please Enter Valid Input !!");
    }
    else if( changedCodeString.length !== (syndromeCode.length - 1))
    {
        alert(`Missing bits !!, required ${syndromeCode.length - 1}`);
    }
    else if(compareCodes( (changedCodeString, syndromeCode) > 1))
    {
        alert("Hamming Code can only detect one bit errors, Please Don't change more than one position!");
    }
    else
    {
        findMistakenPosition();
    }
}


function findMistakenPosition()
{
    
    let code = changedCodeString.split('');
    code.reverse();
    code.unshift('0');

    console.log(code);
    let r = code.length - binaryString.length - 1;
    let indexes = [];
    let parityBits = [];


    fillIndexes(indexes, changedCodeString.length, r);
    calculateParityBits(code, r, indexes, parityBits);

    let total = binToDecimal(reverseString(parityBits.join("")));
    if(total == 0)
    {
        outputScreen.innerHTML = `There is no mistake in any position !`
    }
    else
    {
        
        let oldNum = code[total];
        let inline_code = 1 - parseInt(code[total]);
        code[total] = ` ]${inline_code}[`; 
        let temp = code.join("");
        temp = temp.split('');
        temp.shift();
        temp = temp.join('');


        outputScreen.innerHTML = `The mistaken bit is at position: ${total} <br> Corrected : <span style="color: green; font-weight: bold;"> ${reverseString(temp)}  </span>`;

        code[total] = oldNum;
    }

}

function calculateSyndromeCode()
{
    let r = calculateParityBitNum(binaryString);
    let m = binaryString.length;
    let lengthOfSyndrome = m + r;
    let code = [];
    let parityBits = [];
    let indexes = [];

    initializeArray(code, lengthOfSyndrome, r);
    buildArray(code, reverseString(binaryString));
    fillIndexes(indexes, lengthOfSyndrome, r);
    calculateParityBits(code, r, indexes, parityBits);
    putParityBitsInside(code, parityBits);

    let temp = code.join("");
    temp = temp.split('');
    temp.shift();
    temp = temp.join('');
    
    outputScreen.innerHTML = `Syndrome word : <span style="color: green; font-weight: bold;"> ${reverseString(temp)} </span><br /> Check Bits : <span style="color: green; font-weight: bold;"> ${reverseString(parityBits.join(''))} </span> `;


    // dönüştürülmüş hamming kodu global değişkende saklıyorum çünkü hata bit tespit etmede lazım olacak.
    syndromeCode = code.join('');
/*     console.log(`Hamming kod == ${code}`);
    console.log(`Parity Bitleri == ${parityBits.reverse().join("")}`);
    console.log(`Hamming Kod Son Hali == ${code}}`); */
}




