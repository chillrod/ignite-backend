import { Response, Request } from "express";
import { RouteMessages } from "../../../../utils/RouteMessages";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    try {
      await createCategoryUseCase.execute({ name, description });
    } catch (err) {
      return res.status(400).json({
        message: RouteMessages(`A categoria da marca ${name} já existe 😞`),
      });
    }

    return res.status(201).json({
      message: RouteMessages(`A categoria ${name} foi criada com sucesso 🥺`),
    });
  }
}

export { CreateCategoryController };
