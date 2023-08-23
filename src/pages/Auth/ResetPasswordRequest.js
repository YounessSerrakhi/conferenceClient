import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ResetPasswordRequest() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [email,setEmail]=useState("");

  const {api}=useAuth();

  const handleResetPassword = () => {
        api.post('api/forgot-password',{email})
          .then(response => {
            alert(response.data.message);
            setShowModal(false);
          })
          .catch(error => {
            console.log(error);
                });
      
  };

  
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
      >
        Mot de passe oublié!!
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Enter your email address and we'll send you an email with instructions to reset your password.
          </p>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" onClick={handleResetPassword}>
                Reset Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <h6>you are not registred?</h6>
            <Link to="/register">Register</Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
