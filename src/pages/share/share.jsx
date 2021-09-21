import React from 'react';
import intl from 'react-intl-universal'
import './share.css'
import { WalletOutlined} from '@ant-design/icons';
import codeImg from '../../assets/img/code-img.jpg'
import {login, isRegister} from "../../utils/BscWalletApi";
import { message } from 'antd';
import { emit } from '../../utils/emit'
import QRCode from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default class Share extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            address:'',
            isReg:'0',
            url:"http:www.baidu.com?address=",
        }
        this.handleConnectWallet = this.handleConnectWallet.bind(this);
        this.handleCopy = this.handleCopy(this)
    }
    componentWillMount(){
        emit.on('loginSuccess',()=>this.loginSuccess())
        emit.on('registerSuccess',(address)=>this.registerSuccess(address))
        this.setState({
            address:window.sessionStorage.getItem("address"),
            isReg:window.sessionStorage.getItem("isReg")
        })
    }
    loginSuccess(){
        this.forceUpdate();
    }
    registerSuccess(address){
        this.setState({
            address:address,
            isReg:"1"
        })
    }
    onRefModal = (ref) => {
        this.child3 = ref
    }
    handleRegister(){
        this.child3.handleOpen();
    }
    handleCopy(){
        // message.success("复制成功")
    }
    copyAddress(){
        message.success("复制成功")
    }
    async handleConnectWallet(){
        const supputChainId = process.env.NODE_ENV == "development"?'0x3':'0x38'
        const data = await login(supputChainId);
        if(data.code  == 500){
            message.error(data.msg)
        }
        if(data.code  == 200){
            message.success("success")
            window.sessionStorage.setItem('address',data.msg)
            const ret = await isRegister(data.msg);
            if(ret){
                window.sessionStorage.setItem('isReg',1)
                this.setState({
                    address:data.msg,
                    isReg:"1"
                })
            }else{
                window.sessionStorage.setItem('isReg',0)
                emit.emit('loginSuccess')
            }
            emit.emit('loginSuccess2',data.msg)
        }
    }
    render(){
        return(
            <div className="share">
                {
                   (this.state.address)?
                        (this.state.isReg == '1')?
                        <div className="share-content">
                            <h5>{intl.get('shareTitle')}</h5>
                            <QRCode className="codeImg" value={this.state.url+this.state.address} size={150} fgColor="#000000"/>
                            <p className="url1">{this.state.url+this.state.address}</p>
                            <CopyToClipboard text={this.state.url+this.state.address}>
                                <span onClick={this.copyAddress} className="btn" >{intl.get('copyBtn')}</span>
                            </CopyToClipboard>
                            <span className="copyUrl">{intl.get('copylink')}</span>
                            <div>
                                <p className="url2">{this.state.url+this.state.address}</p>
                            </div>
                        </div>
                        :
                        null
                   :
                   <div onClick={this.handleConnectWallet} className="share-connectBtn"><WalletOutlined /> &nbsp;{intl.get('ConnectWallet')}</div>
                }
            </div>
        )
    }
}