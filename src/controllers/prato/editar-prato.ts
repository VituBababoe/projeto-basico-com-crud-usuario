import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import Prato from '../../models/prato-model'

class EditarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { nome, cozinha, descricao_resumida, descricao_detalhada, valor } = httpRequest.body;
        try {
            const pratoId = httpRequest.params.id;
            const pratos = pratoId
                ? await Prato.findAll({ where: { id: pratoId } })
                : await Prato.findAll();

            const prato = await Prato.findByPk(pratoId);

            if (!prato) {
                return {
                    statusCode: 404,
                    body: { error: 'Prato não encontrado' },
                }
            }
            await prato.update({
                nome,
                cozinha,
                descricao_resumida,
                descricao_detalhada,
                valor,
            });
            return {
                statusCode: 200,
                body: prato,
            }
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message },
            };
        }
    }
}

export default EditarPratoController;