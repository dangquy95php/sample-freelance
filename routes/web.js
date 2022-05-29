const router   = express.Router();

const LoginController = require('../app/controllers/LoginController');

router.get('/', LoginController.index);
router.post('/translate', LoginController.postIndex);


module.exports = router;