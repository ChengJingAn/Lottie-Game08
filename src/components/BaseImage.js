import React from "react";
import "../stylesheets/styles.css"

import {prePathUrl} from "./CommonFunctions"

const BaseImage = (prop, ref) => {

    let style = {
        left: '0px',
        top: '0px',
    };

    let widthScale = '100%'
    if (prop.style) {
        style = prop.style
        // if (prop.style.transition == null)
        //     style.transition = '0.7s'
    }

    if (prop.scale != null)
        widthScale = prop.scale * 100 + "%";

    if (prop.posInfo != null) {
        if (prop.posInfo.l != null)
            style.left = 100 * prop.posInfo.l + '%'
        if (prop.posInfo.t != null)
            style.top = 100 * prop.posInfo.t + '%'
        if (prop.posInfo.b != null)
            style.bottom = 100 * prop.posInfo.b + '%'
    }

    return (
        <img
            className={"baseImage " + (prop.class != null ? prop.class : '')}
            draggable={false}
            width={widthScale}
            src={prePathUrl() + "images/" + prop.url}
            style={style}
            ref={ref}
            onLoad = {prop.onLoad}
        />
    )
}

export default React.forwardRef(BaseImage);
