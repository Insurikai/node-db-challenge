/*
  - [ ] adding resources.
  - [ ] retrieving a list of resources.
  - [ ] adding projects.
  - [ ] retrieving a list of projects.
  - [ ] adding tasks.
  - [ ] retrieving a list of tasks. **The list of tasks should include the project name and project description**.
*/
//require('knex')(require('../knexfile.js').development)
const db = require('knex')(require('./data/knexfile').development);
const express = require('express');
const server = express();
server.use(express.json());
server.listen(8000, () => {
  console.log(`\nRunning on port 8000\n`);
});

server.get('/api/resources', (req, res) => {
  db('Resources').then(table => {
    res.status(200).send(table);
  });
});
server.get('/api/projects', (req, res) => {
  db('Projects').then(table => {
    res.status(200).send(
      table.map(row => {
        return { ...row, Completed: !!row.Completed };
      })
    );
  });
});
server.get('/api/tasks', async (req, res) => {
  db('Tasks').then(tasks => {
    Promise.all(tasks.map(task => {
      return db('Projects').where({id: task.ProjectID}).first().then(project => {
        let o = {...task, ProjectName: project.Name,ProjectDesc: project.Desc, Completed: !!task.Completed}
        delete o.ProjectID
        return o
      })
    })).then(result => {
      res.status(200).send(result)
    })
  })
});

server.post('/api/resources', (req, res) => {
  db('Resources')
    .insert(req.body)
    .then(success => {
      res.status(201).send('Success');
    })
    .catch(fail => {
      res.status(500).send('Failure');
    });
});
server.post('/api/projects', (req, res) => {
  db('Projects')
    .insert(req.body)
    .then(success => {
      res.status(201).send('Success');
    })
    .catch(fail => {
      res.status(500).send('Failure');
    });
});
server.post('/api/tasks', (req, res) => {
  db('Tasks')
    .insert(req.body)
    .then(success => {
      res.status(201).send('Success');
    })
    .catch(fail => {
      res.status(500).send('Failure');
    });
});
