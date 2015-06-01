//�������ݿ�
dbService = connect("localhost:27017");

//ѡ�����ݿ�
db = dbService.getSiblingDB("jike");

//����bulk����������������
db.bulk_test.drop();

//1.��ʼ��һ������bulk
var bulk = db.bulk_test.initializeUnorderedBulkOp();

//2.��bulk����Ӳ���
/*Bulk֧�ֵĲ���������
 * Bulk.insert()
 * Bulk.find.upsert()
 * Bulk.find.update()
 * Bulk.find.updateOne()
 * Bulk.find.replaceOne()
 * Bulk.find.remove()
 * Bulk.find.removeOne()
 */
bulk.insert({_id:1,name:"xiaoli",age:23,sex:"male"});
bulk.insert({_id:2,name:"xiaohong",age:22,sex:"female"});
bulk.insert({_id:3,name:"xiaoqiang",age:23,sex:"male"});

//3.����execute������ִ�в���
var result = bulk.execute();

print("======Bulk��ʹ��======");
printjson(result);

//����һ��ִ�н��
var cursor = db.bulk_test.find({});
printjson(cursor.toArray());
