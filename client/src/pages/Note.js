import {redirect, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {setNote} from '../features/note/noteSlice';
import styled from 'styled-components';
import {FaArrowLeft, FaEdit, FaTrash} from "react-icons/fa";
import {AiOutlineClockCircle} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {isEditingTrue} from '../features/addNote/addNoteSlice';
import {deleteSingleNote, getSingleNote} from '../features/addNote/addNoteThunk';

export const loader = (store) => async({context, params, request}) => {
    try {
        const {id} = params;
        const response = await axios.get(`/api/v1/notes/${id}`);
        const data = response.data;
        store.dispatch(setNote(data.note));
        return data.note;
    }
    catch(error) {
        return redirect('/');
    }
}

const Note = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {note} = useSelector(store => store.note);
    const {name, content, createdAt} = note;
    return (
        <Wrapper>
            <div className="container">
                <div className="left-icon">
                    <Link to='/notes'><span><FaArrowLeft/></span></Link>
                </div>
                <div className="right-icons">
                    <span onClick={() => {
                        navigate('/add-note');
                        dispatch(isEditingTrue());
                        dispatch(getSingleNote(note.id));
                    }} style={{cursor: 'pointer'}}><FaEdit/></span>
                    <span onClick={() => {
                        dispatch(deleteSingleNote(note.id));
                    }} style={{cursor: 'pointer'}}><FaTrash/></span>
                </div>
            </div>
            <div className="content">
                <h1 style={{borderBottom: '1px solid black'}}>{name}</h1>
                <p style={{whiteSpace: 'pre-line'}}>{content}</p>
            </div>
            <div style={{position: 'absolute', bottom: '0', display: 'flex', alignItems: 'center'}}>
                <AiOutlineClockCircle style={{marginRight: '0.25rem'}}/>
                <div>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .left-icon {
        order: 1;
    }
    .right-icons {
        order: 2;
        display: flex;
    }
    .right-icons > * {
        margin-left: 1rem;
    }
    span {
        font-size: 1.5rem;
    }
    .content, p {
        font-size: 1rem;
        margin-top: 1rem;
    }
    a {
        color: black;
    }
`;

export default Note;