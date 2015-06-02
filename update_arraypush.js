//
dbService = connect("localhost:27017");

//
db = dbService.getSiblingDB("jike");

//
db.update_array_test.drop();
var bulk = db.update_array_test.initializeUnorderedBulkOp();

//
var doc1 = {
	      name:"joe",
	      scores:[60,60,61,62]
	   }
bulk.insert(doc1);

var doc2 = {
	      name:"jack",
	      scores:[]
	   }
bulk.insert(doc2);

bulk.execute();

print("======update - $push+$each��������ʹ��======");
/*
 * {$push:{<field1>:<value1>,...}}
 * $push:{<field1>:{<modifier1>:<value1>,...},...}
 * ע�⣺
 * 1.���field1�����ڵĻ���$push���Զ�Ϊfield1���һ�����飬��ʹ��value1��Ϊ����Ԫ��
 * 2.����������ĵ���field1��Ӧ���ֶ�ֵ����һ���������͵�ֵ��ִ��ʧ�ܣ����׳������쳣��
 * 3.���value1��һ���������͵�ֵ�Ļ���push�Ὣ����������Ϊһ��Ԫ����ӵ�field1��Ӧ�������С�
 * 4.���һ��Ҫ��Ӷ��Ԫ�صĻ�����Ҫʹ��$push��$each��������
 */
var result = db.update_array_test.update(
			{name:"joe"},     //��������
			{
			  $push:
			  {
			     scores:80
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
