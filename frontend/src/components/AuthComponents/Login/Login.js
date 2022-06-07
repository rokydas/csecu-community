import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../App';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = data => {

        fetch("http://localhost:5000/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                const { email, name } = data.user
                const newLoggedInInfo = { email, name }
                setLoggedInUser(newLoggedInInfo)
                localStorage.setItem('auth-token', data.token)
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className='col-md-6 mx-auto'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h6 className='text-secondary mt-3'>Your Email <span className='text-danger'>*</span></h6>
                            <input
                                type="email"
                                placeholder='Email'
                                className='form-control'
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-danger">"Email" is not allowed to be empty</span>}
                            <h6 className='text-secondary mt-3'>Password <span className='text-danger'>*</span></h6>
                            <input
                                type="password"
                                placeholder='Password'
                                className='form-control'
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-danger">"Password" is not allowed to be empty</span>}
                        </form>
                        <button className='custom-btn mt-3 mx-auto'>Login</button>
                        <p>Didn't register yet? Please <Link to="/signup">register</Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;