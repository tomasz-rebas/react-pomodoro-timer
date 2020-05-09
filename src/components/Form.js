import React from 'react';

function Form(props) {
    const disabled = props.state.countdownStarted ? true : false;
    return (
        <form>
            <p>Work session time:
                <input 
                    type="number"
                    name="workSessionTime"
                    min="0"
                    max="9999"
                    disabled={disabled}
                    onChange={props.handleChange}
                    value={props.state.workSessionTime}
                /> seconds
            </p>
            <p>Break time:
                <input 
                    type="number" 
                    name="breakTime"
                    min="0"
                    max="9999" 
                    disabled={disabled}
                    onChange={props.handleChange}
                    value={props.state.breakTime}
                /> seconds
            </p>
        </form>
    );
}

export default Form;