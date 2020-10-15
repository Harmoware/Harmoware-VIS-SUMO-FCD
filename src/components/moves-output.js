import React from 'react';

export const MovesOutput = (props)=>{
    const { movesbase, className, style, children } = props;

    const onClick = ()=>{
        const resultJson = JSON.stringify(movesbase);
        const downLoadLink = document.createElement("a");
        downLoadLink.download = 'movesbase-' + Date.now() + '.json';
        downLoadLink.href = URL.createObjectURL(new Blob([resultJson], {type: "text.plain"}));
        downLoadLink.dataset.downloadurl = ["text/plain", downLoadLink.download, downLoadLink.href].join(":");
        downLoadLink.click();
    };

    return (
        <button className={className} onClick={onClick} disabled={movesbase.length===0}>
            <span style={style}>{children}</span>
        </button>
    );
}
MovesOutput.defaultProps = {
    className: 'harmovis_button'
};
