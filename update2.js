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

print("======update - ��ʹ�ø��²�����");
/*
  ���update�ĵڶ���������ʹ�ø��²�������������ĵ����滻��query���ص��ĵ���
*/
var result = db.update_test.update(
		  {_id:1},
		  {age:26}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
