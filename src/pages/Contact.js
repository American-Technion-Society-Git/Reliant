import React, { useState } from 'react'
import { setDoc, doc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import { db } from '../Firebase';

const Contact = () => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const submitForm = async () => {
        setError(false);
        if (name == '' || message == "" || lastName == '') {
            setError(true);
            setErrorMessage("Please Fill Out All The Fields");
            console.log(error)
        } else if (!email.includes("@")) {
            setErrorMessage("Please Enter A Email Address");
            setError(true)
            console.log(error)
        } else {
            try {
                const unique_id = uuid()
                const docRef = await setDoc(doc(db, "userMessage", unique_id), {
                    name,
                    lastName,
                    email,
                    message
                })
                setName("")
                setLastName("")
                setEmail("")
                setMessage("")
                document.getElementById("modal-btn").click()
            } catch (error) {
                console.log(error)
            }

        }
    }

    return (
        <React.Fragment>
            <div class="modal fade" id="propertyUpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Form  Submission</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Thank you for submitting the form. Our team wil make sure to get in touch with you shortly</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <button style={{ position:"absolute",visibility: "collapse" }} type="button" id='modal-btn' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#propertyUpdateModal">
                sdfz
            </button>
            <div>

                <section className="contact">
                    <div className="container-fluid">
                        <div className="contact_inner">
                            <div className="heading text-center">
                                <h2 className="textreveal">
                                    Contact Our Management Support Staff
                                </h2>
                                <p>
                                    We invite owners and property management to contact our offices with all questions and
                                    inquiries. Please use the below form to contact our team.
                                </p>
                            </div>
                            <div className='form'>
                                <input className="form-control" type="text" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input className="form-control" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <input className="form-control fw" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <textarea className="form-control fw" placeholder="Message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                <div className='btn-container'>
                                    <button className="btn btn-primary"
                                        onClick={() => submitForm()}
                                    >Submit</button>
                                </div>
                                {error && <p style={{ gridColumnStart: "1", gridColumnEnd: "3" }}>{errorMessage}</p>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default Contact