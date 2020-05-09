import React from 'react';
import Buttons from './Buttons';
import Statistics from './Statistics';
import Form from './Form';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            timeRemaining: 3, /* 1500 */
            countdownInProgress: false,
            workSessionTime: 3, /* 1500 */
            breakTime: 2, /* 300 */
            workSessionActive: true,
            countdownStarted: false,
            workSessionsCount: 0,
            breaksCount: 0,
            totalFocusTime: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.skipBreak = this.skipBreak.bind(this);
        this.countdown = this.countdown.bind(this);
    }

    componentDidMount() {
        setInterval(this.countdown, 1000);
    }

    handleChange(event) {
        const {name, value} = event.target;
        if ((name === 'workSessionTime' && this.state.workSessionActive) || (name === 'breakTime' && !this.state.workSessionActive)) {
            this.setState({
                timeRemaining: this.validateTimeInput(parseInt(value)),
                [name]: this.validateTimeInput(parseInt(value))
            });
        } else {
            this.setState({
                [name]: this.validateTimeInput(parseInt(value))
            });
        }
    }

    validateTimeInput(timeInput) {
        if (Number.isNaN(timeInput)) {
            return 0;
        } else if (timeInput > 9999) {
            return 9999;
        } else {
            return timeInput;
        }
    }

    handleClick() {
        this.setState(prevState => {
            return {
                countdownInProgress: !prevState.countdownInProgress,
                countdownStarted: true
            }
        });
    }

    skipBreak() {
        this.setState({
            timeRemaining: this.state.workSessionTime,
            countdownInProgress: true,
            workSessionActive: true,
            countdownStarted: true
        });
    }

    countdown() {
        if (this.state.countdownInProgress) {
            if (this.state.timeRemaining > 0) {
                this.setState(prevState => {
                    return {
                        timeRemaining: prevState.timeRemaining - 1
                    }
                });
            } else {
                if (this.state.workSessionActive) {
                    this.setState(prevState => {
                        return {
                            timeRemaining: this.state.breakTime,
                            countdownInProgress: false,
                            workSessionActive: false,
                            countdownStarted: false,
                            workSessionsCount: prevState.workSessionsCount + 1,
                            totalFocusTime: prevState.totalFocusTime + this.state.workSessionTime
                        }
                    });
                } else {
                    this.setState(prevState => {
                        return {
                            timeRemaining: this.state.workSessionTime,
                            countdownInProgress: false,
                            workSessionActive: true,
                            countdownStarted: false,
                            breaksCount: prevState.breaksCount + 1
                        }
                    });
                }
            }
        }
    }

    timeFormatting(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds/60);
        const seconds = timeInSeconds % 60;
        const displayTime = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
        return displayTime;
    }

    render() {
        return (
            <div>
                <h1>Pomodoro Timer</h1>
                <Buttons 
                    handleClick={this.handleClick}
                    skipBreak={this.skipBreak}
                    state={this.state}
                />
                <h2>{this.timeFormatting(this.state.timeRemaining)}</h2>
                <Statistics state={this.state}/>
                <hr/>
                <Form 
                    state={this.state}
                    handleChange={this.handleChange}
                />
            </div>
        );
    }
}

export default App;