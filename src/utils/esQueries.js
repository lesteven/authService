const { Client } = require('@elastic/elasticsearch');

const client = new Client({node: 'http://localhost:9200' });

const insertES = (user) => {
  user = user.toLowerCase();
  client.index({
    index: 'users',
    body: {
      user
    }
  })
}

const searchES = async (user) => {
  //console.log(user);
  try {
    const res = await client.search({
      index: 'users',
      body: {
        query: {
          fuzzy: {
            user
          }
        }
      },
    });
    //console.log('res!', res.body.hits.hits);
    return res.body.hits.hits;
  } catch(e) {
    console.log('error!!', e);
  };
}


module.exports = {
  insertES,
  searchES,
}
