import React from 'react';
import { color as colorList } from '../library';

class LegendList extends React.Component{
    onClick(id,type){
        const {vehicletype,initVehicletype,setVehicletype} = this.props;
        let {size,colorName} = vehicletype[type];
        if(id === 'size-up'){
            size = size + 0.5;
            vehicletype[type].size = size;
        }else
        if(id === 'size-down'){
            size = size - 0.5;
            if(size < 0) size = 0;
            vehicletype[type].size = size;
        }else
        if(id === 'color'){
            const colorNames = Object.keys(colorList);
            let idx = colorNames.indexOf(colorName);
            idx = idx + 1;
            if(idx >= colorNames.length) idx = 0;
            vehicletype[type].color = colorList[colorNames[idx]];
            vehicletype[type].colorName = colorNames[idx];
        }else
        if(id === 'reset'){
            vehicletype[type].size = initVehicletype[type].size;
            vehicletype[type].color = initVehicletype[type].color;
            vehicletype[type].colorName = initVehicletype[type].colorName;
        }
        setVehicletype(vehicletype);
    }
    render(){
        const {vehicletype,className} = this.props;
        const types = Object.keys(vehicletype);
        if(types.length > 0){
            return (
                <label>legend
                    <ol>{types.map((type)=>
                        <li key={type} className="flex_row">
                            <button onClick={this.onClick.bind(this,'size-up',type)}
                                 title='icon size up' className={className}>＋</button>
                            <button onClick={this.onClick.bind(this,'size-down',type)}
                                 title='icon size down' className={className}>－</button>
                            <button onClick={this.onClick.bind(this,'color',type)} className={className}
                                 title='icon color change'
                                 style={{background:vehicletype[type].colorName}}>&nbsp;</button>
                            <button onClick={this.onClick.bind(this,'reset',type)}
                                 title='icon reset' className={className}>R</button>&nbsp;
                            {type}
                        </li>)}</ol>
                </label>
            );
        }else{
            return null;
        }
    }
};

export class VehicletypeList extends React.Component{
    render(){
        return (
            <li className="flex_column">
                <LegendList {...this.props}/>
            </li>
        );
    }
}
VehicletypeList.defaultProps = {
    className: 'size_button'
}