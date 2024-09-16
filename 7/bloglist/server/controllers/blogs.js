const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  
blogsRouter.post('/', userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
  
    const user = request.user
  
    if (!user ) {
      return response.status(403).json({ error: 'user missing' })
    }  
  
    if (!blog.title || !blog.url ) {
      return response.status(400).json({ error: 'title or url missing' })
    }   
  
    blog.likes = blog.likes | 0
    blog.user = user
    user.blogs = user.blogs.concat(blog._id)
  
    await user.save()
  
    const savedBlog = await blog.save()
  
    response.status(201).json(savedBlog)
  })
  

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user 

    const blog = await Blog.findById(request.params.id)

    if (!blog.user) {
      return response.status(400).json({ error: 'blog has no user' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'permission denied' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blogObj = {
      title,
      author,
      url,
      likes: likes || 0,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogObj, { new: true});

    return response.status(204).json(updatedBlog)
  })

blogsRouter.post('/:id/comments', async (request, response) => {
    const { comment } = request.body
  
    if (!comment) {
      return response.status(400).json({ error: 'Comment content missing' })
    }
  
    const blog = await Blog.findById(request.params.id)
  
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }
  
    blog.comments = blog.comments.concat(comment)
  
    const updatedBlog = await blog.save()
  
    response.status(201).json(updatedBlog)
  })


module.exports = blogsRouter