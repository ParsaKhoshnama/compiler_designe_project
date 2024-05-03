import {lexical_analyzer_function} from './lexical_analyzer.js'

let tokens

let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')

 textarea.addEventListener('keyup',event=>textareaWrapper.innerHTML=event.target.value)
 
 document.querySelector('.btn').addEventListener('click',event=>{

    tokens=lexical_analyzer_function(textarea.value)

    tokens.forEach(token=>console.log(token))
 })

window.addEventListener('load',(event)=>{
    textarea.value=''
    textareaWrapper.innerHTML=''
})
