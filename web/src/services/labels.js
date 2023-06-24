import { api } from './api'

export function label (id, labels, dur) {
    return api.patch(`/labels/${id}?dur=${dur}`, labels)
}