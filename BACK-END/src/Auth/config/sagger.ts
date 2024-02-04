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
    *{
        font-size:0.90rem ;
        /*font-family: 'Malgun Gothic', monospace;*/
        font-family: 'Malgun Gothic', monospace;
    }
    .swagger-ui .topbar{
        background-color: rgba(10,10,15,1) !important;
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
    }
    .info .title{
        font-size:36 !important;
    }
    .nostyle span{
        font-size:16px !important;
    }
    .swagger-ui .opblock.is-open .opblock-summary{
        border-bottom:1px solid rgba(137,191,10,0.5) ;
    }
    .swagger-ui .markdown code, .swagger-ui .renderedMarkdown code{
        background: rgba(137,191,10,0.05) !important;
        font-family: 'Malgun Gothic', monospace;
        font-size: 0.90rem !important;
        /*font-weight:500 !important;*/
        color: #222225 !important;
    }
    .swagger-ui .opblock .opblock-summary-description{
        font-family: 'Malgun Gothic', monospace;
        font-size: 0.90rem !important;
        font-weight:400 !important;
        color: #222225 !important;
    }
    .swagger-ui .opblock.opblock-post .opblock-summary-method{
        background: rgba(137,191,10,1) !important;
    }
    .swagger-ui .opblock.opblock-post{
        border-color: rgba(137,191,10,0.5) !important;
        background: rgba(255,150,200,0.0) !important;
    }
    .swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span:after{
        background: rgba(137,191,10,1) !important;
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

    .swagger-ui .btn.authorize{
        border-color: rgba(255,190,220,1) !important;
        color:rgba(255,190,220,1) !important;
    }
    .swagger-ui .btn.authorize svg{
        fill:rgba(255,190,220,1) !important;
    }
    /*설명부분*/
    .swagger-ui .opblock-description-wrapper, .swagger-ui .opblock-external-docs-wrapper, .swagger-ui .opblock-title_normal{
        padding:5px 10px !important;
        margin: 0 0 0px !important;
    }
`,
    customSiteTitle: '플랫폼 백엔트 테스트', //페이지 타이틀
};
export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('PLATFORM API')
        .setDescription('플랫폼 테스트')
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
    SwaggerModule.setup('api19771107', app, document, swaggerCustomOptions);
}



    // // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 개별사용
    // const catDocument = SwaggerModule.createDocument(app, options, {
    //     include: [TestDbEntity],
    // });
    // SwaggerModule.setup('api/getTest', app, catDocument);
    // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 단독사용
    // const catDocument = SwaggerModule.createDocument(app, config, {
    //   include: [BaseInfoModule],
    // });
    // SwaggerModule.setup('api19771107/getBaseInfo', app, catDocument);
    // #-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-# 단독사용