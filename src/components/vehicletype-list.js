import React from 'react';

export const VehicletypeList = (props)=>{
    const {vehicletype} = props;

    const Makelist = ({vehicletype})=>{
        const keys = Object.keys(vehicletype);
        if(keys.length > 0){
            return keys.map((key,idx)=>{
                return (<li key={idx}><font color={vehicletype[key].colorName}>{key}</font></li>);
            });
        }else{
            return null;
        }
    }

    return (
        <li>
        <p>legend</p>
        <ol>
            <Makelist vehicletype={vehicletype}/>
        </ol>
        </li>
    );

}