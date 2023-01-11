import { useState } from "react"
import NavbarComponents from "./NavbarComponents"
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { getUser,getToken } from "../services/authorize";

const FromComponent=()=>{
    
    const [state,setState] = useState({
        title: "",
        author:getUser(),
    })

    
    const {title,author} = state
    const [content,setContent]= useState('')

    const inputValue = name=>event=>{
        setState({...state,[name]:event.target.value})
    }
    const submitContent=(event)=>{
        setContent(event)
    }


    const submitFrom = (e)=>{
        e.preventDefault();
        console.log("Api Url = ",process.env.REACT_APP_API)
        axios.post(`${process.env.REACT_APP_API}/create`,
        {title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        }
        ).then(response=>{
            setState({...state,title:"",author:""})
            setContent("")
            Swal.fire(
                'แจ้งเตือน',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
        }).catch(err=>{
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })
    }

    return( 
        <div className="container p-5">
        <NavbarComponents/>

                <h1>บทความ</h1>
                <form onSubmit={submitFrom}>
            <div className="form-group">
            <label>ชื่อบทความ</label>
                <input type="text" className="form-control" 
                value={title} 
                onChange={inputValue("title")}
                />
            </div>

            <div className="form-group">
            <label>รายละเอียด</label>
            <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        style={{border:'1px solid #666'}}
                        placeholder="เขียนรายละเอียดของคุณ"

                    />
            </div>

            <div className="form-group">
            <label>ชื่อผู้แต่ง</label>
                <input type="text" className="form-control"
                value={author} 
                onChange={inputValue("author")}
                />
            </div>
            <br/>
            <input type="submit" value="บันทึก" className="btn btn-primary"/>
            
            </form>
        </div>
    )
}

export default FromComponent