const router = require('express').Router();

const { validationS1, validationS2, validationAddres,
    validationMerchant, loginMerchant, validateOtp,
    updateProductValid,
    addProductValid } = require('../validator/validation');

const bodyParser = require('body-parser');
const { authorization } = require('../authentication/auth');

const { searchProduct } = require('../controller/searchController');
const { orderProduct } = require('../controller/order.controller');


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

const { createProduct, createCategory, createSubCategory } = require('../controller/productController/createProduct');
const { updateProduct } = require('../controller/productController/updateProduct');
const { deleteProduct } = require('../controller/productController/deleteProduct');
const { getProducts } = require('../controller/productController/getProduct');
const { merchantGetOrderedProduct } = require('../controller/merchantController/merchantGetOrderedProduct');
const { userGetOrderedProduct } = require('../controller/userController/userGetOrderedProduct');
const { payment } = require('../controller/paymentController/payment.controller');
const { addTocartInBulk, addProductInBulk } = require('../controller/cartController/addToCartInBulk');
const { paypal, Success, Cancel } = require('../controller/paypal/paypal.controller');
const { razorPayCreateOrder, paymentVerify } = require('../controller/razorpay/razorpay.controller');
// const { razorPay } = require('../controller/razorpay/razorpay.controller');


const jsonParser = bodyParser.json();

// User
router.post('/sentOtp', jsonParser, validationS1, sentOtp);
router.post('/verifyOtp', jsonParser, authorization, validateOtp, verifyOtp);
router.post('/loginUser', jsonParser, validationS2, login);
router.post('/addUserAddress', jsonParser, validationAddres, authorization, addUserAddress);
router.get('/getUserAddress', jsonParser, authorization, getUserAddress);
router.get('/userGetOrderedProducts', authorization, userGetOrderedProduct);


// Merchant
router.post('/merchantReg', jsonParser, validationMerchant, merchantReg);
router.post('/setPassword', jsonParser, authorization, setPassword);
router.post('/loginMerchant', jsonParser, loginMerchant, merchantLogin);
router.post('/verifyMerchant/merchantId/:id', jsonParser, authorization, verifyMerchant);
router.get('/merchantGetProduct/:page', authorization, merchantGetProduct);
router.get('/merchantGetOrderedProducts', authorization, merchantGetOrderedProduct);


//Admin
router.post('/adminReg', jsonParser, adminReg);
router.post('/adminLogin', jsonParser, adminLogin);
router.get('/getMerchants/:page', authorization, getMerchants);
router.get('/getUsers/:page', authorization, getUsers);
router.put('/blockMerchant/:id', authorization, blockMerchant);
router.put('/blockUser/:id', authorization, blockUser);
router.put('/blockProduct/:id', authorization, blockProduct);

//Product
router.post('/addProduct', authorization, jsonParser, addProductValid, createProduct);
router.post('/addCategory', authorization, jsonParser, createCategory);
router.post('/addSubCategory', authorization, jsonParser, createSubCategory);

router.post('/updateProduct/productId/:id', authorization, jsonParser, updateProductValid, updateProduct);
router.post('/deleteProduct/:id', authorization, jsonParser, deleteProduct);
router.get('/getProducts/:page', getProducts);


router.get('/searchProduct/:key', searchProduct);
router.post('/placeOrder/addressId/:id', jsonParser, authorization, orderProduct);

//cart
router.post('/addToCart', jsonParser, authorization, addToCart);
router.delete('/removeFromCart/:CartId', jsonParser, authorization, removeFromCart);
router.get('/getCart', jsonParser, authorization, getCart);

// payment stripe
router.post('/webhook', jsonParser, authorization, payment);

router.post('/addTocartInBulk', authorization, addTocartInBulk);
router.post('/addProductInBulk', addProductInBulk);

/// payment paypal
router.post('/pay', paypal);
router.get('/success', Success);
router.get('/cancel', Cancel);


// razorPay 

router.get('/razorPay', (req, res) => {
    res.sendFile("/home/user/e-commerce-backend/controller/razorpay/razorPay.html");
})
router.post('/create/orderId', jsonParser, razorPayCreateOrder);
router.post('/api/payment/verify', jsonParser, paymentVerify);

module.exports = router;
