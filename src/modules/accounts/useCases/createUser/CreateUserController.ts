import { Request, Response } from "express";
import { container } from "tsyringe";
import { RouteMessages } from "../../../../utils/RouteMessages";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      });

      return res.status(201).json({
        message: RouteMessages(`O usuário ${name} foi cadastrado com sucesso`),
      });
    } catch {
      return res.status(400).json({
        message: RouteMessages(
          `Não é possível cadastrar este usuário pois este email já existe`
        ),
      });
    }
  }
}

export { CreateUserController };
