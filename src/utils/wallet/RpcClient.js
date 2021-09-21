import Web3 from 'web3'

export default class RpcClient {
    constructor ({ browserExtension }) {
        this.web3 = new Web3(browserExtension.winWallet)
    }

    async getContract({ address, abi }) {
        const contract = await new this.web3.eth.Contract(abi, address);
        return contract
    }

    /*async getTransactions (address, page, size) {
        const result = await this.explorer.getHistory(address, page, size)
        return {
            length: 0,
            list: result.result,
        }
    }*/
}


/*class Explorer {
    constructor (url) {
        this.url = url
    }

    async getHistory (address, page = 0, size = 10) {
        const query = {
            module: 'account',
            action: 'txlist',
            address,
            startblock: 0,
            endblock: 99999999,
            page: page + 1,
            offset: size,
            sort: 'desc'
        }

        const res = await fetch(`${this.url}?${qs.stringify(query)}`)
        const result = await res.json()
        return result
    }
}*/
