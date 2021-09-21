import React from 'react'
import spaceImg from '../../assets/img/space-img.png'
import './spacePage.css'
import intl from 'react-intl-universal'

export default class SpacePage extends React.Component{
    render(){
        return(
            <div className="spacePage">
                <img src={spaceImg}/>
                <p>{intl.get('spacePage')}</p>
            </div>
        )
    }
}