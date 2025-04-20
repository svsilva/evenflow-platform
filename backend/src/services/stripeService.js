const Stripe = require('stripe');

// inicia conexão com a  stripe
const stripe = new Stripe(process.env.STRIPE_SECRET, {
    httpClient: Stripe.createFetchHttpClient(),
});

// verifica se já existe um cliente com o mesmo email na base da stripe
const getStripeCustomerByEmail = async (email) =>{
    const customers = await stripe.customers.list({email});
    return customers?.data[0];
};

// cria cliente
const createStripeCustomer = async({ email, name }) => {
    try{
        const customer = await getStripeCustomerByEmail(email);
        if(customer) return customer;
    
        const newCustomer = await stripe.customers.create({
            email: email,
            name: name
        });
        return newCustomer
    }
    catch(error){
        console.log('createStripeCustomer Error: ', error);
        throw error; 
    }
  
};

// Cria produto (No nosso caso seria o evento)
const createStripeProduct = async({name, description, price}) =>{
    try{
        let product = await stripe.products.create({
            name: name,
            description: description,
            active: true,
            default_price_data: {
                currency: 'brl',
                unit_amount_decimal: price
            }
        });
        return product;
    }
    catch(Error){
        console.log('createStripeProduct Error: ', error);
        throw Error; 
    }
   
}

// Cria a sessão de pagamento pdo ingresso do usuario.
const createStripeCheckout = async({email, usuarioId, priceId, quantity}) =>{
    try {
        // retorna o cliente na stripe, se não existir cria um
        const customer = await createStripeCustomer({ email });

        const thisSession  = await stripe.checkout.sessions.create({
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_ERROR_URL,
            mode: 'payment',
            customer: customer.id,
            client_reference_id: usuarioId,
            line_items : [
                {
                    price: priceId,
                    quantity: quantity
                }
            ],
            payment_method_types : ['card', 'boleto'],

        })
        return thisSession;

    } catch (error) {
        console.log('checkout Error: ', error);
        throw error; 
    }
}

// const handleCheckoutCompleted = async(event) =>{
//     const checkoutId = event.data.object.id; 
//     //const idUsuario = event.data.object.client_reference_id;
//     //const stripeCustomerId = event.data.object.customer;
//     const checkoutStatus = event.data.object.status;
    
    
//     try {
//         // Chama a controller para atualizar o status do checkout
//         await atualizarStatusCheckout({
//             params: { id: checkoutId },
//             body: { status: checkoutStatus },
//         });

//         console.log(`Checkout ${checkoutId} atualizado com sucesso.`);
//     } catch (error) {
//         console.error(`Erro ao atualizar o checkout ${checkoutId}:`, error);
//         throw error;
//     }

// }

module.exports = {
    stripe,
    getStripeCustomerByEmail,
    createStripeCustomer,
    createStripeProduct,
    createStripeCheckout,
};

