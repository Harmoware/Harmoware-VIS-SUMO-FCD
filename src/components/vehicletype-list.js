import React from 'react';

export const VehicletypeList = (props)=>{
    const {vehicletype, setVehicletype, className} = props;

    const AddSize = (()=>{
        const vehicletypeCopy = Object.assign({},vehicletype);
/*        let setSize = vehicletypeCopy[type].size + 0.5;
        if(setSize > 3) setSize = 0.5;
        vehicletypeCopy[type].size = setSize;
        setVehicletype({vehicletype:Object.assign({},vehicletypeCopy,)});*/
    });
    
    const Makelist = ({vehicletype})=>{
        const types = Object.keys(vehicletype);
        if(types.length > 0){
            return types.map((type,idx)=>{
                return (<li key={idx}><font color={vehicletype[type].colorName}>{type}</font></li>);
            });
        }else{
            return null;
        }
    }

    return (
        <li>
        <p>{Object.keys(vehicletype).length > 0 ? 'legend' : null}</p>
        <ol>
            <Makelist vehicletype={vehicletype}/>
        </ol>
        </li>
    );

}
VehicletypeList.defaultProps = {
    className: 'harmovis_button'
}