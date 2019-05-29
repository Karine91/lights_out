import './Board.css';

import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.25,
    };

    createBoard = () => {
        let board = [];
        //TODO: create array of arrays of true/false values
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                row.push(Math.random() < this.props.chanceLightStartsOn);
            }
            board.push(row);
        }
        return board;
    };

    state = {
        board: this.createBoard(),
        hasWon: false,
    };

    flipCellsAround = coord => {
        const { ncols, nrows } = this.props;
        const board = this.state.board;
        const [y, x] = coord.split('-').map(Number);

        const flipCell = (y, x) => {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        };

        flipCell(y, x);
        flipCell(y - 1, x);
        flipCell(y + 1, x);
        flipCell(y, x - 1);
        flipCell(y, x + 1);

        const hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board, hasWon });
    };

    render() {
        if (this.state.hasWon) {
            return (
                <div className="Board-title">
                    <div className="Winner">
                        <span className="neon-orange">YOU</span>
                        <span className="neon-blue">WIN</span>
                    </div>
                </div>
            );
        }
        const tbBoard = [];
        for (let y = 0; y < this.props.nrows; y++) {
            let row = [];
            for (let x = 0; x < this.props.ncols; x++) {
                row.push(
                    <Cell
                        key={`${y}-${x}`}
                        data-key={`${y}-${x}`}
                        isLit={this.state.board[y][x]}
                        flipCellsAround={this.flipCellsAround}
                    />
                );
            }
            tbBoard.push(<tr key={y}>{row}</tr>);
        }
        return (
            <div>
                <div className="Board-title">
                    <div className="neon-orange">Lights</div>
                    <div className="neon-blue">Out</div>
                </div>

                <table className="Board">
                    <tbody>{tbBoard}</tbody>
                </table>
            </div>
        );
    }
}

export default Board;
