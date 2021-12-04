import * as React from 'react'
import { fetchPosts } from '../utils/api'


function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post, index) => {
        const { postID, postHeader, userName, fullName, likes, comments, mediaUrl, active, published } = post

        return (
          <li key={postID}>
            <h3>Name: {fullName}</h3>
            <h2>Post Title: {postHeader}</h2>
            <img src={mediaUrl} alt={`Image for ${userName}`} />
            <h4>Likes: {likes}</h4>
            <h4>Comments: {comments.length}</h4>
            <h4>Username: {userName}</h4>
            <button>{active === true ? "Active" : "Inactive"}</button>
            <button>{published === true ? "Published" : "Unpublished"}</button>
          </li>
        )

      })}
    </ul>
  )
}

export default class Posts extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      posts: null,
    }
    this.getPosts = this.getPosts.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  getPosts() {
    fetchPosts()
      .then((posts) => this.setState({
        posts
      }))
  }

  handleReset() {
    this.setState({
      posts: null
    })
  }

  render() {
    const posts = this.state.posts


    return (
      <React.Fragment>
        <button
          className='btn-clear nav-link'
          style={0 === 1 ? { color: 'rgb(187, 46, 31)' } : null}
          onClick={() => this.getPosts()}>
          Posts
        </button>
        {posts && <PostsList posts={posts} />}
        <button
        onClick={()=>this.handleReset()}>
          Reset
        </button>
      </React.Fragment>
    )
  }
}