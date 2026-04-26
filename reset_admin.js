const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdmin() {
    try {
        const hash = await bcrypt.hash('admin123', 10);
        
        const existingAdmin = await prisma.user.findUnique({
            where: { email: 'admin@example.com' }
        });

        if (existingAdmin) {
            await prisma.user.update({
                where: { email: 'admin@example.com' },
                data: { password: hash }
            });
            console.log('Admin password successfully reset to admin123.');
        } else {
            console.log('Admin user not found. Inserting new admin...');
            await prisma.user.create({
                data: {
                    name: 'Logistics Admin',
                    email: 'admin@example.com',
                    password: hash,
                    role: 'admin'
                }
            });
            console.log('Admin created successfully.');
        }
    } catch (e) {
        console.error('Error resetting admin:', e);
    } finally {
        await prisma.$disconnect();
    }
}

resetAdmin();
