const router   = express.Router();

const LoginController = require('../app/controllers/LoginController');

router.get('/', LoginController.index);
router.post('/login', LoginController.postIndex);


module.exports = router;