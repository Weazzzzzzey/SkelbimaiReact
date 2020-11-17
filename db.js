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