import React, { useState, useEffect } from "react";

import { Card, Col, Badge, Button, Modal } from "react-bootstrap";
import './PostCard.css'
import dayjs from 'dayjs'
import { FaHeart } from 'react-icons/fa'
import useGetUser from './useGetUsers'


const PostCard = ({ post }) => {

  const [show, setShow] = useState(false);
  const [id, setId] = useState('')

  const handleClose = () => setShow(false);

  const handleShow = (event) => {
    setShow(true);
  }
  console.log(id)

  const { user } = useGetUser(id)
  
  console.log(user)
  
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
          <Modal.Title>{author}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="avatar" variant="top" src={post.owner.picture} alt="avatar"></img>
          <br />
          <h6><span className="bold">Email: </span> {post.owner.email}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Col md={3} style={{ 'marginBottom': '2%' }}>
        <Card className="card">
          <Card.Header>
            <Button onClick={() => { setId(post.owner.id); handleShow() }} variant="link">{author}</Button>
          </Card.Header>
          <Card.Img variant="top" src={post.image} />
          <Card.Body>
            <Card.Title>{post.text}</Card.Title>
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