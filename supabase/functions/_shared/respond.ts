const opts = {
    'Content-Type': 'application/json'
}

export function respond (data: any, status: number) {
    return new Response(JSON.stringify(data), { ...opts, status })
}