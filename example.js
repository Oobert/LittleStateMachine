//The little state machine
var fsm = function (states) {
    this.current;
    this.states = states;
};

fsm.prototype.changeStateTo = function (newState, obj) {
    if (this.current &&
        this.current.unload) {
        this.current.unload();
    }


    if (this.states[newState]) {
        this.current = this.states[newState];

        if (this.current.load) {
            this.current.load(obj);
        }
    }
}

fsm.prototype.callAction = function (action, obj) {
    if (this.current[action])
        this.current[action](obj);
}

//example of usage
var myFsm = new fsm({
    state1:{
        StateRelatedObject: {
            text: "hello"
        },
        load: function ()
        {
            console.log(this);
            //do work like load template or show/hide page elements
        },
        StateRelatedFunction: function(data)
        {
            //do specific work related to this state.
            //can access objects or methods on current state like...
            this.StateRelatedObject.text = data;
        },
        unload: function()
        {
            //clean up after yourself here.
        }
    },
    state2:{
        load: function () {  console.log(this); },
        StateRelatedFunctionOrObjects: function() { },
        unload: function(){ }
    }
})

//Example of how to change to a state
myFsm.changeStateTo("state1");

//Example of how to call an action
myFsm.callAction("StateRelatedFunction", "hello world");
console.log(myFsm.current.StateRelatedObject.text);

//Methods can be called directly for automated testing
myFsm.states.state1.load();