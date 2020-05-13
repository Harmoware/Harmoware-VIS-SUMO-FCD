export const analyzeSumoData = (inputData,setVehicletype)=>{
    const timeBegin = Date.now();
    const root = inputData.children;
    for(let i=0; i<root.length; i=i+1) {
        const fcd = root[i];
        if(fcd.tagName === 'fcd-export'){
            return getTimestepInfo(timeBegin,fcd,setVehicletype);
        }else{
            console.log('undefined fcd.tagName => ' + fcd.tagName);
        }
    }
    return [];
}

const getTimestepInfo = (timeBegin,fcd,setVehicletype)=>{
    let typeIdMap = {};
    const child = fcd.children;
    for(let i=0; i<child.length; i=i+1) {
        const timestep = child[i];
        if(timestep.tagName === 'timestep'){
            const {time,...other1} = getAttributes(timestep);
            if(time){
                const elapsedtime = timeBegin + parseFloat(time);
                typeIdMap = getVehicleInfo({typeIdMap,timestep,elapsedtime,setVehicletype,...other1});
            }else{
                console.log('undefined timestep.tagName => ' + timestep.tagName);
            }
        }else{
            console.log('timestep tagName => ' + timestep.tagName);
        }
    }
    return Object.values(typeIdMap);
}

const getVehicleInfo = ({typeIdMap,timestep,elapsedtime,setVehicletype,...other1})=>{
    const update = {};
    const vehicleTypeList = {};
    const colorList = Object.values(color);
    const colorKeys = Object.keys(color);
    let colorIdx = 0;
    const child = timestep.children;
    for(let i=0; i<child.length; i=i+1){
        const vehicle = child[i];
        if(vehicle.tagName === 'vehicle' || vehicle.tagName === 'person' ||
            vehicle.tagName === 'container'){
            const {id,type,x,y,speed,angle,pos,slope,...other2} = getAttributes(vehicle);
            if(!id||!x||!y) continue;
            const typeId = vehicle.tagName + id;
            let operation_array = [];
            if(typeId in typeIdMap){
                update[typeId] = typeIdMap[typeId];
                operation_array = typeIdMap[typeId]['operation'];
            }else{
                update[typeId] = {};
                update[typeId]['type'] = vehicle.tagName;
                update[typeId]['id'] = typeId;
            }
            const vehicleType = vehicle.tagName + 'type';
            const operation = {
                elapsedtime,
                longitude:parseFloat(x),
                latitude:parseFloat(y),
                tagName:vehicle.tagName,
                ...other2,...other1};
            if(type){
                operation[vehicleType] = type;
                if(vehicle.tagName === 'vehicle' && !(type in vehicleTypeList)){
                    vehicleTypeList[type] = {color:colorList[colorIdx],size:1.5,colorName:colorKeys[colorIdx]};
                    colorIdx = colorIdx + 1;
                    if(colorIdx >= colorList.length) colorIdx = 0;
                }
            }
            if(vehicle.tagName === 'person' && !(vehicle.tagName in vehicleTypeList)){
                vehicleTypeList[vehicle.tagName] = {color:color.red,size:2,colorName:'red'};
            }
            if(vehicle.tagName === 'container' && !(vehicle.tagName in vehicleTypeList)){
                vehicleTypeList[vehicle.tagName] = {color:color.teal,size:2,colorName:'teal'};
            }
            if(speed)operation['speed'] = parseFloat(speed);
            if(angle)operation['angle'] = parseFloat(angle);
            if(pos)operation['pos'] = parseFloat(pos);
            if(slope)operation['slope'] = parseFloat(slope);
            operation_array.push(operation);
            update[typeId]['operation'] = operation_array;
        }else{
            console.log('undefined vehicle.tagName => ' + vehicle.tagName);
        }
    }
    setVehicletype(vehicleTypeList);
    return Object.assign({},typeIdMap,update);
}

const getAttributes = (element)=>{
    const attributes = {};
    if(element.hasAttributes){
        const elementAttr = element.attributes;
        for(let i=0; i<elementAttr.length; i=i+1){
            attributes[elementAttr[i].name] = elementAttr[i].value;
        }
    }
    return attributes;
}

export const color = {
    white: [255,255,255],
    yellow: [255,255,0],
    fuchsia: [255,0,255],
    aqua: [0,255,255],
    lime: [0,255,0],
    olive: [128,128,0],
    green: [0,128,0],
    purple: [128,0,128],
    blue: [0,0,255],
    silver: [192,192,192],
    gray: [128,128,128],
    teal: [0,128,128],
    maroon: [128,0,0],
    red: [255,0,0],
};
