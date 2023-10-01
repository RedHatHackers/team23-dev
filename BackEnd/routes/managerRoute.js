// A template of a route
import express from "express";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

import { getTutor } from "../controllers/tutorController.js";
import {
  AcceptTutor,
  RejectTutor,
  GetApplications,
  allocateTutorToModule,
  allocateTutorToStudent,
  confirmPayment,
  getProof,
  getstudentCount,getModuleCount,getTutorCount, getModuleTutorCount
} from "../controllers/managerController.js";

import {
  ManAddModule,
  UpdateModule,
  DeleteModule,
  getTutModule,
} from "../controllers/ModuleController.js";

import { getTutors } from "../controllers/tutorController.js";

router.route("/acceptTutor").post(AcceptTutor);
router.route("/rejectTutor").post(RejectTutor);
router.route("/getapplications").get(GetApplications);
router.route("/addmodule").post(ManAddModule);
router.route("/updateModule").post(UpdateModule);
router.route("/DeleteModule").delete(DeleteModule);
router.route("/getTutors").get(getTutors);
router.route("/tutorModules").post(getTutModule);
router.route("/allocateTutorToModule").post(allocateTutorToModule);
router.route("/allocateTutorToStudent").post(allocateTutorToStudent);
router.route("/getTutor").post(getTutor);

router.route("/confirmPayment").post(confirmPayment);
router.route("/getProof").get(getProof);
router.route("/getStudentCount").get(getstudentCount)
router.route("/getTutorCount").get(getTutorCount)
router.route("/getModuleCount").get(getModuleCount)
router.route("/getModuleTutorCount").get(getModuleTutorCount)
export default router;
