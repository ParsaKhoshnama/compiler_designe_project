import {lexical_analyzer_function} from './lexical_analyzer.js'
import { nonTerminals } from './nonTerminals.js'
import { paresrTable } from './parserTable.js'
window.addEventListener('load',(event)=>{
    textarea.value=''
    textareaWrapper.innerHTML=''
})

let keyWords=['bool','break','char','continue','else','false','for','if','int','print','return','true','void']
let tokensWithName=["T_Id","T_Decimal","T_Hexadecimal","T_String" , "T_Character" , "T_True" , "T_False",
    "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , 
    "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue"]

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
        if(!['T_Comment','T_Whitespace'].includes(splitedArray[3]))
            tokensForSyntaxAnalyzer.push({address:splitedArray[0].split(":")[0] ,token:splitedArray[1],token_name:splitedArray[3]})
    })

    parse(tokensForSyntaxAnalyzer)
   
 })
 

 let RCCount=0
 let LCCount=0



 function parse(tokensForSyntaxAnalyzer){
    
    let stack=[]
    stack.push("$")
    tokens.push("$")
    let index=0
    let root={nonTerminal:"Statements",children:[]}
    stack.push(root)
    let node


    let Errors=[]

    let loopIndex=0
    let topElement

    let rule
    let flagForFunction=false
    let flag=false
    while(index != tokensForSyntaxAnalyzer.length){
        if(stack[stack.length - 1].terminal != undefined){
            if(flagForFunction){
                if(stack[stack.length - 1 ].terminal=="{" && tokensForSyntaxAnalyzer[index].token=="{")
                    LCCount++
                else if(stack[stack.length - 1 ].terminal=="}" && tokensForSyntaxAnalyzer[index].token=="}")
                    RCCount++
                if(LCCount==RCCount)
                    flagForFunction=false
            }
            if(stack[stack.length - 1 ].terminal.includes("T_")){
                if(stack[stack.length - 1].terminal == tokensForSyntaxAnalyzer[index].token_name)
                    flag=true
            }
            else if(stack[stack.length - 1].terminal == tokensForSyntaxAnalyzer[index].token)
                    flag=true
            if(flag){
                flag=false
                stack[stack.length - 1].terminal= tokensForSyntaxAnalyzer[index]

            }
            else
                Errors.push(new Error(`expected ${stack[stack.length - 1].terminal} before ${tokensForSyntaxAnalyzer[index].token} -  address: ${tokensForSyntaxAnalyzer[index].address}`))
            index++
            stack.splice(stack.length - 1,1)
        }

      else{
            if(stack[stack.length - 1].nonTerminal=="c" && tokensForSyntaxAnalyzer[index].token=="{"){
                flagForFunction=true
                LCCount++
            }
            rule=findRule(stack[stack.length - 1] , tokensForSyntaxAnalyzer,index,flagForFunction)
            if(rule !=undefined){
                topElement=stack[stack.length - 1]
                stack.splice(stack.length - 1,1)//pop
                for (loopIndex=rule.length-1; loopIndex>=0; loopIndex--){
                    if(rule[loopIndex]=="#"){
                        node = {terminal:"#"}
                        break
                    }
                    if(rule[loopIndex].includes("T_"))
                        node ={terminal:rule[loopIndex]}
                    else if(rule[loopIndex][0].match(/[a-zA-Z]/g))
                        node ={nonTerminal:rule[loopIndex]}
                    else
                        node ={terminal:rule[loopIndex]}
                    topElement.splice(0,0,node)
                    stack.push(node)
                }
            }
            else{
                Errors.push(new Error("Error"))
                
            }
      }
       
    }

 }

 let beforeEqual=["+","-","*","/","%"]

 let returnNonTerminal=["X'","a'","z","X","a"]

 function findRule(currentStackNode,tokensForSyntaxAnalyzer,index,flagForFunction){
    if(flagForFunction){
       if(returnNonTerminal.includes(currentStackNode.nonTerminal) && tokensForSyntaxAnalyzer[index].token_name=="T_Return"){
           if(["X'","X","z"].includes(currentStackNode.nonTerminal))
                return ["T_Return"]
           else
               return ["T_Return",currentStackNode.nonTerminal]
       }

    }
    if(currentStackNode.nonTerminal=="S" && tokensForSyntaxAnalyzer[index].token_name=="T_Id"){
        
            if(tokensForSyntaxAnalyzer[index + 1].token=="=" || (beforeEqual.includes(tokensForSyntaxAnalyzer[index + 1].token) && tokensForSyntaxAnalyzer[index + 2].token=="=")){
                return paresrTable["S"]["T_Id"][0]
            }
            else
                return paresrTable["S"]["T_Id"][1]
    }
    if(currentStackNode.nonTerminal=="S" && tokensForSyntaxAnalyzer[index].token=="("){
            if(tokensForSyntaxAnalyzer[index + 3].token=="=" || (beforeEqual.includes(tokensForSyntaxAnalyzer[index + 3].token) && tokensForSyntaxAnalyzer[index + 4].token=="=")){
               return paresrTable["S"]["("][0]
            }
           else
              return paresrTable["S"]["("][1]       
    }
    if(currentStackNode.nonTerminal=="A'")
        return APrimeFunction(currentStackNode.nonTerminal,tokensForSyntaxAnalyzer,index)
  
    if(currentStackNode.nonTerminal=="M'" && tokensForSyntaxAnalyzer[index].token=="+"){

        if(tokensForSyntaxAnalyzer[index+1].token=="+")
            return paresrTable["M'"]["+"][0]
        else
        return paresrTable["M'"]["+"][1]
   }
   if(currentStackNode.nonTerminal=="M'" && tokensForSyntaxAnalyzer[index].token=="-"){

         if(tokensForSyntaxAnalyzer[index+1].token=="-")
            return paresrTable["M'"]["-"][0]
        else
            return paresrTable["M'"]["-"][1]
    }

    if(tokensWithName.includes(tokensForSyntaxAnalyzer[index].token_name))
        return paresrTable[currentStackNode.nonTerminal][tokensForSyntaxAnalyzer[index].token_name]
    else
        return paresrTable[currentStackNode.nonTerminal][tokensForSyntaxAnalyzer[index].token]
 }




 function APrimeFunction(nonTerminal,tokensForSyntaxAnalyzer,index){
    let flag=false
    if(tokensForSyntaxAnalyzer[index].token == "="){
        if(tokensForSyntaxAnalyzer[index + 1].token_name=="T_Id"){
            if(tokensForSyntaxAnalyzer[index+2].token=="=")
                flag=true
            else if(beforeEqual.includes(tokensForSyntaxAnalyzer[index+2].token) && tokensForSyntaxAnalyzer[index+3].token=="=")
                flag=true
            
        }
        else if(tokensForSyntaxAnalyzer[index + 1].token=="("){
            if(tokensForSyntaxAnalyzer[index + 4].token=="=")
                flag=true
            else if(beforeEqual.includes(tokensForSyntaxAnalyzer[index+4].token) && tokensForSyntaxAnalyzer[index+5].token=="=")
                flag=true
        }
    }
    else if(beforeEqual.includes(tokensForSyntaxAnalyzer[index].token)){
        if(tokensForSyntaxAnalyzer[index + 2].token_name=="T_Id"){
            if(tokensForSyntaxAnalyzer[index+3].token=="=")
                flag=true
            else if(beforeEqual.includes(tokensForSyntaxAnalyzer[index+3].token) && tokensForSyntaxAnalyzer[index+4].token=="=")
                flag=true
        }
        else if(tokensForSyntaxAnalyzer[index + 2].token=="("){
            if(tokensForSyntaxAnalyzer[index + 5].token=="=")
                flag=true
            else if(beforeEqual.includes(tokensForSyntaxAnalyzer[index+5].token) && tokensForSyntaxAnalyzer[index+6].token=="=")
                flag=true
        }
    }

    if(flag)
        return paresrTable[nonTerminal][tokensForSyntaxAnalyzer[index].token][0]
    else
        return paresrTable[nonTerminal][tokensForSyntaxAnalyzer[index].token][1]
 }


