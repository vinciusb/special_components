import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';

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

        setClickInfo({ left: clickX - startRadius, top: clickY - startRadius});
        setAniIsRunning(true);
        setTimeout(() => {setAniIsRunning(false)}, 500);
    };

    const classes = buttonStyles({ ...props });
    return (
        <div className={ classes.GradientButton } onClick={ handleClick }>
            { props.text }
            { aniIsRunning && <RippleDiv clickPoint={ clickInfo } /> }
        </div>
    );
}

const rippleStyles = makeStyles({
    Circle: {
        pointerEvents: 'none',
        width: props => `${2 * props.circleRadius}px`,
        height: props => `${2 * props.circleRadius}px`,
        left: props => `${ props.clickPoint.left }px`,
        top: props => `${ props.clickPoint.top }px`,
        backgroundColor: 'rgb(255,255,255,0.4)',
        position: 'absolute',
        borderRadius: '50%',
        animation: '$ripple 0.5s ease-out forwards',
    },
    '@keyframes ripple': {
        'from': {
            opacity: '1'
        },
        'to': {
            opacity: '0',
            transform: 'scale(4)',
        }
    },
});

function RippleDiv(props) {
    const [circleRadius, setCircleRadius] = useState(startRadius);

    useEffect(() => {

    }, []);

    const ripple = (e) => {
    };

    const classes = rippleStyles({ ...props, circleRadius });
    return (
        <div className={ classes.Circle }></div>
    );
}

GradientButton.defaultProps = {
    onClick: () => {},
    font: 'inherit',
    color: [255, 255, 255],
    gradStart: [0, 0, 255],
    gradEnd: [255, 0, 0],
};

GradientButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    font: PropTypes.string,
    fontSize: PropTypes.number.isRequired,
    color: PropTypes.array,
    gradStart: PropTypes.array,
    gradEnd: PropTypes.array,
};

export default GradientButton;

// TODO: Fazer função pra achar menor círculo que inscreva tal butão
// const growCircle = (data) => {
//     var growX, growY;
//     //  Obtem maior distancia do eixo x
//     if(data.clickX < data.rect.width / 2) growX = data.rect.width - data.clickX;
//     else growX = data.clickX;

//     //  Obtem maior distancia do eixo y
//     if(data.clickY < data.rect.height / 2) growY = data.rect.height - data.clickY;
//     else growY = data.clickY;

//     const newRadius = Math.sqrt(Math.pow(growX, 2) + Math.pow(growY, 2));

//     // Calcula posição inicial do circulo
//     const top = data.clickY - newRadius;
//     const left = data.clickX - newRadius;
// };