import React from 'react';
import Header from '../../components/header/header'
import SideMenu from '../../components/sideMenu/sideMenu'
import Modal from '../../components/modal/modal'
import Auth from '../../components/auth/auth'
import './home.css';
import { emit } from '../../utils/emit'

import { message } from 'antd';

import {HashRouter, Route, Switch} from 'react-router-dom'
import Routers from '../../router/index'

import {login, isRegister} from "../../utils/BscWalletApi";

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menuClass:true,
            isInstall:false
        }
        this.showMenu = this.showMenu.bind(this)
        this.handleMenu = this.handleMenu.bind(this)
        this.handleConnectWallet = this.handleConnectWallet.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleMenuClass = this.handleMenuClass.bind(this);
    }
    showMenu(){
        this.child.showDrawer()
    }
    handleMenu(visible){
        this.child2.handleMenuBtn(visible)
        this.setState({menuClass:visible})
    }
    onRefMenu = (ref) => {
        this.child = ref
    }
    onRefHandle = (ref) => {
        this.child2 = ref
    }
    onRefModal = (ref) => {
        this.child3 = ref
    }
    handleRegister(){
        this.child3.handleOpen();
        this.setState({menuClass:false})
    }
    handleMenuClass(){
        this.setState({menuClass:true})
    }
    async handleConnectWallet(){
        const supputChainId = process.env.NODE_ENV == "development"?'0x3':'0x38'
        const data = await login(supputChainId);
        if(data.code  == 500){
            message.error(data.msg)
        }
        if(data.code  == 200){
            message.success("success")
            this.child2.changeAdress(data.msg)
            window.sessionStorage.setItem('address',data.msg)
            const ret = await isRegister(data.msg);
            if(ret){
                window.sessionStorage.setItem('isReg',1)
                emit.emit('registerSuccess',data.msg)
                this.forceUpdate();
            }else{
                window.sessionStorage.setItem('isReg',0)
                this.child3.handleOpen();
                this.setState({menuClass:true})
            }
        }
    }
    async componentDidMount(){
        emit.on('loginSuccess',()=>this.handleRegister())
        this.child3.handleColse();
        const address = window.sessionStorage.getItem('address')
        if(address){
            const ret = await isRegister(address);
            if(ret){
                window.sessionStorage.setItem('isReg',1)
            }else{
                this.child3.handleOpen();
            }
        }else{
            window.sessionStorage.setItem('isReg',0)
        }
    }
    render(){
        return (
            <HashRouter>
            <div>
                <Header showMenu={this.showMenu} handleConnectWallet={this.handleConnectWallet} onRef={this.onRefHandle}/>
                <div className={`content ${this.state.menuClass?'':'menuHeight'}`}>
                    <SideMenu handleMenu={this.handleMenu} handleRegister={this.handleRegister} showShare={this.showShare} onRef={this.onRefMenu}/>
                    <Switch>
                        {
                            Routers.map((item, index) => {
                                return <Route exact key={index} path={item.path} component={item.component}></Route>
                            })
                        }
                    </Switch>
                </div>
                <Modal handleMenuClass={this.handleMenuClass} onRef={this.onRefModal}/>
            </div>
            </HashRouter>
        )
    }
}