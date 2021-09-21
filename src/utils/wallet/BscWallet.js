import BinanceChainWallet from './BrowserExtension/BinanceChainWallet'
import MetaMask from './BrowserExtension/MetaMask'
import RpcClient from './RpcClient';
import networks from "./Networks";

export default class BscWallet {
    constructor() {
        if(!BscWallet.instance) {

            this.initBinanceChainWallet() || this.initMetaMask()
            if (!this._browserExtension) {
                console.warn('Unable to init the dApp. No compatible browser extension is found.')
            }
            // 将 this 挂载到单例上
            BscWallet.instance = this
        }
        return BscWallet.instance
    }

    initBinanceChainWallet() {
        if (window.BinanceChain && window.BinanceChain.bnbSign) {
            this._browserExtension = new BinanceChainWallet(window.BinanceChain)
            return this._browserExtension
        }
    }

    initMetaMask(){
        if (window.ethereum && window.ethereum.isMetaMask) {
            this._browserExtension = new MetaMask(window.ethereum)
            return this._browserExtension
        }
    }

    get browserExtension () { return this._browserExtension }

    get isBrowserExtensionInstalled () {
        return Boolean(this.browserExtension)
    }

    get isBrowserExtensionEnabled () {
        return this.isBrowserExtensionInstalled && this.browserExtension.isEnabled
    }

    async enableBrowserExtension () {
        const browserExtension = this.isBrowserExtensionInstalled && await this.browserExtension.enable()
        if (browserExtension) {
            this._client = new RpcClient({browserExtension})
        }
        return browserExtension.chainId
    }

    get network () {
        return this.isBrowserExtensionInstalled && this.browserExtension.getNetwork()
    }

    currentAccount(){
        return this.isBrowserExtensionInstalled && this.browserExtension.currentAccount
    }

    async signMessage (message) {
        if (this.browserExtension.name === 'MetaMask') {
            return await this.browserExtension.signTypedData([{ type: 'string', name: 'Message', value: message }])
        } else {
            return this.isBrowserExtensionInstalled && await this.browserExtension.signMessage(message)
        }
    }

    async sendTransaction ({ from, to, value, ...others }) {
        return this.isBrowserExtensionInstalled && await this.browserExtension.sendTransaction({
            from,
            to,
            value: value.toHexString(),
            ...others,
        })
    }

    async switchChain(chainId) {
        const network = networks.find(n => n.chainId === chainId)
        return this.isBrowserExtensionInstalled
            && network
            && await this.browserExtension.switchChain(network);
    }

    async executeContract ({ address, abi }, method, parameters = [], overrides = {}) {
        return this._client.executeContract({ address, abi }, method, parameters, overrides)
    }

    async getContract({ address, abi }) {
        return await this._client.getContract({ address, abi })
    }

    parseEther (ether) {
        return this._client.parseEther(ether)
    }

    onNetworkChanged (callback) {
        return this.isBrowserExtensionInstalled && this.browserExtension.onNetworkChanged(callback)
    }

    onAccountChanged (callback) {
        return this.isBrowserExtensionInstalled && this.browserExtension.onAccountChanged(callback)
    }
}
