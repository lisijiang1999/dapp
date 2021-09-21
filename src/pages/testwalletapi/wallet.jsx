import React from 'react';
import {Button} from 'antd';
import {addExTokenList, isRegister, currentAccount, register, login, selectExTokenList} from "../../utils/BscWalletApi";

export default class Wallet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input1: "",
            account: "1"
        };
    }

    currentAccount() {
        console.log("currentAccount : " + JSON.stringify(currentAccount()))
    }

    async connectWallet() {
        const ret = await login("0x3");
        console.log("connectWallet : " + JSON.stringify(ret))
    }

    /*async transfer() {
        const account = await window.bscWallet.currentAccount()
        if (account) {
            const from = await window.bscWallet.currentAccount().address
            const tx = {
                from: from,
                to: "0x485CB3364c3d2266212B6c8467ABA973383e9872",
                value: window.bscWallet.parseEther("0.1"),
            };
            const txHash = await window.bscWallet.sendTransaction(tx)
            console.log("transfer : " + JSON.stringify(txHash))
        } else {
            console.log("transfer : account 不存在")
        }
    }*/

    async isRegisterTest() {
        const userAddress = currentAccount().address

        const ret = await isRegister(userAddress);

        console.log("isRegisterTest : " + JSON.stringify(ret))
    }

    async registerTest() {
        const userAddress = currentAccount().address
        const ret = await register(userAddress, "123")
        console.log("registerTest : " + JSON.stringify(ret))
    }

    /*async erc20Balance() {
        const ret = await erc20BalanceOf("0x69a065b85a4621045bd67fa651a2aa5a50b3b6f7", "0x2d828fd3dec2D69aC97168ac984a1ba395f8Ea4f")
        console.log("erc20Balance : " + JSON.stringify(ret))
    }*/

    async selectExTokenListTest() {
        const ret = await selectExTokenList();
        console.log("selectExTokenListTest : " + JSON.stringify(ret))
    }

    async addExTokenList() {
        const ret = await addExTokenList();
        console.log("addExTokenList : " + JSON.stringify(ret))
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.connectWallet}>连接钱包</Button>
                <Button type="primary" onClick={this.currentAccount}>当前用户</Button>
                <Button type="primary" onClick={this.isRegisterTest}>是否注册</Button>
                <Button type="primary" onClick={this.registerTest}>注册</Button>

                <Button type="primary" onClick={this.addExTokenList}>添加列表</Button>
                <Button type="primary" onClick={this.selectExTokenListTest}>列表</Button>
            </div>
        )
    }
}
