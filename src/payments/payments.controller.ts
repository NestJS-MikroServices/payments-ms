import { Controller, Get, Post } from "@nestjs/common";
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post('create-payment-session')
  createPaymentSession(){
    return 'createPaymentSession';
  }

  @Get('success')
  success(){
    return {
      ok: true,
      message: 'PAYMENT SUCCESSFUL'
    }
  }

  @Get('cancelled')
  canceled(){
    return {
      ok: false,
      message: 'PAYMENT CANCELED'
    }
  }

  @Post('webhook')
  async stripeWebhook(){
    return 'stripeWebhook';
  }

}
