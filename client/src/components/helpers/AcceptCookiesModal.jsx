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
import Cookies from 'js-cookie';

export default function updateCookiesModal() {
    let show = true;
    if(Cookies.get('acceptCookies')==="true")return null;

    function confirmCookies(){
        Cookies.set('acceptCookies', 'true', { expires: 365 });
        window.location.reload();
    }

    return (
        <Modal show={show} backdrop="static" style={{zIndex: '999999'}} centered>
            <Modal.Header>
            <Modal.Title>Please Accept Cookies</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                This site uses cookies to store app preferences and session information when logged in. By continuing to use this site, you agree to the use of cookies.  
            </Modal.Body>
            <Modal.Footer>
            <Button type="button" variant="primary" onClick={confirmCookies} className="hovering w-100">
                Continue
            </Button>
            </Modal.Footer>
        </Modal>
    );
}