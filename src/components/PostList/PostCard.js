import React, { useState } from "react";

import { Card, Col, Badge, Button, Modal } from "react-bootstrap";
import './PostCard.css'
import dayjs from 'dayjs'

import { Link } from "react-router-dom";

import { FaHeart } from 'react-icons/fa'

import User from '../User'

const PostCard = ({ post }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = (event) =>{
    event.preventDefault()
    setShow(true);
  } 

  const author = `${post.owner.firstName} ${post.owner.lastName}`

  const date = dayjs(post.publishDate).format("DD-MM-YYYY")

  const handleFilter = () => {
    console.log('Filtrar')
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

      <Col md={3} style={{ 'marginBottom': '2%' }}>
        <Card className="card">
          <Card.Header>
            <Button onClick={handleShow} href={post.owner.id} variant="link">{author}</Button>
          </Card.Header>
          <Card.Img variant="top" src={post.image} />
          <Card.Body>
            <Card.Title>{post.text}</Card.Title>
            <Link to={`/post/${post.id}`} key={post.id}>

            </Link>
            <Card.Text> {post.link &&
              <Button href={post.link} variant="dark">Go to link</Button>
            }
            </Card.Text>
            {post.tags.map((tag) => {
              return <Badge className="hashTag" key={tag} onClick={handleFilter} pill variant="info">#{tag}</Badge>
            }
            )}
          </Card.Body>
          <Card.Footer>
            <FaHeart />
            <small className="text-muted">  {post.likes}</small>
            <small className="text-muted date">Date: {date}</small>
          </Card.Footer>

        </Card>
      </Col>
    </>
  );
}

export default PostCard;