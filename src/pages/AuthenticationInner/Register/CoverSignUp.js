import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { requests } from '../../../services/Api';
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Card, CardBody, Col, Container, Input, InputGroup, Label, Row } from 'reactstrap'
import ReactPhoneInput from "react-phone-input-2";
import AuthSlider from '../authCarousel';
import { useForm } from "react-hook-form";


const CoverSignUp = () => {
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState("")
    const [successResponse, setSuccessResponse] = useState("")
    const history = useHistory()
    const RegisterUser = async (values) => {
        try {
            setLoading(true);
            const response = await requests.post(`auth/register`, values)
            setLoading(false);
            setSuccessResponse("you have been registered successfully.please verify your email")

            setTimeout(() => {
                setSuccessResponse("")
            }, 5000);
            history.push("/")
        } catch (error) {
            setLoading(false);
            console.log('error', error)
            setServerError(error.response.data.message)
            setTimeout(() => {
                setServerError("")
            }, 5000)
        }
        console.log("phone", phone)
    }
    document.title = "Cover SignUp | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden m-0">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Amal investment</h5>
                                                    <p className="text-muted">register an Amal investment account</p>
                                                </div>

                                                <div className="mt-4">
                                                    <Formik
                                                        initialValues={{
                                                            "email": "",
                                                            "name": "",
                                                            "password": "",
                                                            "password_confirmation": ""
                                                        }}
                                                        validationSchema={Yup.object({
                                                            first_name: Yup.string().required("Required"),
                                                            middle_name: Yup.string().required("Required"),
                                                           last_name: Yup.string().required("Required"),
                                                            // phone_number:Yup.string().min(10,"number too short").required("required"),
                                                            email: Yup.string().email("invalid email").required("required"),
                                                            password: Yup.string().min(6, "Password too short").required('Required'),
                                                            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),


                                                        })}
                                                        onSubmit={(values, { resetForm }) => {
                                                            values['phone'] = phone
                                                            RegisterUser(values)
                                                            console.log("register values",values)
                                                            resetForm({ values: "" })
                                                        }}>
                                                        {({ values, isSubmitting, errors, handleSubmit, handleChange, dirty, isValid }) => (
                                                            <Form >
                                                                {serverError && (
                                                                    <div style={{ color: "red", fontSize: "15px" }}>{serverError && (
                                                                        serverError.map((servererror, index) => (
                                                                            <span key={index}>{servererror}</span>
                                                                        ))
                                                                    )}</div>
                                                                )}

                                                                {successResponse && (
                                                                    <div
                                                                        style={{ color: "green", fontSize: "15px", height: "30px", width: "auto", right: "0" }}>
                                                                        {successResponse}
                                                                    </div>

                                                                )}
                                                                <Row>
                                                                    <Col md={6}>
                                                                        <div className="mb-3">
                                                                            <Label className="form-label">First Name</Label>
                                                                            <Input type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter your firstname"
                                                                                id="first_name"
                                                                                name="first_name"
                                                                                onChange={handleChange}
                                                                                value={values.first_name} />
                                                                                 <div style={{ background: "lightgray", color: "red" }}>
                                                                                {errors.first_name}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-3">
                                                                            <Label htmlFor="middleNameinput" className="form-label">middle Name</Label>
                                                                            <Input type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter your middlename"
                                                                                id="middle_name"
                                                                                name="middle_name"
                                                                                onChange={handleChange}
                                                                                value={values.middle_name} />
                                                                                <div style={{ background: "lightgray", color: "red" }}>
                                                                                {errors.middle_name}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-3">
                                                                            <Label htmlFor="lastNameinput" className="form-label">last Name</Label>
                                                                            <Input type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter last name"
                                                                                id="last_name"
                                                                                name="last_name"
                                                                                onChange={handleChange}
                                                                                values={values.last_name} />
                                                                                <div style={{ background: "lightgray", color: "red" }}>
                                                                                {errors.last_name}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-3">
                                                                            
                                                                            <ReactPhoneInput
                                                                                
                                                                                defaultCountry="ke"
                                                                                required
                                                                                containerStyle={{ marginTop: "15px" }}
                                                                                searchClass="search-class"
                                                                                searchStyle={{ margin: "0", width: "97%", height: "30px" }}
                                                                                enableSearchField
                                                                                disableSearchIcon
                                                                                value={phone}
                                                                                onChange={(e) => setPhone(e)}


                                                                            />
                                                                            <div style={{ background: "lightgray", color: "red" }}>
                                                                                {errors.phone}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={12}>
                                                                        <div className="mb-3">
                                                                            <Label htmlFor="emailidInput" className="form-label">Email Address</Label>
                                                                            <Input type="email"
                                                                                className="form-control"
                                                                                placeholder="example@gamil.com"
                                                                                id="email"
                                                                                name="email"
                                                                                onChange={handleChange}
                                                                                value={values.email} />
                                                                                <div style={{ background: "lightgray", color: "red" }}>
                                                                                {errors.email}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-3">
                                                                            <Label htmlFor="password1ControlTextarea" className="form-label">password</Label>
                                                                            <Input type="password"
                                                                                className="form-control"
                                                                                placeholder="password 1"
                                                                                id="password"
                                                                                name="password"
                                                                                onChange={handleChange}
                                                                                value={values.password} />
                                                                                <div style={{ background: "lightgray", color: "red" }}>
                                                                                {errors.password}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div className="mb-3">
                                                                            <Label htmlFor="password1ControlTextarea" className="form-label">password</Label>
                                                                            <Input type="password"
                                                                                className="form-control"
                                                                                placeholder="password 1"
                                                                                id="password"
                                                                                name="password_confirmation"
                                                                                onChange={handleChange}
                                                                                value={values.password_confirmation} />
                                                                                <div style={{ background: "lightgray", color: "red" }}>
                                                                                {errors.password_confirmation}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <div className="mt-4">
                                                                        <button className="btn btn-success w-100" type="submit">Sign Up</button>
                                                                    </div>
                                                                </Row>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Already have an account ? <Link to="/auth-signin-cover" className="fw-semibold text-primary text-decoration-underline"> Signin</Link> </p>
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
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default CoverSignUp;