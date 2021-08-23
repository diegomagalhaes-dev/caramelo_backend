import { Request, Response } from "express";
import { getRepository } from "typeorm";
import CollectPoint from "../models/CollectPoint";
import collectpoint_view from "../views/collectpoint_view";

export default {
  async index(request: Request, response: Response) {
    const comedourosRepository = getRepository(CollectPoint);
    const comedouros = await comedourosRepository.find({
      relations: ["image"],
      where: { validate: null },
    });

    return response.json(collectpoint_view.renderMany(comedouros));
  },

  async validateFeeder(request: Request, response: Response) {
    const { id } = request.body;

    const comedourosRepository = getRepository(CollectPoint);

    try {
      const comedouro = await comedourosRepository.findOne({
        where: { id },
      });

      if (!comedouro) {
        throw new Error("Feeder is not found");
      }
      if (comedouro) {
        comedouro.validate = true;

        await comedourosRepository.save(comedouro);
        return response.json(collectpoint_view.render(comedouro));
      }
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },

  async deleteFeeder(request: Request, response: Response) {
    const { id } = request.body;

    const comedourosRepository = getRepository(CollectPoint);

    const comedouro = await comedourosRepository.findOneOrFail({
      where: { id },
    });

    await comedourosRepository.delete(comedouro);

    return response.json({ ok: true });
  },
};
