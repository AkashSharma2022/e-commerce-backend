const router = require('express').Router();

const { validationS1, validationS2, validationAddres, 
      validationMerchant, loginMerchant, validateOtp, 
      updateProductValid } = require('../validator/validation');

const bodyParser = require('body-parser');
const { authorization } = require('../authentication/auth');

const { searchProduct } = require('../controller/searchController');
const {  orderProduct } = require('../controller/order.controller');


// Admin Controller...........................................................

const { adminReg } = require('../controller/adminController/adminRegister');
const { adminLogin } = require('../controller/adminController/adminLogin');
const { verifyMerchant } = require('../controller/adminController/verifyMerchant');
const { getUsers } = require('../controller/adminController/getUser');
const { getMerchants } = require('../controller/adminController/getMerchant');
const { blockUser } = require('../controller/adminController/blockUser');
const { blockMerchant } = require('../controller/adminController/blockMerchant');
const { blockProduct } = require('../controller/adminController/blockProduct');


// User Controller...........................................................

const { sentOtp } = require('../controller/userController/sendOtp');
const { verifyOtp } = require('../controller/userController/verifyOtp');
const { login } = require('../controller/userController/loginUser');
const { addUserAddress } = require('../controller/userController/addUserAddress');
const { getUserAddress } = require('../controller/userController/getUserAddress');


// cart Controller...........................................................

const { addToCart } = require('../controller/cartController/addToCart');
const { removeFromCart } = require('../controller/cartController/removeFromCart');
const { getCart } = require('../controller/cartController/getCart');


// merchant Controller...........................................................

const { merchantReg } = require('../controller/merchantController/merchantRegister');
const { setPassword } = require('../controller/merchantController/setPassword');
const { merchantLogin } = require('../controller/merchantController/loginMerchant');
const { merchantGetProduct } = require('../controller/merchantController/merchantGetProduct');

const { createProduct } = require('../controller/productController/createProduct');
const { updateProduct } = require('../controller/productController/updateProduct');
const { deleteProduct } = require('../controller/productController/deleteProduct');
const { getProducts } = require('../controller/productController/getProduct');


const jsonParser = bodyParser.json();

// User
router.post('/sentOtp', jsonParser, validationS1, sentOtp);
router.post('/verifyOtp', jsonParser, authorization,validateOtp, verifyOtp);
router.post('/loginUser', jsonParser, validationS2, login);
router.post('/addUserAddress', jsonParser, validationAddres, authorization, addUserAddress);
router.get('/getUserAddress', jsonParser, authorization, getUserAddress);

// Merchant
router.post('/merchantReg', jsonParser, validationMerchant, merchantReg);
router.post('/setPassword', jsonParser,authorization, setPassword);
router.post('/loginMerchant', jsonParser,loginMerchant, merchantLogin);
router.post('/verifyMerchant/:id', jsonParser,authorization, verifyMerchant);
router.get('/merchantGetProduct',authorization,  merchantGetProduct);

//Admin
router.post('/adminReg', jsonParser, adminReg);
router.post('/adminLogin', jsonParser, adminLogin);
router.get('/getMerchants/:page',authorization, getMerchants);
router.get('/getUsers/:page',authorization, getUsers);
router.put('/blockMerchant/:id',authorization, blockMerchant);
router.put('/blockUser/:id',authorization, blockUser);
router.put('/blockProduct/:id',authorization, blockProduct);

//Product
router.post('/addProduct', authorization, jsonParser, createProduct);
router.post('/updateProduct/:id', authorization, jsonParser, updateProductValid, updateProduct);
router.post('/deleteProduct/:id', authorization, jsonParser, deleteProduct);
router.get('/getProducts/:page', getProducts);

router.get('/searchProduct/:key', searchProduct);
router.post('/placeOrder/:id', jsonParser, authorization, orderProduct);

//cart
router.post('/addToCart', jsonParser, authorization, addToCart);
router.delete('/removeFromCart/:CartId', jsonParser, authorization, removeFromCart);
router.get('/getCart', jsonParser, authorization, getCart);


module.exports = router;
