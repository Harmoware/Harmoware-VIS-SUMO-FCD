export const analyzeSumoData = (inputData)=>{
    const timeBegin = Date.now();
    const root = inputData.children;
    for(let i=0; i<root.length; i=i+1) {
        const fcd = root[i];
        if(fcd.tagName === 'fcd-export'){
            return getTimestepInfo(timeBegin,fcd);
        }else{
            console.log('undefined fcd.tagName => ' + fcd.tagName);
        }
    }
    return [];
}

const getTimestepInfo = (timeBegin,fcd)=>{
    let typeIdMap = {};
    const child = fcd.children;
    for(let i=0; i<child.length; i=i+1) {
        const timestep = child[i];
        if(timestep.tagName === 'timestep'){
            const {time} = getAttributes(timestep);
            if(time){
                const elapsedtime = timeBegin + parseFloat(time);
                typeIdMap = getVehicleInfo(typeIdMap,timestep,elapsedtime);
            }else{
                console.log('undefined timestep.tagName => ' + timestep.tagName);
            }
        }else{
            console.log('timestep tagName => ' + timestep.tagName);
        }
    }
    return Object.values(typeIdMap);
}

const getVehicleInfo = (typeIdMap,timestep,elapsedtime)=>{
    const update = {};
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
            if(type)operation[vehicleType] = type;
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
