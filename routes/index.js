var express = require("express");
var router = express.Router();

let todolist = {
    tasks: [{
        title: "Купить хлеба",
        active: true,
        files: [],
        date: ''
    }, {
        title: "Сделать СПП 1 лабу",
        active: false,
        files: [],
        date: ''
    }],
    filterValue: 'all'
};

router.get('/', function (request, response) {
    const {filter} = request.query;
    if (!filter || filter === 'all') {
        response.render("task", todolist);
    } else {
        console.log(filter);
        let tasks, active;
        active = filter === 'active';
        console.log(active);

        tasks = todolist.tasks.filter((task) =>
            task.active === active
        );

        let filteredTodolist = {
            tasks,
            filterValue: filter
        };
        console.log(tasks);

        response.render("task", filteredTodolist);
    }
});

router.post('/', function (request, response) {
    if (!request.body) return response.sendStatus(400);

    //console.log(request.body);
    let task = {
        title: request.body.title,
        active: !request.body.done,
        files: [],
        date: ''
    };

    if (request.body.date) {
        task.date = request.body.date;
        console.log(request)
    }

    if (request.file) {
        //console.log(request.file);
        let file = {
            title: request.file.originalname,
            path: request.file.path
        };
        task.files.push(file);
    }

    todolist.tasks.push(task);

    response.redirect('/');
});

module.exports = router;