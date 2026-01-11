const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Iyzipay = require('iyzipay');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

// Iyzipay yapılandırması
const baseUrl = process.env.IYZI_BASE_URL || process.env.IYZIPAY_URI || 'https://sandbox-api.iyzipay.com';
const apiKey = process.env.IYZI_API_KEY || process.env.IYZIPAY_API_KEY;
const secretKey = process.env.IYZI_SECRET_KEY || process.env.IYZIPAY_SECRET_KEY;


// Iyzipay instance oluştur
let iyzipay = new Iyzipay({
        apiKey: apiKey.trim(),
        secretKey: secretKey.trim(),
        uri: baseUrl.trim(),  // Iyzipay 'uri' parametresi kullanıyor
    });


app.post('/api/payment', (req, res) => {
    const { price, paidPrice, currency, basketId, paymentCard, buyer, shippingAddress, billingAddress, basketItems } = req.body;
    const request = {
        locale: 'tr',
        conversationId: "123456789",
        price: price,
        paidPrice: paidPrice,
        currency: currency,
        installment: 1,
        basketId: basketId,
        paymentChannel: 'WEB',
        paymentGroup: 'PRODUCT',
        paymentCard: paymentCard,
        buyer: buyer,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        basketItems: basketItems,
    };

    // Iyzipay callback fonksiyon bekliyor
    iyzipay.payment.create(request, (err, result) => {
        if (err) {
            console.error('Ödeme hatası:', err);
            return res.status(500).json({ error: err.message || 'Ödeme işlemi başarısız' });
        }
        res.json(result);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});