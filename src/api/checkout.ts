import request from "./request";

export function makeTransaction(data: { account: string }) {
    return request({
        url: "api/makeTransaction",
        method: 'POST',
        data
    })
}

