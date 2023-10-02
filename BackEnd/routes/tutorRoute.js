// A template of a route
import express from "express";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();
import { BeATutor, getTaskSubmissions, getTaskSubmission,myStudents, shareLink,myModules, addMarks } from "../controllers/tutorController.js";
import { TutAddModule } from "../controllers/ModuleController.js";
import { getTutor,unAllocatedModules,allocatedModules ,modulesToTutor} from "../controllers/tutorController.js";
import { addAnouncement, getAnnouncements } from "../controllers/tutorController2.js";
import { TutAddTask, getTasks ,getTask,getTaskById,TutEditTask} from '../controllers/taskController.js'
import multer from "multer";

const upload = multer({storage:multer.memoryStorage()})

router.route("/beATutor").post(upload.single("academicRecord"),BeATutor);
router.route("/addModule").post(TutAddModule);
router.route("/modulesToTutor").post(modulesToTutor);
router.route("/getTutor").post(getTutor);
router.route("/shareLink").post(shareLink);
router.route("/myModules").post( myModules);

router.route("/myStudents").post(myStudents);

router.route('/getTasks').post(getTasks)
router.route('/getTask').post(getTask)
router.route('/getTaskById').post(getTaskById)
router.route("/getTaskSubmissions").post(getTaskSubmissions);
router.route("/getTaskSubmission").post(getTaskSubmission);

router.route('/addTask').post(upload.single('taskDocument'),TutAddTask)
router.route('/addmarks').post(addMarks);
router.route('/editTask').post(upload.single('taskDocument'),TutEditTask)
router.route('/addAnnouncement').post(addAnouncement);
router.route('/getAnnouncements').post(getAnnouncements);
router.route("/allocatedModules").post(allocatedModules);
router.route("/unallocatedModules").post(unAllocatedModules);

export default router;