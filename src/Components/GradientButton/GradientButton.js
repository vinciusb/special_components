import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';

const startRadius = 40;

const buttonStyles = makeStyles({
    GradientButton: {
        background: props => `linear-gradient(30deg, rgb(${props.gradStart[0]}, ${props.gradStart[1]}, ${props.gradStart[2]}), rgb(${props.gradEnd[0]}, ${props.gradEnd[1]}, ${props.gradEnd[2]}))`,
        color: props => `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`,
        width: 'fit-content',
        minWidth: '70px',
        padding: '13px 22px',
        borderRadius: '7px',
        fontWeight: 'bolder',
        fontSize: props => `${props.fontSize}px`,
        fontFamily: props => props.font,
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
            cursor: 'pointer',
        },
        '& *': {
            margin: '0px',
            userSelect: 'none',
            pointerEvents: 'none',
        }
    }
});

function GradientButton(props) {
    const [clickInfo, setClickInfo] = useState();
    const [aniIsRunning, setAniIsRunning] = useState(false);

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        // Obtem posição inicial do click
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        //  Obtem maior distancia do eixo x
        var growX, growY;
        if(clickX < rect.width / 2) growX = rect.width - clickX;
        else growX = clickX;

        //  Obtem maior distancia do eixo y
        if(clickY < rect.height / 2) growY = rect.height - clickY;
        else growY = clickY;
    
        const farthestCorner = Math.sqrt(Math.pow(growX, 2) + Math.pow(growY, 2));

        setClickInfo({ left: clickX , top: clickY, farCorner: farthestCorner });
        setAniIsRunning(true);
        setTimeout(() => { setAniIsRunning(false); }, 600);

        // Faz ação proposta para o click
        props.onClick();
    };

    const classes = buttonStyles({ ...props });
    const className = `${props.className} ${classes.GradientButton}`
    return (
        <div className={ className } onClick={ handleClick }>
            <p>{ props.text }</p>
            { aniIsRunning && <RippleDiv clickPoint={ clickInfo } /> }
        </div>
    );
}

const rippleStyles = makeStyles({
    Circle: {
        width: props => `${2 * props.circleRadius}px`,
        height: props => `${2 * props.circleRadius}px`,
        left: props => `${ props.circleOffsets.left }px`,
        top: props => `${ props.circleOffsets.top }px`,
        backgroundColor: 'rgb(255,255,255,0.4)',
        position: 'absolute',
        borderRadius: '50%',
        animation: '$ripple 0.5s ease-out forwards',
        transition: 'width 0.5s ease-out, height 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out',
    },
    '@keyframes ripple': {
        'from': {
            opacity: '1'
        },
        'to': {
            opacity: '0',
        }
    },
});

function RippleDiv(props) {
    const [circleRadius, setCircleRadius] = useState(startRadius);
    const [circleOffsets, setCircleOffsets] = useState({ left: props.clickPoint.left - startRadius, top: props.clickPoint.top - startRadius });

    useEffect(() => {
        setCircleRadius(props.clickPoint.farCorner);
        setCircleOffsets({ left: props.clickPoint.left - props.clickPoint.farCorner, top: props.clickPoint.top - props.clickPoint.farCorner });
    }, [props]);

    const classes = rippleStyles({ ...props, circleRadius, circleOffsets });
    return (
        <div className={ classes.Circle }></div>
    );
}

GradientButton.defaultProps = {
    onClick: () => {},
    font: 'inherit',
    className: '',
    color: [255, 255, 255],
    gradStart: [0, 0, 255],
    gradEnd: [255, 0, 0],
};

GradientButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    font: PropTypes.string,
    className: PropTypes.string,
    fontSize: PropTypes.number.isRequired,
    color: PropTypes.array,
    gradStart: PropTypes.array,
    gradEnd: PropTypes.array,
};

export default GradientButton;