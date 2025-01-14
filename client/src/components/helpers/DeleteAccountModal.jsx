/*
Component that produces a modal for account deletion confirmation
The user must type "confirm" in the box to proceed with account deletion
If the user types "confirm" and clicks the "Proceed to Deletion" button, the account will be deleted
Props:
    - show: Used to determine if the modal should be displayed (boolean)
    - setShow: Used to set the show state of the modal (function)
    - deleteAccount: Function to delete the account (function)
*/
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function DeleteAccountModal( { show, setShow, deleteAccount } ) {
  const [confirm, setConfirm] = useState("");
  function confirmDeletion(){
    // Makes sure that the user has typed "confirm" in the box before proceeding
    // If so, closes modal, and calls parent function to delete account
    if(confirm==="confirm"){
      setShow(false);
      setConfirm("");
      deleteAccount();
    } else {
      setConfirm("");
    }
  }

  
  return (
      <Modal show={show} backdrop="static" style={{zIndex: '999999'}} centered>
        <Modal.Header>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {e.preventDefault();confirmDeletion()}}>
            <Form.Group className="mb-3">
              <Form.Label>
                Please note that proceeding will delete your account, as well as all associate posts. Please continue only if you are absolutely sure this is what you wish to do!<br/>
                <i>To continue, please type "confirm" in the box below.</i>

              </Form.Label>
              <Form.Control
                className={confirm==="confirm"?"is-valid":"is-invalid"}
                type="text"
                placeholder="type 'confirm' here"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="primary" onClick={()=>{setConfirm("");setShow(false)}} className="hovering">
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={confirmDeletion} className="hovering">
            Proceed to Deletion
          </Button>
        </Modal.Footer>
      </Modal>
  );
}