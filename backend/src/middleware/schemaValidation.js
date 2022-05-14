const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: res.params,
    });

    return next();
  } catch (err) {
    return res.status(400).send({
      type: err.name,
      message: err.message,
    });
  }
};

export default validate;
