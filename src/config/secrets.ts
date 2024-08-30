const env = process.env

export const VIA_CEP_URI = (cep: number) => {
    return `https://viacep.com.br/ws/${cep}/json`
}