import { Request, Response } from "express";
import { ViaCepClient } from "../client/viaCepClient";

export class CepService {
    async getByCep(req: any){
        const {cep} = req.params;
        const teste = new ViaCepClient()
        return await teste.getByCep(cep)
    }
}