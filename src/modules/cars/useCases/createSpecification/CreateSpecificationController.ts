import { Request, Response } from "express";
import { RouteMessages } from "../../../../utils/RouteMessages";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    try {
      await createSpecificationUseCase.execute({ name, description });
    } catch (err) {
      return res.status(400).json({
        message: RouteMessages(`A especificação ${name} já existe 😞`),
      });
    }

    return res.status(201).json({
      message: RouteMessages(
        `A especificação ${name} foi criada com sucesso 🥺`
      ),
    });
  }
}

export { CreateSpecificationController };
