export const Realm = require('realm');
export const TASKLIST_SCHEMA = 'TaskList';
export const TASK_SCHEMA = 'Task';

export const TaskSchema = {
  name: TASK_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
    done: {type: 'bool', default: false},
  },
};

export const TaskListSchema = {
  name: TASKLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: {type: 'int', default: 0},
    name: 'string',
    creationDate: 'date',
    todos: {type: 'list', objectType: TASK_SCHEMA},
  },
};

const dataBaseOptions = {
  path: 'TaskList.realm',
  schema: [TaskListSchema, TaskSchema],
  schemaVersion: 0,
};

export const insertNewTask = (newTask) =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then((realm) => {
        realm.write(() => {
          realm.create(TASKLIST_SCHEMA, newTask);
          resolve(newTask);
        });
      })
      .catch((error) => reject(error));
  });

export const updateTask = (task) =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then((realm) => {
        realm.write(() => {
          let updatingTask = realm.objectForPrimaryKey(
            TASKLIST_SCHEMA,
            task.id,
          );
          updatingTask.name = task.name;
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const deleteTask = (taskListID) =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then((realm) => {
        realm.write(() => {
          let deletingTask = realm.objectForPrimaryKey(
            TASKLIST_SCHEMA,
            taskListID,
          );
          realm.delete(deletingTask);
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const deleteAllTasks = () =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then((realm) => {
        realm.write(() => {
          let deleteTasks = realm.objects(TASKLIST_SCHEMA);
          realm.delete(deleteTasks);
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const loadTasks = () =>
  new Promise((resolve, reject) => {
    Realm.open(dataBaseOptions)
      .then((realm) => {
        let loadList = realm.objects(TASKLIST_SCHEMA);
        resolve(loadList);
      })
      .catch((error) => {
        reject(error);
      });
  });

export default new Realm(dataBaseOptions);
