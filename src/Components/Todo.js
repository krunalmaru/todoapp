import React from 'react'

function Todo(props) {
    const {itemlist,handleDelete, handleEdit} = props
   
  return (
    <>
           {/* <h3 className='text-dark'>List Items</h3> */}
       {itemlist ?.length !==0 ? itemlist.map((ele)=>{
            return(
                <div className="row mt-4" key={ele.id}>
                    <div className='col-md-6 offset-2 hoverable bg-secondary text-white shadow rounded p-2'>
                        <span>{ele.itemName}</span>
                    </div>
                        <div className="col-md-4">
                            <button className='btn btn-danger btn-sm m-2' onClick={()=>handleDelete(ele.id)}>Delete</button>
                            <button  className='btn btn-success btn-sm' onClick={()=>handleEdit(ele.id)}>Edit</button>
                        </div>
                </div>
            )
        }) :'No Items Added..'
       }
    </>
  )
}

export default Todo