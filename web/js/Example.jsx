import React from 'react/addons';

export default class Example extends React.Component {
    static displayName = 'Example'

    get displayText() {
        return 'Test';
    }

    render() {
        return (
            <div>
                <h1>{this.displayText}</h1>
            </div>
        );
    }
}
