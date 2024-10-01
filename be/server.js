const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const quizRoutes = require('./routers/quizRoutes');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());

const corsOptions = {
    origin: '*' , // Chỉ cho phép từ domain này
    methods: 'GET,POST,PUT,DELETE', // Các phương thức được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
    credentials: true, // Cho phép gửi cookie hoặc xác thực
    optionsSuccessStatus: 200 // Mã trạng thái trả về cho các yêu cầu thành công (trong trường hợp có lỗi cũ với IE)
};

app.use(cors(corsOptions));

// Một route đơn giản để kiểm tra
app.get('/api/data', (req, res) => {
    res.json({ message: 'CORS is configured properly!' });
});

// Khởi động server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.use(bodyParser.json());
app.use('/quizzes', quizRoutes);

// Kết nối với MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Chạy server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
