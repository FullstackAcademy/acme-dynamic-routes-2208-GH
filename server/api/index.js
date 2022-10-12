const router = require('express').Router();
const { db } = require('../db');
const { pluralize } = require('inflection');
module.exports = router;

const isLoggedIn = async(req, res, next)=> {
  try {
    const user = await db.models.user.findByToken(req.headers.authorization); 
    req.user = user;
    next();
  }
  catch(ex){
    const error = new Error('not logged in');
    error.status = 401;
    next(error);
  }
};

/*
 *
 * curl localhost:8080/api/places -d '{"name": "Mount Vernon NY"}' -X POST -H "Content-Type:application/json"
 */
Object.entries(db.models).forEach( entry => {
  const [key, model] = entry;
  router.get(`/${pluralize(key)}`, async(req, res, next)=> {
    try {
      res.send(await model.findAll());
    }
    catch(ex){
      next(ex);
    }
  });
  router.get(`/${pluralize(key)}/:id`, async(req, res, next)=> {
    try {
      res.send(await model.findByPk(req.params.id));
    }
    catch(ex){
      next(ex);
    }
  });
  router.delete(`/${pluralize(key)}/:id`, isLoggedIn, async(req, res, next)=> {
    try {
      const item = await model.findByPk(req.params.id);
      await item.destroy();
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });

  router.put(`/${pluralize(key)}/:id`, isLoggedIn, async(req, res, next)=> {
    try {
      const item = await model.findByPk(req.params.id);
      await item.update(req.body);
      res.send(item);
    }
    catch(ex){
      next(ex);
    }
  });
  router.post(`/${pluralize(key)}`, isLoggedIn, async(req, res, next)=> {
    try {
      res.status(201).send(await model.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
});



router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})
