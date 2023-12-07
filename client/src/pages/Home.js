import styled from 'styled-components';

const Home = () => {
    return (
        <Wrapper>
            <div class="container">
                <h1 style={{textAlign: 'center'}}>Welcome to Swift Notes!</h1>
                <p>It might not be the grandest project out there, but it's my stepping stone into the exciting world of more intricate developments.</p>
                <p>In this journey, I've chosen <code>MySQL</code> as the database and <code>Sequelize</code> as the ORM, making project interaction and setup a breeze.</p>
                <p>One thing you'll notice is the heavy documentation in the code. I wanted this to be more than just a functional project. I envisioned it as a reference guide for my future endeavors. The documentation not only guides current use but serves as a compass for navigating through the complexities of upcoming projects.</p>
                <p>You might observe a familiar flow if you've worked with MERN applications. I intentionally maintained a similar structure, making it easy for anyone diving in to quickly catch on. While some things have evolved, the core structure remains, providing a sense of familiarity for those experienced with MERN.</p>
                <p>To enhance functionality and troubleshoot potential issues, I've incorporated a ton of third-party modules like <code>redux toolkit</code>, <code>axios</code>, <code>cookie-parser</code>, <code>http-status-codes</code>, <code>react-toastify</code>, <code>react-icons</code>, <code>jsonwebtoken</code>, <code>validator</code>, and much much more. This ensures a robust setup where every possible hiccup is anticipated and addressed.</p>
                <p>So, kick back, explore Swift Notes, and I hope you find it not just functional but enjoyable. Take care and happy coding!</p>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .container {
        width: 80%;
        margin: 0 auto;
    }
    h1 {
        color: rgb(2, 123, 255);
        margin-bottom: 1rem;
        border-bottom: 1px solid black;
    }
    p {
        margin-bottom: 1rem;
    }
    code {
        background-color: rgb(248, 249, 250);
        padding: 0.10rem 0.20rem;
        border: 1px solid rgb(218, 224, 228);
        border-radius: 0.30rem;
        font-family: monospace;
    }
    pre {
        background-color: #f8f9fa;
        padding: 0.3rem;
        border: 1px solid rgb(218, 224, 229);
        border-radius: 0.3rem;
        overflow-x: auto;
    }
`;

export default Home;