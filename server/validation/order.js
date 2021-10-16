import joi from "joi";

export const ValidateUserID = (userID) => {
    const Schema = joi.object({
        user: joi.string(),
    });

    return Schema.validateAsync(userID);
};

export const ValidateNewOrder = (orderData) => {
    const Schema = joi.object({
        orderDetails: joi.array().items(
            joi.object({
                food: joi.string(),
                quantity: joi.number().required(),
                payMode: joi.string().required(),
                status: joi.string(),

                paymentDetails: joi.object({
                    itemTotal: joi.number().required(),
                    promo: joi.number().required(),
                    tax: joi.number().required(),
                }),
            })
        ),
    });

    return Schema.validateAsync(orderData);
};
