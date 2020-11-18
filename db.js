import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('advertises.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS advertises (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, advertisetext TEXT NOT NULL, username TEXT NOT NULL, userid INTEGER NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const initUsers = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          //`DROP TABLE users`,  
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);',
          [],
          () => {
            resolve();
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };

export const addAdvertise = (title, advertisetext, username, userid) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO advertises (title, advertisetext, username, userid) VALUES (?, ?, ?, ?);`,
            [title, advertisetext, username, userid],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

export const createUser = (username, email , password) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`,
            [username, email, password],
            (_, result) => {
              resolve(result);
              console.log('Pridėtas');
            },
            (_, err) => {
              reject(err);
              console.log('Nepaejo');
            }
          );
        });
      });
      return promise;
};

export const fetchUsers = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          },
        );
      });
    });
    return promise;
  };

  export const userLogin = (username, password) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT id, username, password FROM users WHERE username = ? and password = ?;',
          [username, password],
          (_, result) => {
            console.log('Prisijungta');
            resolve(result);
          },
          (_, err) => {
            reject(err);
          },
        );
      });
    });
    return promise;
  };