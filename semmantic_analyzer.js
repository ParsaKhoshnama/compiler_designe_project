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

let symbolTable={
    
}

let braces=[{number:0,children:[]}]
let currntBrace=0

let openBraces=new Set()
openBraces.add(0)

function DFS(node){

    if(node.terminal==undefined){

        let children=node.childern
       // node.children.forEach(child=>{
        for(let i=0;i<children.length;i++){
            
        children[i].parent==node
        DFS(children[i])
        if(children[i].terminal==undefined){
            if(children[i].nonTerminal=="Type"){
                children[i+1].inh=children[i].inh
            }
          }
        }
   // })
  }

    else{

        if(node.terminal.token=="{"){
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
            node.parent.inh=node.terminal.token
        }
        else if(node.terminal.token_name=="T_Id"){
            if(node.parent.childern[0]=="Type"){
                let symbolObject={"type":[node.inh,'variable'],"address":node.terminal.address , "braceNumber":currntBrace}
                if(node.parent.childern[2].childern[0].nonTerminal=="Function")
                    symbolObject["type"].splice(1,1,"Function")
                symbolTable[`${node.terminal.token}`]=symbolObject
            }
        }

    }
}
