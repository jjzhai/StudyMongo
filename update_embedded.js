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

//�������
bulk.execute();

print("======update - ����������Ƕ�ĵ�======");
/*
  {$set:{field1:value1,......}} 
*/

var result = db.update_test.update(
		  {_id:1},
		  {
		    $set:
		    {
			"address":{province:"Beijing",city:"ChaoYang"}
		    }
		  }
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
