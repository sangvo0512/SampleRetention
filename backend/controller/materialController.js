const { sql, poolPromise } = require('../config/dbConfig');

exports.getMaterials = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Materials');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.addMaterial = async (req, res) => {
    const { season, style, workingNo, articleNo, rounds, quantity, receiverDept, receiver, sender, returnDate, returner, note } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('season', sql.VarChar, season)
            .input('style', sql.VarChar, style)
            .input('workingNo', sql.VarChar, workingNo)
            .input('articleNo', sql.VarChar, articleNo)
            .input('rounds', sql.Int, rounds)
            .input('quantity', sql.Int, quantity)
            .input('receiverDept', sql.VarChar, receiverDept)
            .input('receiver', sql.VarChar, receiver)
            .input('sender', sql.VarChar, sender)
            .input('returnDate', sql.Date, returnDate)
            .input('returner', sql.VarChar, returner)
            .input('note', sql.VarChar, note)
            .input('addedTime', sql.Date, new Date())
            .query('INSERT INTO Materials (Season, Style, WorkingNo, ArticleNo, Rounds, Quantity, ReceiverDept, Receiver, Sender, ReturnDate, Returner, Note, AddedTime) VALUES (@season, @style, @workingNo, @articleNo, @rounds, @quantity, @receiverDept, @receiver, @sender, @returnDate, @returner, @note, @addedTime)');
        res.status(201).send('Material added successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateMaterial = async (req, res) => {
    const { id } = req.params;
    const { season, style, workingNo, articleNo, rounds, quantity, receiverDept, receiver, sender, returnDate, returner, note } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('season', sql.VarChar, season)
            .input('style', sql.VarChar, style)
            .input('workingNo', sql.VarChar, workingNo)
            .input('articleNo', sql.VarChar, articleNo)
            .input('rounds', sql.Int, rounds)
            .input('quantity', sql.Int, quantity)
            .input('receiverDept', sql.VarChar, receiverDept)
            .input('receiver', sql.VarChar, receiver)
            .input('sender', sql.VarChar, sender)
            .input('returnDate', sql.Date, returnDate)
            .input('returner', sql.VarChar, returner)
            .input('note', sql.VarChar, note)
            .input('modificationsTime', sql.Date, new Date())
            .query('UPDATE Materials SET Season=@season, Style=@style, WorkingNo=@workingNo, ArticleNo=@articleNo, Rounds=@rounds, Quantity=@quantity, ReceiverDept=@receiverDept, Receiver=@receiver, Sender=@sender, ReturnDate=@returnDate, Returner=@returner, Note=@note, ModificationsTime=@modificationsTime WHERE Id=@id');
        res.send('Material updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request().input('id', sql.Int, id).query('DELETE FROM Materials WHERE Id=@id');
        res.send('Material deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
