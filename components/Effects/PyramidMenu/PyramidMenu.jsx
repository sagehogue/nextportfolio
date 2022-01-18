import React, {useState} from 'react'

import styled from 'styled-components'


const Pyramid = styled.div`
display: flex;
position: relative; 
width: 0; 
height: 0; 
border-left: 50px solid transparent;
border-right: 50px solid transparent;

border-top: 75px solid #f00;
background-color: transparent;
transition: all .75s;
transform: ${props => props.isOpen? "" : "rotate(180deg)"};
`
;

const Triangle = styled.div`

transition: all .75s;
width: 0; 
height: 0; 
border-left: 50px solid transparent;
border-right: 50px solid transparent;
position: absolute;
background-color: transparent;
transition: all .75s;
`;

const Triangle1 = styled(Triangle)`
top: ${props => props.isOpen? "-76px" : "-75px"};
transform: ${props => props.isOpen? "rotate(180deg)" : ""};
left:${props => props.isOpen ? "100%" : "0"};
border-top: ${props => props.isOpen? "75px solid blue;" : "-0 solid transparent"};
transform: ${props => props.isOpen? "rotate(180deg)" : "translateX(-50px)"};
`

const Triangle2 = styled(Triangle)`
top: ${props => props.isOpen? "-76px" : "-75px"};
left:${props => props.isOpen ? "100%" : "0"};
border-top: ${props => props.isOpen? "75px solid green;" : "-0 solid transparent"};
transform: ${props => props.isOpen? "rotate(180deg) translateX(100px)" : "translateX(-50px)"};
`

const Triangle3 = styled(Triangle)`
top: ${props => props.isOpen? "0" : "-75px"};
left:${props => props.isOpen ? "0" : "0"};
border-top: ${props => props.isOpen? "75px solid pink;" : "-0 solid transparent"};
transform: ${props => props.isOpen? " translateY(-150px) translateX(-50px)rotate(180deg)" : "translateX(-50px)"};
`
;
export default function PyramidMenu() {
    let [isOpen, setIsOpen] = useState(false);

    return (
        <Pyramid isOpen={isOpen} onClick={() => {setIsOpen(!isOpen)}}>
            <Triangle1  isOpen={isOpen}/>
            <Triangle2  isOpen={isOpen}/>
            <Triangle3 isOpen={isOpen}/>
        </Pyramid>
    )
}
