exports.seed = async function(knex){
  await knex("posts").insert([
    {title: "Pothole in the neighborhood", 
    description: "There is a giant pothole in the middle of our street", 
    user_id: 2,
    imgSrc: "https://images.theconversation.com/files/233448/original/file-20180824-149463-1hzm435.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" },
    
    {title: "Fallen lamp post", 
    description: "A lamp post has fallen and hit a car",
    user_id: 1, 
    imgSrc: "https://i.dailymail.co.uk/i/pix/2012/11/27/article-2239161-163B4E9E000005DC-124_634x399.jpg"},
  ])
}