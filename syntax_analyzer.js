import {lexical_analyzer_function} from './lexical_analyzer.js'
import { nonTerminals } from './nonTerminals.js'
import { paresrTable } from './parserTable.js'


let keyWords=['bool','break','char','continue','else','false','for','if','int','print','return','true','void']
let tokensWithName=["T_Id","T_Decimal","T_Hexadecimal","T_String" , "T_Character" , "T_True" , "T_False",
    "T_If" , "T_For" , "T_Bool" , "T_Int" , "T_Char","T_Void"  , 
    "T_Print" , "T_Else" , "T_Return" , "T_Break" , "T_Continue"]




function syntax_analyzer_function(tokens){

   
    let tokensForSyntaxAnalyzer=[]
    let splitedArray=[]
    tokens.forEach(token=>{
        splitedArray=token.split(/\s/g)
        if(!['T_Comment','T_Whitespace'].includes(splitedArray[splitedArray.length - 1])){
            if(splitedArray[splitedArray.length - 1]=="T_String")
                tokensForSyntaxAnalyzer.push({address:splitedArray[0].split(":")[0] ,token:token.match(/\".*\"/g)[0],token_name:splitedArray[splitedArray.length-1]})
              
            else
              tokensForSyntaxAnalyzer.push({address:splitedArray[0].split(":")[0] ,token:splitedArray[1],token_name:splitedArray[splitedArray.length-1]})
         }
    })

   parse(tokensForSyntaxAnalyzer)
   
   console.clear()

   return [root,Errors]
   

 }
 
 let Errors=[]
 let RCCount=0
 let LCCount=0
let stack=[]
let root
 function parse(tokensForSyntaxAnalyzer){
    
    stack.splice(0,stack.length)
    stack.push({terminal:"$"})
    tokensForSyntaxAnalyzer.push({token:"$",token_name:"$"})
    let index=0
    root={nonTerminal:"Statements",children:[]}
    stack.push(root)
    let node

    let ErrorFlag=false
    let flagForErrorWhile=false
    



let cnt=0
    let loopIndex=0
    let topElement
    let rule
    let flagForFunction=false
    let flag=false
    while(index != tokensForSyntaxAnalyzer.length){
        console.log(tokensForSyntaxAnalyzer[index],stack[stack.length - 1], `lc: ${LCCount} Rc:${RCCount}      `,stack.length)
        if(stack[stack.length - 1]==undefined)
            break
        if(stack[stack.length - 1]?.terminal != undefined){
            if(flagForFunction){
                if(stack[stack.length - 1 ].terminal=="{" && tokensForSyntaxAnalyzer[index].token=="{")
                    LCCount++
                else if(stack[stack.length - 1 ].terminal=="}" && tokensForSyntaxAnalyzer[index].token=="}")
                    RCCount++
                if(LCCount==RCCount){
                    flagForFunction=false
                    LCCount=0
                    RCCount=0
                }
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
            else{
                let error=new Error(`expected ${stack[stack.length - 1].terminal} before ${tokensForSyntaxAnalyzer[index].token} -  address: ${tokensForSyntaxAnalyzer[index].address}`)
                error.address=tokensForSyntaxAnalyzer[index].address
                if(Errors.length!=0){
                    if(Errors[Errors.length - 1].address !=error.address){
                             Errors.push(error)
                             console.log(error)
                        }
                    }else {
                        Errors.push(error)
                        console.log(error);
                }
                stack.splice(stack.length - 1,1)
                continue
                
            }
            index++
            stack.splice(stack.length - 1,1)
        }


      else{
            if(stack[stack.length - 1].nonTerminal=="c" && tokensForSyntaxAnalyzer[index].token=="{")
                flagForFunction=true
            rule=findRule(stack[stack.length - 1] , tokensForSyntaxAnalyzer,index,flagForFunction,ErrorFlag)
            if(rule !=undefined){
            
                topElement=stack[stack.length - 1]
                stack.splice(stack.length - 1,1)//pop
                for (loopIndex=rule.length-1; loopIndex>=0; loopIndex--){
                    if(rule[loopIndex]=="#"){
                        node = {terminal:"#"}
                        topElement.children.splice(0,0,node)
                        break
                    }
                    if(rule[loopIndex].includes("T_"))
                        node ={terminal:rule[loopIndex]}
                    else if(rule[loopIndex][0].match(/[a-zA-Z]/g))
                        node ={nonTerminal:rule[loopIndex],children:[]}
                    else
                        node ={terminal:rule[loopIndex]}

                    topElement.children.splice(0,0,node)
                    stack.push(node)
                }
            }
            else{
                let error=new Error(`Error: not expected ${tokensForSyntaxAnalyzer[index].token_name} after ${tokensForSyntaxAnalyzer[index-1].token_name} address:${tokensForSyntaxAnalyzer[index].address}`)
                
                error.address=tokensForSyntaxAnalyzer[index].address
                if(Errors.length!=0)
                {
                    if(Errors[Errors.length - 1].address !=error.address){
                        Errors.push(error)
                        console.log(error)
                    }
                }
                else {
                    Errors.push(error)
                    console.log(error);
                }
            
                ErrorFlag=true
                flagForErrorWhile=false
               // index++
                while(index != tokensForSyntaxAnalyzer.length){
                    if(tokensForSyntaxAnalyzer[index].token=="{")
                        LCCount++
                    else if(tokensForSyntaxAnalyzer[index].token=="}")
                        RCCount++
                    if(flagForFunction)
                        if(RCCount==LCCount)
                            flagForFunction=false
                    
                    rule=findRule(stack[stack.length - 1] , tokensForSyntaxAnalyzer,index,flagForFunction,ErrorFlag)
                    if(rule !=undefined){
                        topElement=stack[stack.length - 1]
                        stack.splice(stack.length - 1,1)//pop
                        let newNode
                        for (loopIndex=rule.length-1; loopIndex>=0; loopIndex--){
                            if(rule[loopIndex].includes("T_"))
                                newNode ={terminal:rule[loopIndex]}
                            else if(rule[loopIndex][0].match(/[a-zA-Z]/g))
                                newNode ={nonTerminal:rule[loopIndex],children:[]}
                            else
                                newNode ={terminal:rule[loopIndex]}

                            topElement.children.splice(0,0,newNode)
                            stack.push(newNode)
                        }
                        ErrorFlag=false
                        break
                    }
                   
                    if(tokensWithName.includes(tokensForSyntaxAnalyzer[index].token_name)){
                        if(nonTerminals[`${stack[stack.length - 1].nonTerminal}`].Follow.includes(tokensForSyntaxAnalyzer[index].token_name)){
                            flagForErrorWhile=true  
                     
                        }
                    }
                    else if(nonTerminals[`${stack[stack.length - 1].nonTerminal}`].Follow.includes(tokensForSyntaxAnalyzer[index].token)){
                            flagForErrorWhile=true
                   
                    }
                    
                    if(keyWords.includes(tokensForSyntaxAnalyzer[index].token)){
                        flagForErrorWhile=true
                    }
                    if(flagForErrorWhile){
                        stack.splice(stack.length - 1,1)
                        ErrorFlag=false
                       
                        break
                    }
                    index++    
                }  
            }
      }
       
    }
    

 }

 let beforeEqual=["+","-","*","/","%"]

 let returnNonTerminal=["X'","a'","z","X","a"]


 function findRule(currentStackNode , tokensForSyntaxAnalyzer,index,flagForFunction,ErrorFlag){
    if(flagForFunction){
       
       if(returnNonTerminal.includes(currentStackNode.nonTerminal) && tokensForSyntaxAnalyzer[index].token_name=="T_Return"){
           if(["X'","X","z"].includes(currentStackNode.nonTerminal))
              if(tokensForSyntaxAnalyzer[index+1].token==";")
                return ["T_Return",";"]
              else
                  return ["T_Return","S",";"]
           else{
               if(tokensForSyntaxAnalyzer[index+1].token==";")
                  return ["T_Return",";",currentStackNode.nonTerminal]
               else 
                  return ["T_Return","S",";",currentStackNode.nonTerminal]
           }
       }
       
       /*if(tokensForSyntaxAnalyzer[index-1].token==";" || tokensForSyntaxAnalyzer[index-1].token=="}" || tokensForSyntaxAnalyzer[index-1].token==")"){
                   if(!["X'","a'","z","X","a"].includes(tokensForSyntaxAnalyzer) && tokensForSyntaxAnalyzer[index].token_name=="T_Return")
                        return ["T_Return"]
            }*/
            
       }

    

    if(currentStackNode.nonTerminal=="S" && tokensForSyntaxAnalyzer[index].token_name=="T_Id"){
        
            if((tokensForSyntaxAnalyzer[index + 1].token=="=") || (beforeEqual.includes(tokensForSyntaxAnalyzer[index + 1].token) && tokensForSyntaxAnalyzer[index + 2].token=="=")){
                return paresrTable["S"]["T_Id"][0]
            }
            else
                return paresrTable["S"]["T_Id"][1]
    }
    if(currentStackNode.nonTerminal=="S" && tokensForSyntaxAnalyzer[index].token=="("){
            if((tokensForSyntaxAnalyzer[index + 3].token=="=") || (beforeEqual.includes(tokensForSyntaxAnalyzer[index + 3].token) && tokensForSyntaxAnalyzer[index + 4].token=="=")){
               return paresrTable["S"]["("][0]
            }
           else
              return paresrTable["S"]["("][1]       
    }
    if(currentStackNode.nonTerminal=="A'")
        return APrimeFunction(currentStackNode.nonTerminal,tokensForSyntaxAnalyzer,index,ErrorFlag)
  
    if(currentStackNode.nonTerminal=="M'" && tokensForSyntaxAnalyzer[index].token=="+"){
        
        if(tokensForSyntaxAnalyzer[index+1].token=="+")
            return paresrTable["M'"]["+"][0]
        else if(!ErrorFlag)
            return paresrTable["M'"]["+"][1]  
   }
   if(currentStackNode.nonTerminal=="M'" && tokensForSyntaxAnalyzer[index].token=="-"){

         if(tokensForSyntaxAnalyzer[index+1].token=="-")
            return paresrTable["M'"]["-"][0]
        else if(!ErrorFlag)
            return paresrTable["M'"]["-"][1]
    }

    if(tokensWithName.includes(tokensForSyntaxAnalyzer[index].token_name)){
        
        if(ErrorFlag){
          if(nonTerminals[`${currentStackNode.nonTerminal}`].First.includes(tokensForSyntaxAnalyzer[index].token_name))
            return paresrTable[currentStackNode.nonTerminal][tokensForSyntaxAnalyzer[index].token_name]
        }
        else
            return paresrTable[currentStackNode.nonTerminal][tokensForSyntaxAnalyzer[index].token_name]
    }
    else{
       
        if(ErrorFlag){
           if(nonTerminals[`${currentStackNode.nonTerminal}`].First.includes(tokensForSyntaxAnalyzer[index].token)) {
             if(currentStackNode.nonTerminal!="M'")
                 return paresrTable[currentStackNode.nonTerminal][tokensForSyntaxAnalyzer[index].token]
           }
        }
        else
            return  paresrTable[currentStackNode.nonTerminal][tokensForSyntaxAnalyzer[index].token]
    }
 }




 function APrimeFunction(nonTerminal,tokensForSyntaxAnalyzer,index,ErrorFlag){
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
     else if(!ErrorFlag)
        return paresrTable[nonTerminal][tokensForSyntaxAnalyzer[index].token][1]
 }










export {syntax_analyzer_function}