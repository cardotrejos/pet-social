import React, { useState,  } from 'react';

import { Container, Row, Button } from "react-bootstrap";

import PostCard from "./PostCard";
import useGetPosts from './useGetPosts'

const Posts = () => {

  const [pageNumber, setPageNumber] = useState(0)

  const {
    posts,
    //hasMore,
    loading,
    error
  } = useGetPosts(pageNumber)

// TRYING TO IMPLEMENT INFITE SCROLLING

/* You must import this components {useRef, useCallback} */

/*   const observer = useRef()
  const lastPostElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible')
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore]) */

  const handleNextPage = () => setPageNumber(prevPageNumber => prevPageNumber + 1)

  return (
    <>
      <Container>
        <Row>
          <h1>Pet Social</h1>
        </Row>
        <Row>
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return <PostCard  key={post.id} post={post} />
            } else {
              return <PostCard key={post.id} post={post} />
            }
          })}
          <div>{error && 'Error'}</div>
          <Button className="seeMore" variant="primary" size="lg" block onClick={!loading ? handleNextPage : undefined}>
           {loading ? "Loading..." : "Click to load more post"}
          
          </Button>
        </Row>
      </Container>
    </>
  )
}

export default Posts; 