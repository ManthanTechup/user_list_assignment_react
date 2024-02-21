import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('login-token')) {
            navigate('/');
        }
    }, [navigate]);

    // useStates 
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    // Methods
    const validateData = (name, value) => {
        let flag = false;
        const emailRegex = window.emailRegex
        if (name === "email") {
            if (value === '') {
                setError({ ...error, [name]: `Email must not be empty` })
                flag = false;
            }
            else if (!emailRegex.test(value)) {
                setError({ ...error, [name]: `Enter valid Email` })
                flag = false;
            }
            else {
                setError({ ...error, [name]: `` })
                flag = true;
            }
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (name === "password") {
            if (value === '') {
                setError({ ...error, [name]: `Email must not be empty` })
                flag = false;
            }
            else if (value.length < 8) {
                setError({ ...error, [name]: `Password must be at least 8 characters.` })
                flag = false;
            }
            else if (!value.match(passwordRegex)) {
                setError({ ...error, [name]: `Password must contain 1 Uppercase, 1 Lowercase and 1 symbol.` })
                flag = false;
            }
            else {
                flag = true;
                setError({ ...error, [name]: `` })
            }
        }

        return flag;
    }

    const updateData = (e) => {
        const { name, value } = e.target;
        if (validateData(name, value)) {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (error.password === '' || error.email === '') {
            console.log("caalling")
            await axios.post("https://express-t4.onrender.com/api/login",
                {
                    "username": formData.email,
                    "password": formData.password
                }
            ).then((response) => {
                toast.success(response.data.message);
                localStorage.setItem('login-token', "Jpq6PpooHS8umum1XmiHmlkKdi9KwhWEh7R5ywtPvr7reYAmOiEC9hym2KqDaTLb");
                navigate('/')
            }
            ).catch((error) => {
                toast.error(error.response.data.message);
            }).then(() => {
                setLoading(false)
            })
        }
    }


    return (
        <div id='login'>
            {!localStorage.getItem('login-token') && <Container className='login-container'>
                <div className="login-box">
                    <h1 className='text-center mb-4'>
                        Login
                    </h1>
                    <InputGroup className="mt-2">
                        <Form.Control
                            placeholder="Email"
                            aria-label="Email"
                            name='email'
                            onBlur={(e) => { updateData(e) }}
                            onChange={(e) => { updateData(e) }}
                        />
                    </InputGroup>
                    <div className='error'>&nbsp; {error.email && error.email}</div>

                    <InputGroup className="mt-2 position-relative d-flex align-item-center">
                        <Form.Control
                            className='border-end-0'
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name='password'
                            onBlur={(e) => { updateData(e) }}
                            onChange={(e) => { updateData(e) }}
                        />
                        <InputGroup.Text className='bg-white' id="">
                            <span className='showHidePassword user-select-none cursor-pointer '
                                onClick={() => { setShowPassword(!showPassword) }}>
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </InputGroup.Text>
                    </InputGroup>
                    <div className='error'>&nbsp; {error.password && error.password}</div>
                    <div className="mt-3 login-footer">
                        <div className="btn-group w-100">
                            <Button className='login-btn ' as="input" type="submit" value="Login"
                                disabled={error.password !== '' || error.email !== '' || loading}
                                onClick={() => { handleSubmit() }}
                            />
                        </div>
                    </div>
                </div>

            </Container>}
        </div>
    )
}

export default Login