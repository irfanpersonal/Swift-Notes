import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import {getAllNotes} from "../features/notes/notesThunk";
import styled from 'styled-components';
import {NoteList} from '../components';

const Notes = () => {
    const dispatch = useDispatch();
    const {isLoading, notes} = useSelector(store => store.notes);
    React.useEffect(() => {
        dispatch(getAllNotes());
    }, []);
    return (
        <Wrapper>
            <h1 style={{textAlign: 'center', borderBottom: '1px solid black'}}>Notes</h1>
            {isLoading ? (
                <h1 style={{textAlign: 'center', margin: '1rem 0'}}>Loading Notes...</h1>
            ) : (
                <section>
                    {!notes.length ? (
                        <h1 style={{margin: '1rem 0'}}>No Notes Found...</h1>
                    ) : (
                        <h1 style={{margin: '1rem 0'}}>{notes.length} Note{notes.length > 1 && 's'} Found...</h1>
                    )}
                    <NoteList data={notes}/>
                </section>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    a {
        text-decoration: none;
        color: black;
    }
`;

export default Notes;