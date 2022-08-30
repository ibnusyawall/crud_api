const express = require('express');
const router = express.Router();
const { Todo } = require(process.cwd() + '/' + 'database/models');

router.get('/', async function(req, res, next) {
    var { activity_group_id } = req.query;
    var data;
    try {
        if (activity_group_id) {
            data = await Todo.findAll({ where: { activity_group_id }, raw: true });
        } else {
            data = await Todo.findAll({ raw: true });
        }
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
            var data = await Todo.findByPk(id);
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
            message: `Todo with ID ${id} Not Found`,
            data: {}
        });
        console.log(e)
    }
});

router.post('/', async function(req, res, next) {
    var { activity_group_id, title } = toJSON(req.body);
    try {
        var code = (!activity_group_id || !title) ? 400 : 201;
        var status = code == 201 ? 'Success' : 'Failed';
        var message = code == 201 ? 'Success' : 'activity_group_id or title is required';

        var data = {
            activity_group_id: activity_group_id,
            title: title,
            is_active: true,
            priority: 'very-high',
            created_at: new Date(),
            updated_at: new Date(),
        }

        var todo = code == 201 ? await Todo.create(data) : {};
        res.status(code).json({
            status,
            message,
            data: todo
        });
        next();
    } catch (e) {
        res.status(400).json(e)
    }
});

router.patch('/:id', async function(req, res, next) {
    var { id } = req.params;
    var { activity_group_id, title, is_active, priority } = toJSON(req.body);

    try {
        var todo = await Todo.findByPk(id);
        var update = {
            activity_group_id: activity_group_id ?? todo.activity_group_id,
            title: title ?? todo.title,
            is_active: is_active ?? todo.is_active,
            priority: priority ?? todo.priority,
            created_at: todo.created_at,
            updated_at: new Date(),
            deleted_at: null
        }

        await Todo.update(update, { where: { id: id }});
        update['id'] = id;

        res.status(200).json({
            status: 'Success',
            message: 'Success',
            data: update
        });
    } catch(e) {
        res.status(404).json({
            status: 'Not Found',
            message: `Todo with ID ${id} Not Found`,
            data: {}
        });
    }
});

router.delete('/:id', async function(req, res, next) {
    var { id } = req.params;
    try {
        var todo = await Todo.findByPk(id);

        if (!todo) {
            res.status(404).json({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
                data: {}
            });
        } else {
            await Todo.destroy({ where: { id: id } });
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
            message: `Todo with ID ${id} Not Found`,
            data: {}
        });
    }
});

function toJSON(raw) {
    return JSON.parse(Object.keys(raw)[0].replace(/\n/g, ''))
}

module.exports = router;
