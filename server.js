const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./database');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images if needed

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes

// API: Register User
app.post('/api/register', upload.single('id_image'), async (req, res) => {
    try {
        const { full_name, email, password } = req.body;
        const id_image = req.file;

        if (!full_name || !email || !password || !id_image) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios, incluyendo la imagen de identificación.' });
        }

        // Check if user exists
        const checkStmt = db.prepare('SELECT id FROM users WHERE email = ?');
        const existingUser = checkStmt.get(email);
        if (existingUser) {
            // Delete uploaded file if duplicate user
            if (id_image) fs.unlinkSync(id_image.path);
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const insertStmt = db.prepare('INSERT INTO users (full_name, email, password, id_image_path) VALUES (?, ?, ?, ?)');
        const info = insertStmt.run(full_name, email, hashedPassword, id_image.path);

        res.status(201).json({ message: 'Usuario registrado exitosamente.', userId: info.lastInsertRowid });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// API: Login User
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = stmt.get(email);

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // In a real app, generate a JWT token here
        res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, name: user.full_name } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
