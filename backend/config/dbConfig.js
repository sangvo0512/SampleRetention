const sql = require('mssql');

const dbConfig = {
    user: 'your_username',    // Thay thế bằng thông tin đăng nhập của bạn
    password: 'your_password',
    server: 'your_server',
    database: 'SimpleRetention',
    options: {
        encrypt: false,        // Sử dụng nếu sử dụng Azure SQL
        enableArithAbort: false
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
    });

module.exports = {
    sql,
    poolPromise
};
