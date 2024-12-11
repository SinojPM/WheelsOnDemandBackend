const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const vehicleController = require("../controllers/vehicleController")
const bookingsController = require("../controllers/bookingsController")
const passport = require('passport')
const recentViewController = require('../controllers/recentViewController')
const salesController = require("../controllers/salesController")


const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post("/login",userController.loginController)
router.post("/addVehicle",jwtMiddleware,multerMiddleware.single("image"),vehicleController.addVehicleController)
//get all vehicles
router.get("/admin/allvehicles",jwtMiddleware,vehicleController.getAllVehiclesOnGarageController)

router.get('/all-vehicles',jwtMiddleware,vehicleController.getAllVehiclesController)

router.get('/all-users-withsearch',jwtMiddleware,userController.getAllUsersControllerWithSearch)

router.get("/user/allvehicles",jwtMiddleware,vehicleController.getAllVehiclesForUserController)

router.get("/:vid/viewvehicle",jwtMiddleware,vehicleController.getVehicleInViewController)

router.post('/add-booking',jwtMiddleware,bookingsController.addToBookingsController)

router.get('/get-user-bookings',jwtMiddleware,bookingsController.getUserBookings)

router.get('/home-vehicles',vehicleController.getHomeVehiclesController)

router.get('/bookings-admin',jwtMiddleware,bookingsController.getBookingsOnAdminController)

router.get('/:uid/user-bookings-admin',jwtMiddleware,bookingsController.getUserBookingsOnAdmin)

router.get('/total-user',jwtMiddleware,userController.getUsersOnDashBoardController)

router.get('/bookings-dashboard',jwtMiddleware,bookingsController.getAllBookingsOnDashboardController)

router.get('/auth/google',passport.authenticate("google",{scope:["profile","email"]}))

router.get('/auth/google/callback',passport.authenticate("google",{
    successRedirect:"https://wheelsondemand.netlify.app/login",
    session:false,
    failureRedirect:"https://wheelsondemand.netlify.app/Register"
}))
router.post("/google/login",userController.googleSignInController)
router.post("/add/recentView",jwtMiddleware,recentViewController.addrecentViewController)

router.get("/get/recentviews",jwtMiddleware,recentViewController.getRecentViewController)

router.get("/:bid/get-booking/view",jwtMiddleware,bookingsController.getBookingsOnViewController)

router.post("/add/sales",jwtMiddleware,salesController.addToSalesController)

router.put("/:bid/update-booking",jwtMiddleware,bookingsController.updatePaymentStatusController)

router.put("/:bid/edit-status",jwtMiddleware,bookingsController.updateBookingStatusController)
router.put("/:bid/edit-status-completed",jwtMiddleware,bookingsController.updateBookingCompletedController)

router.delete("/:id/delete-vehicle",jwtMiddleware,vehicleController.deleteVehicleController)
 router.put("/:vid/edit-vehicle",jwtMiddleware,multerMiddleware.single("image"),vehicleController.editVehicleDetailsController)
 router.get("/get-sales",jwtMiddleware,salesController.getSalesController)

 router.delete("/:bid/cancel-booking",jwtMiddleware,bookingsController.cancelBookingsController)


module.exports = router