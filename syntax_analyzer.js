import {lexical_analyzer_function} from './lexical_analyzer.js'
import { nonTerminals } from './nonTerminals.js'
window.addEventListener('load',(event)=>{
    textarea.value=''
    textareaWrapper.innerHTML=''
})


let tokens

let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')

 textarea.addEventListener('keyup',event=>textareaWrapper.innerHTML=event.target.value)
 let tokensForSyntaxAnalyzer=[]
 document.querySelector('.btn').addEventListener('click',event=>{

    tokens=lexical_analyzer_function(textarea.value)

   // tokens.forEach(token => console.log(token))

   tokensForSyntaxAnalyzer.splice(0,tokensForSyntaxAnalyzer.length)
    let splitedArray=[]
    tokens.forEach(token=>{
        splitedArray=token.split(/\s/g)
        if(!['T_Coⅿⅿent','T_Whitespace'].includes(splitedArray[3]))
            tokensForSyntaxAnalyzer.push({address:splitedArray[0].split(":")[0] ,token:splitedArray[1],token_name:splitedArray[3]})
    })
console.log(tokensForSyntaxAnalyzer)
   
 })

let paresrTable={
    "Statements":{"(":["Statement","Statements"] , "!":["Statement","Statements"] , "T_Id":["Statement","Statements"] , "T_Decimal":["Statement","Statements"] , "T_Hexadecimal":["Statement","Statements"] , "T_String":["Statement","Statements"] , "T_Character":["Statement","Statements"] , "T_True":["Statement","Statements"] , "T_False":["Statement","Statements"], "+":["Statement","Statements"] , "-":["Statement","Statements"], ";":["Statement","Statements"] , "T_If":["Statement","Statements"] , "T_For":["Statement","Statements"] , "T_Bool":["Statement","Statements"] , "T_Int":["Statement","Statements"] , "T_Char":["Statement","Statements"],"T_Void":["Statement","Statements"]  , "T_Print":["Statement","Statements"],"$":["#"]},
    "Statement":{"(":["S",";"] , "!":["S",";"] , "T_Id":["S",";"] , "T_Decimal":["S",";"] , "T_Hexadecimal":["S",";"] , "T_String":["S",";"] , "T_Character":["S",";"] , "T_True":["S",";"] , "T_False":["S",";"], "+":["S",";"] , "-":["S",";"], ";":[";"] , "T_If":["IF"] , "T_For":["For"] , "T_Bool":["Type","T_Id","Def"] , "T_Int":["Type","T_Id","Def"] , "T_Char":["Type","T_Id","Def"],"T_Void":["Type","T_Id","Def"]  , "T_Print":["Print",";"]},
    "Type":{"T_Int":["T_Int"] , "T_Char":["T_Char"] , "T_Bool":["T_Bool"] , "T_Void":["T_Void"]},
    "S":{"(":[["A","B","P'"],["P'"]], "T_Id":[["A","B","P'"],["P'"]] , "T_Deciaml":["P'"] , "T_Hexadecimal":["P'"] , "T_String":["P'"] , "T_Character":["P'"] , "T_True":["P'"] , "T_False":["P'"] , "+":["P'"] , "-":["P'"], "!":["P'"]},
    "A":{"(":["(","T_Id",")","A'"] , "T_Id":["T_Id","A'"] },
    "B":{"=":["="],"+":["+","="], "-":["-","="] , "*":["*","="], "/":["/","="], "%":["%","="]},
    "A'":{"=":[["B","A","A'"],["#"]],"+":[["B","A","A'"],["#"]] , "-":[["B","A","A'"],["#"]] , "*":[["B","A","A'"],["#"]] , "/":[["B","A","A'"],["#"]] , "%":[["B","A","A'"],["#"]]},
    "P'":{"(":["D","P''"], "T_Id":["D","P''"] , "T_Deciaml":["D","P''"] , "T_Hexadecimal":["D","P''"] , "T_String":["D","P''"] , "T_Character":["D","P''"] , "T_True":["D","P''"] , "T_False":["D","P''"] , "+":["D","P''"] , "-":["D","P''"] ,"!":["D","P''"] },
    "P''":{"||":["||","D","P''"],";":["#"], "]":["#"], ")":["#"] ,  ",":["#"]},
    "D":{"(":["E","D'"], "T_Id":["E","D'"] , "T_Deciaml":["E","D'"] , "T_Hexadecimal":["E","D'"] , "T_String":["E","D'"] , "T_Character":["E","D'"] , "T_True":["E","D'"] , "T_False":["E","D'"] , "+":["E","D'"] , "-":["E","D'"] ,"!":["E","D'"]},
    "D'":{"&&":["&&","E","D'"],"||":["#"] ,  ";":["#"] , "]":["#"] , ")":["#"] , ",":["#"]},
    "E":{"(":["G","E'"], "T_Id":["G","E'"] , "T_Deciaml":["G","E'"] , "T_Hexadecimal":["G","E'"] , "T_String":["G","E'"] , "T_Character":["G","E'"] , "T_True":["G","E'"] , "T_False":["G","E'"] , "+":["G","E'"] , "-":["G","E'"] ,"!":["G","E'"]},
    "G":{"(":["I","G'"], "T_Id":["I","G'"] , "T_Deciaml":["I","G'"] , "T_Hexadecimal":["I","G'"] , "T_String":["I","G'"] , "T_Character":["I","G'"] , "T_True":["I","G'"] , "T_False":["I","G'"] , "+":["I","G'"] , "-":["I","G'"] ,"!":["I","G'"]},
    "E'":{"==":["F","G","E'"] , "!=":["F","G","E'"],"&&":["#"] , "||":["#"] , ";":["#"] , "]":["#"] , ")":["#"] , ",":["#"]},
    "F":{"==":["=="] , "!=":["!="]},
    "I":{"(":["K","I'"], "T_Id":["K","I'"] , "T_Deciaml":["K","I'"] , "T_Hexadecimal":["K","I'"] , "T_String":["K","I'"] , "T_Character":["K","I'"] , "T_True":["K","I'"] , "T_False":["K","I'"] , "+":["K","I'"] , "-":["K","I'"] ,"!":["K","I'"]},
    "G'":{"<":["H","I","G'"] , "<=":["H","I","G'"] , ">":["H","I","G'"] , ">=":["H","I","G'"],"==":["#"] , "!=":["#"] , "&&":["#"] , "||":["#"] , ";":["#"] , "]":["#"] , ")":["#"] , ",":["#"]},
    "H":{"<":["<"] , "<=":["<="] , ">":[">"] , ">=":[">="]},
    "K":{"(":["M","K'"], "T_Id":["M","K'"] , "T_Deciaml":["M","K'"] , "T_Hexadecimal":["M","K'"] , "T_String":["M","K'"] , "T_Character":["M","K'"] , "T_True":["M","K'"] , "T_False":["M","K'"] , "+":["M","K'"] , "-":["M","K'"] ,"!":["M","K'"]},
    "I'":{"+":["J","K","I'"] , "-":["J","K","I'"],"<":["#"] ,"<=":["#"] , ">":["#"] , ">=":["#"] , "==":["#"] , "!=":["#"] , "&&":["#"] ,"||":["#"] , ";":["#"]  , "]":["#"] , ")":["#"] , ",":["#"] },
    "J":{"+":["+"] , "-":["-"]},
    "M":{"(":["(","S",")"], "T_Id":["T_Id","M'"] , "T_Deciaml":["T_Deciaml"] , "T_Hexadecimal":["T_Hexadecimal"] , "T_String":["T_String"] , "T_Character":["T_Character"] , "T_True":["T_True"] , "T_False":["T_False"] , "+":["N","T_Id"] , "-":["N","T_Id"] ,"!":["!","M"]},
    "M'":{"(":["(","Q",")"], "+":[["N"],["#"]] , "-":[["N"],["#"]],"<":["#"] ,"<=":["#"] , ">":["#"] , ">=":["#"] , "==":["#"] , "!=":["#"] , "&&":["#"] ,"||":["#"] , ";":["#"]  , "]":["#"] , ")":["#"] , ",":["#"] , "*":["#"], "/":["#"] , "%":["#"]},
    "N":{"+":["+","+"],"-":["-","-"]},
    "K'":{"*":["L","M","K'"] , "/":["L","M","K'"] , "%":["L","M","K'"] , "+":["#"],"-":["#"],"<":["#"] ,"<=":["#"] , ">":["#"] , ">=":["#"] , "==":["#"] , "!=":["#"] , "&&":["#"] ,"||":["#"] , ";":["#"]  , "]":["#"] , ")":["#"] , ",":["#"] },
    "L":{"*":["*"] , "/":["/"] , "%":["%"]},
    
}

// A'   S     M'       N

 