export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

// Before we fill out the actual IndexedDB portion of this function,
// let's consider how we'll set this up and use it. Remember, IndexedDB is asynchronous
// and event driven. This means that if we want it to be on and listening all the time,
// we'll have to write a lot of what-if type functionality to handle all of the moving parts.
// Instead, we'll use one function that opens the database connection,
// creates the object store (if it's the first time using it on the machine),
// and runs whatever transaction we need to have run on a successful connection.
// So when we call the function, we'll open the connection to the database
// and then connect to the object store that we pass in as storeName.
// Then we'll perform a transaction, using the method
// and object values to help carry it out. We also wrap the whole thing in a Promise,
// making it a lot easier to work with IndexedDB's asynchronous nature.
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database 'shop-shop' with the version of 1
    const request = indexedDB.open("shop-shop", 1);

    // create variables to hold reference to the database, transaction (tx), and object store
    let db, tx, store;

    // if version has changed (or this is the first time using the database),
    // run this method and create the three object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key index to be the `_id` of the data
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    // handle any errors with connecting
    request.onerror = function (e) {
      console.log("There was an error");
    };

    // on db open success
    request.onsuccess = function (e) {
      // save  a ref of the database to the db varible
      db = request.result;

      // open a transaction do whatever we pass into storename (must match one of the object store names)
      tx = db.transaction(storeName, "readwrite");

      // save a reference to that object store
      store = tx.objectStore(storeName);

      // if there is error, let us know
      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        // overwrites any data with the matching _id value from the object
        // and adding it if it can't find a match.
        case "put":
          store.put(object);
          resolve(object);
          break;

        // get all data from that store and return it
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;

        case "delete":
          store.delete(object._id);
          break;

        default:
          console.log("No valid method");
          break;
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
