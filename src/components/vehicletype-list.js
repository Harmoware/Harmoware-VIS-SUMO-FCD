import React from 'react';
import { color as colorList } from '../library';

class LegendList extends React.Component{
    onClick(id,type){
        const {vehicletype,setVehicletype} = this.props;
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
        }
        setVehicletype(vehicletype);
    }
    render(){
        const {vehicletype,className} = this.props;
        const types = Object.keys(vehicletype);
        if(types.length > 0){
            return types.map((type)=>
                <li key={type} className="flex_row">
                    <button onClick={this.onClick.bind(this,'size-up',type)}
                        className={className}>＋</button>
                    <button onClick={this.onClick.bind(this,'size-down',type)}
                        className={className}>－</button>
                    <button onClick={this.onClick.bind(this,'color',type)} className={className}
                        style={{background:vehicletype[type].colorName}}>&nbsp;</button>&nbsp;
                    {type}
                </li>
            );
        }else{
            return null;
        }
    }
};

export class VehicletypeList extends React.Component{
    render(){
        const {vehicletype} = this.props;

        const length = Object.keys(vehicletype).length;
    
        return (
            <li className="flex_column">
                <label>{length > 0 ? 'legend':null}
                    <ol><LegendList {...this.props}/></ol>
                </label>
            </li>
        );
    }
}
VehicletypeList.defaultProps = {
    className: 'size_button'
}