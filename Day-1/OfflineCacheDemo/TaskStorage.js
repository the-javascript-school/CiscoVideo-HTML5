function TaskStorage(){
	var storage = window.sessionStorage;
	function getTaskObj(id,task){
		return {id : id, task : task};
	}
	this.addTask = function(taskName){
		var newId = new Date().getTime().toString();
		storage.setItem(newId,taskName);
		return getTaskObj(newId,taskName);
	};
	this.getAllTasks = function(){
		var result = [];
		for(var i=0;i<storage.length;i++){
			var id = storage.key(i);
			var task = storage.getItem(id);
			result.push(getTaskObj(id,task));
		}
		return result;
	};
	this.removeTask = function(taskId){
		storage.removeItem(taskId);
	}
}
