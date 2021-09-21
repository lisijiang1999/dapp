import React from 'react';
import { Input,message} from 'antd';
import './modal.css'
import intl from 'react-intl-universal'
import { register } from "../../utils/BscWalletApi";
import { getQueryVariable } from '../../utils/util'

const { TextArea } = Input;

export default class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show:true,
            shareAddress:""
        }
        this.handleColse = this.handleColse.bind(this)
        this.SubmitRegister = this.SubmitRegister.bind(this)
    }
    componentDidMount(){
        this.props.onRef(this);
    }
    handleColse(){
        this.setState({show:false})
        this.props.handleMenuClass();
    }
    handleOpen(){
        this.setState({show:true})
    }
    inputChange(e){
        // console.log(e.target.value)
        e.persist();
        this.setState({
            shareAddress:e.target.value
        })
        console.log(this.state.shareAddress)
    }
    async SubmitRegister(){
        console.log(this.state.shareAddress)
        if(this.state.shareAddress == ""){
            message.error(intl.get('addressTip'))
            return;
        }
        const address = window.sessionStorage.getItem('address')
        const getAddress = getQueryVariable(this.state.shareAddress)
        const req = await register(address,getAddress)
        console.log(req)
        if(req && req.status){
            window.sessionStorage.setItem('regData',req)
            message.success(intl.get('regSucess'))
            this.setState({show:false})
        }
    }
    render(){
        return(
            <div className={`modal ${this.state.show?'':'hideModal'}`}>
                <div className="colse"></div>
                <div className="content">
                    <h5>{intl.get('regTip')}</h5>
                    <p className="tip1">{intl.getHTML('regText')}</p>
                    <div>
                        <TextArea onChange={e=>this.inputChange(e)} className="input" rows={4} />
                    </div>
                    <p className="tip2">{intl.getHTML('regWarning')}</p>
                    <span onClick={this.SubmitRegister} className="btn">{intl.get('regEnter')}</span>
                </div>
            </div>
        )
    }
}