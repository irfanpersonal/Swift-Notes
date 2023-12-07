import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {createNote, editSingleNote} from '../features/addNote/addNoteThunk';
import {isEditingFalse, resetSingleNoteData, updateSingleNoteData} from '../features/addNote/addNoteSlice';
import React from 'react';

const AddNote = () => {
    const dispatch = useDispatch();
    const {isEditing, singleNoteData, isLoading, isLoadingSingleNoteData} = useSelector(store => store.addNote);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            dispatch(editSingleNote({noteID: singleNoteData.id, note: singleNoteData}));
            return;
        }
        dispatch(createNote({name: singleNoteData.name, content: singleNoteData.content}));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{isEditing ? 'Edit Note' : 'Add Note'}</h1>
                {isLoadingSingleNoteData ? (
                    <h3 style={{textAlign: 'center', margin: '1rem 0'}}>Loading Single Note Data...</h3>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" value={singleNoteData.name} onChange={(event) => dispatch(updateSingleNoteData({name: event.target.name, value: event.target.value}))}/>
                        </div>
                        <div>
                            <label htmlFor="Content">Content</label>
                            <textarea id="content" name="content" value={singleNoteData.content} onChange={(event) => dispatch(updateSingleNoteData({name: event.target.name, value: event.target.value}))}></textarea>
                        </div>
                        <p style={{marginTop: '1rem', backgroundColor: 'lightgray'}}>Note: (255 character Maximum)</p>
                        {isEditing && (
                            <button type="button" onClick={() => {
                                dispatch(isEditingFalse());
                                dispatch(resetSingleNoteData());
                            }}>CANCEL</button>
                        )}
                        <button type="submit">{isLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
                    </>
                )}
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border: 1px solid black;
    width: 50%;
    margin: 0 auto;
    padding: 1rem;
    background-color: white;
    h1 {
        text-align: center;
        background-color: black;
        color: white;
    }
    label, input, textarea {
        display: block;
        width: 100%;
    }
    label, button {
        margin-top: 1rem;
    }
    textarea {
        height: 200px;
        resize: none;
        padding: 0.5rem;
    }
    input, button {
        padding: 0.5rem;
        width: 100%;
    }
`;

export default AddNote;