/**
*@author Angel Zou
*@email yuweizou.cn@gmail.com
*/
//数组去重
function delrepeat(arr){
	var dic = {};
	var delrep = [];
	arr.forEach(function(val){
		if(!dic[typeof(val) + val]){
			dic[typeof(val) + val] = true;
			delrep.push(val);
		}
	});
	//console.log(delrep);
	return delrep;
}
function joinArrs(arr1,arr2){
	for(key in arr1){
		arr2.push(arr1[key]);
	}
	return arr2;
}

function getUrlParam(paramname)
{
	var reg = new RegExp("(^|&)" + paramname + "=([^&]*)(&|$)");
	var result = window.location.search.substr(1).match(reg);
	//console.log(result);
	if(result!=null)
	{
		return decodeURI(result[2]);
	}
	return null;
}
function removeHtmlTag(str){
	str = str.replace(/<\/?[^>]*>/g,''); 
    str = str.replace(/[ | ]*\n/g,'\n'); 
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');
    return str;
}

function checkAll($chkParentElement,chkAll,chks,delWho){
	$chkParentElement.delegate(chkAll,"click",function(){
		//console.log("lllll");
		if(chks.length>0){
			if($(this).is(":checked")){
				for(var i=0;i<chks.length;i++){
					chks[i].checked = "checked";
				}
			}else{
				for(var i=0;i<chks.length;i++){
					chks[i].checked = "";
				}
			}	
		}
	});
}




