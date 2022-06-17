import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Link, useHistory,useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'reactstrap';
import * as Yup from "yup"
import { requests } from '../../services/Api';
import AuthSlider from '../AuthenticationInner/authCarousel';

const PasswordReset = () => {
    
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState("")
    const [successResponse, setSuccessResponse] = useState("")
    const {token,email}=useParams()
    const navigate=useHistory()
    const ResetPassword=async(values)=>{
        setLoading(true)
        const data = {
            password: values.password,
            password_confirmation: values.password_confirmation,
            token: token,
            // email: decodeURIComponent(email)
            email:email
          }
        try {
            const response=await requests.post("/password/reset",data,{
                headers: {
                    'Content-Type': 'application/json'
                }  
            })
            setLoading(false)
            console.log("response",response)
            setSuccessResponse("your password has been changed")
            setTimeout(() => {
             setSuccessResponse("")
            }, 5000);
        
        } catch (error) {
            setLoading(false);
            console.log('error',error.response)
            setServerError(error.response)
            setTimeout(()=>{
              setServerError("")
            },5000)
        }
    }
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <h5 className="text-primary">Forgot Password?</h5>
                                                <p className="text-muted">Reset password with velzon</p>

                                                <div className="mt-2 text-center">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rhvddzym.json"
                                                        trigger="loop"
                                                        colors="primary:#0ab39c"
                                                        className="avatar-xl"
                                                        style={{ width: "120px", height: "120px" }}>
                                                    </lord-icon>
                                                </div>

                                                <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                                    Enter a new password to reset your password
                                                </div>
                                                <div className="p-2">
                                                    <Formik
                                initialValues={{
                                    "password":"",
                                    "password_confirmation":""
                                    
                                }}
                                validationSchema={Yup.object({
                                    password: Yup.string().min(6, "Password too short").required('Required'),
                                    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),
                                    
                                    
                                })}
                                onSubmit={(values) => {
                                    ResetPassword(values)
                                    }}>
                                {({values, isSubmitting, errors, handleSubmit, handleChange}) => (
                                                    <Form>
                                                        <div className="mb-4">
                                                            <label className="form-label text-capitalize">password</label>
                                                            <input type="password"
                                                             className="form-control" 
                                                             id="password"
                                                              placeholder="Enter password "
                                                               required
                                                               value={values.password}
                                                               onChange={handleChange}
                                                               name="password"/>
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="form-label text-capitalize">password confirmation</label>
                                                            <input type="password" 
                                                            className="form-control"
                                                             id="password_confirmation" 
                                                             placeholder="confirm password " 
                                                             required
                                                             value={values.password_confirmation}
                                                             onChange={handleChange}
                                                             name="password_confirmation"/>
                                                        </div>

                                                        <div className="text-center mt-4">
                                                            <Button color="success" className="w-100" type="submit">Submit</Button>
                                                        </div>
                                                    </Form>
                                )}
                                </Formik>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Wait, I remember my password... <Link to="/auth-signin-cover" className="fw-bold text-primary text-decoration-underline"> Click here </Link> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default PasswordReset;