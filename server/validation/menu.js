import joi from "joi";

export const ValidateMenuID = (id) => {
    const Schema = joi.object({
        menus: joi.array().items(
            joi.object({
                name: joi.string().required(),
                items: joi.string(),
            })
        ),
        recommended: joi.string(),
    });

    return Schema.validateAsync(id);
};

export const ValidateMenuImages = (id) => {
    const Schema = joi.object({
    /*    images: joi
            .array()
            .items(joi.object({ location: joi.string().required() })),*/
            images : joi.items(joi.object({ location: joi.string().required() })),

    });

    return Schema.validateAsync(id);
};
