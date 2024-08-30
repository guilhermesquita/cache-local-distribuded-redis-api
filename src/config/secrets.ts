const env = process.env

export const VIA_CEP_URI = (cep: number) => {
    return `https://viacep.com.br/ws/${cep}/json`
}

export const TTL = 60;
export const CACHE_SCHEDULER = "0 * * * * *";
export const REDIS_HOST = env.REDIS_HOST ? env.REDIS_HOST : false