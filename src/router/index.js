import Wallet from '../pages/testwalletapi/wallet'
import WhiteList from '../pages/whiteList/whiteList'
import Share from '../pages/share/share'
import Introduce from '../pages/introduce/introduce'
import NativeSpace from '../pages/nativeSpace/nativeSpace'
import ExpansionSpace from '../pages/expansionSpace/expansionSpace'
import LiquidityMining from '../pages/liquidityMining/liquidityMining'
import MagicBox from '../pages/magicBox/magicBox'
import SpacePage from '../components/spacePage/spacePage'


export default [
    // {path:'/',name:'Home',component:Home},
    {path:'/',name:'Introduce',component:Introduce},
    {path:'/whiteList',name:'WhiteList',component:WhiteList},
    {path:'/share',name:'Share',component:Share},
    {path:'/nativeSpace',name:'NativeSpace',component:NativeSpace},
    {path:'/expansionSpace',name:'ExpansionSpace',component:ExpansionSpace},
    {path:'/liquidityMining',name:'LiquidityMining',component:LiquidityMining},
    {path:'/magicBox',name:'MagicBox',component:MagicBox},
    {path:'/spacePage',name:'SpacePage',component:SpacePage},
    {path:'/wallet',name:'Wallet',component:Wallet},
]
