import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import React from 'react';
import {toggleAuthType} from '../features/user/userSlice';
import {loginUser, registerUser} from '../features/user/userThunk';
import {useNavigate} from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {wantsToRegister, user, isSubmitting} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (wantsToRegister) {
            dispatch(registerUser(input));
            return;
        }
        dispatch(loginUser({email: input.email, password: input.password}));
    }
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{wantsToRegister ? 'Register' : 'Login'}</h1>
                {wantsToRegister && (
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={input.password} onChange={handleChange}/>
                </div>
                <p>{wantsToRegister ? 'Have an account?' : `Don't have an account?`}<span onClick={() => dispatch(toggleAuthType())}>{wantsToRegister ? 'LOGIN' : 'REGISTER'}</span></p>
                <button type="submit">{isSubmitting ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    form {
        background-color: white;
        border: 1px solid black;
        padding: 1rem;
        width: 50%;
    }
    h1 {
        color: white;
        text-align: center;
        background-color: black;
    }
    label, button {
        display: block;
        margin-top: 1rem;
        width: 100%;
    }
    input, button {
        padding: 0.5rem;
        width: 100%;
    }
    p {
        text-align: center;
        margin: 1rem 0;
    }
    span {
        background-color: lightgray;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        margin-left: 0.5rem;
        cursor: pointer;
    }
    span:hover {
        outline: 1px solid black;
    }
`;

export default Auth;