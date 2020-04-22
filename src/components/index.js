import React from 'react';
import { MovesInput } from './moves-input.js';

export default class Controller extends React.Component {
  render() {
    const { actions, inputFileName } = this.props;
    const { movesFileName } = inputFileName;

    return (
        <div className="harmovis_controller">
            <ul className="flex_list">
            <li className="flex_row">
                <div className="harmovis_input_button_column">
                <label htmlFor="MovesInput">
                Operation data<MovesInput actions={actions} id="MovesInput" />
                </label>
                <div>{movesFileName}</div>
                </div>
            </li>
            </ul>
        </div>
    );
  }
}
