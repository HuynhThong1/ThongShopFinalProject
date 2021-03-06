import React, { useState } from 'react'

export default function SearchBox(props) {

    const [name, setName] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        props.history.push(`/search/name/${name}`);
    }

    return (
        <form className="search" onSubmit={submitHandler}>
            {/* q is query */}
            <input type="text" placeholder="What are you looking for?" name="q" id="q" onChange={(e) => setName(e.target.value)} />
            <button type="submit" >Search</button>
        </form>


    )
}
