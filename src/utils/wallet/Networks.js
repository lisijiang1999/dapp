const networks = [
    {
        chainId: '0x3',
        chainName: 'Ropsten 测试网络',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        blockExplorerUrls: ['https://ropsten.etherscan.io/api'],
    },
    {
        chainId: '0x61',
        chainName: 'BSC Testnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'bnb',
            decimals: 18,
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
        blockExplorerUrls: ['https://api-testnet.bscscan.com/api'],
    },
    {
        chainId: '0x38',
        chainName: 'BSC Mainnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'bnb',
            decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://api.bscscan.com/api'],
    },
]

export default networks
