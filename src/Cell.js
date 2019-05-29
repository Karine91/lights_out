import React, { Component } from 'react';
import './Cell.css';

export class Cell extends Component {
    handleClick = evt => {
        this.props.flipCellsAround(this.props['data-key']);
    };
    render() {
        let classes = 'Cell' + (this.props.isLit ? ' Cell-lit' : '');
        return <td className={classes} onClick={this.handleClick} />;
    }
}

export default Cell;
