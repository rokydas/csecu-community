import React from 'react';
import contact from '../../../Assets/images/contact.png';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer class="text-white">
            <h3 class="text-center mb-3">Contact with us ...</h3>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="d-flex justify-content-center">
                            <img class="w-75 mb-3" src={contact} alt="" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <form>
                            <input class="form-control mb-2" type="email" name="" id="" placeholder="Enter your email" />
                            <input class="form-control mb-2" type="text" name="" id="" placeholder="Enter your session" />
                            <textarea class="form-control mb-2" name="" id="" cols="30" rows="5" placeholder="Enter your message ..."></textarea>
                            <button class="blank-btn">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class={`${styles['footer-links']} container mt-5`}>
                <div class="row">
                    <div class="col-md-3">
                        <h4>Quick Links</h4>
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Contact</li>
                    </div>
                    <div class="col-md-3">
                        <h4>Other Pages</h4>
                        <li>FAQ</li>
                        <li>Blog</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Condition</li>
                    </div>
                    <div class="col-md-3">
                        <h4>Contact Info</h4>
                        <li>Sunset Road ST.3319, Denpasar, Bali</li>
                        <li>+62-361-234-4567</li>
                        <li>chemiclab@domain.com</li>
                        <li>Mon - Sat : 9:30AM to 7:00PM</li>
                    </div>
                    <div class="col-md-3">
                        <h4>Make an Appointment</h4>
                        <li>Getting an accurate diagnosis can be one of the most impactful experiences that you can have.
                        </li>
                    </div>
                </div>
                <p class="text-center mt-5">Copyright © 2021 CSE CU</p>
            </div>
        </footer>
    );
};

export default Footer;