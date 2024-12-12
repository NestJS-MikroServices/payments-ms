import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { envs } from '../config';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from "express";

@Injectable()
export class PaymentsService {

  private readonly stripe = new Stripe(
    envs.stripeSecret
  )

  async createPaymentSession(paymentSessionDto: PaymentSessionDto){

    // Transforma el DTO
    const { currency, items, orderId } = paymentSessionDto;
    const lineItems = items.map(item => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name
          },
          unit_amount: Math.round(item.price*100)
        },
        quantity: item.quantity
      }
    })

    const session = await this.stripe.checkout.sessions.create({
      // ID de la order
      payment_intent_data: {
        metadata: {
          orderId: orderId
        }
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3003/payments/success',
      cancel_url: 'http://localhost:3003/payments/cancelled',
    });
    return session;
  }

  async stripeWebhook( req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;
    const endpointSecret = 'whsec_xHC39MyiQO9mvfZlQ0JjgKLGPeg246nX';

    try {
      event = this.stripe.webhooks.constructEvent(req['rawBody'], sig, endpointSecret);
    } catch (e) {
      res.status(400).send(`WEBHOOK ERROR : ${e.message}`);
      return;
    }

    // console.log({event});
    switch(event.type){
      case "charge.succeeded":
        // TODO: Solicitar Microservicio
        // console.log(event)
      break;
      default:
        console.log(`EVENT ${event.type} NOT HANDLED`)
    }

    return res.status(200).json({ sig });
  }
}