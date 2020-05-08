import React from 'react';

function Form(props) {
    return (
        <form>
            <p>Work session time: <input type="number" max="9999" disabled="true"/></p>
            <p>Break time: <input type="number" max="9999"/></p>
        </form>
    );
}

export default Form;