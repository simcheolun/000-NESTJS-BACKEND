import { Injectable } from '@nestjs/common';
@Injectable()
export class ErshiyidianService {
  constructor() { }
  private generateItemName(item: string, count: number, assignedItems: Set<string>): string {
    let itemName = '';
    do {
      itemName = `${item}${(Math.floor(Math.random() * count) + 1).toString().padStart(2, '0')}`;
    } while (assignedItems.has(itemName));
    return itemName;
  }

  private sortItems(a: string, b: string): number {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    const nameA = a.match(/[a-zA-Z]+/)[0];
    const nameB = b.match(/[a-zA-Z]+/)[0];
    if (numA !== numB) {
      return numA - numB;
    } else {
      const order = ['hong', 'fang', 'hei', 'cao'];
      return order.indexOf(nameA) - order.indexOf(nameB);
    }
  }

  async ErshiyiDian(groups: number) {
    const items = [
      { name: 'HO', count: 13 },
      { name: 'HE', count: 13 },
      { name: 'FA', count: 13 },
      { name: 'ME', count: 13 },
    ];

    const assignedItems = new Set<string>();
    const result: { [key: string]: string | string[] } = {};
    const numGroups = Math.min(groups, 2); // 최대 2개 그룹으로 제한

    for (let i = 1; i <= numGroups; i++) {
      const currentGroup: string[] = [];

      // 각 그룹에 아이템을 할당
      while (currentGroup.length < 2 && assignedItems.size < items.length * 2) {
        const item = items[Math.floor(Math.random() * items.length)];
        const itemName = this.generateItemName(item.name, item.count, assignedItems);
        currentGroup.push(itemName);
        assignedItems.add(itemName);
      }

      // 그룹 내 아이템들을 숫자 우선, 그 다음에 "hong", "fang", "hei", "cao" 순서로 정렬
      currentGroup.sort(this.sortItems.bind(this));

      result[`p${i}`] = currentGroup;
    }

    // 남은 아이템을 'remain' 그룹에 추가
    const remainingItems: string[] = [];
    for (const item of items) {
      for (let k = 1; k <= item.count; k++) {
        const itemName = `${item.name}${(k).toString().padStart(2, '0')}`;
        if (!assignedItems.has(itemName)) {
          remainingItems.push(itemName);
        }
      }
    }

    // 남은 아이템들을 정렬
    remainingItems.sort(this.sortItems.bind(this));

    result['remain'] = remainingItems;

    return result;
  }
}
