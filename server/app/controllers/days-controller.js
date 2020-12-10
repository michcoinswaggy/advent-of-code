'use strict';

exports.getDayOne = (req, res, next) => {
    // let query = `SELECT * FROM ingredient WHERE id = ${con.escape(req.params.id)}`;
    res.status(200).json({message: "coucouDayOneBack"});
};
