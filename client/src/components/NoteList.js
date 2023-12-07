import NoteItem from './NoteItem.js';
import {nanoid} from 'nanoid';

const NoteList = ({data}) => {
    return (
        <section>
            {data.map(item => {
                return <NoteItem key={nanoid()} data={item}/>
            })}
        </section>
    );
}

export default NoteList;