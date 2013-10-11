function TaskStorage(){
	function getTaskObj(id,task){
		return {id : id, task : task};
	}
	this.addTask = function(taskName){
		var newId = new Date().getTime().toString();
		console.log("adding the item to the server using AJAX");
		return getTaskObj(newId,taskName);
	};
	this.getAllTasks = function(){
		var result = [];
		console.log("retrieving all the tasks from the server using AJAX")
		return result;
	};
	this.removeTask = function(taskId){
		console.log("removing a task from the server using AJAX");
	}
}
