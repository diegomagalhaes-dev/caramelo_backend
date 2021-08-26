import { Request, Response } from "express";
import { getRepository } from "typeorm";
import CollectPoint from "../models/CollectPoint";
import collectpoint_view from "../views/collectpoint_view";

export default {
  async show(request: Request, response: Response) {
    const comedourosRepository = getRepository(CollectPoint);
    const comedouros = await comedourosRepository.find({
      relations: ["image"],
    });

    return response.json(collectpoint_view.renderMany(comedouros));
  },

  async showPending(request: Request, response: Response) {
    const comedourosRepository = getRepository(CollectPoint);
    const comedouros = await comedourosRepository.find({
      relations: ["image"],
      where: { validate: false },
    });

    return response.json(collectpoint_view.renderMany(comedouros));
  },
  async index(request: Request, response: Response) {
    const comedourosRepository = getRepository(CollectPoint);
    const comedouros = await comedourosRepository.find({
      relations: ["image"],
      where: { validate: null },
    });

    return response.json(collectpoint_view.renderMany(comedouros));
  },

  async validateFeeder(request: Request, response: Response) {
    const { id } = request.params;

    const comedourosRepository = getRepository(CollectPoint);

    try {
      const comedouro = await comedourosRepository.findOne({
        where: { id, validate: false },
      });

      if (!comedouro) {
        throw new Error("Feeder is not found");
      }

      comedouro.validate = true;

      await comedourosRepository.save(comedouro);
      return response.json(collectpoint_view.render(comedouro));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },

  async deleteFeeder(request: Request, response: Response) {
    const { id } = request.params;

    const comedourosRepository = getRepository(CollectPoint);

    try {
      const comedouro = await comedourosRepository.findOneOrFail({
        where: { id },
      });

      if (!comedouro) {
        throw new Error("Feeder is not found!");
      }
      await comedourosRepository.delete(comedouro);

      return response.json({ ok: true });
    } catch (err) {
      return response.json({ error: err.message });
    }
  },
};
