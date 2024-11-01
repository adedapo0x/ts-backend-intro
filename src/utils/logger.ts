import pino from "pino"

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:standard',
            // colorize: true
        }
    },
    base: {
        pid: false
    },
    timestamp: pino.stdTimeFunctions.isoTime
})

export default log