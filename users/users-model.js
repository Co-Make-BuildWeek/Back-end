const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    findBy,
    getUserPosts,
    insert, 
    update,
    remove,
};

function get(){
    return db('users');
}

function getById(id){
    return db('users')
        .where({id})
        .first();
}

function findBy(filter){
    return db("users").where(filter).orderBy("id");
}

function getUserPosts(userId) {
    return db('posts as p')
      .join('users as u', 'u.id', 'p.user_id')
      .select('p.*', 'u.name as postedBy')
      .where('p.user_id', userId);
  }

async function insert(user){
    const [id] = await db('users').insert(user, 'id');

    return db('users')
        .where({id})
        .first();
}

  // async function insert(user){
//     return db('users')
//         .insert(user)
//         .then(ids => {
//             return getById(ids[0]);
//         });
// }

function update(id, changes){
    return db('users')
        .where({id})
        .update(changes);
}

function remove(id){
    return db('users')
        .where('id', id)
        .del();
}