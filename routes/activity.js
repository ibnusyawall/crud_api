const express = require('express');
const router = express.Router();
const { Activity } = require(process.cwd() + '/' + 'database/models');

router.get('/', async function(req, res, next) {
    try {
        var data = await Activity.findAll({ raw: true });
        res.status(200).json({
           status: 'Success',
           message: 'Success',
           data
        });
    } catch(e) {
        console.log(e)
    }
});

router.get('/:id', async function(req, res, next) {
    var { id } = req.params;
    try {
        if (id) {
            var data = await Activity.findByPk(id);
            data = data.toJSON();
        }

        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data
        });
    } catch (e) {
        res.status(404).json({
            status: 'Not Found',
            message: `Activity with ID ${id} Not Found`,
            data: {}
        });
        console.log(e)
    }
});

router.post('/', async function(req, res, next) {
    var { email, title } = toJSON(req.body);
    try {
        var code = (!email || !title) ? 400 : 201;
        var status = code == 201 ? 'Success' : 'Failed';
        var message = code == 201 ? 'Success' : 'email or title is required';

        var data = {
            email: email,
            title: title,
            created_at: new Date(),
            updated_at: new Date(),
        }

        var activity = code == 201 ? await Activity.create(data) : {};

        res.status(code).json({
            status,
            message,
            data: activity
        });
        next();
    } catch (e) {
        res.status(400).json(e)
    }
});

router.patch('/:id', async function(req, res, next) {
    var { id } = req.params;
    var { email, title } = toJSON(req.body);

    try {
        var activity = await Activity.findByPk(id);
        var update = {
            email: email ?? activity.email,
            title: title ?? activity.title,
            created_at: activity.created_at,
            updated_at: new Date(),
            deleted_at: null
        }

        await Activity.update(update, { where: { id: id }});
        update['id'] = id;

        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: update
        });
    } catch(e) {
        res.status(404).json({
            status: 'Not Found',
            message: `Activity with ID ${id} Not Found`,
            data: {}
        });
    }
});

router.delete('/:id', async function(req, res, next) {
    var { id } = req.params;
    try {
        var activity = await Activity.findByPk(id);

        if (!activity) {
            res.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
                data: {}
            });
        } else {
            await Activity.destroy({ where: { id: id } });
            res.status(200).json({
                status: 'Success',
                message: 'Success',
                data: {},
            });
        }
        next()
    } catch(e) {
        res.status(404).json({
            status: 'Not Found',
            message: `Activity with ID ${id} Not Found`,
            data: {}
        });
    }
});

function toJSON(raw) {
    return JSON.parse(Object.keys(raw)[0].replace(/\n/g, ''))
}

module.exports = router;
