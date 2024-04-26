let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')






 textarea.addEventListener('keyup',event=>textareaWrapper.innerHTML=event.target.value)
 
 document.querySelector('.btn').addEventListener('click',compileFunction)



let numbersRegEX=/(?<!([a-zA-Z_\.](\w|\.)*))[-+]?([1-9]\d*|0)?(\.\d+)?(E[-+]?\d+)?(?!.*([a-zA-Z_\.](\w|\.)*))/g
let numbersRegeXWithBehindOrAheadcotations=/(?<=('[^']*'|"[^"]*")+)[-+]?(\d+(\.\d+)?|\.\d+)(E[-+]?\d+)?/g
let variableRegEX=/[a-zA-Z_](\d|[a-zA-Z_])*/g
let whiteSpaceRegEX=/\s+/g
let operatorsRegEX=/(==|<=|>=|!=|\|\||&&)|[-+*\/%<>=!\(\)\{\}\[\],;]/g
let keyWordsRegEX=/(?<!\w)(bool|break|char|continue|else|false|for|if|int|print|return|true)(?!\w)/

let stringRegEX=/"(\\"|[^"])*"/g
let commentRegEX=/\/\/.*/gm


let whiteSpaces=[' ','\n']
let keyWords=[{name:'bool', token:'T_Bool'},{name:'break',token:'T_Break'},{name:'char',token:'T_Char'},
{name:'continue',token:'T_Continue'},{name:'else',token:'T_Else'},{name:'false',token:'T_False'},{name:'for',token:'T_For'},
{name:'if',token:'T_If'},{name:'int',token:'T_Int'},{name:'print',token:'T_Print'},{name:'return',token:'T_Return'},
{name:'true',token:'T_True'}
]

let states={



 state_0:{
    stateNumber:0,
    whiteSpace:{nextState:0, tokens:['T_Whitespace']},
    multiplication:{nextState:0, tokens:['T_AOp_ML']},
    division:{nextState:18,tokens:null},
    reminder:{nextState:0,tokens:['T_AOp_RM']},
    parenthesisOpen:{nextState:0,tokens:['T_LP']},
    parenthesisClose:{nextState:0,tokens:['T_RP']},
    braceOpen:{nextState:0,tokens:['T_LC']},
    braceClose:{nextState:0,tokens:['T_RC']},
    bracketOpen:{nextState:0,tokens:['T_LB']},
    bracketClose:{nextState:0,tokens:['T_RB']},
    comma:{nextState:0,tokens:['T_Comma']},
    semicolon:{nextState:0,tokens:['T_Semicolon']},
    plus_Minus:{nextState:1,tokens:null},
    number1_9:{nextState:3,tokens:null},
    number0:{nextState:2,tokens:null},
    a_ZA_Z_:{nextState:6,tokens:null},
    less:{nextState:7,tokens:null},
    greater:{nextState:8,tokens:null},
    equal:{nextState:9,tokens:null},
    not:{nextState:10,tokens:null},
    and:{nextState:11,tokens:null},
    or:{nextState:12,tokens:null},
    quotation:{nextState:13,tokens:null},
    doubleQuotation:{nextState:16,tokens:null}
},

 state_1:{
    stateNumber:1,
    number1_9:{nextState:3, tokens:null}
},

 state_3:{
    stateNumber:3,
    number0_9:{nextState:3,tokens:null},
    plus:{nextState:0, tokens:['T_Decimal','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Decimal','T_AOp_MN']},
    whiteSpace:{nextState:5, tokens:['T_Decimal','T_Whitespace']},
    exceptWhiteSpace_plus_minus_0_9:{nextState:0, tokens:['T_Decimal']},
},

 state_5:{
    stateNumber:5,
    whiteSpace:{nextState:5, tokens:['T_Whitespace']},
    plus:{nextState:0, tokens:['T_AOp_PL']},
    minus:{nextState:0, tokens:['T_AOp_MN']},
    exceptWhiteSpace_plus_minus:{nextState:0, tokens:null}
},

 state_2:{
    stateNumber:2,
    x:{nextState:4,tokens:null},
    whiteSpace:{nextState:5, tokens:['T_Decimal','T_Whitespace']},
    plus:{nextState:0, tokens:['T_Decimal','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Decimal','T_AOp_MN']},
    exceptWhiteSpace_plus_minus:{nextState:0, tokens:['T_Decimal']}
    
},
 state_4:{
    stateNumber:4,
    a_fA_F0_9:{nextstate:4,tokens:null},
    whiteSpace:{nextState:5, tokens:['T_Hexadecimal','T_Whitespace']},
    plus:{nextState:0, tokens:['T_Hexadecimal','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Hexadecimal','T_AOp_MN']},
    exceptWhiteSpace_plus_minus_a_fA_F0_9:{nextstate:0,tokens:['T_Hexadecimal']}
},
 state_6:{
    stateNumber:6,
    a_zA_Z_0_9_:{nextstate:6,tokens:null},
    whiteSpace:{nextState:5,tokens:['T_Id','T_Whitespace']},
    plus:{nextState:0, tokens:['T_Id','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Id','T_AOp_MN']},
    exceptWhiteSpace_plus_minus_a_ZA_Z0_9_:{nextstate:0,tokens:['T_Id']}
},

 state_7:{
    stateNumber:7,
    equal:{nextState:0,tokens:['T_ROp_LE',]},
    exceptEqual:{nextState:0,tokens:['T_ROp_L']}
},

 state_8:{
    stateNumber:8,
    equal:{nextState:0,tokens:['T_ROp_GE']},
    exceptEqual:{nextState:0,tokens:['T_ROp_G']}
},

 state_9:{
    stateNumber:9,
    equal:{nextState:0,tokens:['T_ROp_E']},
    exceptEqual:{nextState:0,tokens:['T_Assign']}
},

 state_10:{
    stateNumber:10,
    equal:{nextState:0,tokens:['T_ROp_NE']},
    exceptEqual:{nextState:0,tokens:['T_LOp_NOT']}
},

 state_11:{
    stateNumber:11,
    and:{nextState:0,tokens:['T_LOp_AND']}
},

 state_12:{
    stateNumber:12,
    or:{nextState:0,tokens:['T_LOp_OR']}
},

 state_13:{
    stateNumber:13,
    backSlash:{nextState:14,tokens:null},
    exceptQuotation:{nextState:15,tokens:null}
},

 state_14:{
    stateNumber:14,
    quotation:{nextState:15,tokens:null}
},

  state_15:{
    stateNumber:15,
    quotation:{nextState:0,tokens:['T_Character']}
},

 state_16:{
    stateNumber:16,
    backSlash:{nextState:17,tokens:null},
    exceptDoubleQuotation:{nextState:16,tokens:null},
    doubleQuotation:{nextState:16,tokens:['T_String']}
},

 state_17:{
    stateNumber:17,
    doubleQuotation:{nextState:16,tokens:null}
},

 state_18:{
    stateNumber:18,
    slash:{nextState:19,tokens:null},
    exceptSlasch:{nextState:0,tokens:['T_AOp_DV']}
},

 state_19:{
    stateNumber:19,
    exceptNewLine:{nextState:19,tokens:null},
    newLine:{nextState:0,tokens:['T_Comment']} 
}


}

let currentState
var index
let context
let character
let temp=[]
let tokens=[]


let counter

let state


function compileFunction(event){

    context=textareaWrapper.innerHTML
    currentState=states.state_0
    index=0
    counter=0


    while(context[index]!=undefined){

        character=context[index]
        
        switch(currentState){
            case states.state_0:
                state_0Function()
                break

            case states.state_1:
                state_1Function()
                break

            case states.state_2:
                state_2Function()
                break

            case states.state_3:
                state_3Function()
                break

            case states.state_4:
                state_4Function()
                break

            case states.state_5:
                state_5Function()
                break

            case states.state_6:
                state_6Function()
                break

            case states.state_7:
                state_7Function()
                break

            case states.state_8:
                state_8Function()
                break

            case states.state_9:
                state_9Function()
                break

            case states.state_10:
                state_10Function()
                break

            case states.state_11:
                state_11Function()
                break

            case states.state_12:
                state_12Function()
                break

            case states.state_13:
                state_13Function()
                break

            case states.state_14:
                state_14Function()
                break

            case states.state_15:
                state_15Function()
                break

            case states.state_16:
                state_16Function()
                break

            case states.state_17:
                state_17Function()
                break

            case states.state_18:
                state_18Function()
                break

            case states.state_19:
                state_19Function()
                break

            default:
                break 
        }
        
    }

}


function state_0Function(){
    
    if(whiteSpaces.includes(character)){
        
        index++
        tokens.push(`${counter}: whitespace -> ${states.state_0.whiteSpace.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.whiteSpace.nextState}`]
    }

    else if(character=='*'){
        index++
        tokens.push(`${counter}: * -> ${currentState.multiplication.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.multiplication.nextState}`]
    }

    else if(character=='/'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.division.nextState}`]
    }

    else if(character=='%'){
        index++
        tokens.push(`${counter}: % -> ${currentState.reminder.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.reminder.nextState}`]
    }

    else if(character=='('){
        index++
        tokens.push(`${counter}: () -> ${currentState.parenthesisOpen.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.parenthesisOpen.nextState}`]
    }

    else if(character==')'){
        index++
        tokens.push(`${counter}: ) -> ${currentState.parenthesisClose.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.parenthesisClose.nextState}`]
    }

    else if(character=='{'){
        index++
        tokens.push(`${counter}: { -> ${currentState.braceOpen.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.braceOpen.nextState}`]
    }

    else if(character=='}'){
        index++
        tokens.push(`${counter}: } -> ${currentState.braceClose.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.braceClose.nextState}`]
    }

    else if(character=='['){
        index++
        tokens.push(`${counter}: [ -> ${currentState.bracketOpen.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.bracketOpen.nextState}`]
    }

    else if(character==']'){
        index++
        tokens.push(`${counter}: ] -> ${currentState.bracketClose.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.bracketClose.nextState}`]
    }

    else if(character==','){
        index++
        tokens.push(`${counter}: , -> ${currentState.comma.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.comma.nextState}`]
    }

    else if(character==';'){
        index++
        tokens.push(`${counter}: ; -> ${currentState.semicolon.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.semicolon.nextState}`]
    }

    else if(character=='+' || character=='-'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.plus_Minus.nextState}`]
    }

    else if(character.charCodeAt(0)>=49 && character.charCodeAt(0)<=57){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.number1_9.nextState}`]
    }

    else if(character=='0'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.number0.nextState}`]
    }

    else if(character=='_'||(character.charCodeAt(0)>=97 && character.charCodeAt(0)<=122)|| 
    (character.charCodeAt(0)>=65 && character.charCodeAt(0)<=90)){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.a_ZA_Z_.nextState}`]
    }

    else if(character=='<'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.less.nextState}`]
    }

    else if(character=='>'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.greater.nextState}`]
    }

    else if(character=='='){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.equal.nextState}`]
    }
    
    else if(character=='!'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.not.nextState}`]
    }
    
    else if(character=='&'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.and.nextState}`]
    }

    else if(character=='|'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.or.nextState}`]
    }

    else if(character="'"){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.quotation.nextState}`]
    }

    else if(character='"'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.doubleQuotation.nextState}`]
    }
    
}

function state_1Function(){

    if(character.charCodeAt(0)>=49 && character.charCodeAt(0)<=57){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.number1_9.nextState}`]
    }
}

function state_2Function(){
    
    if(character=='x'){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.x.nextState}`]
    }

    else if(whiteSpaces.includes(character)){
        whiteSpaceAfterNumber()
    }

    else if(character=='+'){
        plusAfterNumber()
    }

    else if(character=='-'){
        minusAfterNumber()
    }

    else{

        tokens.push(`${counter}: ${temp.join('')} -> ${currentState.plus.tokens[0]}`)
        counter +=temp.length
        temp.splice(0,temp.length)
        currentState=states[`state_${currentState.exceptWhiteSpace_plus_minus.nextState}`]
    }
}


function state_3Function(){
    
    if(whiteSpaces.includes(character)){
        whiteSpaceAfterNumber()
    }

    else if(character=='+'){
        plusAfterNumber()
    }
    
    else if(character=='-'){
        minusAfterNumber()
    }

    else if(character.charCodeAt(0)>=48 && character.charCodeAt(0)<=57){
        index++
        temp.push(character)
        currentState=states[`state_${currentState.number0_9.nextState}`]
    }

    else{
        tokens.push(`${counter}: ${temp.join('')} -> ${currentState.plus.tokens[0]}`)
        counter +=temp.length
        temp.splice(0,temp.length)
        currentState=states[`state_${currentState.exceptWhiteSpace_plus_minus_0_9.nextState}`]
    }
}


function state_4Function(){

    if((character.charCodeAt(0)>=48 && character.charCodeAt(0)<=57) || 
       (character.charCodeAt(0)>=65 && character.charCodeAt(0)<=70)||
       (character.charCodeAt(0)>=97 && character.charCodeAt(0)<=102)){

        index++
        temp.push(character)
        currentState=states[`state_${currentState.a_fA_F0_9.nextstate}`]
       }

    else if(whiteSpaces.includes(character)){
        whiteSpaceAfterNumber()
    }

    else if(character=='+'){
        plusAfterNumber()
    }

    else if(character=='-'){
        minusAfterNumber()
    }

    else{

        tokens.push(`${counter}: ${temp.join('')} -> ${currentState.plus.tokens[0]}`)
        counter +=temp.length
        temp.splice(0,temp.length)
        currentState=states[`state_${currentState.exceptWhiteSpace_plus_minus_0_9.nextState}`]

    }

    
}


function state_5Function(){
    if(whiteSpaces.includes(character)){
        index++
        tokens.push(`${counter}: whitespace -> ${currentState.whiteSpace.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.whiteSpace.nextState}`]
    }
    
    else if(character=='+'){
        index++
        tokens.push(`${counter}: + -> ${currentState.plus.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.plus.nextState}`]
    }

    else if(character=='-'){
        index++
        tokens.push(`${counter}: - -> ${currentState.minus.tokens[0]}`)
        counter++
        currentState=states[`state_${currentState.minus.nextState}`]
    }

    else{
        currentState=states[`state_${currentState.exceptWhiteSpace_plus_minus.nextState}`]
    }
}


function state_6Function(){
    
}


function state_7Function(){
    
}


function state_8Function(){
    
}


function state_9Function(){
    
}

function state_10Function(){
    
}



function state_11Function(){
    
}


function state_12Function(){
    
}


function state_13Function(){
    
}


function state_14Function(){
    
}


function state_15Function(){
    
}


function state_16Function(){
    
}


function state_17Function(){
    
}


function state_18Function(){
    
}

function state_19Function(){
    
}





//------------------------------------------------------------------------------------------


function whiteSpaceAfterNumber(){
    index++
    tokens.push(`${counter}: ${temp.join('')} -> ${currentState.whiteSpace.tokens[0]}`)
    counter +=temp.length
    temp.splice(0,temp.length)
    tokens.push(`${counter}: whitespace -> ${currentState.whiteSpace.tokens[1]}`)
    counter++
    currentState=states[`state_${currentState.whiteSpace.nextState}`]
}


function plusAfterNumber(){
    index++
    tokens.push(`${counter}: ${temp.join('')} -> ${currentState.plus.tokens[0]}`)
    counter +=temp.length
    temp.splice(0,temp.length)
    tokens.push(`${counter}: + -> ${currentState.plus.tokens[1]}`)
    counter++
    currentState=states[`state_${currentState.plus.nextState}`]
}


function minusAfterNumber(){
    index++
    tokens.push(`${counter}: ${temp.join('')} -> ${currentState.minus.tokens[0]}`)
    counter +=temp.length
    temp.splice(0,temp.length)
    tokens.push(`${counter}: - -> ${currentState.minus.tokens[1]}`)
    counter++
    currentState=states[`state_${currentState.minus.nextState}`]
}





 













