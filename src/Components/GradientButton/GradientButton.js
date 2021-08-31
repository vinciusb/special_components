import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const startRadius = 40;

const Ripple = keyframes`
    from {
        opacity: 1,
    },
    to {
        opacity: 0,
    },
`;

const Styled = {
    GradientButton: styled.div`
        background: ${(props) => `linear-gradient(30deg,rgb(${props.gradStart[0]},${props.gradStart[1]},${props.gradStart[2]}), rgb(${props.gradEnd[0]}, ${props.gradEnd[1]}, ${props.gradEnd[2]}))`};
        color: ${(props) => `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`};
        width: fit-content;
        min-width: 70px;
        padding: 13px 22px;
        border-radius: 7px;
        font-weight: bolder;
        font-size: ${(props) => `${props.fontSize}px`};
        font-family: ${(props) => props.font};
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        &:hover {
            cursor: pointer;
        }
        & * {
            margin: 0px;
            user-select: none;
            pointer-events: none;
        }
    `,
    Circle: styled.div`
        width: ${(props) => `${2 * props.radius}px`};
        height: ${(props) => `${2 * props.radius}px`};
        left: ${(props) => `${props.offsets.left}px`};
        top: ${(props) => `${props.offsets.top}px`};
        background-color: rgb(255,255,255,0.4);
        position: absolute;
        border-radius: 50%;
        animation: ${Ripple} 0.25s ease-out forwards;
        transition: width 0.25s ease-out,
                    height 0.25s ease-out,
                    left 0.25s ease-out,
                    top 0.25s ease-out;
    `,
};

function GradientButton({
    onClick, text, font, fontSize, color, gradStart, gradEnd, className,
}) {
    const [clickInfo, setClickInfo] = useState();
    const [aniIsRunning, setAniIsRunning] = useState(false);

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        // Obtem posição inicial do click
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        //  Obtem maior distancia do eixo x
        let growX; let
            growY;
        if(clickX < rect.width / 2) growX = rect.width - clickX;
        else growX = clickX;

        //  Obtem maior distancia do eixo y
        if(clickY < rect.height / 2) growY = rect.height - clickY;
        else growY = clickY;

        const farthestCorner = Math.sqrt(growX ** 2 + growY ** 2);

        setClickInfo({ left: clickX, top: clickY, farCorner: farthestCorner });
        setAniIsRunning(true);
        setTimeout(() => { setAniIsRunning(false); }, 600);

        // Faz ação proposta para o click
        onClick();
    };

    return (
        <Styled.GradientButton
            onClick={handleClick}
            font={font}
            fontSize={fontSize}
            color={color}
            gradStart={gradStart}
            gradEnd={gradEnd}
            className={className}
        >
            <p>{ text }</p>
            { aniIsRunning && <RippleDiv clickPoint={clickInfo} /> }
        </Styled.GradientButton>
    );
}

function RippleDiv({ clickPoint }) {
    const [circleRadius, setCircleRadius] = useState(startRadius);
    const [circleOffsets, setCircleOffsets] = useState(
        {
            left: clickPoint.left - startRadius,
            top: clickPoint.top - startRadius,
        },
    );

    useEffect(() => {
        setCircleRadius(clickPoint.farCorner);
        setCircleOffsets({
            left: clickPoint.left - clickPoint.farCorner,
            top: clickPoint.top - clickPoint.farCorner,
        });
    }, [clickPoint]);

    // const classes = rippleStyles({ ...props, circleRadius, circleOffsets });
    return (
        <Styled.Circle radius={circleRadius} offsets={circleOffsets} />
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
    fontSize: PropTypes.number.isRequired,
    color: PropTypes.objectOf,
    gradStart: PropTypes.objectOf,
    gradEnd: PropTypes.objectOf,
    className: PropTypes.string,
};

RippleDiv.propTypes = {
    clickPoint: PropTypes.objectOf.isRequired,
};

export default GradientButton;
