import {lexical_analyzer_function} from './lexical_analyzer.js'

window.addEventListener('load',(event)=>{
    textarea.value=''
    textareaWrapper.innerHTML=''
})



let rules=[
    "Statements => Statement Statements",
    "Statement => S;",
    "Statement"
]


let tokens

let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')

 textarea.addEventListener('keyup',event=>textareaWrapper.innerHTML=event.target.value)
 
 document.querySelector('.btn').addEventListener('click',event=>{

    tokens=lexical_analyzer_function(textarea.value)

   // tokens.forEach(token => console.log(token))

    let tokensForSyntaxAnalyzer=[]
    let splitedArray=[]
    tokens.forEach(token=>{
        splitedArray=token.split(/\s/g)
        if(!['T_Coⅿⅿent','T_Whitespace'].includes(splitedArray[3]))
            tokensForSyntaxAnalyzer.push({address:splitedArray[0].split(":")[0] ,token:splitedArray[1],token_name:splitedArray[3]})
    })
console.log(tokensForSyntaxAnalyzer)
   
 })

let object={"Nasrin":{"Eshgham":"Nasrin Joonam"}}
console.log(object['Nasrin']['Eshgham']);

 let nonTerminals = {
    "Statements": {
        "First":["(" , "!" , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-", ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "#" ],
        "Follow":["$"]
    },
    "Statement": {
        "First":["(" , "!" , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-", ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "Type":{
        "First":["T_Int" , "T_Char" , "T_Bool" , "T_Void"],
        "Follow": ["T_Id"]
    },
    "S":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-", "!" ],
        "Follow":[";" , "]", ")" ,  "," ]
    },
    "A":{
        "First":["(" , "T_Id" ],
        "Follow":["+", "-", "*" , "/" , "%" ]
    },
    "B":{
        "First":["+", "-" , "*", "/", "%" ],
        "Follow":["(" , "T_Id"]
    },
    "A'":{
        "First":["+" , "-" , "*" , "/" , "%" , "#" ],
        "Follow":["+" , "-" , "*" , "/" , "%" ]
    },
    "P'":{
        "First": ["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!" ],
        "Follow":[";" , "]", ")" ,  ","]
    },
    "P''":{
        "First":["||" ,"#"],
        "Follow":[";", "]", ")" ,  "," ]
    },
    "D":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"],
        "Follow":["||", ";" , "]" , ")" , "," ]
    },
    "D'":{
        "First":["&&" , "#" ],
        "Follow":["||" ,  ";" , "]" , ")" , "," ]
    },
    "E":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"],
        "Follow": ["&&" , "||" , ";" , "]" , ")" , ","]
    },
    "G":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"],
        "Follow":["==" , "!=" , "&&" , "||" , ";" , "]" , ")" , "," ]
    },
    "E'":{
        "First":["==" , "!="  , "#"],
        "Follow":["&&" , "||" , ";" , "]" , ")" , "," ]
    },
    "F":{
        "First": ["==" , "!="],
        "Follow":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"]
    },
    "I":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"],
        "Follow":["<" ,"<=" , ">" , ">=" , "==" , "!=" , "&&" ,"||" , ";"  , "]" , ")" , "," ]
    },
    "G'":{
        "First":["<" , "<=" , ">" , ">=" , "#" ],
        "Follow":["==" , "!=" , "&&" , "||" , ";" , "]" , ")" , "," ]
    },
    "H":{
        "First":["<" , "<=" , ">" , ">=" ],
        "Follow":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"]
    },
    "K":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"],
        "Follow":["+","-","<" ,"<=" , ">" , ">=" , "==" , "!=" , "&&" ,"||" , ";"  , "]" , ")" , "," ]
    },
    "I'":{
        "First":["+" , "-" , "#" ],
        "Follow":["<" ,"<=" , ">" , ">=" , "==" , "!=" , "&&" ,"||" , ";"  , "]" , ")" , "," ]
    },
    "J":{
        "First":["+" , "-"],
        "Follow":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"]
    },
    "M":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"],
        "Follow":["+","-","<" ,"<=" , ">" , ">=" , "==" , "!=" , "&&" ,"||" , ";"  , "]" , ")" , "," , "*", "/" , "%" ]
    },
    "M'":{
        "First":["(", "+" , "-" ,"#" ],
        "Follow":["+","-","<" ,"<=" , ">" , ">=" , "==" , "!=" , "&&" ,"||" , ";"  , "]" , ")" , "," , "*", "/" , "%" ]
    },
    "N":{
        "First":["+","-"],
        "Follow":["+","-","<" ,"<=" , ">" , ">=" , "==" , "!=" , "&&" ,"||" , ";"  , "]" , ")" , "," , "*", "/" , "%","T_Id"]
    },
    "K'":{
        "First":["*" , "/" , "%" , "#" ],
        "Follow":["+","-","<" ,"<=" , ">" , ">=" , "==" , "!=" , "&&" ,"||" , ";"  , "]" , ")" , "," ]
    },
    "L":{
        "First":["*" , "/" , "%" ],
        "Follow":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-" ,"!"]
    },
    "Q":{
        "First":["T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "#"],
        "Follow":[")"]
    },
    "R":{
        "First":["T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False"],
        "Follow":["," , ")" ]
    },
    "T":{
        "First":["," , "#" ],
        "Follow":[")"]
    },
    "Def":{
        "First":["#", "[" , "=" , "," , ";" , "(" ],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "Var":{
        "First":["#", "[" , "=" , "," , ";" ],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "U":{
        "First":["[" , "=" , "#"],
        "Follow":["," , ";" ]
    },
    "W":{
        "First":["," , "#" ],
        "Follow":[";"]
    },
    "IF":{
        "First":["T_If"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "X":{
        "First":["{","(" , "!" , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-", ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "a":{
        "First":["(" , "!" , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-", ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print"],
        "Follow":["}"]
    },
    "Y":{
        "First":["T_Else","#"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "Z":{
        "First":["T_Else","#"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "For":{
        "First":["T_For"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "h":{
        "First":["T_Int" , "T_Char" , "T_Bool" , "T_Void" , "(","T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-", "!" ],
        "Follow":[";"]
    },
    "h'":{
        "First":["=","#"],
        "Follow":[";"]
    },
    "i":{
        "First":["(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-", "!","#"],
        "Follow":[";",")"]
    },
    "j":{
        "First":["{","T_Break" , "T_Continue"   , "(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" ],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "z":{
        "First":["T_Break" , "T_Continue"   , "(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "k":{
        "First":["T_Break" , "T_Continue"   , "(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print","#"],
        "Follow":["}"]
    },
    "X'":{
        "First":["(" , "!" , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-", ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print","{","T_Break","T_Continue"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "a'":{
        "First":["(" , "!" , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-", ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print","T_Break","T_Continue","#"],
        "Follow":["}"]
    },
    "Y'":{
        "First":["#","T_Else"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "Z'":{
        "First":["#","T_Else"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "Function":{
        "First":["("],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "b":{
        "First":["T_Int","T_Bool","T_Char","T_String","#"],
        "Follow":[")"]
    },
    "e":{
        "First":["[","#"],
        "Follow":[")",","]
    },
    "f":{
        "First":[",","#"],
        "Follow":[")"]
    },
    "c":{
        "First":[";","{"],
        "Follow":["(", "!"  , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-" , ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue","}", "$"]
    },
    "d":{
        "First":["#","T_Return","(" , "!" , "T_Id" , "T_Decimal" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False", "+" , "-", ";" , "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , "T_Print"],
        "Follow":["}"]
    },
    "d'":{
        "First":[";","(", "T_Id" , "T_Deciaml" , "T_Hexadecimal" , "T_String" , "T_Character" , "T_True" , "T_False" , "+" , "-", "!" ],
        "Follow":["}"]
    },
    "Print":{
        "First":["T_Print"],
        "Follow":[";"]
    },
    "g":{
        "First":[",","#"],
        "Follow":[")"]
    }




 }


 