let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')






 textarea.addEventListener('keyup',event=>textareaWrapper.innerHTML=event.target.value)
 
 //document.querySelector('.btn').addEventListener('click',compileFunction)



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
    doubleQuotation:{nextState:16,tokens:null},
},

 state_1:{
    stateNumber:1,
    number1_9:{nextState:3, tokens:null}
},

 state_3:{
    plus:{nextState:0, tokens:['T_Decimal','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Decimal','T_AOp_MN']},
    whiteSpace:{nextState:5, tokens:['T_Decimal','T_Whitespace']},
    exceptWhiteSpace_plus_minus_0_9:{nextState:0, tokens:['T_Decimal']},
},

 state_5:{
    whiteSpace:{nextState:5, tokens:['T_Whitespace']},
    plus:{nextState:0, tokens:['T_AOp_PL']},
    minus:{nextState:0, tokens:['T_AOp_MN']},
    exceptWhiteSpace_plus_minus:{nextState:0, tokens:null}
},

 state_2:{
    x:{nextState:4,tokens:null},
    whiteSpace:{nextState:5, tokens:['T_Decimal','T_Whitespace']},
    plus:{nextState:0, tokens:['T_Decimal','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Decimal','T_AOp_MN']},
    exceptWhiteSpace_plus_minus:{nextState:0, tokens:['T_Decimal']}
    
},
 state_4:{
    a_fA_F0_9:{nextstate:4,tokens:null},
    whiteSpace:{nextState:5, tokens:['T_Hexadecimal','T_Whitespace']},
    plus:{nextState:0, tokens:['T_Hexadecimal','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Hexadecimal','T_AOp_MN']},
    exceptWhiteSpace_plus_minus_a_fA_F0_9:{nextstate:0,tokens:['T_Hexadecimal']}
},
 state_6:{
    a_zA_Z_0_9_:{nextstate:6,tokens:null},
    whiteSpace:{nextState:5,tokens:['T_Id','T_Whitespace']},
    plus:{nextState:0, tokens:['T_Id','T_AOp_PL']},
    minus:{nextState:0, tokens:['T_Id','T_AOp_MN']},
    exceptWhiteSpace_plus_minus_a_ZA_Z0_9_:{nextstate:0,tokens:['T_Id']}
},

 state_7:{
    equal:{nextState:0,tokens:['T_ROp_LE',]},
    exceptEqual:{nextState:0,tokens:['T_ROp_L']}
},

 state_8:{
    equal:{nextState:0,tokens:['T_ROp_GE']},
    exceptEqual:{nextState:0,tokens:['T_ROp_G']}
},

 state_9:{
    equal:{nextState:0,tokens:['T_ROp_E']},
    exceptEqual:{nextState:0,tokens:['T_Assign']}
},

 state_10:{
    equal:{nextState:0,tokens:['T_ROp_NE']},
    exceptEqual:{nextState:0,tokens:['T_LOp_NOT']}
},

 state_11:{
    and:{nextState:0,tokens:['T_LOp_AND']}
},

 state_12:{
    or:{nextState:0,tokens:['T_LOp_OR']}
},

 state_13:{
    backSlash:{nextState:14,tokens:null},
    exceptQuotation:{nextState:15,tokens:null}
},

 state_14:{
    quotation:{nextState:15,tokens:null}
},

  state_15:{
    quotation:{nextState:0,tokens:['T_Character']}
},

 state_16:{
    backSlash:{nextState:17,tokens:null},
    exceptDoubleQuotation:{nextState:16,tokens:null},
    doubleQuotation:{nextState:16,tokens:['T_String']}
},

 state_17:{
    doubleQuotation:{nextState:16,tokens:null}
},

 state_18:{
    slash:{nextState:19,tokens:null},
    exceptSlasch:{nextState:0,tokens:['T_AOp_DV']}
},

 state_19:{
    exceptNewLine:{nextState:19,tokens:null},
    newLine:{nextState:0,tokens:['T_Comment']} 
}


}












 













