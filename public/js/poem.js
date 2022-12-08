

const poemNumber={test: location.pathname}
function getpoem(){
    fetch('/getPoemData', {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(poemNumber)
    })
    .then((response)=>response.json())
    .then(data=>{
        console.log(data)
        document.getElementById('poemtitle').innerHTML=data.title
        document.getElementById('date').innerHTML=data.date
        document.getElementById('poem').innerHTML=data.poem
    })
    fetch('/parsenext',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: location.pathname})
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.data=='inapplicable'){
            document.getElementById('fab').innerHTML='<a href="javascript:back()">back</a>'
        }
    })
    fetch('/parsebefore',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: location.pathname})
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.data=='inapplicable'){
            document.getElementById('fab').innerHTML='<a href="javascript:test()">next</a>'
        }
    })
}
function test(){
    fetch('/parsenext',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: location.pathname})
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.data!='inapplicable'){
            location.replace('/poem/'+data.data)
        }
    })
}
function back(){
    fetch('/parsebefore',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: location.pathname})
    })
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        if(data.data!='inapplicable'){
            location.replace('/poem/'+data.data)
        }
    })
}