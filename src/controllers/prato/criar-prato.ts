import { Controller, HttpRequest, HttpResponse } from "../../interfaces";
import Prato from '../../models/prato-model'
export class CriarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { nome, cozinha, descricao_resumida, descricao_detalhada, imagem, valor } = httpRequest.body;


        if (!nome || !cozinha || !descricao_resumida || !descricao_detalhada || !valor) {
            return {
                statusCode: 400,
                body: { error: "Todos os campos são obrigatórios" },
            };
        }
        if (nome && nome.length < 3) {
            return {
                statusCode: 400,
                body: { error: "O nome deve ter pelo menos 3 caracteres" },
            }
        }
        if (cozinha && cozinha.length < 3) {
            return {
                statusCode: 400,
                body: { error: "A cozinha deve ter pelo menos 3 caracteres" },
            }
        }
        if (descricao_resumida && descricao_resumida.length < 10) {
            return {
                statusCode: 400,
                body: { error: "A descrição resumida deve ter pelo menos 10 caracteres" },
            }
        }
        if (descricao_detalhada && descricao_detalhada.length < 20) {
            return {
                statusCode: 400,
                body: { error: "A descrição detalhada deve ter pelo menos 20 caracteres" },
            }
        }
        if (valor && typeof valor !== "number") {
            return {
                statusCode: 400,
                body: { error: "O valor deve ser um número" },
            };
        }
        try {
            const prato = await Prato.create({
              nome,
              cozinha,
              descricao_resumida,
              descricao_detalhada,
              imagem,
              valor,
            });
          
            return {
              statusCode: 201,
              body: prato,
            };
          } catch (error: any) {
            return {
              statusCode: 500,
              body: { error: error.message || "Erro interno do servidor" },
            };
          }
          
        }
    }
export default CriarPratoController;