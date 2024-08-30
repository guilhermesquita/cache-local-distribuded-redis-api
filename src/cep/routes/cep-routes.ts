import { Router } from "express";
import { CepController } from "../../controller/cepController";

export const router = Router();
const cepController = new CepController();
router.get('/api/cep/:cep', cepController.getByCep)