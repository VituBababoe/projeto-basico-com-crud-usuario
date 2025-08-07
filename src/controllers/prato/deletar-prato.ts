import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import Prato from '../../models/prato-model'

class DeletarPratoController implements Controller {
    async handle(httpRequest:HttpRequest ): Promise<HttpResponse> {
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
            await prato.destroy();
            return {
                statusCode: 204,
                body: {},  
            }
        } catch (error: any) {
            return {
            statusCode: 500,
            body: {error: error.message},
            };
        }
    }   
}

export default DeletarPratoController;
