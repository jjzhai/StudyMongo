//�������ݿ�
dbService = connect("localhost:27017");

//ѡ�����ݿ�
db = dbService.getSiblingDB("jike");

//����bulk����������������
db.update_test.drop();
var bulk = db.update_test.initializeUnorderedBulkOp();

//��������
var doc1 = 
	{
	  _id:1,
	  name:"xiaoli",
	  age:20,
	  address:
	  {
	     province:"GuangDong",
	     city:"ShenZhen"
	  }
	}
bulk.insert(doc1);
var doc2 = 
	{
	  _id:2,
	  name:"xiaoli",
	  age:20,
	  address:
	  {
	     province:"GuangDong",
	     city:"ShenZhen"
	  }
	}
bulk.insert(doc2);

//�������
bulk.execute();

print("======update - $min��������ʹ��");
/*
 * {$min:{field1:value1,......}}
 * ���$min��������value1��ֵС��ʹ��query�������ص��ĵ���field1���ܶ�Ӧֵ�Ļ�����ʹ��value1���滻ԭ���ĵ���ֵ��
 * ���ʹ��query�������ص��ĵ���field1�ֶε�ֵ�����ڵĻ����ͻ���value1���������ֶΡ�
 * ע�⣺һ�ο��Ը����ĵ��Ķ���ֶ�
*/
var result = db.update_test.update(
		{_id:1}, //��������
		{                //��������
		  $min:
		  {
		    "age":16
		  }
		}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
