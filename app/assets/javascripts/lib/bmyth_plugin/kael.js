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
                status = {status: params.status, value:v, active:false, activeEvent:[], inactiveEvent:[], param: null, registHistory:[]};
                statusPool.push(status);
            }else{
                if(hasRegisted(status, params.registHistory))
                    return;
            }

            if(params.activeEvent)
                status.activeEvent.push(params.activeEvent);
            if(params.inactiveEvent)
                status.inactiveEvent.push(params.inactiveEvent);
            if(params.param)
                status.param = params.param;
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
        if(option === 'param' || option === 'p'){
            if(!multiple)
                var s = indexStatus(params.status);
            else
                var s = indexStatus(params.status, params.value);
            return s.param;
        }
        if(option === 'set' || option === 's'){
            if(!multiple){
                var s = indexStatus(params.status);
                s.value = params.active;
                s.active = params.active;

                if(params.param)
                    status.param = params.param;

                if(params.static)
                    return;

                if(s.active){
                    triggerAll(s.activeEvent, s.param);
                }else{
                    triggerAll(s.inactiveEvent, s.param);
                }
            }
            else{
                var s = indexStatus(params.status, params.value);
                s.active = params.active;

                if(params.param)
                    s.param = params.param;

                if(params.static)
                    return;

                if(s.active){
                    triggerAll(s.activeEvent, s.param);
                    if(params.unique === true){
                        disableAllBut(params.status, params.value)
                    }
                }else{
                        triggerAll(s.inactiveEvent, s.param);
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

        function triggerAll(eventList, p){
            for(var i=0; i<eventList.length; i++){
                eventList[i](p);
            }
        };
        function disableAllBut(status, value){
            for(var i=0; i<statusPool.length; i++){
                var s = statusPool[i];
                if(s.status === status && s.value !== value && s.active === true){
                    s.active = false;
                    triggerAll(s.inactiveEvent, s.param);
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