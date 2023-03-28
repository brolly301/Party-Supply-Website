const Joi = require("joi");
const ExpressError = require("../../utilities/ExpressError")

module.exports.isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first.')
        return res.redirect('/login')
    }
    next()
}

module.exports.validateMarketplace = (req,res,next) => {
    const marketplaceSchema = Joi.object({
        marketplace: Joi.object({
          name: Joi.string().required(),
          subCategory: Joi.string().required(),
          condition: Joi.string().required(),
          size: Joi.string().optional().allow(''),
          description: Joi.string().required(),
          price: Joi.number().required().min(0),
        }).required()
      })
      const {error} = marketplaceSchema.validate(req.body)
      if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
      } else {
        next()
      }
    
}



