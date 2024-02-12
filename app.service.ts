
import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { ContentCanvas, TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';

@Injectable()
export class AppService {
  createPdfDoc(): PDFKit.PDFDocument {
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };

    const printer = new PdfPrinter(fonts);
    const imagePath = 'image/pexels-felix-mittermeier-1080400.jpg';

    // Read the image file and convert it to a data URL
    const image = fs.readFileSync(imagePath, { encoding: 'base64' });
    const imageDataUrl = `data:image/jpeg;base64,${image}`;
     
     // Function to convert image to base64 data URL //addnew 
    const imageToBase64 = (path: string): string => {
      const image = fs.readFileSync(path, { encoding: 'base64' });
      return `data:image/png;base64,${image}`;
    };


    const content = [];
    //const content: ContentCanvas[] = [];//new add

    // Add content for multiple pages
    for (let i = 0; i < 5; i++) {
      content.push ({
        text: 'Paragraph about nature',
        fontSize: 14,
        bold: true,
        margin: [30, 120, 0, 0],
      });
      content.push({
        text: [
          'Everything we see around us constitutes nature, including the sun, the moon, trees,',
          'flowers, fruits, human beings, birds, animals, etc. In nature, everyone depends on',
          'one another to keep the ecosystem healthy. For survival, every creature is',
          'interrelated and reliant on one another. Humans, for example, rely on nature for ',
          'their survival, and nature provides us with oxygen, food, water, shelter, medicines,',
          'and clothing, among other things. Many shades may be seen in nature,',
          'contributing to the planets beauty. Along with humans, animals and birds also find',
          'their habitat and means of survival in nature. Therefore, it is essential to take proper',
          'care of our nature to maintain a healthy life.',
        ],
        fontSize: 12,
        margin: [30, 10, 0, 10],
      });

      content.push({
        stack: [
            {
                text: 'DigiTele', // Watermark text
                fontSize: 40,
                color: 'red', // Adjust opacity as needed
                bold: true,
                opacity: 0.4,
                margin: { top: -20, left: -40, right: 0, bottom: 0 }, // Adjust margins if necessary
                //transform: 'rotate(-45)' // Rotate the text by -45 degrees
                rotation: 70,
            }
        ],
        absolutePosition: { x: 250, y: 540 } // Position of the watermark text
    });


      //content.push({
        //image: imageDataUrl,
       // width: 100,
       // height: 100,
       // alignment: 'left',
     // });
      // Add a page break after each section
      //if (i < 4) {
        //content.push({ text: '', pageBreak: 'after' });
      //}
       // Generate chart image and convert it to base64 data URL
        // Assuming you have a base64 data URL of the pie chart image
         // Generate chart image and convert it to base64 data URL
         const chartImagePath = 'image/chart.png';

         // Convert chart image to base64 data URL using the existing function
         const chartImage = imageToBase64(chartImagePath);
         
         // Insert chart image into content array after the nature paragraph
         //content.push({
           //image: chartImage,
           //width:100,
          // height: 100,
           //alignment: 'center',
           //margin: [10, 10, 10, 10],
        // });

         // Assume you have generated the bar graph using a charting library
        const barGraphPath = 'image/bargraph.png';

// Convert bar graph image to base64 data URL using the existing function
          const barGraphImage = imageToBase64(barGraphPath);

          //content.push({
            //image: barGraphImage,
            //width: 50,
            //height: 50,
            //alignment: 'right',
            //margin: [0, 10, 0, 10],
         // });
         content.push({
          //table: {
           //widths: ['33%', '33%', '33%'], // Divide the table into three equal columns
           //widths: ['100%'],
            //body: [
             // [
                
                  image: imageDataUrl,
                  width: 200,
                  height: 150,
                  alignment: 'center',
                });
                content.push({
                
                  image: chartImage,
                  width: 150,
                  height: 150,
                  alignment: 'center',
                });
                content.push({
                
                  image: barGraphImage,
                  width: 150,
                  height: 150,
                  alignment: 'center',
                });
              //],
           // ],
         // },
         // layout: 'noBorders', // Remove table borders
        //});

       // Add watermark for each page
    //   content.push  ({
    //     absolutePosition: { x: 300, y: 590 },
    //     text: 'DigiTele', // Watermark text
    //     fontSize: 40,
    //     color: 'red', // Adjust opacity as needed
    //     bold: true,
    //     opacity: 0.4,
    //     rotation: 60,
    //    // margin: { top: -20, left: -40, right: 0, bottom: 0 }, // Adjust margins to position the text within the page
    // //    margin: { top: -20, left: -40 }, // Adjust margins to position the text within the page
    //     //angle: -45,
      
    //   });
      
      if (i < 4) {
        content.push({ text: '', pageBreak: 'after' });
      }
    }
    // Add watermark to every page ///add newly
    const docDefinition: TDocumentDefinitions = {
      background: [
        {
          canvas: [
            { 
              type: 'rect',
               x: 0, 
               y: 0,
               w: 595.28,
               h: 80, 
               color: 'purple',
             },
            ],
          },
             ],
    
    
        
        // Header for each page
        header: (currentPage: number, pageCount: number)   : ContentCanvas => ({
        canvas: [], 
        columns: [
          // Logo on the left side
          {
            image: 'image/DIGI (2).png', // Path to your logo image
            width: 80,
            height: 70,
            margin: [5, 5, 0, 0], // Adjust the margin as needed
          },
          // Title in the center
          {
            text: 'DIGITELE',
            alignment: 'center',
            fontSize: 24,
            margin: [40, 10, 40, 60], // top, right, bottom, left
            width: '*',
          },
          // Date on the right side
         {
            text: `${new Date().toLocaleDateString()}`,
            alignment: 'right',
            margin: [0, 10, 10, 0],
            width:'65',
          },
        ], // Ensure the type matches ContentColumns
        
      }) as ContentCanvas,
       content: content,
    
      // Footer for each page
      footer: (currentPage: number, pageCount: number) => ({
        columns: [
          { text: '', alignment: 'center' },
          { text: '©DigiTele networks', alignment: 'center', fontSize: 12 }, // Add copyright notice
          { text: `Page ${currentPage} of ${pageCount}`, alignment: 'right',margin: [0, 5, 10, 0] }
        ],
      }),
     
    };

    const options = {
      //...
    };

    return printer.createPdfKitDocument(docDefinition, options);
  }
    }

  


