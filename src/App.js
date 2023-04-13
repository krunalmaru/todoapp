import logo from './logo.svg';
import './App.css';
import Todo from './Components/Todo';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AiFillDelete} from 'react-icons/ai'

const getitems=()=>{
  let list = localStorage.getItem('mylistdata')
  if(list){
    return JSON.parse(localStorage.getItem('mylistdata'))
  }else{
    return []
  }
}

function App() {
  const [inputval, setInputval] = useState('')
  const [listitem, setListitem] = useState(getitems())
  const [togglebtn ,setTogglebtn] = useState(false)
  const [upddateid, setUpdateid] = useState()
  const handleInput=(e)=>{
    setInputval(e.target.value)
  }
  const handleAdd=()=>{
    if (togglebtn){
      const datafillter = listitem.map((ele)=>{
        if(ele.id === upddateid){
          return {...ele, itemName:inputval}
        }
        return ele;
      }) 
      setListitem(datafillter)
      setInputval('')
      setTogglebtn(false)
      setUpdateid()
      toast.success("Updated successfully")
      
    }else{
      const itemobj = {id:uuid(),itemName:inputval}
      setListitem((prev)=>{
        return [...prev,itemobj]
      })
      // setListitem([...listitem,inputval])
      setInputval('')
      toast.success('Item Added')
    }
  }

  console.log(listitem)
  useEffect(()=>{
    localStorage.setItem('mylistdata',JSON.stringify(listitem))
  },[listitem])
  const handleDelete =(index)=>{
    const filterdel = listitem.filter((ele)=>{
      return ele.id !== index
    })
    setListitem(filterdel)
    toast.error('Item Deleted')
  }
  const handleDeleteAll=()=>{
    setListitem([])
    toast.error('All Items Deleted Successfully')
  }
  const handleEdit=(id)=>{
    const updatefilter = listitem.find((ele)=>{
      return ele.id === id
    })
    setInputval(updatefilter.itemName)
    setTogglebtn(true)
    setUpdateid(id)
  }


  return (
    <div className="App">
      <div className="parent_div">
        <h1>React Todo List</h1>
        <div className="row">
          <div className="col-md-6 offset-2 ">
            <input className='rounded shadow p-2 w-75 border' type="search"  placeholder='To Do...' value={inputval} onChange={handleInput}/>
          </div>
          <div className="col-md-4">
            {
              togglebtn ? <button className='btn btn-info mx-2 mt-1' onClick={handleAdd} disabled={inputval.length <= 2 ? true : false}>Update Item</button>:
               <button className='btn btn-info mx-2 mt-1' onClick={handleAdd} disabled={inputval.length <= 2 ? true : false}>Add Item</button>
 }
            <button className='btn btn-danger mt-1' onClick={handleDeleteAll} disabled={listitem.length <= 0 ? true : false}><AiFillDelete/></button>
          </div>
          <div className="col-md-3">
          </div>
        </div>
        <div className="row p-2 m-2 rounded">
          <div className="col-md-10 shadow p-2 offset-1 rounded bg-warning">
            <Todo itemlist={listitem} handleDelete={handleDelete} handleEdit={handleEdit}/>
            <ToastContainer theme='colored'/>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
