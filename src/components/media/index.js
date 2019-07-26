import React, { Component } from 'react';

class Media extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    handleClick = (event) => {
        event.preventDefault();
        const {
            current
        } = this.videoRef;
        current.paused ? current.play() : current.pause()
    };

    handleDoubleClick = (event) => {
        this.props.handleFullScreen(event);
    };

    render() {
        return (
            <div className="embed-responsive embed-responsive-16by9">
                <video
                    className="embed-responsive-item"
                    loop
                    autoPlay
                    ref={this.videoRef}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                >
                    <source src="assets/Tropical.mp4" type="video/mp4"/>
                    <source src="assets/Tropical.ogv" type="video/ogg"/>
                    <source src="assets/Tropical.webm" type="video/webm"/>
                    Browser does not support HTML5 video.
                </video>
            </div>
        );
    }
}

export default Media;