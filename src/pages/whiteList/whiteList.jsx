import React from 'react';
import './whiteList.css'
import { WalletOutlined,CaretUpOutlined,CaretDownOutlined} from '@ant-design/icons';
import iconT from '../../assets/img/white-icon1.png'
import iconN from '../../assets/img/white-icon2.png'
import Modal from '../../components/modal/modal'
import {login, isRegister} from "../../utils/BscWalletApi";
import intl from 'react-intl-universal'
import { message } from 'antd';
import { emit } from '../../utils/emit'

export default class WhiteList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           status:1,
           address:'',
           isReg:'0',
        }
        this.handleConnectWallet = this.handleConnectWallet.bind(this);
    }
    componentWillMount(){
        this.setState({
            address:window.sessionStorage.getItem("address"),
            isReg:window.sessionStorage.getItem("isReg")
        })
    }
    componentDidMount(){
        emit.on('loginSuccess',()=>this.loginSuccess())
    }
    loginSuccess(){
        this.forceUpdate();
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
            }else{
                window.sessionStorage.setItem('isReg',0)
                emit.emit('loginSuccess')
            }
            emit.emit('loginSuccess2',data.msg)
        }
    }
    render(){
        return(
            <div className="whiteList">
                <div className="whiteList-t">
                    <div></div>
                    <span></span>
                </div>
                <div>
                    <div className="whiteList-content">
                        <div>
                            <div>
                                <span className="item1-title">{intl.get('whiteListTitle1')}</span>
                                <div className="item1">
                                    <div>
                                        <img src={iconT}/>
                                        <span>USDT</span>
                                        <CaretDownOutlined className="arrColor" />
                                        <CaretUpOutlined className="arrColor" />
                                    </div>
                                    <div className="amount">
                                        <span>100000</span>
                                        <span>{intl.get('whiteListOverage')}：99991.212</span>
                                    </div>
                                </div>
                                <img className="next" src={iconN}/>
                                <div className="computational">
                                    <span>{intl.get('whiteListTitle2')}：</span>
                                    <span>100000</span>
                                </div>
                                
                                {
                                    (this.state.status == 1)?
                                        <div className="connect" onClick={this.handleConnectWallet}><WalletOutlined /> &nbsp;{intl.get('ConnectWallet')}</div>
                                    :
                                        <div className="connect">{intl.get('AuthorizeUSDT')}</div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="item2">
                        <div className="computational2">
                            <span>{intl.get('ConvertibleForce')}</span>
                            <span>0</span>
                        </div>
                        <div className="exchange">{intl.get('ForceExchange')}</div>
                    </div>
                </div>
            </div>
        )
    }
}