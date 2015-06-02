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

print("======update - $push+$each+$sort+$slice��������ʹ��======");
/*
 * {$push:{<field1>:<value1>,...}}
 * $push:{<field1>:{<modifier1>:<value1>,...},...}
 * $each:����һ�β���������Ԫ��
 * $sort:������Ԫ�ذ���ָ���ֶν�������
 * $slice:ȡ����Ԫ�ص��Ӽ�
 * $push��������������������ʹ�ã�����ʵ�������������TopNԪ��
 * ע�⣺
 * 1.�����޸�����ִ��˳��sort->slice->store
 * 2.$sort��$slice����Ҫ��$each���ʹ��
 *
 */
var result = db.update_array_test.update(
			{name:"jack"},     //��������
			{
			  $push:
			  {
			    scores:
			    {
			      $each:[
					{"subject":"chinese","score":80},
					{"subject":"math","score":95},
					{"subject":"english","score":70},
					{"subject":"polity","score":60},
					{"subject":"computer","score":85},
				    ],
			      $sort:{"score":-1},    //��������н�������
			      $slice:3               //Top 3
			    }
			  }
			}
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"jack"});
printjson(cursor.toArray());
