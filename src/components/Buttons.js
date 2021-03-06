import React from 'react';

function Buttons(props) {
    const continueOrStart = props.state.countdownStarted ? 'Continue' : 'Start';
    const workOrBreak = props.state.workSessionActive ? 'working' : 'break';
    let buttons = [];
    buttons.push(
        <button 
            className="button"
            onClick={() => {props.handleClick()}}
            key="1"
        >
            {props.state.countdownInProgress ? 'Pause' : `${continueOrStart} ${workOrBreak}`}
        </button>
    );
    if (!props.state.workSessionActive) {
        buttons.push(
            <button 
                className="button"
                onClick={() => {props.skipBreak()}}
                key="2"
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

export default Buttons;