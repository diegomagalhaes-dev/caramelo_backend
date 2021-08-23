import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import Admin from "../models/Admin";

export default {
  async createUser(request: Request, response: Response) {
    const { email, password, name } = request.body;
    const adminRepository = getRepository(Admin);

    try {
      const checkAdminExists = await adminRepository.findOne({
        where: { email },
      });

      if (checkAdminExists) {
        throw new Error("Email address already used.");
      }

      const hashedPassword = await hash(password, 8);

      const admin = adminRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await adminRepository.save(admin);
      const user = { ...admin, password: undefined };
      console.log("ddss");
      return response.json(user);
    } catch (err) {
      return response.json({ "Error": err.message });
    }
  },
};
