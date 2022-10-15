import CryptoJs from "crypto-js"

const MD5 = (str: string) => {
    return CryptoJs.MD5(str).toString()
}

export default MD5
