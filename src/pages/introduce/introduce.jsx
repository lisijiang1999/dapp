import React from 'react';
import './introduce.css'
import HomeBg from '../../assets/img/home-bg.jpg'
import HomeLogo from '../../assets/img/home-logo.png'

import intl from 'react-intl-universal'

export default class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }
    render(){
        return(
            <div>
                <img className="bgImg" src={HomeBg} />
                <img className="homeLogo" src={HomeLogo} />
                <p className="title">{intl.get('indexText')}</p>
                <div className="title2">
                    <h5 className="title2Title">{intl.get('indexText2')}</h5>
                    <p>METAVERSE TOKEN</p>
                </div>
                <div className="title3">
                    <p>{intl.get('about')}</p>
                    <span></span>
                </div>
                <div className="text">{intl.getHTML('articl')}</div>
            </div>
        )
    }
}