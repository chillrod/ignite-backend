import { Request, Response } from "express";
import { container } from "tsyringe";
import { RouteMessages } from "../../../../utils/RouteMessages";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const token = await authenticateUserUseCase.execute({
        password,
        email,
      });

      return res.status(200).json(token);
    } catch {
      return res.status(400).json({
        message: RouteMessages(`Não foi possível autenticar este usuário`),
      });
    }
  }
}

export { AuthenticateUserController };
