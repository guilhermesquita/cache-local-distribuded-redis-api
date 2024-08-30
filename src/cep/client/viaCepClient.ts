import axios from "axios";
import { VIA_CEP_URI } from "../../config/secrets";
import { ICEP } from "./dtoCep/CepDTO";

export class ViaCepClient {
  public async getByCep(cep: number) {
    let response = {};
    console.info(`Buscando dados da API do ViaCEP para o cep ${cep}`);
    await axios
      .get(VIA_CEP_URI(cep))
      .then((res) => {
        let apiResponse = res.data as ICEP;
        response = {
          cep: apiResponse.cep,
          logradouro: apiResponse.logradouro,
          complemento: apiResponse.complemento,
          unidade: apiResponse.unidade,
          bairro: apiResponse.bairro,
          localidade: apiResponse.localidade,
          uf: apiResponse.uf,
        };
        console.log(JSON.stringify(apiResponse));
      })
      .catch((err) => {console.error('Erro ao chamar API')});
      return response
  }
}
