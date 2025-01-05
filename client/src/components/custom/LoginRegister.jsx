import React, {useState, useEffect} from "react";
import Rating from "@mui/material/Rating";
import PosterImage from "../material-ui/PosterImage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import cssBaseline from "@mui/material/CssBaseline";

import {Container, Col, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import Cookies from 'js-cookie';


export default function LoginRegister({appSettings:{darkMode}, updateAppSettings, user, localUserCookie}) {
    const [loginMode, setLoginMode] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const user_range = [5, 15];
    const pass_range = [8, 50];

    const errorTimeout = 5000;
    const successTimeout = 2000;

    useEffect(() => {if(error!="")setTimeout(() => setError(""), errorTimeout);}, [error])
    useEffect(() => {if(success!="")setTimeout(() => setSuccess(""), successTimeout);}, [success])

    

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    function updateFormData(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function checkFormData(){
        let err="";
        if(formData.username==""||formData.password==""){
            err="Must fill out all fields";
        } else if(formData.username.length<user_range[0]){
            err=`Username must be at least ${user_range[0]} characters`;
        } else if(formData.username.length>user_range[1]){
            err=`Username cannot exceed ${user_range[1]} characters`;
        } else if(formData.password.length<pass_range[0]){
            err=`Password must be at least ${pass_range[0]} characters`;
        } else if(formData.password.length>pass_range[1]){
            err=`Password cannot exceed ${pass_range[1]} characters`;
        } else if(!loginMode&&formData.password!=formData.confirmPassword){
            err="Passwords do not match";
        }
        return err;
    }

    const googleSignIn = () => window.open("http://localhost:3000/auth/google", "_self");
    const githubSignIn = () => window.open("http://localhost:3000/auth/github", "_self");

    function submitFormData(){
        let err = checkFormData();
        if(err!=""){
            setError(err)
            setSuccess("")
        } else {
            // ! Submit Data Here
            let url = loginMode?"login":"register";
            fetch(`http://localhost:3000/auth/local/${url}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            .then(res => {if(res.ok){return res.json()} else {throw new Error(`Error submitting data: ${res.status}`)};})
            .then(data => {
                if(loginMode){
                    Cookies.set('localUserJWT', data);
                    setSuccess(`Welcome ${formData.username}! Redirecting...`);
                    setTimeout(() => window.location.href='/', successTimeout);
                    setError("");
                } else {
                    setSuccess("Account created! Try Logging in...");
                    setTimeout(() => setLoginMode(true), successTimeout);
                    setError("");
                }
            })
            .catch(err => {
                setError("Error submitting data!");
                setSuccess("");
                console.log(err);
            });
        }
    }

    return (
        <Container
            fluid
            className={`d-flex flex-column my-5 justify-content-center`} 
        >
            <Row>
                {/**Header and blurb */}
                <Col xs={0} lg={4}></Col>
                <Col xs={12} lg={4} className={`border border-3 rounded border-secondary ${darkMode?"text-light bg-dark card-shadow-l":"bg-light text-dark card-shadow-d"}`}>
                    <div className="p-3"></div>
                    {error!=""&&<Alert variant="danger" className="text-center mb-3">{error}</Alert>}
                    {success!=""&&<Alert variant="info" className="text-center mb-3">{success}</Alert>}
                    <h1 className="text-center">{loginMode?"Login":"Register"}</h1>
                    {loginMode&&<p className="text-center">Welcome back! Please login to continue</p>}
                    {!loginMode&&<p className="text-center">Welcome! Register Below.</p>}
                    {!loginMode&&<Alert variant="warning" className="text-center">Please note that this is a personal project and while account security is prioritized, please do not use any real usernames or passwords.</Alert>}
                    <div className="text-center"><Button  variant="link" onClick={() => setLoginMode(!loginMode)}>{loginMode?"No account? Register Here":"Already have an account? Login Here"}</Button></div>
                    <Form>
                        <Form.Group className="my-3">
                            <Form.Label><b>Username</b></Form.Label>
                            <Form.Control name="username" type="username" placeholder="Enter Username" value={formData.username} onChange={updateFormData}/>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control name="password" type="password" placeholder="Enter Password" value={formData.password} onChange={updateFormData}/>
                        </Form.Group>
                        {!loginMode&&
                            <Form.Group className="my-3">
                                <Form.Label><b>Confirm Password</b></Form.Label>
                                <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={updateFormData}/>
                            </Form.Group>
                        }
                        <Button variant="primary" onClick={submitFormData} className="w-auto px-5 my-3">
                            {loginMode?"Login":"Register"}
                        </Button>
                    </Form>
                    <Button variant="secondary" onClick={googleSignIn} className="w-auto px-5 my-3">Sign in With Google</Button>
                    <Button variant="secondary" onClick={githubSignIn} className="w-auto px-5 my-3">Sign in With Github</Button>
                </Col>
                <Col xs={0} lg={4}></Col>
            </Row>
        </Container>
    );
};