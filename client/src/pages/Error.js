import {useRouteError} from 'react-router-dom';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    if (error.status === 404) {
        return (
            <Wrapper>
                <h1>404 Page Not Found</h1>
                <p>Oopsies! Looks like you don't know where your going. How about home?</p>
                <Link to='/'>Return Home</Link>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h1>Something went wrong, try again later!</h1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    a { 
        display: inline-block;
        margin-top: 1rem;
        padding: 0.5rem;
        border-radius: 1rem;
        border: 1px solid black;
        text-decoration: none;
        color: white;
        background-color: rgb(57, 78, 106);
    }
    a:hover {
        color: black;
        background-color: rgb(255, 254, 196);
    }
`;

export default Error;