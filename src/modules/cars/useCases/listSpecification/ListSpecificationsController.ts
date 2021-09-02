import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  constructor(private listSpecificationUseCase: ListSpecificationsUseCase) {}
  handle(req: Request, res: Response): Response {
    const all = this.listSpecificationUseCase.execute();

    return res.json(all);
  }
}

export { ListSpecificationsController };
