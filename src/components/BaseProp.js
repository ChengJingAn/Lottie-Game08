import React, { useRef, useEffect } from "react"
import "../stylesheets/styles.css"

let isMouseEnterLeave
let primaryStyle = { transition: '0.7s' };
const BaseProp = (prop, ref) => {

    useEffect(() => {
        isMouseEnterLeave = true;
    }, [])

    let style = { ...primaryStyle, ...prop.style }
    const basePropRef = useRef();

    React.useImperativeHandle(ref, () => ({
        modify: (props) => {
            basePropRef.current.style.width = prop.geo.width * props.w + 'px'
            basePropRef.current.style.height = prop.geo.width * props.w + 'px'

            if (props.r != null)
                basePropRef.current.style.right = prop.geo.left + prop.geo.width * props.r + 'px'
            if (props.l != null)
                basePropRef.current.style.left = prop.geo.left + prop.geo.width * props.l + 'px'

            basePropRef.current.style.top = prop.geo.top + prop.geo.height * props.t + 'px'
            basePropRef.current.style.transition = props.tran
        },

        scale: (props) => {
            basePropRef.current.style.transform = 'scale(' + props.s + ")"
            if (props.r != null)
                basePropRef.current.style.right = prop.geo.left + prop.geo.width * props.r + 'px'
            if (props.l != null)
                basePropRef.current.style.left = prop.geo.left + prop.geo.width * props.l + 'px'
            basePropRef.current.style.top = prop.geo.top + prop.geo.height * props.t + 'px'
            basePropRef.current.style.transition = props.tran
        },
        addClass: (classname) => {
            basePropRef.current.classList.add(classname)
        },
        removeClass: (classname) => {
            basePropRef.current.classList.remove(classname)
        },
        setMouseEnterLeave: (val) => {
            isMouseEnterLeave = val
        },
    }))

    function leaveMouseFunc() {
        if (isMouseEnterLeave && prop.posInfo.w1 != null) {
            basePropRef.current.style.width = prop.geo.width * prop.posInfo.w + 'px'
            basePropRef.current.classList.add(prop.class)
        }
    }

    // set fomart position....
    if (prop.posInfo.w != null)
        style.width = prop.geo.width * prop.posInfo.w + 'px'
    if (prop.posInfo.h != null)
        style.height = prop.geo.width * prop.posInfo.w * prop.posInfo.h + 'px'
    if (prop.posInfo.l != null)
        style.left = prop.geo.left + prop.geo.width * prop.posInfo.l + 'px'
    if (prop.posInfo.t != null)
        style.top = prop.geo.top + prop.geo.height * prop.posInfo.t + 'px'
    if (prop.posInfo.b != null)
        style.bottom = prop.geo.top + prop.geo.height * prop.posInfo.b + 'px'
    if (prop.posInfo.r != null)
        style.right = prop.geo.left + prop.geo.width * prop.posInfo.r + 'px'

    style['zIndex'] = 1

    return (
        <div
            ref={basePropRef}
            onClick={prop.clickFunc}
            className={"baseProp " + (prop.class != null ? prop.class : '')}
            // onMouseEnter={() => {
            //     if (isMouseEnterLeave && prop.posInfo.w1 != null) {
            //         basePropRef.current.style.width = prop.geo.width * prop.posInfo.w1 + 'px'
            //         basePropRef.current.classList.remove(prop.class)
            //     }
            // }}
            onMouseOut={leaveMouseFunc}
            style={style}
        >
            {
                React.Children.map(prop.children, child => {
                    return child
                })
            }
        </div>
    )
}
export default React.forwardRef(BaseProp);