import {Link} from 'react-router-dom';

const NoteItem = ({data}) => {
    const {name, content, id} = data;
    return (
        <Link to={`/notes/${id}`}>
            <div style={{border: '1px solid black', padding: '1rem', minHeight: '120px', backgroundColor: 'rgb(255, 254, 196)', marginBottom: '1rem'}}>
                <div style={{borderBottom: '1px solid black'}}>{name}</div>
                <p style={{wordWrap: 'break-word', marginTop: '1rem'}}>{content}</p>
            </div>
        </Link>
    );
}

export default NoteItem;