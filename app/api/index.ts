import {BASE_URL} from 'app/util/constants'
import axios from "axios"

export const httpClient = axios.create({baseURL: BASE_URL, })

