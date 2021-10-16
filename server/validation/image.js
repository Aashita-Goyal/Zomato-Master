import joi from "joi";

export const ValidateImageUpload = (fileUpload) => {
    const Schema = joi.object({
      location : joi.string().required()
     // images
     // uploadImage : joi.items(joi.object({ location: joi.string().required() })),
                   // .array()
    });
  
    return Schema.validateAsync(fileUpload);
  };