import { Injectable } from '@nestjs/common';
import { CreateEcountApiDto } from './dto/create-ecount-api.dto';
import { UpdateEcountApiDto } from './dto/update-ecount-api.dto';
import axios from 'axios';
import { ZRedisService } from 'z-redis/z-redis.service';
import { getYYYYMMDD } from 'src/Auth/custom.function';

@Injectable()
export class EcountApiService {
  constructor(
    private ZRedisService: ZRedisService
  ) { }
  async login(data: any) {
    const URL = `https://oapi${data.ZONE}.ecount.com/OAPI/V2/OAPILogin`
    const ecount_login_info = await this.ZRedisService.getCaching('ecount_login_info')
    if (ecount_login_info) {
      return ecount_login_info
    } else {
      try {
        const 데이터주석 = {
          //   SESSION_ID: '3630383539317c256563253862256163256563256232256130256563253961256234:CD-AQyPr!VmQT*gy',
          //   HOST_URL: 'oapicd.ecount.com',
          //   SET_COOKIE: '3630383539317c256563253862256163256563256232256130256563253961256234:CD-AQyPr!VmQT*gy=3630383539317c256563253862256163256563256232256130256563253961256234',
          //   COM_CODE: '608591',
          //   USER_ID: '심철운'
        }
        await axios.post(URL, data).then(async (res) => {
          await this.ZRedisService.setCaching('ecount_login_info', res.data.Data.Datas)
          return res.data.Data.Datas
        }).catch((error: any) => {
          console.log(error)
        })
      } catch (error) {
        return error
      }
    }
  }
  async 재고현황(data: any) {
    const ecount_login_info: any = await this.ZRedisService.getCaching('ecount_login_info')
    const URL = `https://oapiCD.ecount.com/OAPI/V2/InventoryBalance/GetListInventoryBalanceStatus?SESSION_ID=${ecount_login_info.SESSION_ID}`
    const params = {
      BASE_DATE: data.BASE_DATE,
      ZERO_FLAG: data.ZERO_FLAG,
    }
    await axios.post(URL, params).then(async (res: any) => {
      console.log(res.data.Data.Result)
      return res.data.Data.Result
    })
    // .catch((error:any)=>{
    //   console.log(error)
    // })
  }
}
