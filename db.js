import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('advertises.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        //`DROP TABLE advertises`,  
        'CREATE TABLE IF NOT EXISTS advertises (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, advertisetext TEXT NOT NULL, url TEXT NOT NULL, price REAL NOT NULL, username TEXT NOT NULL);',
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

export const addAdvertise = (title, advertisetext, url, price, username) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO advertises (title, advertisetext, url, price, username) VALUES (?, ?, ?, ?, ?);`,
            [title, advertisetext, url, price, username],
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

export const deleteAd = (id) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM advertises WHERE id = ?;',
          [id],
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

  export const fetchAdvertises = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM advertises',
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

  export const fetchByUserName = (username) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM advertises WHERE username = ?;',
          [username],
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

//////////////////////////////////////////////////////

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