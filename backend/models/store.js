const pool = require('./db');

const createStore = async (name, location, description, ownerId) => {
  const result = await pool.query(
    'INSERT INTO stores (name, location, description, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, location, description, ownerId]
  );
  return result.rows[0];
};

const getAllStores = async () => {
  const result = await pool.query('SELECT * FROM stores');
  return result.rows;
};

const getStoreById = async (id) => {
  const result = await pool.query('SELECT * FROM stores WHERE id = $1', [id]);
  return result.rows[0];
};

const updateStore = async (id, name, location, description) => {
  const updates = [];
  const values = [];
  let paramIndex = 1;

  if (name !== undefined) {
    updates.push(`name = $${paramIndex++}`);
    values.push(name);
  }

  if (location !== undefined) {
    updates.push(`location = $${paramIndex++}`);
    values.push(location);
  }

  if (description !== undefined) {
    updates.push(`description = $${paramIndex++}`);
    values.push(description);
  }

  if (updates.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(id); // add the id as the last parameter
  const query = `UPDATE stores SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

  const result = await pool.query(query, values);
  return result.rows[0];
};


const deleteStore = async (id) => {
  const result = await pool.query('DELETE FROM stores WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore
};
