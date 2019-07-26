import React , {PureComponent} from 'react';
import config from '../../config';
import './index.css';

export default class extends PureComponent {
    render() {
        return (
            <div className="l-width-max" id={config.WRAPPER_ID}/>
        );
    }
}
