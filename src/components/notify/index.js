import React from 'react';
import ReactDOM from 'react-dom';
import Notification from '../notification';
import Container from './container';
import config from '../../config';

/* Render React component */
function renderNotification(timeout, text) {
    let target = document.getElementById(config.WRAPPER_ID);
    ReactDOM.render(<Notification timeout={timeout} text={text} />, target);
}

/* Unmount React component */
function hide() {
    let target = document.getElementById(config.WRAPPER_ID);
    ReactDOM.unmountComponentAtNode(target);
}


function show(timeout, text) {
    console.log('show method : ', text);
    if (!document.getElementById(config.WRAPPER_ID).hasChildNodes()) {
        // Use default timeout if not set.
        let renderTimeout = timeout || config.AD_DURATION;

        // Render Component with Props.
        renderNotification(renderTimeout, text);

        // Unmount react component after the animation finished.
        setTimeout(function() {
            hide();
        }, renderTimeout + config.ANIMATION_DURATION);

        return true;
    }

    return false;
}

function createShowQueue(initialRecallDelay = 500, recallDelayIncrement = 500) {
    // Array to hold queued messages
    this.msgs = [];

    // Is the showNotify function in progress - used so we can call showNotify when a
    // message is added to an empty queue.
    this.isNotifying = false;

    this.currentRecallDelay = initialRecallDelay;

    // Retrieve the next message from the queue and try to show it
    this.showNotify = () => {

        // If there are no messages in the queue
        if (this.msgs.length === 0) {
            this.isNotifying = false;
            return;
        }

        this.isNotifying = true;



        const current = this.msgs.shift();

        // show will now return true if it is able to send the message,
        // or false if there is an existing message

        if (show(current.timeout, current.text)) {
            this.currentRecallDelay = initialRecallDelay;

            if (current.timeout > 0) {
                setTimeout(() => this.showNotify(), current.timeout + config.ANIMATION_DURATION);
            }
        } else {
            // If message show failed, re-add the current message to the front of the queue
            this.msgs.push(current);
            setTimeout(() => this.showNotify(), this.currentRecallDelay);
            this.currentRecallDelay += recallDelayIncrement;
        }
    };

    return (timeout = config.AD_DURATION, text) => {

        this.msgs.push({timeout, text});
        console.log('push')
        console.table(this.msgs)
        if (!this.isNotifying) {
            this.showNotify();
        }
    };
}

/* Export notification functions */
export let notify = {
    show,
    hide,
    createShowQueue
};

export default Container;
