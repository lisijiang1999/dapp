import React from 'react'
import './magicBox.css'
import { WalletOutlined} from '@ant-design/icons';
import intl from 'react-intl-universal'
import spaceImg from '../../assets/img/space-img.png'
import Modal from '../../components/modal/modal'
import {login, isRegister} from "../../utils/BscWalletApi";
import { message } from 'antd';
import { emit } from '../../utils/emit'
export default class MagicBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            address:'',
            isReg:'0',
        }
        this.handleConnectWallet = this.handleConnectWallet.bind(this);
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
            <div className="nativeSpace">
               {
                   (this.state.address)?
                        (this.state.isReg == '1')?
                            <div className="native-spacePage">
                                <img src={spaceImg}/>
                                <p>{intl.get('spacePage')}</p>
                            </div>
                        :
                        null
                   :
                   <div onClick={this.handleConnectWallet} className="connectBtn"><WalletOutlined /> &nbsp;{intl.get('ConnectWallet')}</div>
               }
            </div>
        )
    }
}