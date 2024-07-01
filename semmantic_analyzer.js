import {lexical_analyzer_function} from "./lexical_analyzer.js"
import {syntax_analyzer_function} from "./syntax_analyzer.js"



let tokens
window.addEventListener('load',(event)=>{
   
    textarea.value=''
    textareaWrapper.innerHTML=''

})

let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')
textarea.addEventListener('keyup',event=>textareaWrapper.innerHTML=event.target.value)

document.querySelector('.btn').addEventListener('click',semmantic_analyzer_function)

function semmantic_analyzer_function(event){

    tokens=lexical_analyzer_function(textarea.value)
    let valueOfSyntaxAnaylzer=syntax_analyzer_function(tokens)
    console.log(valueOfSyntaxAnaylzer[1])
    let root=valueOfSyntaxAnaylzer[0]

    DFS(root)
 
    
}

let semmanticErrors

let symbolTable={
    
}

let braces=[{number:0,children:[]}]
let currntBrace=0

let openBraces=new Set()
openBraces.add(0)

function DFS(node){

    if(node.terminal==undefined){

        let children=node.childern
        for(let i=0;i<children.length;i++){
            
        children[i].parent==node
        DFS(children[i])
        }
        if(node.nonTerminal=="Type"){
            node.synth=node.childern[0].synth
            node.parent.childern[1].inh=node.synth
            if(node.parent.childern[2].nonTerminal!="e")
                node.parent.childern[2].inh=node.parent.childern[1]
            
        }
        else if(["Var","Function","U","W"].includes(node.nonTerminal)){
            node.inh=node.parent.inh
            if(node.nonTerminal=="W"){
                for(let i=1;i<node.childern.length;i++)
                    node.childern[i].inh=node.inh
            }
        }
        else if(["D","E","G","I","K","M"].includes(node.nonTerminal)){
            node.synth=node.childern[0].synth
            if(["P'","D","E","G","I","K"].includes(node.parent.nonTerminal)){
                node.parent.childern[1].inh=node.synth
            }
            else{
                node.parent.childern[2].inh=[node.synth]
            }
        }
        else if(["P''","D'","E'","G'","I'","K'"].includes(node.nonTerminal)){
            node.inh.push(node.parent.childern[1].synth)
            node.parent.synth=node.synth
        }
        
  }

    else{
        if(node.terminal=="#"){
            node.inh=node.parent.inh
            node.synth=node.inh
            node.parent.synth=node.synth
        }

        else if(node.terminal.token=="{"){
            openBraces.add(++currntBrace)
            let brace={number:currntBrace,children:[]}
            openBraces.forEach(braceNumber=>{
                braces[braceNumber].children.push(currntBrace)
            })
        }

        else if(node.terminal.token=="}"){
            openBraces.delete(currntBrace)
            currntBrace--

        }

        else if(node.parent.nonTerminal=="Type"){
            //node.parent.inh=node.terminal.token
            node.synth=node.terminal.token
            
        }
        else if(node.terminal.token_name=="T_Id" && node.parent.childern[0]=="Type" ){

            if(!["h","b"].includes(node.parent.nonTerminal)){
              if(checkBoundForDefine(node)){
                let symbolObject={"type":[node.inh,'variable'],"address":node.terminal.address , "braceNumber":currntBrace}
                if(node.parent.childern[2].childern[0].nonTerminal=="Function")
                    symbolObject["type"].splice(1,1,"Function")
                symbolTable[`${node.terminal.token}`]=symbolObject
              }
              else
                {
                    semmanticErrors.push(new Error(`${node.terminal.token} is defined already in scope ${currntBrace}`))
                }
            }
            else if(node.parent.childern[0]!="Type"){
                node.parent
            }
        }
        else if(["T_Id","T_Character","T_String","T_Hexadecimal","T_Decimal","T_True","T_False"].includes(node.terminal.token_name)){
            if(node.terminal.token_name=="T_Id"){
                if(checkBoundID(node))
                    node.parent.synth=node.terminal  
            }
           else
                node.parent.synth=node.terminal
        }

    }
}


function checkBoundForDefine(node){

    for(let symbol in symbolTable){
        if(symbolTable[symbol].braceNumber==currntBrace && symbol==node.terminal.token){
            semmanticErrors.push(new Error(`${node.terminal.token} has not been defined already in scope ${currntBrace}`))
            return false
        }
    }
    return true
}

function checkBoundID(node){
    let flag=false
    if(symbolTable[`${node.token_name}`]!=undefined){
        if(symbolTable[`${node.token_name}`].address < node.terminal.address){
            if(currntBrace==symbolTable[`${node.token_name}`].braceNumber)
               return true
            braces.forEach(brace=>{
                brace.children.forEach(child=>{
                    if(currntBrace==child)
                        return true
                })
            })
        }
    }
    semmanticErrors.push(new Error(`${node.terminal.token} has not been defined already`))
    return false
}