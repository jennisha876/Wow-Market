require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    console.log('🚀 Starting Wow Market Database Setup...\n');

    // Connect to PostgreSQL (without database specified)
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: 'postgres' // Connect to default database first
    });

    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL server');

        // Check if database exists
        const dbName = process.env.DB_NAME || 'wow_market_db';
        const checkDb = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (checkDb.rows.length === 0) {
            // Create database
            console.log(`\n📦 Creating database: ${dbName}...`);
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`✅ Database ${dbName} created successfully`);
        } else {
            console.log(`\n✅ Database ${dbName} already exists`);
        }

        await client.end();

        // Connect to the new database
        const dbClient = new Client({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: dbName
        });

        await dbClient.connect();
        console.log(`\n✅ Connected to ${dbName} database`);

        // Read and execute SQL file
        console.log('\n📝 Executing database schema...');
        const sqlFilePath = path.join(__dirname, 'database.sql');
        const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

        // Split by semicolons and execute each statement
        const statements = sqlContent
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            try {
                await dbClient.query(statement);
            } catch (err) {
                // Ignore "already exists" errors
                if (!err.message.includes('already exists')) {
                    console.warn(`⚠️  Warning: ${err.message.split('\n')[0]}`);
                }
            }
        }

        console.log('✅ Database schema created successfully');

        // Verify tables
        const tables = await dbClient.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);

        console.log('\n📊 Created tables:');
        tables.rows.forEach(row => {
            console.log(`   ✓ ${row.table_name}`);
        });

        await dbClient.end();

        console.log('\n🎉 Database setup completed successfully!');
        console.log('\n📌 Connection Details:');
        console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
        console.log(`   Port: ${process.env.DB_PORT || 5432}`);
        console.log(`   Database: ${dbName}`);
        console.log(`   User: ${process.env.DB_USER || 'postgres'}`);
        console.log('\n💡 Next steps:');
        console.log('   1. Start the server: npm start');
        console.log('   2. Test API endpoints: http://localhost:5000/api/health');

    } catch (error) {
        console.error('\n❌ Error setting up database:', error.message);
        console.error('\n💡 Make sure:');
        console.error('   1. PostgreSQL is installed and running');
        console.error('   2. Your .env file has correct credentials');
        console.error('   3. The database user has CREATE DATABASE privileges');
        process.exit(1);
    }
}

// Run setup
setupDatabase();
