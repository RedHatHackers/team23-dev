// A template of a route
import express from "express";
import {
  getModules,
  getModule,
  DeleteModule,
  getModuleById,
  getTutorsByCode,
  getStudentsByCode,
} from "../controllers/ModuleController.js";
import AsyncHandler from "express-async-handler";
const router = express.Router();

//    /api/module/
router.route("/").get(getModules);
router.route("/").post(getModule);

router.route("/getModuleById").post(
  AsyncHandler(async (req, res) => {
    console.log("//getModule " + { ...req.body });
    const { Id } = req.body;
    const [mod] = await getModuleById(Id);
    res.send(mod[0]);
  })
);
router.route("/DeleteModule").delete(DeleteModule);

router.route("/getTutorsByCode").post(getTutorsByCode);
router.route("/getStudentsByCode").post(getStudentsByCode);

export default router;
