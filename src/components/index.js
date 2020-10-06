import React from 'react';
import { MovesInput } from './moves-input.js';
import { MovesOutput } from './moves-output.js';
import { VehicletypeList } from './vehicletype-list.js';
import { PlayButton, PauseButton, ForwardButton, ReverseButton,
  AddMinutesButton, NavigationButton, ElapsedTimeValue, ElapsedTimeRange,
  SpeedValue, SpeedRange } from 'harmoware-vis';
  
export default class Controller extends React.Component {
  render() {
    const { actions, inputFileName, animatePause, animateReverse, viewport, leading, movesbase,
      settime, timeBegin, timeLength, secperhour, setVehicletype, vehicletype, initVehicletype } = this.props;
    const { movesFileName } = inputFileName;

    return (
        <div className="harmovis_controller">
            <ul className="flex_list">
            <li className="flex_row">
                <div className="harmovis_input_button_column">
                <label htmlFor="MovesInput">
                FCD data selection<MovesInput actions={actions} id="MovesInput" setVehicletype={setVehicletype}/>
                </label>
                <div>{movesFileName}</div>
                </div>
            </li>
            <li className="flex_row">
                <MovesOutput actions={actions} id="MovesOutput" movesbase={movesbase}>FCD data download</MovesOutput>
            </li>
            <li className="flex_row">
              {animatePause ?
                <PlayButton actions={actions} />:<PauseButton actions={actions} />
              }&nbsp;
              {animateReverse ?
                <ForwardButton actions={actions} />:<ReverseButton actions={actions} />
              }
            </li>
            <li className="flex_row">
              <AddMinutesButton addMinutes={-10} actions={actions} />&nbsp;
              <AddMinutesButton addMinutes={-5} actions={actions} />
            </li>
            <li className="flex_row">
              <AddMinutesButton addMinutes={5} actions={actions} />&nbsp;
              <AddMinutesButton addMinutes={10} actions={actions} />
            </li>
            <li className="flex_row">
              <NavigationButton buttonType="zoom-in" actions={actions} viewport={viewport} />&nbsp;
              <NavigationButton buttonType="zoom-out" actions={actions} viewport={viewport} />&nbsp;
              <NavigationButton buttonType="compass" actions={actions} viewport={viewport} />
            </li>
            <li className="flex_column">
              <label htmlFor="ElapsedTimeRange">elapsedTime
              <ElapsedTimeValue settime={settime} timeBegin={timeBegin} timeLength={timeLength} actions={actions}
              min={leading*-1} />
              sec</label>
              <ElapsedTimeRange settime={settime} timeLength={timeLength} timeBegin={timeBegin} actions={actions}
              min={leading*-1} id="ElapsedTimeRange" />
            </li>
            <li className="flex_column">
              <label htmlFor="SpeedRange">speed
              <SpeedValue secperhour={secperhour} actions={actions} />sec/hour</label>
              <SpeedRange secperhour={secperhour} actions={actions} id="SpeedRange" />
            </li>
            <VehicletypeList vehicletype={vehicletype} setVehicletype={setVehicletype} initVehicletype={initVehicletype}/>
            </ul>
        </div>
    );
  }
}
