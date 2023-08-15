const conta = {
    email: 'kaiki@diobank.com',
    password: '123456',
    name: 'Kaiki Wilson',
    balance: 52500.00,
    id: '1'
}

export const api = new Promise((resolve) => {
    setTimeout(() => {
        resolve(conta)
    }, 3000)
})
