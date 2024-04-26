let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')
let value
let regEX=/^\w$/

let emailRegEX=/^(www\.)?\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}$/

let array

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

let state_0={
    stateNumber:0,
    whiteSpace:{nextState:state_0, tokens:['T_Whitespace']},
    multiplication:{nextState:state_0, tokens:['T_AOp_ML']},
    division:{nextState:state_18,tokens:null},
    reminder:{nextState:state_0,tokens:['T_AOp_RM']},
    parenthesisOpen:{nextState:state_0,tokens:['T_LP']},
    parenthesisClose:{nextState:state_0,tokens:['T_RP']},
    braceOpen:{nextState:state_0,tokens:['T_LC']},
    braceClose:{nextState:state_0,tokens:['T_RC']},
    bracketOpen:{nextState:state_0,tokens:['T_LB']},
    bracketClose:{nextState:state_0,tokens:['T_RB']},
    comma:{nextState:state_0,tokens:['T_Comma']},
    semicolon:{nextState:state_0,tokens:['T_Semicolon']},
    plus_Minus:{nextState:state_1,tokens:null},
    number1_9:{nextState:state_3,tokens:null},
    number0:{nextState:state_2,tokens:null},
    a_ZA_Z_:{nextState:state_6,tokens:null},
    less:{nextState:state_7,tokens:null},
    greater:{nextState:state_8,tokens:null},
    equal:{nextState:state_9,tokens:null},
    not:{nextState:state_10,tokens:null},
    and:{nextState:state_11,tokens:null},
    or:{nextState:state_12,tokens:null},
    quotation:{nextState:state_13,tokens:null},
    doubleQuotation:{nextState:state_16,tokens:null},
}

let state_1={
    stateNumber:1,
    number1_9:{nextState:state_3, tokens:null}
}

let state_3={
    plus:{nextState:state_0, tokens:['T_Decimal','T_AOp_PL']},
    minus:{nextState:state_0, tokens:['T_Decimal','T_AOp_MN']},
    whiteSpace:{nextState:state_5, tokens:['T_Decimal','T_Whitespace']},
    exceptWhiteSpace_plus_minus_0_9:{nextState:state_0, tokens:['T_Decimal']},
}

let state_5={
    whiteSpace:{nextState:state_5, tokens:['T_Whitespace']},
    plus:{nextState:state_0, tokens:['T_AOp_PL']},
    minus:{nextState:state_0, tokens:['T_AOp_MN']},
    exceptWhiteSpace_plus_minus:{nextState:state_0, tokens:null}
}

let state_2={
    x:{nextState:state_4,tokens:null},
    whiteSpace:{nextState:state_5, tokens:['T_Decimal','T_Whitespace']},
    plus:{nextState:state_0, tokens:['T_Decimal','T_AOp_PL']},
    minus:{nextState:state_0, tokens:['T_Decimal','T_AOp_MN']},
    exceptWhiteSpace_plus_minus:{nextState:state_0, tokens:['T_Decimal']}
    
}
let state_4={
    a_fA_F0_9:{nextstate:state_4,tokens:null},
    whiteSpace:{nextState:state_5, tokens:['T_Hexadecimal','T_Whitespace']},
    plus:{nextState:state_0, tokens:['T_Hexadecimal','T_AOp_PL']},
    minus:{nextState:state_0, tokens:['T_Hexadecimal','T_AOp_MN']},
    exceptWhiteSpace_plus_minus_a_fA_F0_9:{nextstate:state_0,tokens:['T_Hexadecimal']}
}
let state_6={
    a_zA_Z_0_9_:{nextstate:state_6,tokens:null},
    whiteSpace:{nextState:state_5,tokens:['T_Id','T_Whitespace']},
    plus:{nextState:state_0, tokens:['T_Id','T_AOp_PL']},
    minus:{nextState:state_0, tokens:['T_Id','T_AOp_MN']},
    exceptWhiteSpace_plus_minus_a_ZA_Z0_9_:{nextstate:state_0,tokens:['T_Id']}
}

let state_7={
    equal:{nextState:state_0,tokens:['T_ROp_LE',]},
    exceptEqual:{nextState:state_0,tokens:['T_ROp_L']}
}

let state_8={
    equal:{nextState:state_0,tokens:['T_ROp_GE']},
    exceptEqual:{nextState:state_0,tokens:['T_ROp_G']}
}

let state_9={
    equal:{nextState:state_0,tokens:['T_ROp_E']},
    exceptEqual:{nextState:state_0,tokens:['T_Assign']}
}

let state_10={
    equal:{nextState:state_0,tokens:['T_ROp_NE']},
    exceptEqual:{nextState:state_0,tokens:['T_LOp_NOT']}
}

let state_11={
    and:{nextState:state_0,tokens:['T_LOp_AND']}
}

let state_12={
    or:{nextState:state_0,tokens:['T_LOp_OR']}
}

let state_13={
    backSlash:{nextState:state_14,tokens:null},
    exceptQuotation:{nextState:state_15,tokens:null}
}

let state_14={
    quotation:{nextState:state_15,tokens:null}
}

let state_15={
    quotation:{nextState:state_0,tokens:['T_Character']}
}

let state_16={
    backSlash:{nextState:state_17,tokens:null},
    exceptDoubleQuotation:{nextState:state_16,tokens:null},
    doubleQuotation:{nextState:state_16,tokens:['T_String']}
}

let state_17={
    doubleQuotation:{nextState:state_16,tokens:null}
}

let state_18={
    slash:{nextState:state_19,tokens:null},
    exceptSlasch:{nextState:state_0,tokens:['T_AOp_DV']}
}

let state_19={
    exceptNewLine:{nextState:state_19,tokens:null},
    newLine:{nextState:state_0,tokens:['T_Comment']} 
}









 













