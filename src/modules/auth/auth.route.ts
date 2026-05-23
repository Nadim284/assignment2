import { Router } from "express";
import { AuthController } from "./auth.controller";


const AuthRoute = Router();

AuthRoute.post("/signup", AuthController.createUser);



AuthRoute.post("/login", AuthController.loginUser);

export default AuthRoute;