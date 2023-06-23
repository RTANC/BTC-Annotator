import { api } from './api'

export function label (id, labels) {
    return api.patch(`/labels/${id}`, labels)
}