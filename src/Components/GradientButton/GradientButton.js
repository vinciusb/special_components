import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

const startRadius = 40;

const useStyles = makeStyles({
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
        // overflow: 'hidden',
        position: 'relative',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    Circle: {
        width: props => `${2 * props.circleRadius}px`,
        height: props => `${2 * props.circleRadius}px`,
        backgroundColor: 'rgb(255,255,0, 0.5)',
        position: 'absolute',
        left: props => `${props.circleOffsets.left}px`,
        top: props => `${props.circleOffsets.top}px`,
        borderRadius: '50%',
        opacity: props => props.circleIsGrowing ? '1' : '0',
        transition: `opacity 0.1s ease-in, width 2s, height 2s`,
        pointerEvents: 'none',
    }
});
// , top 2s, left 2s

function GradientButton(props) {
    const [circleIsGrowing, setCircleIsGrowing] = useState(false);
    const [circleRadius, setCircleRadius] = useState(startRadius);
    const [circleOffsets, setCircleOffsets] = useState({ top: -startRadius, left: -startRadius });

    // TODO: Fazer função pra achar menor círculo que inscreva tal butão
    const drawCircle = (e) => {
        const rect = e.target.getBoundingClientRect();
        // Obtem posição inicial do click
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // setCircleOffsets({ top: clickY - startRadius, left: clickX - startRadius });

        var growX, growY;
        //  Obtem maior distancia do eixo x
        if(clickX < rect.width / 2) growX = rect.width - clickX;
        else growX = clickX;

        //  Obtem maior distancia do eixo y
        if(clickY < rect.height / 2) growY = rect.height - clickY;
        else growY = clickY;

        const newRadius = Math.sqrt(Math.pow(growX, 2) + Math.pow(growY, 2));
        
        // Calcula posição inicial do circulo
        const top = clickY - newRadius;
        const left = clickX - newRadius;
        
        setCircleRadius(newRadius);
        setCircleOffsets({ top, left });
    };

    const handleClick = (e) => {
        if(!circleIsGrowing) {
            drawCircle(e);
            setCircleIsGrowing(true);
            // setTimeout(() => { setCircleIsGrowing(false) }, 1000);

            // Faz ação da callback de entrada
            props.onClick();
        }
    };

    const classes = useStyles({ ...props, circleIsGrowing, circleRadius, circleOffsets });
    return (
        <div className={ classes.GradientButton } onClick={ handleClick }>
            { props.text }
            <div className={ classes.Circle }></div>
        </div>
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