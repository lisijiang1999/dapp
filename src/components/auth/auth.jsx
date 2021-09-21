import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { message } from 'antd'

export default class Auth extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render(){
        console.log(this.props)
        const {routerConfig,location} = this.props
        const targetRouterConfig = routerConfig.find((item)=>item.path === location.pathname)
        const { component } = targetRouterConfig;
        return <Route excat path={location.pathname} component={component} />
        
    }
}