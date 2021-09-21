import React from 'react';
import { Dropdown,Menu} from 'antd';
import {MenuOutlined,DownOutlined,MenuUnfoldOutlined} from '@ant-design/icons';
import './header.css';
import Logo from '../../assets/img/logo.png'
import { emit } from '../../utils/emit'
import intl from 'react-intl-universal'

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            address:"",
            isEN:true,
            menuBtn:true
        }
        this.handleLangClick = this.handleLangClick.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
    }
    componentDidMount(){
        emit.on('loginSuccess2',(address)=>this.changeAdress(address))
        this.props.onRef(this);
        if(window.sessionStorage.getItem('address')){
            this.setState({address:window.sessionStorage.getItem('address')})
        }
    }
    changeAdress(address){
        this.setState({address:address})
    }
    handleMenuBtn(visible){
        this.setState({menuBtn:visible})
    }
    handleLangClick(e) {
        if(e.key == 1){
            this.setState({isEN:true})
            emit.emit('changeLanguage','zh')
        }else if((e.key == 2)){
            this.setState({isEN:false})
            emit.emit('changeLanguage','en')
        }
    }
    handleConnect(){
        this.props.handleConnectWallet()
    }
    render(){
        return (
            <div className="header">
                <img className="logo" src={Logo}/>
                <div>
                    <Dropdown className="language" trigger={['click']} overlay={
                        ()=>{
                            return (
                                <Menu onClick={this.handleLangClick}>
                                    <Menu.Item key="1">中文</Menu.Item>
                                    <Menu.Item key="2">Englist</Menu.Item>
                                </Menu>
                            )
                        }
                    }>
                        <div>
                            <span className="btn">{this.state.isEN?'中':'EN'}</span>
                            <DownOutlined className="menu"/>    
                        </div>
                    </Dropdown>
                    {   
                        (this.state.address == '')?
                            <span className="connect" onClick={this.handleConnect}>{intl.get('connect')}</span>
                        :
                            <span className="accout">{this.state.address.substr(0,3)+"..."+this.state.address.substr(-4)}</span>
                    }   

                    {
                        this.state.menuBtn?
                            <MenuOutlined className="menu" onClick={this.props.showMenu}/>
                        :
                            <MenuUnfoldOutlined className="menu" onClick={this.props.showMenu}/>
                    }
                    
                </div>
            </div>
        )
    }
}