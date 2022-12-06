async function getLatest(){
    
    let x=await fetch('/getPoemNumber')
    let y=await x.text()
    location.replace(location.href+'/'+y)
}