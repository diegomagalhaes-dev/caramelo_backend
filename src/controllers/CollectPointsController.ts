import { request, Request, Response } from "express";
import { getRepository } from "typeorm";
import CollectPoint from "../models/CollectPoint";
import collectpoint_view from "../views/collectpoint_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const comedourosRepository = getRepository(CollectPoint);

    const comedouros = await comedourosRepository.find({
      relations: ["image"],
    });

    return response.json(collectpoint_view.renderMany(comedouros));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const comedourosRepository = getRepository(CollectPoint);

    const comedouro = await comedourosRepository.findOneOrFail(id, {
      relations: ["image"],
    });

    return response.json(collectpoint_view.render(comedouro));
  },
  async create(request: Request, response: Response) {
    const { latitude, longitude } = request.body;

    const comedourosRepository = getRepository(CollectPoint);

    const requestImage = request.file;

    const image = {
      path: requestImage?.filename,
    };

    const data = {
      latitude,
      longitude,
      image,
    };

    const schema = Yup.object().shape({
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      image: Yup.object().shape({
        path: Yup.string().required(),
      }),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const comedouro = comedourosRepository.create(data);

    await comedourosRepository.save(comedouro);
    return response.status(201).json(comedouro);
  },
};
