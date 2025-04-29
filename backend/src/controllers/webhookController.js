const { stripe } = require('../services/stripeService'); 
const { CheckoutSession } = require('../models/associations/index');
const ingressoController = require('../controllers/ingressoController');

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
                        return res.status(404).json({mensagem: `Webhook recebido, mas a CheckoutSession ${session.id} não foi encontrada no banco de dados.`, success: false})
                    }
                    const status = event.type === 'checkout.session.completed'
                    ? 'pago'
                    : event.type === 'checkout.session.expired'
                    ? 'expirado'
                    : 'cancelado';
                    checkoutSession.status = status;
                    // atualiza o status do checkout no banco
                    await checkoutSession.save();

                    const statusIngresso = event.type === 'checkout.session.expired' || event.type === 'checkout.session.canceled'
                    ? 'cancelado' : 'reservado';

                    // atualiza o status do ingresso.
                    await ingressoController.atualizarStatusIngresso(checkoutSession.ingressoId, statusIngresso);

                    console.log(`CheckoutSession ${checkoutSession.idCheckout} atualizado para ${checkoutSession.status}`);
                    console.log(`Ingresso ${checkoutSession.ingressoId} atualizado para ${statusIngresso}`);
    
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