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

print("======update - $inc��������ʹ��");
/*
 * {$inc:{"�ĵ��ļ�":�����ӵ�ֵ,......}}
 * inc�������������ӣ����߼��٣����м���ֵ���������ֶβ����ڵĻ�������Զ�������
 * ע�⣺1.$inc����ֵ����Ϊ���֣�ֻ���������͡������ͻ򸡵������͡�
 * 2.$inc����ֵΪ������ʱ�򣬻�������м���ֵ��
 * 3.һ�ο��Ը����ĵ��Ķ���ֶΡ�
 * 
*/
var result = db.update_test.update(
		{_id:1}, //��������
		{                //��������
		  $inc:
		  {
		    "age":2
		  }
		}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
