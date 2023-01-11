import './App.css';
import NavbarComponents from './components/NavbarComponents';
import axios from "axios";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import parse  from "html-react-parser"
import { getUser,getToken } from './services/authorize';

function App() {
  const [blogs,setBlogs] = useState([])

  //ดึงข้อมูลจากดาด้าเบสมาแสดงผล
  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    }).catch(err=>alert(err))
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบข้อความหรือไม่?",
      icon:"warning",
      showCancelButton:true,
    }).then((result)=>{
     if(result.isConfirmed){
      deleteBlog(slug)
     }
    })
  }

  const deleteBlog=(slug)=>{
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
      headers:{
          authorization:`Bearer ${getToken()}`
      }
    })
    .then(response=>{
        Swal.fire("Deleted!",response.data.message,"success")
        fetchData()
    }).catch(err=>console.log(err))
  }

  
  return (
    
    <div className="container p-5">
      <NavbarComponents />
     {blogs.map((blog,index)=>(
      <div className='row' key={index} style={{borderBottom:'1px solid black'}}>
          <div className="col pt-3 pb-2">
          <Link  
          onClick={e=>{
        
          }}
          to={`/blog/${blog.slug}`}
            
          >
                    <h2 >{blog.title}</h2>
                  </Link>
                  <div className="pt-3">{parse(blog.content.substring(0,250))}</div>
              <p className='text-muted'>ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
                    
                    {getUser()&& (
                       <div>
                       <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                       <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)} >ลบบทความ</button>
                     </div>
                    )}
          </div>
      </div>
     ))}
    </div>
  );
}

export default App;
