import React from 'react';
import contact from '../../../Assets/images/contact.png';

const ContactUs = () => {
    return (
        <div>
            <h2 className="text-center mb-5 mt-5 pt-2">Contact with us ...</h2>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center">
                            <img className="w-75 mb-3" src={contact} alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <form>
                            <input className="form-control mb-2" type="email" name="" id="" placeholder="Enter your email" />
                            <textarea className="form-control mb-2" name="" id="" cols="30" rows="5" placeholder="Enter your message ..."></textarea>
                            <button className="custom-btn">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContactUs;