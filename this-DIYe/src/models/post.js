function create(db, args) {
  return new Promise(function(resolve, reject) {
    db.post.insert(args, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

function user(db, args) {
  return new Promise(function(resolve, reject) {
    db.post.findOne(args, function(error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    });
  });
}

module.exports = {
  create,
  user
};
