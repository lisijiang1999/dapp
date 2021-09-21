import BscWallet from "./wallet/BscWallet";
import ABI_IERC20 from "./wallet/abi/IERC20.json"
import ABI_Relation from "./wallet/abi/Relation.json"
import ABI_Whitelist from "./wallet/abi/Whitelist.json"
import Web3 from "web3";

/*
0x1	1	Ethereum Main Network (Mainnet)
0x3	3	Ropsten Test Network
0x4	4	Rinkeby Test Network
0x5	5	Goerli Test Network
0x2a	42	Kovan Test Network
 */

const bscWallet = new BscWallet();

const whitelistContractAddress = process.env.NODE_ENV == "development"?'0x1fcAA147c177d939B764E2e9F93f9080954c1a68':'';
const relationContractAddress = process.env.NODE_ENV == "development"?'0x6263fA4585Db4fC8e3BB10d591D89936af274447':'';

const response = (err, res) => {
    if (err) {console.log(err);}
    return res;
}

/*
当前账户
参数 : 无
成功 ：当前账户地址
失败 ：false || null
 */
export const currentAccount = () => {
    return bscWallet.currentAccount()
}

// 登录接口
export const login = async (supputChainId) => {
    const isInstall = bscWallet.isBrowserExtensionInstalled
    if (!isInstall) { // 有没有安装钱包
        return {
            code: 500,
            msg: "未找到提供商"
        }
    }

    const chainId = await bscWallet.enableBrowserExtension();
    if (!chainId) { // 没有连接钱包
        return {
            code: 500,
            msg: "连接钱包失败"
        }
    }

    // 获取当前换支持的chainId
    if (chainId !== supputChainId) {
        await bscWallet.switchChain(supputChainId);
        const switchChainId = bscWallet.browserExtension.chainId;
        if(switchChainId !== supputChainId){
            console.log("登录失败 环境不匹配")
            return {
                code: 500,
                msg: "链ID环境不匹配"
            }
        }
    }

    const userAddress = await currentAccount().address;
    if (!userAddress) { // 没有地址 异常情况
        return {
            code: 500,
            msg: "获取地址异常"
        }
    }

    return {code: 200, msg: userAddress}
}

// 是否注册
export const isRegister = async (currentAddress) => {
    const walletEnabled = bscWallet.isBrowserExtensionEnabled;
    if (!walletEnabled) {
        return null
    }

    if (currentAddress) {
        const relationContract = await bscWallet.getContract({ address: relationContractAddress, abi: ABI_Relation})
        return await relationContract.methods.isRegister().call({from: currentAddress}, response)
    }
}

// 注册
export const register = async (userAddress, shareAddress) => {
    const walletEnabled = bscWallet.isBrowserExtensionEnabled;
    if (!walletEnabled) {
        console.warn("请连接钱包")
        return null
    }

    if (!Web3.utils.isAddress(shareAddress)) {
        shareAddress = '0xdEA507900B7864b98Eb0D25aAA7A53445dc61BAb'
    }

    if (Web3.utils.isAddress(userAddress)) {
        const relationContract = await bscWallet.getContract({ address: relationContractAddress, abi: ABI_Relation})
        return await relationContract.methods.register(shareAddress).send({from: userAddress }, response);
    }
}

// 兑换币种列表
export const selectExTokenList = async () => {
    const walletEnabled = bscWallet.isBrowserExtensionEnabled;
    if (!walletEnabled) {
        console.warn("请连接钱包")
        return null
    }
    const contract = await bscWallet.getContract({ address: whitelistContractAddress, abi: ABI_Whitelist})
    return await contract.methods.getExTokenList().call({ }, response);
}

// 兑换币种列表
export const addExTokenList = async () => {
    const walletEnabled = bscWallet.isBrowserExtensionEnabled;
    if (!walletEnabled) {
        console.warn("请连接钱包")
        return null
    }
    const userAddress = await currentAccount().address;

    const MFTContractAddress = "0x739F229F8AAD3edC4368cAb550DD1E717436f898";

    const contract = await bscWallet.getContract({ address: whitelistContractAddress, abi: ABI_Whitelist})
    return await contract.methods.addExToken(MFTContractAddress, 5).send({ from: userAddress}, response);
}

// 查询原生算力
export const selectNativePower = async ({userAddress}) => {
    const walletEnabled = bscWallet.isBrowserExtensionEnabled;
    if (!walletEnabled) {
        console.warn("请连接钱包")
        return null
    }
    if (!Web3.utils.isAddress(userAddress)) {
        return 0;
    }

    const contract = await bscWallet.getContract({ address: whitelistContractAddress, abi: ABI_Whitelist})
    return await contract.methods.getUserIntegral().call({ from: userAddress }, response);
}

// 授权
export const approveToken = async ({tokenContractAddress , userAddress, spender, amount}) => {
    const walletEnabled = bscWallet.isBrowserExtensionEnabled;
    if (!walletEnabled) {
        console.warn("请连接钱包")
        return null
    }
    if (!Web3.utils.isAddress(tokenContractAddress)) {
        return null
    }
    if (!Web3.utils.isAddress(spender)) {
        return null
    }
    const contract = await bscWallet.getContract({ address: tokenContractAddress, abi: ABI_IERC20})
    return await contract.methods.approve(spender, amount).call({ from: userAddress }, response);
}

// 购买
export const subscribe = async ({userAddress, tokenName , amount}) => {
    const walletEnabled = bscWallet.isBrowserExtensionEnabled;
    if (!walletEnabled) {
        console.warn("请连接钱包")
        return null
    }
    if (!tokenName) {
        return null;
    }
    if (!amount) {
        return null;
    }
    const contract = await bscWallet.getContract({ address: whitelistContractAddress, abi: ABI_Whitelist})
    return await contract.methods.subscribe(tokenName, amount).call({ from: userAddress }, response);
}




