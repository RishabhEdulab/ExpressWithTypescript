import express, { Router, Response, Request, NextFunction } from "express";
import {
  postRequestbodyType,
  postResponseBodyType,
} from "../types/RegisterationType";
import employeeModel from "../model/employeeModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "./config.env" });
const router: Router = express.Router();
const jwtKey = "shshshshsh";
router.use(cors());
const verifyToken = (req: Request, resp: Response, next: NextFunction) => {

  var AuthToken = req.headers["authorization"];
  console.log("tokrjgutu",req.headers.authorization);
  if (!AuthToken) {
    return resp
      .status(401)
      .send({ status: "failed", message: "token is null" });
  }
  const token = AuthToken.split(" ")[1];
  console.log("tokentoken",token);
  
  
  jwt.verify(token, jwtKey, (err, valid) => {
    
    if (err) {
      console.log("error",token);
      return resp
        .status(401)
        .send({ status: "failed", message: "Please Provide a valid token" });
    }
    console.log("call next");
    next();
  });
};
router.post("/Register", async (req: Request, res: Response) => {
  try {
    const requestBody = req.body as postRequestbodyType;
    const response: postResponseBodyType = {
      message: "Successfully created",
    };
    const {
      name,
      email,
      password,
      age,
      date,
      fileUpload,
      selectProgramming,
      gender,
      languageCheckbox,
    } = requestBody;

    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !date ||
      !fileUpload ||
      !selectProgramming ||
      !gender ||
      !languageCheckbox
    ) {
      res.send({ status: "failed", message: "something went wrong" });
    } else {
      const userExists = await employeeModel.exists({
        email: email,
        // password: password,
      });
      console.log("userExists", userExists);

      if (userExists) {
        res.send({
          httpstatus: 200,
          status: "failed",
          message: "User Already Exists",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const docEmployee = new employeeModel({
          name: name,
          email: email,
          password: hashPassword,
          age: age,
          date: date,
          fileUpload: fileUpload,
          selectProgramming: selectProgramming,
          gender: gender,
          languageCheckbox: languageCheckbox,
        });
        await docEmployee.save();
        res.send(response);
      }
    }
  } catch (error) {
    res.json(error);
  }
});
router.post("/Login", async (req: Request, res: Response) => {
  try {
    const response: postResponseBodyType = {
      message: "invalid Login",
    };
    const { email, password } = req.body;

    if (!email || !password) {
      res.send({ status: "failed", message: "something went wrong" });
    } else {
      const userExists = await employeeModel.findOne({
        email: email,
        // password: password,
      });
      console.log("userExists", userExists);

      if (userExists) {
        const bcryotCom = await bcrypt.compare(
          password,
          userExists.password ?? ""
        );
        if (!bcryotCom) {
          return res.send({
            httpstatus: 400,
            status: "fail",
            message: "Invalid Login",
          });
        }

        jwt.sign({ userExists }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            return res.send({
              status: "failed",
              message: "Something went wrong Please try again after Sometime",
            });
          }
          res.send({
            httpstatus: 200,
            status: "success",
            message: "Login Successful",
            auth: token,
          });
        });
        console.log("bcryotCom", bcryotCom);
      } else {
        res.send(response);
      }
    }
  } catch (error) {
    res.json(error);
  }
});
router.get("/product", verifyToken, (req, res) => {
  try {
    const product = [
      {
        name:"rishabh",
        age:20,
        email:"rishabh150@gmail.com",
        date:new Date(),
        active:true,
        product:"phone"

      },
      {
        name:"mahesh",
        age:21,
        email:"mahesh150@gmail.com",
        date:new Date(),
        active:true,
        product:"latop"

      },
      {
        name:"vikash",
        age:21,
        email:"vikash150@gmail.com",
        date:new Date(),
        active:true,
        product:"boat earphone"

      },
      {
        name:"manish",
        age:22,
        email:"manish150@gmail.com",
        date:new Date(),
        active:true,
        product:"tv"

      },
      {
        name:"john",
        age:230,
        email:"john@gmail.com",
        date:new Date(),
        active:true,
        product:"activa"

      },
      {
        name:"shani",
        age:20,
        email:"shani150@gmail.com",
        date:new Date(),
        active:true,
        product:"plane"

      },
      {
        name:"dinesh",
        age:30,
        email:"dinesh150@gmail.com",
        date:new Date(),
        active:true,
        product:"car"

      },
    ];

    res.status(202).json(product);
  } catch (error) {
    res.send(error);
  }
});
export default router;
