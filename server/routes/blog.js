const express = require("express")
const route = express.Router()
const {create,getAllBlogs,singleBlog,remove,update} = require("../controllers/blogController")
const {requireLogin} = require("../controllers/authController")

route.post('/create',requireLogin,create)
route.get('/blogs',getAllBlogs)
route.get('/blog/:slug',singleBlog)

route.delete('/blog/:slug',requireLogin,remove)
route.put('/blog/:slug',requireLogin,update)

module.exports=route