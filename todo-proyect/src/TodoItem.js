import React from 'react';

function TodoItem(props) {
    const onCompleted = () => {
        alert('ya completaste el todo' + props.text)
    }
    const onDeleted = () => {
        alert('borraste el todo' + props.text)
    }
    return (
        <li>
            <span
                onClick={onCompleted}
            >
                C
            </span>
                <p>{props.text}</p>
            <span
                onClick={onDeleted}
            >
                X
            </span>
        </li>
    );
}

export {TodoItem};