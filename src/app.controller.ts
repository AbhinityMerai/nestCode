import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as rawbody from 'raw-body';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';


let id: any;
let obj: Object;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }
  
  @Post()
  async getHello(@Body() data, @Req() req): Promise<string> {
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const text = raw.toString().trim();
      id = uuidv4();
      obj = {
        id, text
      }
      console.log('body:', obj);

    } else {
      // body is parsed by NestJS
      id = uuidv4();
      obj = {
        id, data
      }
      console.log('body:', obj);    
    }

    return this.appService.getHello();
  }

  @Get()
  async getCall(@Req() req): Promise<string> {
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      console.log('body:', obj);

    }
    return this.appService.getHello();
  }
}
