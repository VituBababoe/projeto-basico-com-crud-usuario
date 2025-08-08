import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import Prato from '../../models/prato-model';

class ListarPratosController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const pratoId = httpRequest.params.id;
      const pratos = pratoId
        ? await Prato.findAll({ where: { id: pratoId } })
        : await Prato.findAll();

      if (pratos.length === 0) {
        return {
          statusCode: 404,
          body: { error: 'Nenhum prato encontrado' },
        };
      }

      return {
        statusCode: 200,
        body: pratos,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}
export default ListarPratosController;