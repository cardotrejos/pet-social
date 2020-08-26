import React, { useState } from "react";

import { Card, Col, Badge, Button, Modal } from "react-bootstrap";
import './PostCard.css'
import dayjs from 'dayjs'
import { FaHeart } from 'react-icons/fa'
import getUser from './getUsers'
import getComments from './getComments'


const PostCard = ({ post }) => {

  const [showUser, setShowUser] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);

  const handleCloseComments = () => setShowComments(false);

  const handleCloseUser = () => setShowUser(false);

  const handleShowUser = async () => {
    setShowUser(true);
    setUser(await getUser(post.owner.id))
  }

  const handleShowComments = async () => {
    setShowComments(true);
    setComments(await getComments(post.id))
  }

  const author = `${post.owner.firstName} ${post.owner.lastName}`

  const date = dayjs(post.publishDate).format("DD-MM-YYYY")

  const registerDate = dayjs(user.registerDate).format("DD-MM-YYYY")

  const dateOfBirth = dayjs(user.dateOfBirth).format("DD-MM-YYYY")


  const handleFilter = () => {
    console.log('Filtrar')
  }

  return (
    <>
      <Modal
        show={showUser}
        onHide={handleCloseUser}
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
          <h6><span className="bold">Date of Birth: </span>{dateOfBirth}</h6>
          <h6><span className="bold">Register Date: </span>{registerDate}</h6>
          <h6><span className="bold">Phone: </span>{user.phone}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUser}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showComments}
        onHide={handleCloseComments}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.map((comment) => {
            return (
              <Card key={comment.owner.id}>
                <Card.Header className="comment-header">
                  <img className="comment-avatar" variant="top" src={comment.owner.picture} alt="avatar"></img>
                  <h5 >{comment.owner.firstName} {comment.owner.lastName}</h5>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {comment.message}
                    </p>
                    <footer className="blockquote-footer">
                      Publish Date: {dayjs(comment.publishDate).format("DD-MM-YYYY")}
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            )
          }
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseComments}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Col md={3} style={{ 'marginBottom': '2%' }}>
        <Card className="card">
          <Card.Header>
            <Button onClick={handleShowUser} variant="link">{author}</Button>
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
            <Button onClick={handleShowComments} variant="primary">
              See Comments
            </Button>
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