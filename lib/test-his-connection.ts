
import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testConnection() {
    const client = new Client({
        host: process.env.HIS_DB_HOST,
        port: parseInt(process.env.HIS_DB_PORT || '5432'),
        database: process.env.HIS_DB_NAME,
        user: process.env.HIS_DB_USER,
        password: process.env.HIS_DB_PASSWORD,
        ssl: false // Ensure SSL is configured correctly for the network
    });

    try {
        console.log('Connecting to HIS Database...');
        await client.connect();
        console.log('Connected!');

        const query = `
      SELECT 
          pr.patientcode,
          pr.patientname,
          pr.birthdayyear,
          mkb.chandoanbandau_icd10,
          mkb.chandoanbandau
      FROM tb_patientrecord pr
      JOIN tb_medicalrecord_khambenh mkb ON mkb.medicalrecordid = pr.medicalrecordid_kb
      WHERE mkb.chandoanbandau_icd10 LIKE 'E11%'
      AND pr.receptiondate >= CURRENT_DATE - INTERVAL '1 year'
      LIMIT 10;
    `;

        console.log('Executing query...');
        const res = await client.query(query);
        console.log('Query successful!');
        console.log('Rows found:', res.rows.length);
        console.table(res.rows);

    } catch (err) {
        console.error('Connection error:', err);
    } finally {
        await client.end();
    }
}

testConnection();
