//This handles all routes for logged-in users
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 GET Route for authenticated users access to populate Archive view
 Also used for Admin to check on stories marked inappropriate
 **/
router.get('/', (req, res) => {
// console.log('authenticated user GET server route for Archive view:', req.isAuthenticated());
// console.log('writerGET req.user is:', req.user);
if(req.isAuthenticated()){
let queryText = 'SELECT "story"."id", "story", "writer_id", "username", "zipcode", "inappropriate" FROM "writer" JOIN "story" ON "story"."writer_id" = "writer"."id" WHERE "writer"."id" = $1 ORDER BY "story"."id" DESC;';
pool.query(queryText, [req.user.id])
.then((result)=> {
  res.send(result.rows);
  // console.log('writerRouter result.rows', result.rows);
})
.catch((error) => {
  res.sendStatus(500);
}); 
}
});

router.get('/favorites', (req, res) => {
  // console.log('authenticated user GET server route for favorites in Archive view:', req.isAuthenticated());
  console.log('writerGET req.user is:', req.user);
  if(req.isAuthenticated()){
  let queryText = 'SELECT "story", "zipcode", "favorite"."id", "favorite"."story_id", "favorite"."writer_id" FROM "story" JOIN "favorite" ON "story"."id" = "favorite"."story_id" JOIN "writer" ON "writer"."id" = "favorite"."writer_id" WHERE "favorite"."writer_id" = $1 ORDER BY "story"."id" DESC;';
  pool.query(queryText, [req.user.id])
  .then((result)=> {
    res.send(result.rows);
    // console.log('writerRouter result.rows:', result.rows);
  })
  .catch((error) => {
    res.sendStatus(500);
  }); 
  }
  });

  router.get('/editStory', (req, res) => {
    // console.log('authenticated user GET of story from Archive page for editing:', req.isAuthenticated());
    // console.log('editStory req.user is:', req.user);
    if(req.isAuthenticated()) {
      let queryText = 'SELECT * FROM "story" WHERE "story" = $1';
      pool.query(queryText, [req.user.id])
      .then((result) => {
        res.send(result.rows);
        console.log('writerRoute editStory result.rows:', result.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
    }
  });

/**
 POST for authenticated users WriterPage--stories published by Writers
 **/
router.post('/', (req, res) => {
  // console.log('authenticated user POST server route for WriterPage', req.body);
  if(req.isAuthenticated()) {
    const queryText = 'INSERT INTO "story" (story, writer_id, zipcode, lat, long) VALUES ($1, $2, $3, $4, $5);';
    pool.query(queryText, [req.body.newStory, req.user.id, req.body.zipcode, req.body.lat, req.body.long])
    .then((result) => {
      res.sendStatus(201);
    }).catch((error) => {
      console.log('post got to the catch in backend router:', error)
      res.sendStatus(500);
    })
    } else {
      res.send(403);
  }
});

/**
 POST for adding Favorites from ReadPageWriter
 **/
router.post('/fav', (req, res) => {
  console.log('authenticated user POST server route for adding favorites from WriterPage, req.body:', req.body);
  if(req.isAuthenticated()) {
    const queryText = 'INSERT INTO "favorite" (story_id, writer_id) VALUES ($1, $2);';
    pool.query(queryText, [req.body.id, req.user.id])
    .then((result) => {
      res.sendStatus(201);
    }).catch((error) => {
      console.log('Fav post got to the catch in backend router:', error)
      res.sendStatus(500);
    })
    } else {
      res.send(403);
  }
});

/**
DELETE for authenticated users to delete a story that they published
**/
router.delete('/:id', (req, res) => {
  // console.log('authenticated user DELETE server route for Archive Page, req.params is:', req.params);
  if(req.isAuthenticated()) {
    let queryText = 'DELETE FROM "story" WHERE id = $1;';
    pool.query(queryText, [req.params.id])
    .then((result) => {
      console.log('DELETE successful', result);
        res.sendStatus(200);
    }).catch((error) => {
      console.log('error in DELETE, server side', error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

/**
DELETE for authenticated users to delete a favorite from their Archive page
**/
router.delete('/favorite/:id', (req, res) => {
  // console.log('authenticated user DELETE favorite server route for Archive Page, req.params is:', req.params);
  if(req.isAuthenticated()) {
    let queryText = 'DELETE FROM "favorite" WHERE id = $1;';
    pool.query(queryText, [req.params.id])
    .then((result) => {
      console.log('DELETE successful', result);
        res.sendStatus(200);
    }).catch((error) => {
      console.log('error in DELETE, server side', error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

/**
DELETE for authenticated users to delete all favorites of the story they are deleting
**/
router.delete('/allFavorites/:id', (req, res) => {
  // console.log('authenticated user DELETE favorite server route for Archive Page, req.params is:', req.params);
  if(req.isAuthenticated()) {
    let queryText = 'DELETE FROM "favorite" WHERE story_id = $1;';
    pool.query(queryText, [req.params.id])
    .then((result) => {
      console.log('DELETE successful', result);
        res.sendStatus(200);
    }).catch((error) => {
      console.log('error in DELETE, server side', error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

/**
 UPDATE for authenticated users to edit a story they published
 **/
router.put('/:id', (req, res) => {
  // console.log('authenticated user UPDATE server route for edit in Archive Page');
  if(req.isAuthenticated()) {
    let queryText = 'UPDATE story SET story = $1 WHERE id = $2 AND writer_id = $3;';
    pool.query(queryText, [req.body.story, req.params.id, req.user.id])
    .then((result) => {
      console.log('UPDATE successful', result);
        res.sendStatus(201);
    }).catch((error) => {
      console.log('error in PUT, server side', error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;