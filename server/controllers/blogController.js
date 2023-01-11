//ต่อกับตาต้าเบสสส

const slugify = require("slugify")
const Blogs = require("../models/blog")
const { v4: uuidv4 } = require('uuid');
// This should already be declared in your API file


exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)
  if(!slug)slug=uuidv4();


    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        }
        res.json(blog)
    })

    // res.json({
    //     data:{title,content,author,slug}
    // })
}


//ดึงข้อมูลมาแสดง
exports.getAllBlogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    }
    )
}

//ดึงบทความตามทีั่ต้องการ

exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

//ลบ

exports.remove=(req,res)=>{
    const {slug} =req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}

exports.update=(req,res)=>{
    const {slug} =req.params
    const {title,content,author}=req.body //ต้องส่งข้อมูลข้างในมาด้วย ไม่งั้นจะเอาอะไรมาอัพพพ
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
                        //slug=ให้ดูข้อมูลจากอันนี้   ..ต่อมาคือให้อัพเดิทข้อมูลจากไหน  .. ต่อมาnew:trueคือให้อัพพพพ
        if(err) console.log(err)
        res.json(blog)
    })
}