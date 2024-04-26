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
    plus:{nextState:0, tokens:['T_Decimal','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Decimal','T_AOp_MN']},
    whiteSpace:{nextState:5, tokens:['T_Decimal','T_Whitespace']},
    exceptWhiteSpace_plus_minus_0_9:{nextState:0, tokens:['T_Decimal']},
},

 state_5:{
    statusbar:5,
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
let token=[]


function compileFunction(event){

    context=textareaWrapper.innerHTML
    currentState=states.state_1
    index=0


    while(context[index]!=undefined){
        
        switch(currentState){
            case states.state_0:
                break

            case states.state_1:
                break

            case states.state_2:
                break

            case states.state_3:
                break

            case states.state_4:
                break

            case states.state_5:
                break

            case states.state_6:
                break

            case states.state_7:
                break

            case states.state_8:
                break

            case states.state_9:
                break

            case states.state_10:
                break

            case states.state_11:
                break

            case states.state_12:
                break

            case states.state_13:
                break

            case states.state_14:
                break

            case states.state_15:
                break

            case states.state_16:
                break

            case states.state_17:
                break

            case states.state_18:
                break

            case states.state_19:
                break    
        }
        
    }

}



function state_0Function(){

}

function state_1Function(){
    
}

function state_2Function(){
    
}


function state_3Function(){
    
}


function state_4Function(){
    
}


function state_5Function(){
    
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












 













