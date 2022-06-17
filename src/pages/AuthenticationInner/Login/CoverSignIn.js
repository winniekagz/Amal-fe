import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Col, Container, Input, Label, Row ,Button} from 'reactstrap';
import AuthSlider from '../authCarousel';
import * as Yup from "yup"
import { requests } from '../../../services/Api';
import { Form, Formik } from 'formik';

const CoverSignIn = () => {
    document.title="Cover SignIn  | Velzon - React Admin & Dashboard Template";
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState("")
    const [successResponse,setSuccessResponse]=useState("")
    const history= useHistory()

    const LoginUser= async(values)=>{
    try {
        setLoading(true)
         const response = await requests.post(`auth/login`,values)
         setLoading(false)
         const {data} = response
        console.log('loginresponse',data)

      

     
       console.log("userdata",data)
        const user = {
            name: data.user.name,
            email: data.user.email,
          }

         

         
         setTimeout(() => {
             setSuccessResponse("")
           }, 5000)   
     
       
    }
      catch (error) {
        setLoading(false)
        console.log('error',error)
        setServerError(error.response.data.message)
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
                                    <Row className="g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p className="text-muted">Sign in to continue to Amal.</p>
                                                </div>

                                                <div className="mt-4">
                                                <Formik
                                    initialValues={{
                                        "email":"",
                                        "password":""
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string().email('Invalid email address').required('Required'),
                                      password: Yup.string().required('Required'),
                                       
                                    })}
                                    onSubmit={(values) => {
                                       LoginUser(values)
                                      }}>
                                    {({values, isSubmitting, errors, handleSubmit, handleChange,isValid,
          dirty}) => (

                                    <Form >

                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label text-capitalize">email</Label>
                                                            <Input type="text" 
                                                            className="form-control"
                                                             id="username"
                                                              placeholder="Enter username"
                                                               required
                                                               name="email"
                                                               onChange={handleChange}
                                                               value={values.email}/>
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link to="//forgot-password" className="text-muted text-capitalize">Forgot password?</Link>
                                                            </div>
                                                            <Label className="form-label text-capitalize" htmlFor="password-input">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input type="password"
                                                                 className="form-control pe-5" 
                                                                 placeholder="Enter password"
                                                                  id="password-input"
                                                                   required
                                                                name="password"
                                                                onChange={handleChange}
                                                                value={values.password}/>
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>

                                                       

                                                        <div className="mt-4">
                                                            <Button  type="submit" color="success" className="w-100" >Sign In</Button>
                                                        </div>

                           

                                                    </Form>
          )}
          </Formik>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Don't have an account ? <a href="/auth-signup-cover" className="fw-bold text-primary text-decoration-underline"> Signup</a> </p>
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

export default CoverSignIn;