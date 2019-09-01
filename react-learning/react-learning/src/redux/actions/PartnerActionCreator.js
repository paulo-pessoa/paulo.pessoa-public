import * as types from "./actionTypes";

export function createPartner(obj) {
    return {
        type: types.PARTNER_CREATE_PARTNER,
        partner: obj };
}

export function updatePartner(obj) {
    return {
        type: types.PARTNER_UPDATE_PARTNER,
        partner: obj };
}

export function deletePartner(obj) {
    return {
        type: types.PARTNER_DELETE_PARTNER,
        partner: obj };
}