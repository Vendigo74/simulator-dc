const { Router } = require('express');
const userController = require('../controllers/user-controller');
const clientController = require('../controllers/clients-controller');
const marketingController = require('../controllers/marketing-controller');
const employeeController = require('../controllers/employee-controller');
const eventsController = require('../controllers/events-controller');
const logController = require('../controllers/log-controller');
const carsController = require('../controllers/car-controller');
const kpiController = require('../controllers/kpi-controller');
const FirmProgController = require('../controllers/firmprog-controller');
const statsController = require('../controllers/stats-controller');

const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/clients', clientController.getClients);
router.get('/effect', clientController.getEffect);

//Marketing
router.get('/marketing', marketingController.getMarketing);
router.get('/marketing/category', marketingController.getMarketingCategory);
router.get('/marketing/actions', marketingController.getMarketingActions);
router.post('/marketing', marketingController.addMarketing);
router.patch('/marketing', marketingController.updateMarketing);
router.delete('/marketing', marketingController.deleteMarketing);

router.get('/marketing/:id', marketingController.getMarketingById);

//Stats
router.get('/stats/:id', statsController.getStats);
router.post('/stats', statsController.updateStats);

//KPI
router.post('/setkpi', kpiController.setKpi);
router.post('/updatetrainerkpi', kpiController.updateTrainerKpi);
router.post('/kpi', kpiController.getKpi);

//Firm Prog
router.get('/firmprog/:id', FirmProgController.getFirmProg);
router.post('/firmprog', FirmProgController.addFirmProg);
router.patch('/firmprog', FirmProgController.updateFirmProg);
router.delete('/firmprog/:id', FirmProgController.deleteFirmProg);

// Users
router.get('/', userController.getHome);
router.post(
	'/registration/trainer',
	body('login').isLength({ min: 2, max: 32 }),
	body('name').isLength({ min: 2, max: 32 }),
	body('password').isLength({ min: 3, max: 32 }),
	userController.registrationTrainer
);
router.post('/registration/player', userController.registrationPlayer);
router.post('/login', body('name').isLength({ min: 2, max: 32 }), userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', userController.getUser);
router.delete('/users/:id', userController.removeUser);

// Cars
router.get('/cars/:id', carsController.getCars);
router.post('/cars', carsController.addCar);
router.patch('/cars', carsController.updateCar);
router.delete('/cars/:id', carsController.delateCar);

// Users -> trainers
router.get('/trainers', userController.getTrainers);

// Users -> players
router.get('/players', userController.getPlayers);

// Employees
router.get('/employees', employeeController.getEmployees);
router.post('/employees', employeeController.addEmployee);
router.patch('/employees/', employeeController.updateEmployee);
router.delete('/employees/:idPlayer/:type/:id', employeeController.removeEmployee);
router.delete('/employees/player/:id', employeeController.clearPlayerEmployees);

// Events
router.get('/events', eventsController.getEvents);

// Logs
router.post('/logs', logController.addLog);
router.get('/logs/player/:id', logController.getLogsByPlayerId);
router.delete('/logs/:id', logController.deleteLogs);

module.exports = router;
