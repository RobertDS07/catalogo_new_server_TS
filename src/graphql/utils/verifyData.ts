const verifyData = <T>(data: T) => {
    for (const x in data) {
        if (data[x] === null || data[x] === undefined || String(data[x]).trim() === '') {
            throw new Error(`Não é possível enviar o campo ${x} vazio.`)
        }
    }
}

export default verifyData