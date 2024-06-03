'use server'
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

async function createCheckout(data: FormData) {
    const amount = parseFloat(data.get('amount') as string) * 100;
    let session;
    try {

        const product = await stripe.products.create({
            name: 'deposit'
        })

        const price = await stripe.prices.create({
            currency: 'usd',
            unit_amount: amount,
            product: product.id,
        })

        session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: process.env.NODE_ENV === 'development' ? "http://localhost:3000/payment/success" : "https://all4one.vercel.app/payment/success",
            cancel_url: process.env.NODE_ENV === 'development' ? "http://localhost:3000/user/credits" : "https://all4one.vercel.app/user/credits"
        })

    }
    catch(err) {
        console.log(err)
    }
    if(session?.url)
        redirect(session.url as string)
    else
        redirect('/user/credits?message=Error processing request.')
}

export default createCheckout;