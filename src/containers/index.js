import React from 'react';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, MovesInput
} from 'harmoware-vis';
import Controller from '../components';


const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; //Acquire Mapbox accesstoken

class App extends Container {
  render() {
    const { actions, clickedObject, inputFileName, viewport,
      routePaths, movesbase, movedData } = this.props;
    const optionVisible = false;

    return (
      <div>
        <Controller actions={actions} inputFileName={inputFileName} />
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData,
                clickedObject, actions, optionVisible }),
            ]}
          />
        </div>
      </div>
    );
  }
}
export default connectToHarmowareVis(App);
