import { Injectable } from '@nestjs/common';
import { CreateSpeettoDto } from './dto/create-speetto.dto';
import { UpdateSpeettoDto } from './dto/update-speetto.dto';
import { Encrypt } from 'src/Auth/custom.function';

@Injectable()
export class PukeService {
  constructor() { }
  private generateItemName(item: string, count: number): string {
    return `${item}${(Math.floor(Math.random() * count) + 1).toString().padStart(2, '0')}`;
  }
  private sortItems(a: string, b: string): number {
    const numA = parseInt(a.match(/\d+/)[0]); // 아이템 이름에서 숫자 부분 추출
    const numB = parseInt(b.match(/\d+/)[0]);
    const nameA = a.match(/[a-zA-Z]+/)[0]; // 아이템 이름에서 문자 부분 추출
    const nameB = b.match(/[a-zA-Z]+/)[0];
    if (numA !== numB) {
      return numA - numB;
    } else {
      const order = ['hong', 'fang', 'hei', 'cao'];
      return order.indexOf(nameA) - order.indexOf(nameB);
    }
  }
  async redTen(groups: number) {
    const items = [
      { name: 'HO', count: 13 },
      { name: 'HE', count: 13 },
      { name: 'FA', count: 13 },
      { name: 'ME', count: 13 },
    ];

    const assignedItems = new Set<string>(); // 이미 할당된 아이템을 추적하기 위한 Set
    const result: { [key: string]: string | string[] } = {};
    const numGroups = Math.min(groups, 4); // 최대 4개 그룹으로 제한

    for (let i = 1; i <= numGroups; i++) {
      const currentGroup: string[] = [];

      // 각 그룹에 아이템을 할당
      while (currentGroup.length < 13 && assignedItems.size < items.length * 13) {
        const item = items[Math.floor(Math.random() * items.length)];
        const itemName = this.generateItemName(item.name, item.count);
        if (!assignedItems.has(itemName)) {
          currentGroup.push(itemName);
          assignedItems.add(itemName);
        }
      }

      // 그룹 내 아이템들을 숫자 우선, 그 다음에 "hong", "fang", "hei", "cao" 순서로 정렬
      currentGroup.sort(this.sortItems.bind(this));

      result[`p${i}`] = currentGroup;
    }

    // 나머지 그룹에도 값 할당
    for (let i = numGroups + 1; i <= 4; i++) {
      const currentGroup: string[] = [];

      // 각 그룹에 아이템을 할당
      while (currentGroup.length < 13 && assignedItems.size < items.length * 13) {
        const item = items[Math.floor(Math.random() * items.length)];
        const itemName = this.generateItemName(item.name, item.count);
        if (!assignedItems.has(itemName)) {
          currentGroup.push(itemName);
          assignedItems.add(itemName);
        }
      }

      // 그룹 내 아이템들을 숫자 우선, 그 다음에 "hong", "fang", "hei", "cao" 순서로 정렬
      currentGroup.sort(this.sortItems.bind(this));

      result[`p${i}`] = currentGroup;
    }

    // 남은 아이템을 'remain' 그룹에 추가
    const remainingItems: string[] = [];
    for (const item of items) {
      for (let k = 1; k <= item.count; k++) {
        const itemName = this.generateItemName(item.name, item.count);
        if (!assignedItems.has(itemName)) {
          remainingItems.push(itemName);
        }
      }
    }

    // 남은 아이템들을 정렬
    remainingItems.sort(this.sortItems.bind(this));

    // "hong10"과 "fang10"을 동시에 가진 그룹의 이름을 "redPig"에 설정
    const redPigGroup = Object.keys(result).find(key => result[key].includes('HO10') && result[key].includes('FA10'));
    if (redPigGroup) {
      result['KingRedPig'] = redPigGroup;
    } else {
      result['KingRedPig'] = null;
    }
    const blackPigGroup = Object.keys(result).find(key => result[key]?.includes('HE10') && result[key]?.includes('ME10'));
    if (blackPigGroup) {
      result['KingBlackPig'] = blackPigGroup; // 문자열로 할당
    }
    else {
      result['KingBlackPig'] = null;
    }

    // 암호화
    // result.p1 = Encrypt(JSON.stringify(result.p1))
    // result.p2 = Encrypt(JSON.stringify(result.p2))
    // result.p3 = Encrypt(JSON.stringify(result.p3))
    // result.p4 = Encrypt(JSON.stringify(result.p4))

    result['remain'] = remainingItems;

    return result;
  }
}