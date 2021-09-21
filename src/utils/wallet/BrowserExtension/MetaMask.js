export default class MetaMask {
  constructor (winWallet) {
    this.name = 'MetaMask'
    this._accounts = []
    this._enabled = false
    if (winWallet && winWallet.isMetaMask) {
      this.winWallet = winWallet
      this._chainId = undefined
      this._onEnabled = undefined
      this._currentAccount = undefined
    }
  }

  get isEnabled () { return this._enabled }

  async enable () {
    const accounts = await this.winWallet.request({ method: 'eth_requestAccounts' })
    this._currentAccount = { address: accounts[0] }
    this._chainId = await this.winWallet.request({ method: 'eth_chainId' })

    this.winWallet.on('chainChanged', chainId => {
      this._chainId = chainId
      this._onNetworkChanged && this._onNetworkChanged(this.getNetwork())
      console.log("chainChanged -> " + chainId)
    })
    this.winWallet.on('accountsChanged', accounts => {
      this._currentAccount = { address: accounts[0] }
      this._onAccountChanged && this._onAccountChanged({ address: accounts[0] })
      console.log("accountsChanged -> " + accounts)
    })

    this._enabled = true
    this._onEnabled && this._onEnabled({ address: accounts[0] })
    return this
  }

  dispose () {
    this.winWallet.removeAllListeners('chainChanged')
    this.winWallet.removeAllListeners('accountsChanged')
  }

  onEnabled (callback) {
    this._onEnabled = callback
    return () => this._onEnabled = undefined
  }

  get chainId () { return this._chainId }

  getNetwork (chainId = this.chainId) {
    return {
      chainId,
      isRopsten: chainId === '0x3',
      isBscMainnet: chainId === '0x38',
      isBscTestnet: chainId === '0x61',
    }
  }

  get currentAccount () { return this._currentAccount }

  async getAllAccounts () {
    const result = await this.winWallet.request({ method: 'wallet_getPermissions' })
    const found = result[0].caveats.find(c => c.type === 'filterResponse')
    this._accounts = (found ? found.value : []).map(address => ({ address }))
    return this._accounts
  }

  async signMessage (message) {
    return await this.winWallet.request({ method: 'eth_sign', params: [this.currentAccount.address, message] })
  }

  async signTypedData (typedData) {
    return await this.winWallet.request({
      method: 'eth_signTypedData',
      params: [typedData, this.currentAccount.address],
      from: this.currentAccount.address,
    })
  }

  async sendTransaction (tx) {
    return await this.winWallet.request({
      method: 'eth_sendTransaction',
      params: [tx],
    })
  }

  async switchChain(network) {
    return await this.winWallet.request({
      method: 'wallet_switchEthereumChain',
      params: [ {"chainId": network.chainId} ],
    });
  }

  onNetworkChanged (callback) {
    this._onNetworkChanged = callback
    return () => this._onNetworkChanged = undefined
  }

  onAccountChanged (callback) {
    this._onAccountChanged = callback
    return () => this._onAccountChanged = undefined
  }
}
