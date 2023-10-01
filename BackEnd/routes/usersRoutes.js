// A template of a route
import express from "express";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  logIn,
  regUser,
  updateUser,
  AddModule,
  getMe,
  myModules,
  uploadPOP,
  myModule,
   apply,
    getStudents,
    uploadDoc, 
    paidModules, 
    unpaidModules,
     studentGetPOP,
     getTutorByIdCode,
     getTasks,
      postSubmission,
      getMySubmission,
      getLink
  
} from "../controllers/userController.js";
import multer from "multer";


router.route("/login").post(logIn);
router.route("/register").post(regUser);
router.route("/apply").post(apply);
router.route("/update").put(updateUser);
router.route("/myprofile").post(getMe);
router.route("/myModules").post( myModules);
router.route("/myModule").post( myModule);
router.route("/addModule").post( AddModule);
router.route("/getStudents").get(getStudents);
router.route("/getStudent").post(getMe);
router.route("/paidModules").post(paidModules);
router.route("/unpaidModules").post(unpaidModules);
router.route("/getLink").post(getLink);


// by Student id + module Code
router.route("/getTutorByIdCode").post(getTutorByIdCode);
router.route("/getTasks").post(getTasks);

const upload = multer({storage:multer.memoryStorage()})

router.route("/").post(upload.single('file'),uploadPOP);
router.route("/getPop").post(studentGetPOP);
router.route("/submitTask").post(upload.single('document'),postSubmission);

router.route("/getMySubmission").post(getMySubmission);

router.route("/upload").post( uploadDoc);
export default router;
