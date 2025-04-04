import { ApplicationError } from "../../Error-Handling/application-error.js";
import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signup(req, res,next) {
    const { name, email, password, type } = req.body;
    // 1. Creating the hash password .
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel(name, email, hashPassword, type);
    try {
      const user = await this.userRepository.signUp(newUser);
      res.status(201).send({ status: "success", user: user });
    } catch (err) {
      next(err);
      // throw new ApplicationError("Something Went wrong !!", 500);
    }
  }
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        res
          .status(400)
          .send({ status: "failed", msg: "Incorrect Credentials" });
      } else {
        // 2. compare password with hash password.
        const result = bcrypt.compare(password, user.password);
        if (result) {
          // 3. create a jwt token
          const token = jwt.sign(
            { UserId: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "2h",
            }
          );
          // 4. send token
          return res.status(200).send(token);
        } else {
          return res
            .status(400)
            .send({ status: "failed", msg: "Incorrect Credentials" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async resetPassword(req,res){
    try{
      const {newPassword} = req.body;
      const userId = req.userId;
      const hashPassword = await bcrypt.hash(newPassword,12);
      await this.userRepository.resetPass(userId,hashPassword);
      res.status(200).send("password is reset");
    }catch(err){
      console.log(err);
    }
  }
}
