export const getQueryVariable = (address)=>{
        var address = address.split("?")[1].split("=")[1]
        return address
    }