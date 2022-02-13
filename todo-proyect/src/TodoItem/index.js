import React from 'react';

function TodoItem(props) {

    return (
        <li>
            <span
                onClick={props.onCompleted}
            >
                C
            </span>
                <p>{props.text}</p>
            <span
                onClick={props.onDeleted}
            >
                X
            </span>
        </li>
    );
}

export {TodoItem};