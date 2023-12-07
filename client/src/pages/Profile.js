import styled from 'styled-components';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser, updateUserPassword} from '../features/user/userThunk';

const Profile = () => {
    const dispatch = useDispatch();
    const [changePassword, setChangePassword] = React.useState(false);
    const toggleChangePassword = () => {
        setChangePassword(currentState => {
            return !currentState;
        });
    }
    const {user, isSubmitting} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: user.name,
        email: user.email,
        oldPassword: '',
        newPassword: ''
    });
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (changePassword) {
            dispatch(updateUserPassword({oldPassword: input.oldPassword, newPassword: input.newPassword}));
            return;
        }
        dispatch(updateUser({name: input.name, email: input.email}));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>Profile</h1>
                {changePassword ? (
                    <>
                        <div>
                            <label htmlFor="oldPassword">Old Password</label>
                            <input id="oldPassword" type="password" name="oldPassword" value={input.oldPassword} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="newPassword">New Password</label>
                            <input id="newPassword" type="password" name="newPassword" value={input.newPassword} onChange={handleChange}/>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
                        </div>
                    </>
                )}
                <p className="toggle-btn" onClick={toggleChangePassword}>{changePassword ? `Don't want to change your password?` : 'Want to change your password?'}</p>
                <button>{isSubmitting ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper> 
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        background-color: white;
        width: 50%;
        border: 1px solid black;
        padding: 1rem;
    }
    h1 {
        color: white;
        text-align: center;
        background-color: black;
    }
    label {
        margin-top: 1rem;
    }
    label, input {
        display: block;
    }
    input, button {
        width: 100%;
        padding: 0.5rem;
    }
    button {
        margin-top: 1rem;
    }
    .toggle-btn {
        text-align: center;
        margin-top: 1rem;
        cursor: pointer;
    }
    .toggle-btn:hover {
        color: gray;
    }
`;

export default Profile;