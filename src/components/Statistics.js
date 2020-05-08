import React from 'react';

function Statistics(props) {
    return (
        <div>
            <p>Work sessions: <b>{props.state.workSessionsCount}</b></p>
            <p>Breaks: <b>{props.state.breaksCount}</b></p>
            <p>Total focus time: <b>{props.state.totalFocusTime} seconds</b></p>
        </div>
    );
}

export default Statistics;