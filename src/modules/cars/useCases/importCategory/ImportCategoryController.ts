import { Request, Response } from "express";
import { RouteMessages } from "../../../../utils/RouteMessages";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    try {
      await importCategoryUseCase.execute(file);
    } catch (err) {
      return res.status(400).json({
        message: RouteMessages(
          `Já existem categorias com os dados que você está tentando importar 😞`
        ),
      });
    }

    return res.status(201).json({
      message: RouteMessages(`A importação dos afiliados foi um sucesso 😃`),
    });
  }
}

export { ImportCategoryController };
