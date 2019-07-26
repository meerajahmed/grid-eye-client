import React, { PureComponent } from 'react';

import classNames from 'classnames';
import './index.css';

class Notification extends PureComponent {

    state = {
        show: false
    };

    componentDidMount() {
        this.animateState();
    }

    animateState() {
        setTimeout(() => {
            this.updateStyle(true);
        }, 100);

        setTimeout(() => {
            this.updateStyle(false);
        }, this.props.timeout);
    }

    updateStyle(show) {
        this.setState(() => ({
            show
        }));
    }

    render() {
        const containerClass = classNames('notification', {
            'slide-in-right': this.state.show,
        });
        return (
            <>
                <div className={containerClass} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="notification-body shadow-lg">
                        {this.props.text}
                    </div>
                </div>
            </>
        );
    }
}

export default Notification;