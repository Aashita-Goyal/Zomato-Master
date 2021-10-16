import joi from "joi";

export const ValidateUserID = (id) => {
    const Schema = joi.object({
        _id: joi.string().required(),
      });
    
      return Schema.validateAsync(id);
    };


export const ValidateUserDetails = (userData) => {
    const Schema = joi.object({
        fullname: joi.string().required(),
        email: joi.string().required(),
        password: joi.string(),

        address: joi.array().items(
            joi.object({
                detail: joi.string(),
                for: joi.string(),
            })
        ),

        phoneNumber: joi.array().items(joi.number()),
        
        userID: joi.string(),
    });

    return Schema.validateAsync(userData);
};
