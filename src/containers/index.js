import React from 'react';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, LoadingIcon, FpsDisplay
} from 'harmoware-vis';
import Controller from '../components';
import { color } from '../library';



const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; //Acquire Mapbox accesstoken

class App extends Container {
  constructor(props) {
    super(props);
    this.state = {
      popup: [0, 0, ''],
      vehicletype: {}
    };
  }

  componentDidMount(){
    super.componentDidMount();
    const { actions } = this.props;
    actions.setSecPerHour(360);
    actions.setLeading(10);
    actions.setTrailing(10);
    actions.setViewport({longitude:136.816929,latitude:34.859429,zoom:15});
  }

  setVehicletype(vehicletype){
    this.setState({vehicletype});
  }

  render() {
    const { actions, clickedObject, viewport,
      routePaths, movesbase, movedData, loading } = this.props;
    const optionVisible = false;


    const onHover = (el) => {
      if (el && el.object) {
        let disptext = '';
        const objctlist = Object.entries(el.object);
        for (let i = 0, lengthi = objctlist.length; i < lengthi; i=(i+1)|0) {
          if(objctlist[i][0] === 'id' || objctlist[i][0] === 'type' ||
          objctlist[i][0] === 'speed' || objctlist[i][0] === 'angle' ||
          objctlist[i][0] === 'pos' || objctlist[i][0] === 'slope' ||
          objctlist[i][0] === 'position' || objctlist[i][0] === 'lane' ||
          objctlist[i][0] === 'signals' || objctlist[i][0] === 'edge' ||
          objctlist[i][0] === 'vehicletype' || objctlist[i][0] === 'persontype' ||
          objctlist[i][0] === 'containertype'){
            const strvalue = objctlist[i][1].toString();
            disptext = disptext + (disptext.length > 0 ? '\n' : '');
            disptext = disptext + (`${objctlist[i][0]}: ${strvalue}`);
          }
        }
        this.setState({ popup: [el.x, el.y, disptext] });
      } else {
        this.setState({ popup: [0, 0, ''] });
      }
    };

    const vehicleColor = (x)=>{
      const {vehicletype} = this.state;
      if(x.vehicletype && x.vehicletype in vehicletype){
        return vehicletype[x.vehicletype].color;
      }else{
        if(x.tagName && x.tagName !== 'vehicle'){
          return vehicletype[x.tagName].color;
        }
        return color.lime;
      }
    }
    const vehicleScale = (x)=>{
      const {vehicletype} = this.state;
      if(x.vehicletype && x.vehicletype in vehicletype){
        const {size} = vehicletype[x.vehicletype];
        return [size,size,size];
      }else{
        if(x.tagName && x.tagName !== 'vehicle'){
          const {size} = vehicletype[x.tagName];
          return [size,size,size];
        }
        return [1.5,1.5,1.5];
      }
    }
    const vehicleRadius = (x)=>{
      const {vehicletype} = this.state;
      if(x.vehicletype && x.vehicletype in vehicletype){
        const {size} = vehicletype[x.vehicletype];
        return size;
      }else{
        if(x.tagName && x.tagName !== 'vehicle'){
          const {size} = vehicletype[x.tagName];
          return size;
        }
        return 2;
      }
    }

    return (
      <div>
        <Controller {...this.props} setVehicletype={this.setVehicletype.bind(this)}
          vehicletype={this.state.vehicletype} />
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle={undefined}
            layers={[
              new MovesLayer({
                routePaths, getRouteWidth:()=>2,
                getOrientation: (x) => x.angle ? [0,(x.angle * -1),90] : [0,0,90],
                movesbase, movedData,
                iconDesignations:[
                  {type:'vehicle', layer:'SimpleMesh', getColor:vehicleColor, sizeScale:1, getScale:vehicleScale},
                  {type:'person', layer:'Scatterplot', getColor:vehicleColor, getRadius:vehicleRadius},
                  {type:'container', layer:'Scatterplot', getColor:vehicleColor, getRadius:vehicleRadius}
                ],
                clickedObject, actions, optionVisible, onHover }),
            ]}
          />
        </div>
        <div className="harmovis_footer">
          longitude:{viewport.longitude}&nbsp;
          latitude:{viewport.latitude}&nbsp;
          zoom:{viewport.zoom}&nbsp;
          bearing:{viewport.bearing}&nbsp;
          pitch:{viewport.pitch}
        </div>
        <svg width={viewport.width} height={viewport.height} className="harmovis_overlay">
          <g fill="white" fontSize="12">
            {this.state.popup[2].length > 0 ?
              this.state.popup[2].split('\n').map((value, index) =>
                <text
                  x={this.state.popup[0] + 10} y={this.state.popup[1] + (index * 12)}
                  key={index.toString()}
                >{value}</text>) : null
            }
          </g>
        </svg>
        <LoadingIcon loading={loading} />
        <FpsDisplay />
      </div>
    );
  }
}
export default connectToHarmowareVis(App);
