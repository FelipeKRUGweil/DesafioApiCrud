async function connect() {

    if (global.connection) {
        console.log("Using existing connection.");
        return global.connection;
    }

    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    try {
        const client = await pool.connect();
        console.log("Successfully connected to the database.");

        const res = await client.query("SELECT NOW()");
        console.log("Server Date/Time:", res.rows[0]);

        client.release();
        
        global.connection = pool;
        return pool;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}


connect();


async function selectPlaces(nameFilter) {
    const client = await connect();
    let sql = "SELECT * FROM places";
    let params = [];
    if (nameFilter) {
        sql += " WHERE name ILIKE $1";
        params = [`%${nameFilter}%`];
    }
    const res = await client.query(sql, params);
    return res.rows;
}

async function selectPlaceById(id) {
    const client = await connect();
    const res = await client.query("SELECT * FROM places WHERE id=$1", [id]);
    return res.rows[0];
}



async function insertPlace(place) {
    const client = await connect();
    const sql = "INSERT INTO places (nome, slug, city, state, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *";
    const res = await client.query(sql, [place.name, place.slug, place.city, place.state]);
    return res.rows[0];
}


async function updatePlace(id, place) {
    const client = await connect();
    const sql = "UPDATE places SET name=$1, slug=$2, city=$3, state=$4, updated_at=NOW() WHERE id=$5 RETURNING *";
    const res = await client.query(sql, [place.name, place.slug, place.city, place.state, id]);
    return res.rows[0];
}


async function deletePlace(id) {
    const client = await connect();
    const sql = "DELETE FROM places WHERE id=$1 RETURNING *";
    const res = await client.query(sql, [id]);
    return res.rows[0];
}

module.exports = {
    selectPlaces,
    selectPlaceById,
    insertPlace,
    updatePlace,
    deletePlace
};