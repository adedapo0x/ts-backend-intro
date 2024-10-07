import pino from "pino"

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:standard'
        }
    },
    base: {
        pid: false
    },
    timestamp: pino.stdTimeFunctions.isoTime
})

export default log