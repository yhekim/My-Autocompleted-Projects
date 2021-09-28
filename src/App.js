import React,{useState,useEffect,useRef} from 'react';
import './App.css';

// const data=[
//   {
//       id: 1,
//       title: "test"
//   },
//   {
//       id: 2,
//       title: "test 2"
//   }, {
//     id: 3,
//     title: "test 3"
// }, 
// {
//   id: 4,
//   title: "Test 4"
// },
// {
//   id: 4,
//   title: "Deneme"
// },
// {
//   id: 5,
//   title: "deneme"
// },
// {
//   id: 5,
//   title: "türkiye"
// }

// ]

function App() {
  const [search,setSearch]=useState("");
  const [data,setData]=useState([])
  const [result,setResult]=useState([]);
  const isTyping=search.replace(/\s+/,"").length>0;
  const searchRef=useRef();

  useEffect(()=>{
    if (isTyping) {
      const filteredResult=data.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()));
      setResult(filteredResult.length > 0 ? filteredResult : false);
      
    }else
    {
      setResult(false);}

     const getData=setTimeout(()=>{
        fetch(`https://jsonplaceholder.typicode.com/todos/`)
       .then(res=>res.json())
        .then(items=>setData(items))
      },500);
       return ()=>{
         clearTimeout(getData);
       }
  
  
  },[search])

  useEffect(()=>{
document.addEventListener("mousedown",handleClickOutside)
return () => {
  document.removeEventListener("mousedown",handleClickOutside)
}
  },[search])
const handleClickOutside = (e) =>{
  const tiklananDeger=searchRef.current;
  if(!tiklananDeger.contains(e.target)){
    setSearch("")
  }else{
    return null;
  }
}
  
  
  
  
  return (
    <>
<div  className="search" ref={searchRef}>
  <input type="text" value={search} placeholder="Bir şeyler ara..." className={isTyping ? "typing" : null}  onChange={(e)=>setSearch(e.target.value)}/>
  {isTyping && (
    <div className="search-result">
      {result && result.map((item)=>(
        <div key={item.id} className="search-rsult-item">
        
        {/* <img src={item.image} alt={item.title}></img> */}
          <div>
          <div className="title">{item.title} &nbsp; {item.completed ? <i className="fas fa-check"></i>:<i className="fas fa-times"></i>}</div>
          
          </div>
        
          
        </div>
        
      ))}
      {!result && (
        <div className="result-not-found">
        {search} ile aradığınız kelime bulunamamıştır.
        </div>
      )}
    </div>
  )} 
</div>
    </>
  );
}

export default App;
