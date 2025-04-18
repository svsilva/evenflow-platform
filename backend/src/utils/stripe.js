import Stripe from 'stripe';

// inicia conexão com a  stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET, {
    httpClient: Stripe.createFetchHttpClient(),
});

// verifica se já existe um cliente com o mesmo email na base da stripe
export const getStripeCustomerByEmail = async (email) =>{
    const customers = await stripe.customers.list({email});
    return customers.data[0];
};

// cria cliente
export const createStripeCustomer = async({
    email,
    name
}) => {
    const customer = getStripeCustomerByEmail(email)
    if(customer) return customer;

    return stripe.customers.create({
        email: email,
        name: name
    });
};

// Cria produto não recorrente
export const createStripeProduct = async({name, description, price}) =>{

    return stripe.products.create({
        name: name,
        description: description,
        active: true,
        default_price_data: {
            currency: 'brl',
            unit_amount_decimal: price
        }
    })
}
