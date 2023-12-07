import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../features/user/userThunk';

const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <h1>Swift Notes</h1>
            <div>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/add-note'>Add Note</NavLink>
                <NavLink to='/notes'>Notes</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                <button onClick={() => dispatch(logoutUser())}>Logout</button>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: rgb(53, 66, 89);
    a {
        text-decoration: none;
        color: black;
        margin-left: 1rem;
        color: white;
    }
    button {
        margin-left: 1rem;
        padding: 0.10rem 1rem;
    }
    .active {
        border-bottom: 1px solid white;
    }
`;

export default Navbar;