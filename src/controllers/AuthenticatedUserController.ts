import { Request, Response, NextFunction } from "express";

import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import Admin from "../models/Admin";

export default {
  async execute(request: Request, response: Response) {
    const { email, password } = request.body;

    const adminRepository = getRepository(Admin);

    try {
      const admin = await adminRepository.findOne({
        where: { email },
      });

      if (!admin) {
        throw new Error("Email or password is incorrect!");
      }

      const passwordMatched = await compare(password, admin.password);
      if (!passwordMatched) {
        throw new Error("Email or password is incorrect!");
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: admin.id.toString(),
        expiresIn,
      });

      const user = { ...admin, password: undefined, token };
      return response.json({ user });
    } catch (err) {
      return response.json({ error: err.message });
    }
  },
};
