let textarea=document.querySelector('textarea')
let textareaWrapper=document.querySelector('.container')
let value
let regEX=/^\w$/

let emailRegEX=/^(www\.)?\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}$/

let array

 textarea.addEventListener('keyup',keyUpFunction)
 



function keyUpFunction(event){

     value=event.target.value
     textareaWrapper.innerHTML=value



    /* textareaWrapper.innerHTML=""
      array=value.split('\n')
      array.forEach(item=>{
         textareaWrapper.innerHTML +=`${item}<br>`
     })*/



   // textareaWrapper.innerHTML=textareaWrapper.innerHTML.replace(/Nasrin/g,'<a href="">Nasrin</a>')

   
   textareaWrapper.innerHTML=textareaWrapper.innerHTML.replace(/@[\w\.-]{3,}|@[\w\.-]{3,}/g,function(item){
        return `<a href="${item}">${item}</a>`
   })
   .replace(numbersRegEX,function(item){
    return `<a href="${item}" style="color:green;">${item}</a>`})
    .replace(commentRegEX,function(item){

      return `<a href="${item}" style="color:purple;">${item}</a>`
    })

   

    

   }



let numbersRegEX=/(?<![a-zA-Z_].*)[-+]?(\d+(\.?\d+)?|\.\d+)(E[-+]?\d+)?(?!.*[a-zA-Z_].*)/g
let variableRegEX=/[a-zA-Z_](\d|[a-zA-Z_])*/g
let whiteSpaceRegEX=/\s+/g
let operatorsRegEX=/(==|<=|>=|!=|\|\||&&)|[-+*\/%<>=!\(\)\{\}\[\],;]/g
let keyWordsRegEX=/(?<!\w)(bool|break|char|continue|else|false|for|if|int|print|return|true)(?!\w)/g
let commentRegEX=/\/\/.*/gm

