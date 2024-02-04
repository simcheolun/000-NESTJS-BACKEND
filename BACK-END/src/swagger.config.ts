// import { DocumentBuilder } from '@nestjs/swagger';

// export const swaggerOptions = new DocumentBuilder()
//   .setTitle('Your API Title')
//   .setDescription('Your API Description')
//   .setVersion('1.0')
//   .addBearerAuth() // JWT 인증을 위한 Swagger 설정
//   .build();

import { INestApplication } from '@nestjs/common';
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerCustomOptions,
} from '@nestjs/swagger';


//웹 페이지를 새로고침을 해도 Token 값 유지
const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true, // 인증토큰 유지
        displayRequestDuration: true, // 응답시간 표시
    },
    customCss: `
    /* CSS 코드에서 폰트를 설정하세요 */
    body{
        background:rgba(10,10,15,1)
    }
    *{
        font-size:0.90rem ;
        /*font-family: 'Malgun Gothic', monospace;*/
        font-family: 'Malgun Gothic', monospace;
    }
    .swagger-ui .topbar{
        background-color: rgba(30,30,35,1) !important;
        position: fixed !important;
        width:100%;
        top:0;
        z-index:10;
        opacity: 0.8;
    }
    .swagger-ui textarea{
        font-family: 'Malgun Gothic', monospace;
        font-size:0.90rem !important;
        font-weight: 400 !important;
        line-height: 18px !important;
        background-color: #333335 !important;
        color:#fff !important;
    }
    .swagger-ui .info .title small.version-stamp{
        background:rgba(255,50,100,1)
    }
    button{
        outline:none !important;
    }
    .btn .opblock-summary-method{
    }
    pre{
        font-weight:400 !important;
    }
    .opblock-tag *{
        font-size:16px !important;
    }
    .swagger-container{ 
        margin-top:100px !important;
        background:rgba(10,10,15,1) /*1031*/
    }
    .info .title{
        font-size:36 !important;
        color:rgba(100,100,105,1) !important;
    }
    .nostyle span{
        font-size:16px !important;
    }
    .swagger-ui .opblock.is-open .opblock-summary{
        /*매항목가름선*/
        border-bottom:1px solid rgba(80,80,85,1);
        background:rgba(80,80,85,1) !important;
     }
    .swagger-ui .markdown code, .swagger-ui .renderedMarkdown code{
        font-family: 'Malgun Gothic', monospace;
        font-size: 0.90rem !important;
        /*font-weight:500 !important;*/
        color: rgba(150,150,155,1) !important;
    }

    .swagger-ui .opblock .opblock-summary-path{
        color:#e5e5e5;
        font-weight:normal;
    }

    .swagger-ui .opblock-tag a{
        color:rgba(150,150,155,1) !important;
    }

    .swagger-ui .opblock .opblock-summary-description{
        font-family: 'Malgun Gothic', monospace;
        font-size: 0.90rem !important;
        font-weight:400 !important;
        color: rgba(150,150,155,1) !important;
    }

    .swagger-ui .opblock.opblock-post .opblock-summary{
        background:rgba(50,50,55,1) !important;
    }

    .swagger-ui .opblock.opblock-post .opblock-summary-method{
        background: rgba(50,50,55) !important;
    }

    .swagger-ui .opblock.opblock-post .opblock-summary-method:hover{
        background: rgba(80,80,85,1) !important;
    }

    .swagger-ui .opblock.opblock-post{
        border-color: rgba(80,80,85,1) !important;
        background: rgba(255,150,200,0.0) !important;
    }
    .swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span:after{
        background: rgba(255,50,100,1) !important;
    }
    .swagger-ui .opblock.opblock-delete .opblock-summary{
        border-color: rgba(255,150,200,1) !important;
    }
    .swagger-ui .opblock.opblock-delete{
        border-color: rgba(255,150,200,0.5) !important;
        background: rgba(255,150,200,0.0) !important;
    }
    .swagger-ui .opblock.opblock-delete .tab-header .tab-item.active h4 span:after{
        background: rgba(255,150,200,1) !important;
    }
    .swagger-ui .opblock{
        box-shadow:none !important;
    }
    .swagger-ui .opblock.opblock-delete .opblock-summary-method {
        background: rgba(255,150,200,1) !important;
    }
    
    .scheme-container{/*1031*/
        background:rgba(20,20,25,1) !important;
    }

    .opblock-section-header{ /*Parameters*/
        background:rgba(30,30,35,1) !important;
    }
    .swagger-ui .btn{
        border-color: rgba(50,50,55,1) !important;
        background: rgba(50,50,55,1) !important;
        color:rgba(100,100,105,1) !important;
    }

    .swagger-ui .btn.authorize{
        border-color: rgba(50,50,55,1) !important;
        background: rgba(50,50,55,1) !important;
        color:rgba(100,100,105,1) !important;
    }
    .swagger-ui .btn:hover{
        border-color: rgba(80,80,85,1) !important;
        background: rgba(80,80,85,1) !important;
        color:rgba(100,100,105,1) !important;
    }
    .swagger-ui .btn.authorize svg,{
        color:rgba(100,100,105,1) !important;
        fill:rgba(100,100,105,1) !important;
    }
    .authorization__btn{
        fill:rgba(100,100,105,1) !important;
    }
    /*설명부분*/
    .swagger-ui .opblock-description-wrapper, .swagger-ui .opblock-external-docs-wrapper, .swagger-ui .opblock-title_normal{
        padding:5px 10px !important;
        margin: 0 0 0px !important;
    }
    .swagger-ui .opblock .opblock-section-header h4{
        color:#e5e5e5
    }
    .body-param__text,.microlight{
        background:rgba(30,30,35,1) !important
    }
    .arrow{fill:#e5e5e5;}
    .content-type{
        background:rgba(30,30,35,1) !important
    }
    .modal-ux{
        background:rgba(30,30,35,1) !important
    }
    .swagger-ui .dialog-ux .modal-ux-header h3,h4,p,label{
        color:#a5a5a9 !important;
    }
    .topbar-wrapper img{
        display:none;
    }
    input{
        border:1px rgba(30,30,35,1) !important;
        background:rgba(15,15,20,1) !important;
        color:#e5e5e5 !important;
    }

`,
    customSiteTitle: '전산 백엔트 - [NESTJS]', //페이지 타이틀
};

// swagger.config.ts
export function swaggerOptions(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('MALL API')
        .setDescription('몰 백엔드 nestjs + fastify + throttle + jwt + mysql')
        .setVersion('0.0.1')
        //JWT 설정
        .addBearerAuth(
            {
                type: 'apiKey',
                // scheme: '',
                bearerFormat: 'JWT',
                name: 'exjwtauthorization',
                description: 'Enter JWT token',
                in: 'header',
            },

            'exjwtauthorization',
        )
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(
        process.env[`SWAGGER_NAME`],
        app, document, swaggerCustomOptions);
}

