import { Request, Response } from "express";
import { RouteMessages } from "../../../../utils/RouteMessages";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    try {
      createSpecificationUseCase.execute({ name, description });
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
