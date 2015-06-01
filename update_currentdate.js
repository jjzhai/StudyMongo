//连接数据库
dbService = connect("localhost:27017");

//选择数据库
db = dbService.getSiblingDB("jike");

//创建bulk对象用于批量插入
db.update_test.drop();
var bulk = db.update_test.initializeUnorderedBulkOp();

//调试数据
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

//插入操作
bulk.execute();

print("======update - $currentDate操作符的使用");
/*
 * {$currentDate:{<field1>:<typeSpecification1,...>}  }
 * surrrentDate 操作符可以将field1字段的值更新为当前的最新时间
 * 主要用于记录操作的时间，支持Date个timestamp两种类型
 * 默认时间用Date类型来表示，也可以通过使用$type操作符来显式的指定日期格式
 * 隐式的：{$currrentDate:{field1:true}}  field1字段的值会被更新为Date类型时间
 * 显示的：{$currentDate:{$type:"date"}}  或者
 * 	   {{$currentDate: {$type:"timestamp"}}}
 * 注意：1.使用$currentDate操作符，一次可以更新文档的多个字段
 * 2.如果field指定的字段不存在的话，会自动创建
 * 3.使用$currentDate操作符，主要用来记录操作时间
*/
var result = db.update_test.update(
		{_id:1}, //更新条件
		{                //更新内容
		  $currentDate:
		  {
		    "optime_1":true,
		    "optime_2":{$type:"timestamp"}
		  }
		}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
