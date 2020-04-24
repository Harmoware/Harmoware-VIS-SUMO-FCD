import React from 'react';
import { analyzeSumoData } from '../library';

export const MovesInput = (props)=>{
    const { actions, id, i18n, className, style, setVehicletype } = props;

    const onSelect = (e)=>{
        const reader = new FileReader();
        reader.addEventListener('load', parseXML, false);
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        actions.setLoading(true);
        actions.setMovesBase([]);
        reader.readAsText(file);
        const file_name = file.name;
        function parseXML(e){
            const xml = e.target.result;
            const parser = new DOMParser();
            const readdata = analyzeSumoData(parser.parseFromString(xml, 'text/xml'),setVehicletype);
            if (!Array.isArray(readdata)) { // Not Array?
                const { movesbase } = readdata;
                if (!movesbase) {
                    actions.setLoading(false);
                    window.alert(i18n.formatError);
                    return;
                }
            }
            actions.setInputFilename({ movesFileName: file_name });
            actions.setMovesBase(readdata);
            actions.setRoutePaths([]);
            actions.setClicked(null);
            actions.setAnimatePause(false);
            actions.setAnimateReverse(false);
            actions.setLoading(false);
        };
    };

    const onClick = (e)=>{
        actions.setInputFilename({ movesFileName: null });
        actions.setMovesBase([]);
        e.target.value = '';
    };

    return (
        <input type="file" accept=".xml"
        id={id} className={className} style={style}
        onChange={onSelect}
        onClick={onClick}
        />
    );
}
MovesInput.defaultProps = {
    i18n: {
        formatError: 'データ形式不正'
    }
};
