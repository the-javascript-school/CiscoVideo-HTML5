(function(window){

	var document = window.document
		,btnAddTask
		,txtTask
		,ulTaskList
		,selectTasks
		,btnRemoveTask
		,taskStorage = new TaskStorage();
	
	window.addEventListener("storage",onStorageModified);
	function onStorageModified(storageEvt){
		var key = storageEvt.key;
		if (!!storageEvt.newValue && !storageEvt.oldValue)
			addTaskToUI({id : key, task : storageEvt.newValue});
		if (!storageEvt.newValue && !!storageEvt.oldValue)
			removeTaskFromUI(key);
	}
	function initialize(){
		btnAddTask = document.getElementById("btnAddTask");
		txtTask = document.getElementById("txtTask");
		ulTaskList = document.getElementById("ulTaskList");
		selectTasks = document.getElementById("selectTasks");
		btnRemoveTask = document.getElementById("btnRemoveTask");
		btnAddTask.addEventListener("click",onBtnAddTaskClick);
		btnRemoveTask.addEventListener("click",onBtnRemoveTaskClick);

		loadTasksFromStorage();
	}

	function onBtnRemoveTaskClick(){
		var selectedTaskId = selectTasks.value;
		taskStorage.removeTask(selectedTaskId);
		removeTaskFromUI(selectedTaskId);
		
	}
	function removeTaskFromUI(taskId){
		document.querySelector("li[task-id='" + taskId + "']").remove();
		document.querySelector("option[value='" + taskId + "']").remove();
	}
	function loadTasksFromStorage(){
		var allTasks = taskStorage.getAllTasks();
		for(var i=0;i<allTasks.length;i++){
			addTaskToUI(allTasks[i]);
		}
	}
	function onBtnAddTaskClick(){
		var taskName = txtTask.value;
		var newTaskObj = taskStorage.addTask(taskName);
		addTaskToUI(newTaskObj);			
	}
	function addTaskToUI(newTaskObj){
		var newTask = "<li task-id='" + newTaskObj.id + "'>" + newTaskObj.task +"</li>";
		ulTaskList.innerHTML += newTask;
		selectTasks.innerHTML += "<option value='"+ newTaskObj.id + "'>" + newTaskObj.task + "</option>";

	}
	initialize();

}(window,undefined));
