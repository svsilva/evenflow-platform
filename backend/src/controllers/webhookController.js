const { stripe } = require('../services/stripeService'); 
const { CheckoutSession } = require('../models/associations/index');

class WebhookController {
    async handleStripeWebhook(req, res) {
        const sig = req.headers['stripe-signature'];

        try {
            // Verifica a assinatura do webhook
            const event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            // Lida com os eventos do Stripe
            switch (event.type) {
                case 'checkout.session.completed':
                case 'checkout.session.expired':
                case 'checkout.session.canceled': {
                    const session = event.data.object;

                    const checkoutSession = await CheckoutSession.findOne({
                        where: { idCheckout: session.id },
                    });
                    
                    if(!checkoutSession){
                        console.warn(`CheckoutSession ${session.id} não encontrada no banco de dados.`);
                        return res.status(404).json({mensagem: `CheckoutSession ${session.id} não encontrada no banco de dados.`, success: false})
                    }

                    checkoutSession.status = event.type === 'checkout.session.completed'
                        ? 'pago'
                        : event.type === 'checkout.session.expired'
                        ? 'expirado'
                        : 'cancelado';
                    await checkoutSession.save();
                    console.log(`CheckoutSession ${session.id} atualizado para ${checkoutSession.status}`);
    
                    break;
                }
                default:
                    console.log(`Evento não tratado: ${event.type}`);
            }

            res.json({ received: true });
        } catch (err) {
            console.error('Erro ao processar webhook:', err.message);
            res.status(400).json({mensagem: err.message});
        }
    }
}

module.exports = new WebhookController();