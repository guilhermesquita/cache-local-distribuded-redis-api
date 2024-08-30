import { Request, Response } from "express";
import { CepService } from "../cep/service/CepService";

export class CepController {
    async getByCep(req: Request, res: Response){
        const teste = new CepService()
        const response = await teste.getByCep(req)
        return res.json(response)
    }
}