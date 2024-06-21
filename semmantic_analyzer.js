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
    console.log(root);

}