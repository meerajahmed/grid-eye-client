import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import Media from "./components/media";
import socketIO from "socket.io-client";
import Notifications, {notify} from './components/notify';

import config from './config';

class App extends Component {

    constructor(props) {
        super(props);
        this.appRef = React.createRef();
        this.show = notify.createShowQueue();
    }

    componentDidMount() {
        this.io = socketIO(config.SOCKET_URI);
        this.io.on('to_grid_eye_client', this.handleIO);
    }

    componentWillUnmount() {
        this.io.off('to_grid_eye_client', this.handleIO);
    }

    handleIO = (data) => {
        console.table(data);
        const { count } = data;

        if(count === config.MIN_THRESHOLD) {
            this.show(config.AD_DURATION, `MIN_THRESHOLD : ${count}`);
        }

        if(count === config.MAX_THRESHOLD) {
            this.show(config.AD_DURATION, `MAX_THRESHOLD : ${count}`);
        }
    };

    handleFullScreen = (event) => {
        event.preventDefault();
        const { current } = this.appRef;
        if (!document.fullscreenElement) {
            current.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    render() {
        return (
            <div
                ref={this.appRef}
                className="app"
            >
                <Media handleFullScreen={this.handleFullScreen} />
                <Notifications />
            </div>
        );
    }
}

export default App;
