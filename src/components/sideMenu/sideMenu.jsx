import React from 'react';
import {Drawer,Menu,message} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import {HomeOutlined,UserOutlined, PayCircleOutlined,CodeSandboxOutlined,ShareAltOutlined} from '@ant-design/icons';
import './sideMenu.css';
import intl from 'react-intl-universal'

const { SubMenu } = Menu;

class SideMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            openKeys: ['2'],
        }
        this.handleClickMenu = this.handleClickMenu.bind(this)
        this.onClose = this.onClose.bind();
    }

    rootSubmenuKeys = ['2'];

    componentDidMount(){
        this.props.onRef(this);
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
            }); 
        }
    };
    showDrawer = () => {
        if(this.state.visible){
            this.setState({visible: false});
            this.props.handleMenu(this.state.visible)
        }else{
            this.setState({visible: true});
            this.props.handleMenu(this.state.visible)
        }
    };
    onClose = () => {
        this.setState({visible: false});
        this.props.handleMenu(true)
    };
    handleClickMenu({ item, key, keyPath}){
        this.setState({visible: false});
        this.props.handleMenu(true);
        // const address = window.sessionStorage.getItem("address")
        // const isReg = window.sessionStorage.getItem("isReg")
        // const list = ['1','2.1','2.2','2.3','3','4']
        // if(list.indexOf(key) == -1){
        //     return;
        // }
        // if(!address){
        //     message.warning(intl.get('messageConnect'))
        //     this.props.history.push('/')
        //     return;
        // }
        // if(address && isReg== 0){
        //     message.warning(intl.get('messageReg'))
        //     this.props.history.push('/')
        //     this.props.handleRegister();
        // }
    }
    render(){   
        return (
            <div >
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                    trigger={['click']}
                >
                    <Menu mode="inline" onClick={this.handleClickMenu} onOpenChange={this.onOpenChange}>
                        <Menu.Item key="0" icon={<HomeOutlined />}><Link to="/">{intl.get('menu1')}</Link></Menu.Item>
                        <Menu.Item key="1" icon={<UserOutlined />}><Link to="/whiteList">{intl.get('menu2')}</Link></Menu.Item>
                        <SubMenu key="2" icon={<PayCircleOutlined />} title={<span><span>{intl.get('menu3')}</span></span>}>
                            <Menu.Item key="2.1"><Link to="/nativeSpace">{intl.get('menu3.1')}</Link></Menu.Item>
                            <Menu.Item key="2.2"><Link to="/expansionSpace">{intl.get('menu3.2')}</Link></Menu.Item>
                            <Menu.Item key="2.3"><Link to="/liquidityMining">{intl.get('menu3.3')}</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3" icon={<CodeSandboxOutlined />}><Link to="/magicBox">{intl.get('menu4')}</Link></Menu.Item>
                        <Menu.Item key="4" icon={<ShareAltOutlined />}><Link to="/share">{intl.get('menu5')}</Link></Menu.Item>
                    </Menu>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(SideMenu)