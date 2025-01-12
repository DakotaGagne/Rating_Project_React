/*
Component that displays the main body of the Login / Registration page. 
The main body contains a form to login / register. 
This also handles the redirects with error hash (if user accesses pages they shouldn't without logging in, they will be redirected).
Logging in / Registering with Username and Password is valid, as is using Github and Google OAuth.
The search results are fetched from the TMDB Public API when the media name input is changed.

Props:
    - darkMode: Used to determine the current dark mode setting. (darkMode.get is a boolean, darkMode.set is a function)
    - user: The current user of the website (false or string of type ["github", "google", "local"]). Used to determine if the user is logged in.
    - mobile: The current window size of the website (boolean). Used to determine if the website is being viewed on a mobile device.
*/
import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Container, Col, Row, Button, Alert, Form} from "react-bootstrap";
import Cookies from 'js-cookie';
import IconGithub from "../icons/IconGithub";
import IconGoogle from "../icons/IconGoogle";
import IconBxMessageSquareEdit from "../icons/IconBxMessageSquareEdit";
import { clean } from 'profanity-cleaner';



export default function LoginRegister( { darkMode, user, mobile, windowWidth } ) {
    // If true, display login form. If false, display register form
    const [loginMode, setLoginMode] = useState(true);
    // Error and Success messages, and their respective timeouts
    const [error, setError] = useState("");
    const errorTimeout = 5000;
    const [success, setSuccess] = useState("");
    const successTimeout = 2000;
    // Username and Password character limits [min, max]
    const user_range = [5, 25];
    const pass_range = [8, 50];
    // Form data (same for register and login, but login ignores confirmPassword)
    const [formData, setFormData] = useState({username: "", password: "", confirmPassword: ""});
    // Function to redirect to a different page
    const navigate = useNavigate();
    // Get the current URL location
    const location = useLocation();

    // Clear errors and successes after a certain amount of time
    useEffect(() => {if(error!="")setTimeout(() => setError(""), errorTimeout)}, [error])
        useEffect(() => {if(success!="")setTimeout(() => setSuccess(""), successTimeout)}, [success])
            // Check if user was force redirected to login. If so, display error message
    useEffect(() => {location.hash=="#error"&&setError("You must be logged in first!")}, [])
    // Check if user is already logged in. If so, redirect to home screen
    useEffect(() => {if(user)setError(`Already Signed in. Redirecting to Home Screen...`),setTimeout(() => navigate('/'), errorTimeout/2);}, [user])
        
    // Helper Functions
    const updateFormData = (e) => setFormData({...formData, [e.target.name]: e.target.value});
        

    function checkFormData(){
        // Check if form data is valid. If not, return error message
        let err="";
        if(formData.username==""||formData.password=="")err="Must fill out all fields";
        else if(formData.username.length<user_range[0])err=`Username must be at least ${user_range[0]} characters`;
        else if(formData.username.length>user_range[1])err=`Username cannot exceed ${user_range[1]} characters`;
        else if(!loginMode&&clean(formData.username)!=formData.username)err="Username contains inappropriate language!";
        else if(formData.password.length<pass_range[0])err=`Password must be at least ${pass_range[0]} characters`;
        else if(formData.password.length>pass_range[1])err=`Password cannot exceed ${pass_range[1]} characters`;
        else if(!loginMode&&formData.password!=formData.confirmPassword)err="Passwords do not match";
        return err;
    }

    const googleSignIn = () => window.open("http://localhost:3000/auth/google", "_self"); // Google OAuth Redirect
    const githubSignIn = () => window.open("http://localhost:3000/auth/github", "_self"); // Github OAuth Redirect

    // Called on keydown event inside form or text areas (submit form data if user presses enter)
    const checkSubmit = (e) => e.key=="Enter"&&submitFormData();

    function submitFormData(){
        // Check if form data is valid. If not, display error message. If so, submit data
        // If loginMode is true, submit login data. If false, submit register data
        // If successful, set success message and redirect to home screen
        // If unsuccessful, set error message
        let err = checkFormData();
        if(err!=""){
            setError(err);
        } else {
            let url = loginMode?"login":"register";
            fetch(`http://localhost:3000/auth/local/${url}`, {
                method: "POST",
                mode: "cors",
                headers: {Accept: 'application/json','Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            })
            .then(res => {if(res.ok){return res.json()} else {throw new Error(res.status)}})
            .then(data => {
                if(loginMode){
                    Cookies.set('localUserJWT', data);
                    setSuccess(`Welcome ${formData.username}! Redirecting...`);
                    setTimeout(() => navigate('/'), successTimeout);
                } else {
                    setSuccess("Account created! Try Logging in...");
                    setTimeout(() => setLoginMode(true), successTimeout/3);
                }
            })
            .catch(err => {
                if(loginMode)setError("Error logging in. Check Username and Password and Try Again.");
                else setError("Error registering. Username may already be taken.");
                setSuccess("");
                console.log(err);
            });
        }
    }

    return (
        <Container
            fluid
            className={`d-flex flex-column my-5 font-domine`}
            style={{minHeight:"75vh"}}
        >
            {/* Alerts */}
            {success!=""&&<Alert className="position-fixed alert-fixed my-3" variant="info" onClose={() => setSuccess("")} dismissible>
                <Alert.Heading>{success}</Alert.Heading>
            </Alert>}
            {error!=""&&<Alert className="position-fixed alert-fixed my-3" variant="danger" onClose={() => setError("")} dismissible>
                <Alert.Heading>{error}</Alert.Heading>
            </Alert>}
            <Row className="my-5 d-flex">
                <Col xs={0} lg={4}></Col>
                <Col xs={12} lg={4} className={`border border-3 rounded border-secondary ${darkMode.get?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`}>
                    {/* Login / Register Form */}
                    <div className="p-3"></div>
                    <h1 className="text-center"><IconBxMessageSquareEdit className="h-100 me-1 mb-2" />{loginMode?"Login":"Register"}</h1>
                    {loginMode&&<p className="text-center">Welcome back! Please login to continue</p>}
                    {!loginMode&&<p className="text-center">Welcome! Register Below.</p>}
                    {!loginMode&&<Alert variant="warning" className="text-center">Please note that this is a personal project and while account security is prioritized, please do not use any real usernames or passwords.</Alert>}
                    <div className="text-center"><Button  variant="link" onClick={() => setLoginMode(!loginMode)}>{loginMode?"No account? Register Here":"Already have an account? Login Here"}</Button></div>
                    <Form>
                        <Form.Group className="my-3">
                            <Form.Label><b>Username</b></Form.Label>
                            <Form.Control name="username" type="username" placeholder="Enter Username" value={formData.username} onChange={updateFormData} onKeyDown={checkSubmit} />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control name="password" type="password" placeholder="Enter Password" value={formData.password} onChange={updateFormData} onKeyDown={checkSubmit} />
                        </Form.Group>
                        {!loginMode&&
                            <Form.Group className="my-3">
                                <Form.Label><b>Confirm Password</b></Form.Label>
                                <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={updateFormData} onKeyDown={checkSubmit} />
                            </Form.Group>
                        }
                        <Form.Group>
                            <Button variant="primary" onClick={submitFormData} className="w-100 mt-3 hovering-no-scale">
                                {loginMode?"Login":"Register"}
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-primary" onClick={googleSignIn} className="w-100 px-5 mt-2 border-rounded border-primary border hovering-no-scale">
                                <IconGoogle className="me-2 fs-4"/>
                                Sign in With Google
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-primary" onClick={githubSignIn} className="w-100 px-5 mt-2 mb-3 border-rounded border-primary border hovering-no-scale">
                                <IconGithub className="me-2 fs-3"/>
                                Sign in With Github</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={0} lg={4}></Col>
            </Row>
        </Container>
    );
};