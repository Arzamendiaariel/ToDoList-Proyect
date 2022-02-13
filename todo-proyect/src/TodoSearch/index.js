import React from 'react';

function TodoSearch({searchValue, setSearchValue}) {
    

    const onSearchValueChange = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
    }

    return (
            <input
            onChange={onSearchValueChange}
            placeholder="Cebolla"
            value={searchValue}
        />
    );
} 

export { TodoSearch }
