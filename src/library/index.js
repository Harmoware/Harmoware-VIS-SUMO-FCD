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
            const {time} = getAttributes(timestep);
            if(time){
                const elapsedtime = timeBegin + parseFloat(time);
                typeIdMap = getVehicleInfo(typeIdMap,timestep,elapsedtime,setVehicletype);
            }else{
                console.log('undefined timestep.tagName => ' + timestep.tagName);
            }
        }else{
            console.log('timestep tagName => ' + timestep.tagName);
        }
    }
    return Object.values(typeIdMap);
}

const getVehicleInfo = (typeIdMap,timestep,elapsedtime,setVehicletype)=>{
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
            const {id,type,x,y,speed,angle,pos,slope,...other} = getAttributes(vehicle);
            if(!id||!x||!y) continue;
            let operation_array = [];
            if(id in typeIdMap){
                update[id] = typeIdMap[id];
                operation_array = typeIdMap[id]['operation'];
            }else{
                update[id] = {};
                update[id]['type'] = vehicle.tagName;
                update[id]['id'] = id;
            }
            const vehicleType = vehicle.tagName + 'type';
            const operation = {
                elapsedtime,
                longitude:parseFloat(x),
                latitude:parseFloat(y),
                ...other};
            if(type){
                operation[vehicleType] = type;
                if(vehicle.tagName === 'vehicle' && !(type in vehicleTypeList)){
                    vehicleTypeList[type] = {color:colorList[colorIdx],scale:1.5,colorName:colorKeys[colorIdx]};
                    colorIdx = colorIdx + 1;
                    if(colorIdx >= colorList.length) colorIdx = 0;
                }
            }
            if(vehicle.tagName === 'person' && !(vehicle.tagName in vehicleTypeList)){
                vehicleTypeList[vehicle.tagName] = {color:color.maroon,colorName:'maroon'};
            }
            if(vehicle.tagName === 'container' && !(vehicle.tagName in vehicleTypeList)){
                vehicleTypeList[vehicle.tagName] = {color:color.teal,colorName:'teal'};
            }
            if(speed)operation['speed'] = parseFloat(speed);
            if(angle)operation['angle'] = parseFloat(angle);
            if(pos)operation['pos'] = parseFloat(pos);
            if(slope)operation['slope'] = parseFloat(slope);
            operation_array.push(operation);
            update[id]['operation'] = operation_array;
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
    red: [255,0,0],
    blue: [0,0,255],
    olive: [128,128,0],
    green: [0,128,0],
    purple: [128,0,128],
    silver: [192,192,192],
    gray: [128,128,128],
    teal: [0,128,128],
    maroon: [128,0,0]
};
