import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware";
import DeletarPratoController from "../../controllers/prato/deletar-prato";
import adaptRoute from "../../adapters/express-route-adapter";
export default (router: Router): void => {
  /**
   * @swagger
   * /api/pratos/{id}:
   *   delete:
   *     summary: Remove o prato por id
   *     tags: [Pratos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: O id do prato
   *     responses:
   *       200:
   *         description: O prato foi removido com sucesso
   *       404:
   *         description: O prato não foi encontrado
   *       500:
   *         description: Algum erro aconteceu
   */
  router.delete(
    "/pratos/:id",
    authMiddleware,
    adaptRoute(new DeletarPratoController())
  );
};
