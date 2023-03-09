import express, {Express} from "express"
import { userRouter } from "./router"
import cors from 'cors'

export const app: Express = express()
const port = process.env.PORT || 8080

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,

    SERVER_ERROR_500: 500
}

app.use(express.json())
app.use(cors())
app.use('/api', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})