import React from 'react';

function CreateTodoButton() {
    const onClickButton = (msg) => alert(msg);
    
    return (
        <button
        onClick={()=>onClickButton("Aqui abre modal")}
        >+</button>
    );
}

export {CreateTodoButton};