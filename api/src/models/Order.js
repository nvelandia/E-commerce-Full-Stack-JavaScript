const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    sequelize.define('Order', {
        order_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        state: {
            type: DataTypes.ENUM('Created', 'Processing', 'Cancelled', 'Complete'),
            defaultValue: 'Created',
            allowNull: false
        },
        payment_method: {
            type: DataTypes.ENUM('Debito', 'Credito'),
            allowNull: false
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
}