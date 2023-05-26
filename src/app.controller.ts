import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // is called dependency injection
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTestResult(): string {
    return 'test hello';
  }

  @Post('/post_name')
  postHello(): string {
    return 'post i am all good to go';
  }
}
