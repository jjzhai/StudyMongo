//�������ݿ����
dbService = connect("localhost:27017");

//ѡ����뼯��
db = dbService.getSiblingDB("jike");

//��ռ����ĵ�
db.insert_test.drop();

//�����ĵ�
var doc1 = 
	   {
		name:"xiaoli",
		age:20,
		address:
		{
		  province:"GuangDong",
		  city:"ShenZhen"	
		}
	   }

//ִ�в������
print("======ʹ��insert�������򼯺��в�������======");
var result = db.insert_test.insert(doc1);

//��ӡ�������صĽ��
printjson(result);

//����ִ�н��
var cursor = db.insert_test.find({});
printjson(cursor.toArray());
