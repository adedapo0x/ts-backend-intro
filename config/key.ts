import fs from "fs"
import path from "path"
import logger from "../src/utils/logger"

interface KeySignature {
    privateKey: string
    publicKey: string
}

const loadKeys = (): KeySignature => {
        try{
            const privateKey = fs.readFileSync(path.join(__dirname, "..", "keys", "rsa.key"), 'utf8')
            const publicKey = fs.readFileSync(path.join(__dirname, "..", "keys", "rsa.key.pub"), 'utf8')
            return {privateKey, publicKey}
        } catch (e) {
            logger.error("Failed to load RSA keys: ", e)
            process.exit(1)
        }
}

export default loadKeys()