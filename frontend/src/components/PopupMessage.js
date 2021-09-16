import React from 'react'
import styled from 'styled-components'

export default function PopupMessage(props) {
    return (
        <WrapperPopupMessage>
            <PopupError>
                <ClosePopupBtn><i class="fas fa-times"></i></ClosePopupBtn>
                <p>{props.children}</p>
            </PopupError>
        </WrapperPopupMessage>
    )
}


//styled component for popup

const WrapperPopupMessage = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const PopupError = styled.div`
    background-color: #fff;
    min-height: 210px;
    width: 300px;
    color: #000;
    text-align: center;
    position: relative;
`


const ClosePopupBtn = styled.button`
    position: absolute;
    top: -10px;
    right: -10px;
    width: 25px;
    height: 25px;
    border-radius: 100vh;
    display:flex;
    justify-content:center;
    align-items: center;
    background: #a02020;
    border: none;
    color: #fff;
`

