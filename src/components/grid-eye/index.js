import React, { PureComponent } from 'react';
import socketIO from "socket.io-client";

class GridEye extends PureComponent {

    state = { count: 0 };

    updateCount = (data) => {
        const {count} = data;
        this.setState(() => ({
            count
        }));
    };

    componentDidMount() {
        this.io = socketIO('http://localhost:3000');
        this.io.on('to_grid_eye_client', this.updateCount);
    }

    componentWillUnmount() {
        this.io.off('to_grid_eye_client', this.updateCount);
    }

    render() {
        const { count } = this.state;
        return <h1>{count}</h1>
    }
}

export default GridEye;