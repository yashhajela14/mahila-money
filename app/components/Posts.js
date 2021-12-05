import * as React from 'react'
import { useState } from 'react'
import { fetchPosts } from '../utils/api'


function PostsList({ posts }) {
  return (
    <ul>
      {posts.map((post, index) => {
        const { postID, postHeader, userName, fullName, likes, comments, mediaUrl, active, published } = post

        return (
          <div key={postID} className='post'>
            <h3>Name: {fullName}</h3>
            <h2>Post Title: {postHeader}</h2>
            <img src={mediaUrl} alt={`Image for ${userName}`} />
            <h4>Likes: {likes}</h4>
            <h4>Comments: {comments.length}</h4>
            <h4>Username: {userName}</h4>
            <button>{active === true ? "Active" : "Inactive"}</button>
            <button>{published === true ? "Published" : "Unpublished"}</button>
          </div>
        )


      })}
    </ul>
  )
}

function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber)
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return data.slice(startIndex, endIndex)
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div>
      <h1>{title}</h1>
      <div className="dataContainer">
        <RenderComponent posts={getPaginatedData()} />
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </div>
    </div>
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
        <button
          onClick={() => this.handleReset()}>
          Reset
        </button>
        {posts && (
          <>
            <Pagination
              data={posts}
              RenderComponent={PostsList}
              title="Posts"
              pageLimit={3}
              dataLimit={1}
            />
          </>
        )}
      </React.Fragment>
    )
  }
}