import request from "./request";

export function makeTransaction(data: { payer: string, amount: string | number }) {
    return request({
        url: "api/makeTransaction",
        method: 'POST',
        data
    })
}

