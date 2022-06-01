'use strict';

function decToBinary(number)
{
    let binarytext = "", remainder;
    while( !!number )
    {
        remainder = number % 2;
        number = number / 2;
        number = Math.trunc(number);

        binarytext += remainder;
    }
    
    return reverseString(binarytext);
}

function binToDecimal(number)
{
    let returnNumber = 0;
    number = reverseString(number);
    for(let i = 0; i < number.length; ++i)
    {
        returnNumber += (2**i) * parseInt(number.charAt(i)); 
    }
    return returnNumber;
}

function reverseString(givenString)
{
    return givenString.split('').reverse().join("");
}

// this function calculates this formula [ 2^r >= m + r +1 ]
function calculateParityBitNum(originalBinaryString)
{
    let m = originalBinaryString.length;
    let condition = false;
    for(var r = 0;  ; ++r)
    {
        condition = 2**r >= m + r + 1;
        if( condition )
            break;
    }

    return r;
}

function isTextBinaryNumber(givenString)
{
    for(var i = 0; i < givenString.length; ++i)
    {
        if(!(givenString.charAt(i) === '1' || givenString.charAt(i) === '0'))
        {
            break;
        }
    }

    return i === givenString.length;
}

function initializeArray(arr, size, checkBitNum)
{
    let m = 0;
    for(let i = 0; i <= size; ++i)
    {
        if(i == 2**m)
        {
            arr.push('C');
            m++;
        }
        else
        {
            arr.push(0);
        }
    }
}

function buildArray(syndromeArr, originalBinaryString)
{
    let i = 0;
    for (let index = 1; index < syndromeArr.length; ++index) 
    {
        if(syndromeArr[index] === 'C')
        {
            syndromeArr[index] = 0;
        }
        else
        {
            syndromeArr[index] = parseInt(originalBinaryString.charAt(i));
            i++;
        }
    }
}


function fillIndexes(indexes, size, parityLen)
{
    let binaryNum;
    for(let i = 1 ; i <= size; ++i)
    {
        binaryNum = decToBinary(i);
        while(binaryNum.length < parityLen)
        {
            binaryNum = "0" + binaryNum;
        }
        indexes.push(binaryNum);
    }
}

function calculateParityBits(SyndromeArray, numberOfParity, indexes, parityBits)
{
    let sum = 0;
    for(let i = 0; i < numberOfParity; ++i)
    {

        for (const iterator of indexes) {
            if(iterator.charAt(numberOfParity - i - 1) === '1')
            {
                sum += parseInt(SyndromeArray[binToDecimal(iterator)]);
            }
        }

        if(sum % 2 === 0)
        {
            parityBits.push(0);
        }
        else
        {
            parityBits.push(1);
        }
        sum = 0;
    }

}

function putParityBitsInside(code, parityBits)
{
    for(let i = 0; i < parityBits.length; ++i)
    {
        code[2**i] = parityBits[i];
    }
}


function compareCodes(firstStr, secondStr)
{
    let countDifferences = 0;
    for(let i = 0; i < firstStr.length; ++i)
    {
        if(firstStr.charAt(i) !== secondStr.charAt(i))
        {
            countDifferences++;
        }
    }

    return countDifferences;
}