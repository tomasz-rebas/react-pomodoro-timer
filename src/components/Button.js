import React from 'react';

function Button(props) {
    const continueOrStart = props.countdownStarted ? 'Continue' : 'Start';
    const workOrBreak = props.workSessionActive ? 'working' : 'break';
    let buttons = [];
    buttons.push(
        <button 
            className="button"
            onClick={() => {props.handleClick(false)}}
        >
            {props.countdownInProgress ? 'Pause' : `${continueOrStart} ${workOrBreak}`}
        </button>
    );
    if (!props.workSessionActive) {
        buttons.push(
            <button 
                className="button"
                onClick={() => {props.handleClick(true)}}
            >
                Skip break
            </button>
        );
    }

    return (
        <div>
            {buttons}
        </div>
    );
}

export default Button;