function doWork(){
	for(var i=0;i<1000;i++)
		for(var j=0;j<1000;j++)
			for(var k=0;k<100;k++)
			{}
}
self.addEventListener("message",function(msgEvt){
	if (msgEvt.data.type === "start"){
		for(var i=1;i<=100;i++){
			doWork();
			self.postMessage({type : "progress", percentCompleted : i});
		}
		self.postMessage({type : "completed"});		
	}
	
})

