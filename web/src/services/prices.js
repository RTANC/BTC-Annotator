import { api } from './api'

export function getPrices(startDate, endDate, dur) {
    return api.get(`/prices?startDate=${startDate}&endDate=${endDate}&dur=${dur}`)
}