import {lexical_analyzer_function} from './lexical_analyzer.js'

window.addEventListener('load',(event)=>{
    textarea.value=''
    textareaWrapper.innerHTML=''
})


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

