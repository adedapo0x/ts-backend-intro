import logger from "pino"
import dayjs from "dayjs"
import { pid } from "process"

const log = logger({
    base: {
        pid: false
    },
    timestamp: () => `,"time": ${dayjs().format()}`
})