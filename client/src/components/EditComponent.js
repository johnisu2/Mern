import { useState,useEffect } from "react"
import NavbarComponents from "./NavbarComponents"
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { getToken } from "../services/authorize";

const EditComponent=(props)=>{
    
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,content,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const [state,setState] = useState({
        title: "",
      
        author:"",
        slug:""
    })
    const [content,setContent]= useState('')
    const {title,author,slug} = state

    const submitContent=(event)=>{
        setContent(event)
    }
    const inputValue = name=>event=>{
        setState({...state,[name]:event.target.value})
    }
    const submitFrom = (e)=>{
        e.preventDefault();
        console.log("Api Url = ",process.env.REACT_APP_API)
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,
        {title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        }
        ).then(response=>{
            Swal.fire('แจ้งเตือน',"อัพเดตบทความเรียบร้อย",'success')
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        }).catch(err=>{
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })
    }

        const showUpdateForm=()=>(
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

                    />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" 
                        value={author}
                        onChange={inputValue("author")}
                    />
                </div>
                <br/>
                <input type="submit" value="อัพเดต" className="btn btn-primary"/>
            </form>
    )

    return( 
        <div className="container p-5">
        <NavbarComponents/>

                <h1>แก้ไขบทความ</h1>
                {showUpdateForm()}
        </div>
    )
}

export default EditComponent