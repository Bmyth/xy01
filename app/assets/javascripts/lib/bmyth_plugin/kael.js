$(function(){
    $.globalEval("var statusPool = []");
});

$.extend({
	kael: function(option, params, multiple){
        if(option === 'regist' || option === 'r'){
            if(!multiple)
                var status = indexStatus(params.status);
            else
                var status = indexStatus(params.status, params.value);
            if(!status){
                var v = multiple? params.value : false;
                status = {status: params.status, value:v, active:false, activeEvent:[], inactiveEvent:[], registHistory:[]};
                statusPool.push(status);
            }else{
                if(hasRegisted(status, params.registHistory))
                    return;
            }

            if(params.activeEvent)
                status.activeEvent.push(params.activeEvent);
            if(params.inactiveEvent)
                status.inactiveEvent.push(params.inactiveEvent);
            if(params.registHistory)
                status.registHistory.push(params.registHistory);
            return;
        }
        if(option === 'get' || option === 'g'){
            if(!multiple)
                var s = indexStatus(params.status);
            else
                var s = indexStatus(params.status, params.value);
            return s? s.active : 'not exist';
        }
        if(option === 'set' || option === 's'){
            if(!multiple){
                var s = indexStatus(params.status);
                s.value = params.active;
                s.active = params.active;

                if(s.active){
                    triggerAll(s.activeEvent);
                }else{
                    triggerAll(s.inactiveEvent);
                }
            }
            else{
                var s = indexStatus(params.status, params.value);
                s.active = params.active;
                if(s.active){
                    triggerAll(s.activeEvent);
                    if(params.unique === true){
                        disableAllBut(params.status, params.value)
                    }
                }else{
                        triggerAll(s.inactiveEvent);
                }
            }
            return;
        }

        function indexStatus(status, value){
            for(var i=0; i<statusPool.length; i++){
                if(statusPool[i].status === status){
                    if(typeof value === 'undefined' || statusPool[i].value === value)
                        return statusPool[i];
                }
            }
            return null;
        };

        function triggerAll(eventList){
            for(var i=0; i<eventList.length; i++){
                eventList[i]();
            }
        };
        function disableAllBut(status, value){
            for(var i=0; i<statusPool.length; i++){
                var s = statusPool[i];
                if(s.status === status && s.value !== value){
                    s.active = false;
                    triggerAll(s.inactiveEvent);
                }
            }
        };
        function hasRegisted(status, registHistory){
            var registed = false;
            var history = status.registHistory;
            for(var i=0; i< history.length; i++){
                if(registHistory === history[i]){
                    registed = true;
                }
            }
            return registed;
        };
	}
});