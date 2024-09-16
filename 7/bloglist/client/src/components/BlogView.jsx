import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const BlogView = ({ blog, addLike }) => {
  const dispatch = useDispatch()
  const userName = blog.user?.name || 'unknown'
  
  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(commentBlog(comment, blog.id))
    event.target.comment.value = ''
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.likes} likes <button onClick={() => addLike(blog)}>Like</button></p>
      <p>Added by {userName}</p>
      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <input name="comment" type='text' />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.map((c, index) => <li key={index}>{c}</li>)}
      </ul>
    </div>
  )
}

export default BlogView
