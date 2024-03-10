// 200 읽기성공
// 201 쓰기성공
// 400 실패
// 401 인증안됨

// data_name_seq => dataNameSeq
export function fieldToSimple(item: any) {
  const pattern = /\({[\s\S]*?name: '(\w+)'[\s\S]*?}\)\s*(\w+):/;
  const [, columnName, propertyName] = item.match(pattern);
  const camelPropertyName = propertyName.replace(/_(\w)/g, (match: any, p1: any) => p1.toUpperCase());
  return item.replace(new RegExp(columnName + ':'), camelPropertyName + ':');
}
export function stringToSimple(item: any) {
  return item.replace(/_(\w)/g, (match: any, p1: any) => p1.toUpperCase());
}

export function stringToSimple_(item: any) {
  return item.replace(/-(\w)/g, (match: any, p1: any) => p1.toUpperCase());
}
export function firstToUpper(item: any) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}
// 일련번호생성
export function createSN(): any {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const randomDigits = String(Math.floor(Math.random() * 100000)).padStart(3, '0')
  const defaultSN = `${year}${month}${day}${hours}${minutes}${seconds}${randomDigits}`
  return defaultSN
}

// 콘솔
export function consolE(params: any) {
  console.log(chalk.white.bgRed(JSON.stringify(params)));
}

// 사업자등록번호 형식
export function formatLicenseNumber(license: string) { // 라이센스 형식 포맷 123-45-67890
  const numStr = license.toString();
  return `${numStr.slice(0, 3)}-${numStr.slice(3, 5)}-${numStr.slice(5)}`;
}
// 년월일 생성  19771107
export function getYYYYMMDD(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줍니다.
  const day = today.getDate().toString().padStart(2, '0');
  const currentDate = `${year}${month}${day}`;
  return currentDate;
}


// 페이지분할 사용
export async function getpaginatedData(list: any[], page: number, size: number, hideFields: any[]) {
  page = Number(page)
  size = Number(size)
  const totalCount = list.length
  const offset = (page - 1) * size
  const endIndex = offset + size
  let data = list.slice(offset, endIndex)
  data = data.map(item => {
    for (const field of hideFields) {
      delete item[field];
    }
    return item;
  });
  const total = data.length
  const empty = !total
  return {
    body: {
      empty,
      offset,
      results: data,
      total,
      imit: size,
    },
    totalCount,
    page,
    size,
    statusCode: total ? 'successs' : 'faild',
    code: total ? 200 : 400,
    message: total ? '요청이 반영되었습니다.' : '정보가 없습니다.'
  }
}

export function getData(results: any, IsUD: boolean, OKmessageCode: number, FAmessageCode: number) {
  const messages = [
    { id: 0, message: '요청이 반영되었습니다.' },
    { id: 1, message: '검색된 정보가 없습니다.' },
    { id: 2, message: '충전후 이용하여주세요.' },
  ]
  let OKmessage = messages[0]
  let FAmessage = messages[1]
  if (OKmessageCode) {
    OKmessage = messages[OKmessageCode]
  }
  if (FAmessageCode) {
    FAmessage = messages[FAmessageCode]
  }

  let code = 200
  if (IsUD) { code = 201 }
  return {
    body: {
      empty: results ? false : true,
      results: results ? results : null,
    },
    message: results ? OKmessage : FAmessage,
    statusCode: results ? 'success' : 'fild',
    code: results ? code : 400,
  }
}


// 정보 필터링{}
export async function getDataForId(data: any, id: number) {
  return data.find((item: any) => item.id == id)
}

// 정보 필터링 []
export async function getDataForKeyword(data: any, keyName: any[], searchKeyword: string) {
  return data.filter((item: any) => {
    for (const key of keyName) {
      if (item[key].includes(searchKeyword)) {
        return true
      }
    }
    return false
  });
}


export function returnMessage(message: any, code: number, caching: boolean) {
  return {
    message,
    code,
    caching: caching,
    statusCode: code == 200 || code == 201 ? 'OK' : 'CANCEL'
  }
}

export function returnLoginData(results: any, message: any, code: number, caching: boolean) {
  let statusCode = 'OK'
  if (code == 400) {
    statusCode = 'CANCEL'
  }
  return {
    body: {
      results,
    },
    caChing: caching,
    message: message,
    statusCode,
    code,
  }
}

export function returnJSONSingle(results: any, message: string, satausCode: string, code: number) {
  return {
    body: {
      results,
    },
    message,
    satausCode,
    code,
  }
}
export function returnJSONList(result: any, total: number, page: number, size: number, code: number) {
  let empty: boolean = false
  let results: any = result
  const offset = (page - 1) * size;
  const totalPage = Math.ceil(total / size);
  let statusCode = 'OK'
  let message = '요청이 반영되었습니다.'
  if (results?.length == 0) {
    empty = true; results = []
    statusCode = 'CANCEL'
    message = '검색된 정보가 없습니다.'
  }
  return {
    body: {
      empty: empty,
      offset: offset,
      limit: size,
      results,
      total
    },
    page,
    totalPage,
    message: message,
    statusCode,
    code,
  }
}
export async function checkToken(token: any, jwtService: any) {
  if (token == null || token == undefined || token == 'undefined' || token == 'null') {
    return {
      code: 400,
      message: '비정상 접근입니다.',
      statusCode: 'CANCEL'
    }
  } else {
    let tmpPayload: any
    try {
      tmpPayload = await jwtService.verify(token, { secret: process.env.JWT_SECRET })
      const issuedAt = new Date(tmpPayload.iat * 1000)
      const expirationTime = new Date(tmpPayload.exp * 1000)
    } catch (error) {
      return {
        result: error,
        code: 400,
        message: '잘못된 토근입니다.',
        statusCode: 'CANCEL'
      };
    }

    return {
      result: null,
      code: 200,
      payload: tmpPayload,
      loginUserInfo: tmpPayload?.sub?.loginInfo,
      message: '정상 접근입니다.',
      statusCode: 'OK'
    };
  }
}



// 암호화
const secret = 'simcheolun'
import chalk from 'chalk';
import * as crypto from 'crypto'
export function Encrypt(text: string): string {
  if (typeof text != 'string') {
    text = String(text);
  }
  const iv = crypto.randomBytes(16)
  const key = crypto.scryptSync(secret, 'salt', 32)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + encrypted
}
// 복호화
export function Decrypt(encrypted: string): string {
  const encryptedBuffer = Buffer.from(encrypted, 'hex')
  const iv = encryptedBuffer.slice(0, 16)
  const encryptedText = encryptedBuffer.slice(16)
  const key = crypto.scryptSync(secret, 'salt', 32)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decryptedBuffer = decipher.update(encryptedText)
  decryptedBuffer = Buffer.concat([decryptedBuffer, decipher.final()])
  return decryptedBuffer.toString('utf8')
}

export function setDataGroup(data: any) {
  const newOrderInfo: any[] = [];
  for (const item of data.mallOrderProductInfo) {
    let found = false;
    for (const group of newOrderInfo) {
      if (group.list.length > 0 && group.list[0].companyInfo.seq === item.companyInfo.seq) {
        group.list.push(item);
        found = true;
        break;
      }
    }
    if (!found) {
      item.EcountParams.COMPANY_ID = item.companyInfo.seq
      newOrderInfo.push({
        ecountParams: item.EcountParams,
        list: [item],
      });
    }
  }
  data.newOrderInfo = newOrderInfo;
  return data;
}


export function GroupUserInsert(data: any) {
  return {
    user_number: createSN(),
    user_name: data.user_name,
    user_sex: data.user_sex,
    user_borth: data.user_borth,
    login_id: data.login_id,
    login_pw: data.hashedPassword,
    user_email: data.user_email,
    user_mobile: data.user_mobile,
    user_post_number: data.user_post_number,
    user_address: data.user_address
  }
}
export function GroupUserUpdate(data: any) {
  return {
    user_name: data.user_name,
    user_sex: data.user_sex,
    user_borth: data.user_borth,
    login_id: data.login_id,
    user_email: data.user_email,
    user_mobile: data.user_mobile,
    user_post_number: data.user_post_number,
    user_address: data.user_address
  }
}
export function GroupUserPointUpdate(data: any) {
  return {
    point: data.point
  }
}
export function GroupCompanyInsert(data: any) {
  return {
    company_number: createSN(),
    company_license: data.company_license,
    company_name: data.company_name,
    company_post_number: data.company_post_number,
    company_address: data.company_address,
    company_admin_id: data.loginUserInfo.id,
    created: new Date(),
    updated: new Date(),
    creator: data.loginUserInfo.id,
    updater: data.loginUserInfo.id
  }
}


