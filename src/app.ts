import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/global-error-handler";
import noRoutesFound from "./app/middlewares/no-routes-found-handler";
import router from "./app/routes";

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Library Management System Server..",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(noRoutesFound);

export default app;
