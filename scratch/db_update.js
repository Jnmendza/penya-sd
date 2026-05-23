const { Client } = require('pg');

const connectionString = 'postgresql://postgres.erlplcduvrowbiwobjen:yeXh81wSzu3MDwTH@aws-0-us-west-2.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString: connectionString,
});

async function main() {
  await client.connect();

  console.log('Fetching current app_config values...');
  const resBefore = await client.query("SELECT * FROM app_config WHERE key = 'zelle_qr_url'");
  console.log('Before update:', resBefore.rows);

  console.log('Updating zelle_qr_url...');
  const updateRes = await client.query(
    "UPDATE app_config SET value = 'https://erlplcduvrowbiwobjen.supabase.co/storage/v1/object/public/payment-qr/zelle_pbsd_qr.png' WHERE key = 'zelle_qr_url'"
  );
  console.log('Update result:', updateRes.rowCount, 'row(s) updated');

  const resAfter = await client.query("SELECT * FROM app_config WHERE key = 'zelle_qr_url'");
  console.log('After update:', resAfter.rows);

  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
