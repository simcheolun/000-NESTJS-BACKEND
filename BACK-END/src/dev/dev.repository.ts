


export class DevRepository {
    async test(id: any) {
        const subtable = {
            company: [
                { id: 1, name: 'aa' },
                { id: 2, name: 'bb' },
                { id: 3, name: 'cc' },
                { id: 4, name: 'dd' },
            ],
            storage: [
                { id: 1, name: 's1' },
                { id: 2, name: 's2' },
                { id: 3, name: 's3' },
                { id: 4, name: 's4' },
            ],
            home: [
                { id: 1, name: 'home1' },
                { id: 2, name: 'home1' },
                { id: 3, name: 'home1' },
                { id: 4, name: 'home1' },
            ],
        }
        const user = [
            { id: 1, company_id: 1, name: 'a', home_id: 2, },
            { id: 2, company_id: 2, name: 'b', home_id: 1, },
            { id: 3, company_id: 3, name: 'c', home_id: 3, },
        ];

        let result: any = {}; // 빈 객체로 초기화

        function joinInfo(tableName: any, field: any, objField: any, returnKeyName: any) {
            const userInfo = user.find(item => item.id === id);
            if (!userInfo) {
                return null;
            }
            const returnSubInfo = subtable[tableName].find((item: any) => item[objField] === parseInt(userInfo[field]));
            if (!returnSubInfo) {
                return null;
            }
            result[returnKeyName] = returnSubInfo; 
            return result; 
        }
        result = {
            id: id,
            joinInfo: joinInfo 
        };
        return result;
    }

}