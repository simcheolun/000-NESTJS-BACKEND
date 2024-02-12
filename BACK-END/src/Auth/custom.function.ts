// 200 읽기성공
// 201 쓰기성공
// 400 실패
// 401 인증안됨
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
export function print(params: any) {
  console.log(chalk.white.bgBlue(' massage: ' + JSON.stringify(params) + ' '));
}
export function Total(price: number, qty: number) { // 금액수량소계
  if (typeof price != 'number' || typeof qty != 'number') { return 0 }
  return price * qty
}
export function TotalTax(price: number, qty: number) { // 부가세 소계
  if (typeof price != 'number' || typeof qty != 'number') { return 0 }
  return price * qty * 0.1
}
export function formatLicenseNumber(license: string) { // 라이센스 형식 포맷 123-45-67890
  const numStr = license.toString();
  return `${numStr.slice(0, 3)}-${numStr.slice(3, 5)}-${numStr.slice(5)}`;
}
export function getYYYYMMDD(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줍니다.
  const day = today.getDate().toString().padStart(2, '0');
  const currentDate = `${year}${month}${day}`;
  return currentDate;
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
  let statusCode ='OK'
  let message ='요청이 반영되었습니다.'
  if (results?.length == 0) { 
    empty = true; results = [] 
    statusCode = 'CANCEL'
    message= '검색된 정보가 없습니다.'
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
      result: 'error',
      code: 401,
      payload: null,
      loginUserInfo: null,
      message: '비정상 접근입니다.',
      statusCode: 'CANCEL'
    }
  } else {
    let tmpPayload: any
    try {
      tmpPayload = await jwtService.verify(token)
      const issuedAt = new Date(tmpPayload.iat * 1000)
      const expirationTime = new Date(tmpPayload.exp * 1000)
      console.log('발급시간:', issuedAt)
      console.log('만료시간:', expirationTime)
    } catch (error) {
      return {
        result: error,
        code: 401,
        payload: tmpPayload,
        loginUserInfo: tmpPayload?.sub?.loginInfo,
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



const secret = 'simcheolun'
import chalk from 'chalk';
import * as crypto from 'crypto'
export function encrypt(text: string): string {
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

export function decrypt(encrypted: string): string {
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
