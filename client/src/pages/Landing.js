import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <Wrapper>
            <div className="container">
                <h1>Swift Notes</h1>
                <p>Swift Notes is a minimalist note-taking application designed for simplicity and efficiency. With Swift Notes, you can effortlessly create, edit, and organize your thoughts on the go. Whether you're jotting down quick ideas, making to-do lists, or capturing important reminders, Swift Notes provides a straightforward and intuitive platform to keep your notes in one place.</p>
                <Link to='/auth'>Register/Login</Link>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100vw;
    height: 100vh;
    .container {
        width: 50%;
    }
    h1 {
        border-bottom: 1px solid black;
    }
    p {
        margin-top: 1rem;
        background-color: lightgray;
        padding: 1rem;
        border: 1px solid black;
    }
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

export default Landing;