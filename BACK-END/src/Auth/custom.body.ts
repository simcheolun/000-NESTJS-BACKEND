import { getYYYYMMDD } from "./custom.function"

export const listSchema = {
    type: 'object',
    properties: {

        objSearchMapper: {
            type: 'object',
            properties: {
                searchKeyword: { type: 'string', default: null },
            },
        },
        page: { type: 'number', default: 1 },
        size: { type: 'number', default: 14 },
    }
}

export const listSchemaGet = [
    { // 0
        name: 'searchKeyword',
        type: 'string',
        required: false,
        default: null,
    },
    { // 1
        name: 'page',
        type: 'number',
        required: true,
        default: 1,
    },
    { // 2
        name: 'size',
        type: 'number',
        required: true,
        default: 14,
    },
    { // 3
        name: 'id',
        type: 'number',
        required: true,
        default: 1,
    },
    { // 4
        name: 'login_id',
        type: 'string',
        required: true,
        default: 'admin',
    },
    { // 5
        name: 'login_pw',
        type: 'string',
        required: true,
        default: 'password',
    },
]

export const searchIdSchema = {
    type: 'object',
    properties: {
        id: { type: 'number', default: 1 },
    }
}


export const loginSchema = {
    type: 'object',
    properties: {
        login_id: { type: 'string', default: 'admin' },
        login_pw: { type: 'string', default: 'password' },
    }
}

export const insertUserInfoSchema = {
    type: 'object',
    properties: {
        // company_license: { type: 'string', default: '1234567890' },
        // company_name: { type: 'string', default: '남이에컴퍼니' },
        // company_post_number: { type: 'string', default: '123456' },
        // company_address: { type: 'string', default: '서울시 강남구 도곡동 271-1' },

        user_name: { type: 'string', default: '홍길동' },
        user_sex: { type: 'string', default: '남' },
        user_borth: { type: 'string', default: '19771107' },
        login_id: { type: 'string', default: 'admin' },
        login_pw: { type: 'string', default: 'password' },
        user_email: { type: 'string', default: 'hongGilDong@naver.com' },
        user_mobile: { type: 'string', default: '01055513210' },
        user_post_number: { type: 'string', default: '105555' },
        user_address: { type: 'string', default: '서울시 강남구 도곡동 271-1' },
    }
}

export const updateUserInfoSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', default: 1 },
        user_name: { type: 'string', default: '홍길동' },
        user_sex: { type: 'string', default: '남' },
        user_borth: { type: 'string', default: '19771107' },
        login_id: { type: 'string', default: 'admin' },
        user_email: { type: 'string', default: 'hongGilDong@naver.com' },
        user_mobile: { type: 'string', default: '01055513210' },
        user_post_number: { type: 'string', default: '105555' },
        user_address: { type: 'string', default: '서울시 강남구 도곡동 271-1' },
    }
}
export const updateUserPointSchema = {
    type: 'object',
    properties: {
        id: { type: 'number', default: 1 },
        point: { type: 'number', default: 100000 },
    }
}

export const insertCompanyInfoSchema = {
    type: 'object',
    properties: {
        company_license: { type: 'string', default: '1234567890' },
        company_name: { type: 'string', default: '남이에컴퍼니' },
        company_post_number: { type: 'string', default: '123456' },
        company_address: { type: 'string', default: '서울시 강남구 도곡동 271-1' },
    }
}

export const updateCompanyInfoSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', default: 1 },
        company_license: { type: 'string', default: '1234567890' },
        company_name: { type: 'string', default: '남이에컴퍼니' },
        company_post_number: { type: 'string', default: '123456' },
        company_address: { type: 'string', default: '서울시 강남구 도곡동 271-1' },
    }
}

export const messageSchema = {
    processOK: '요청이 반영되었습니다.',
    passwordERROR: '잘못된 비번입니다.',
    userNOTFIND: '사용자가 존재하지 않습니다.',
    userFIND: '사용자가 존재합니다.',
    companyFIND: '회사정보가 존재합니다.',
}
export const statusCode = {
    OK: 'OK',
    CANCEL: 'CANCEL'
}

export const ecountApisSchema = {
    login: {
        type: 'object',
        properties: {
            id: { type: 'string', default: 1 },
            COM_CODE: { type: 'string', default: '608591' },
            USER_ID: { type: 'string', default: '심철운' },
            API_CERT_KEY: { type: 'string', default: '0c55dfa58e5d14390ab5102aa39ef38c36' },
            LAN_TYPE: { type: 'string', default: 'ko-KR' },
            ZONE: { type: 'string', default: 'CD' },
        }
    },
    GetListInventoryBalanceStatus: {
        type: 'object',
        properties: {
            BASE_DATE: { type: 'string', default: getYYYYMMDD() },
            ZERO_FLAG: { type: 'string', default: 'N' },
        }
    }

}


export const redisSchema = {
    keyName: { // 0
        name: 'keyName',
        type: 'string',
        required: true,
        default: 'key',
    },
    keyValue: { // 0
        name: 'keyValue',
        type: 'string',
        required: true,
        default: 'key',
    },
}

export const pukeSpito = {
    puke: {
        type: 'object',
        properties: {
            groups: { type: 'int', default: 2 },
        }
    }
}


export const NESTJSproject = {
    Entity: {
        name: 'entity',
        type: 'string',
        required: true,
        default: null,
    },
    projectName: {
        name: 'projectName',
        type: 'string',
        required: true,
        default: null,
    },
    database: {
        name: 'database',
        type: 'string',
        required: true,
        default: null,
    },
    schema: {
        name: 'schema',
        type: 'string',
        required: true,
        default: 'MASTER',
    },
    table: {
        name: 'table',
        type: 'string',
        required: true,
        default: null,
    },
}