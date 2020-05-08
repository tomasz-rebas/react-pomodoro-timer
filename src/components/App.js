import React from 'react';
import Button from './Button'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            timeRemaining: 3, /* 1500 */
            countdownInProgress: false,
            workSessionTime: 3, /* 1500 */
            breakTime: 2, /* 300 */
            workSessionActive: true,
            countdownStarted: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.countdown = this.countdown.bind(this);
        this.timeFormatting = this.timeFormatting.bind(this);
    }

    componentDidMount() {
        setInterval(this.countdown, 1000);
    }

    handleClick(skip) {
        if (skip) {
            this.setState({
                timeRemaining: this.state.workSessionTime,
                countdownInProgress: true,
                workSessionActive: true,
                countdownStarted: true
            });
        } else {
            this.setState(prevState => {
                return {
                    countdownInProgress: !prevState.countdownInProgress,
                    countdownStarted: true
                }
            });
        }
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
                    this.setState({
                        timeRemaining: this.state.breakTime,
                        countdownInProgress: false,
                        workSessionActive: false,
                        countdownStarted: false
                    });
                } else {
                    this.setState({
                        timeRemaining: this.state.workSessionTime,
                        countdownInProgress: false,
                        workSessionActive: true,
                        countdownStarted: false
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
                <Button 
                    handleClick={this.handleClick}
                    countdownInProgress={this.state.countdownInProgress}
                    workSessionActive={this.state.workSessionActive}
                    countdownStarted={this.state.countdownStarted}
                />
                <h2 className="time">{this.timeFormatting(this.state.timeRemaining)}</h2>
            </div>
        );
    }
}

export default App;