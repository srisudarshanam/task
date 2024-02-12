import { Controller, Get, Res } from '@nestjs/common';
import {Response} from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
   generatepdf(@Res() response: Response) {
    const pdfDoc = this.appService.createPdfDoc();
    response.setHeader('Content-Type', 'application/pdf');
    //response.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
    pdfDoc.pipe(response);
    pdfDoc.end()
  
  }
}

//import { Controller, Get } from '@nestjs/common';
//import { AppService } from './app.service';

//@Controller('pdf')
//export class AppController {
  //constructor(private readonly AppService: AppService) {}

 // @Get('generate')
  //async generatePdf(): Promise<string> {
    //this.AppService.generatePdf();
    //return 'PDF generated!';
  //}
//}




