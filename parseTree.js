import {root} from "./syntax_analyzer.js"

function drawTree(node,list){
    
    if(node.nonTerminal !=undefined){
        let li=document.createElement('li')
        li.innerHTML=`${node.nonTerminal}`
        list.appendChild(li)
        let newList=document.createElement('ul')
        li.appendChild(newList)
        node.children.forEach(item=>{
            drawTree(item,newList)
        })
    }
    else{
        if(node.terminal=="#"){
            let li=document.createElement('li')
            li.innerHTML="#"
            list.appendChild(li)
        }
        else{
            let li=document.createElement('li')
            li.innerHTML=`${node.terminal.token}`
            list.appendChild(li)
        }
    }


}



let list=document.createElement('ul')
document.body.appendChild(list)

drawTree(root,list)