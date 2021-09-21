export default class BinanceChain {
  constructor (winWallet) {
    this.name = 'Binance Chain Wallet'
    this._accounts = []
    this._enabled = false
    if (winWallet && winWallet.bnbSign) {
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
      console.log("chainChanged -> " + accounts)
    })

    this._enabled = true
    this._onEnabled && this._onEnabled({ address: accounts[0] })
    return this
  }

  dispose () {
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
    this._accounts = (await this.winWallet.requestAccounts()).map(account => {
      account.address = account.addresses.find(item => item.type === 'eth').address
      return account
    })
    return this._accounts
  }

  async signMessage (message) {
    return await this.winWallet.request({ method: 'eth_sign', params: [this.currentAccount.address, message] })
  }

  async signTypedData (typedData) {
    throw new Error('signTypedData is not supported for Binance Chain Wallet.')
  }

  async sendTransaction (tx) {
    return await this.winWallet.request({
      method: 'eth_sendTransaction',
      params: [tx],
    })
  }

  async switchChain(network) {
    return await this.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [ {"chainId": network.chainId} ],
    });
  }

  onAccountChanged (callback) {
    this._onAccountChanged = callback
    return () => this._onAccountChanged = undefined
  }
  onNetworkChanged (callback) {
    this._onNetworkChanged = callback
    return () => this._onNetworkChanged = undefined
  }

}
