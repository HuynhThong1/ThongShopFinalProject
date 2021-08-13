import React, { useState } from 'react'

export default function SearchBoxMobile(props) {

    const [name, setName] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();

        props.history.push(`/search/name/${name}`);
    }

    return (
        <form className="searchMobile" onSubmit={submitHandler}>
            {/* q is query */}
            <input type="text" placeholder="Search" onChange={(e) => setName(e.target.value)} />
            <button type="submit" ><i className="fas fa-search"/></button>
        </form>


    )
}
