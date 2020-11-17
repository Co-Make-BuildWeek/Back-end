exports.seed = async function(knex){
  await knex("users").insert([
    {name: "Sean", email: "sean@test.com", username: "sean1", password: "password1"},
    {name: "Chase", email: "chase@test.com", username: "chase1", password: "password2"},
    {name: "Adham", email: "adham@test.com", username: "adham1", password: "password3"},
  ])
}