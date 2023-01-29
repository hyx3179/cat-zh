/* global

    $r,
    WQueue: writable,
    game
*/

WQueueItem = React.createClass({

    componentDidMount: function(){
        this.attachTooltip();
    },

    render: function(){
        var item = this.props.item;

        if (item.value){
            buttons = [
                $r("a", {
                    href: "#", 
                    onClick: this.removeOne,
                }, "[-]"),
                $r("a", {
                    href: "#", 
                    onClick: this.removeAll,
                }, "[x]")
            ]
        } else {
            buttons = [
                $r("a", {
                    href: "#", 
                    onClick: this.removeOne,
                }, "[x]")
            ]
        }

        //TODO: red indicator when can't process
        //TODO: attach tooltip as if it is a button
        return $r("div", {}, 
        [
            "[" + item.type + "][" + item.name + "] - ", 
            $r("span", {ref:"itemLabel", className:"queue-label"}, item.label),
            (
                item.value ? (" " + item.value ) : ""
            )
        ].concat(buttons));
    },

    removeOne: function(){
        var i = this.props.index;
        this.props.queueManager.remove(i, 1);
    },

    removeAll: function(){
        var i = this.props.index;
        this.props.queueManager.remove(i, this.props.item.value);
    },

    attachTooltip: function(){
        var item = this.props.item;
        var game = this.props.game;

        var node = React.findDOMNode(this.refs.itemLabel);
        //TODO: extract controller and model

        //TBD
        if (item.type != "buildings"){
            return;
        }

        var controller = new classes.ui.btn.BuildingBtnModernController(game);
        var model = controller.fetchModel({
            building: item.name,
            key: item.name,
        });
        UIUtils.attachTooltip(game, node, 0, 200, dojo.partial(ButtonModernHelper.getTooltipHTML, controller, model));
    }
});

WQueue = React.createClass({

    getInitialState: function(){
        return {
            typeId: "buildings",
            itemId: null,
            itemLabel: null,
            game: this.props.game
        };
    },

    componentDidMount: function(){
        var self = this;

        //TODO: uncomment and change all game references to this.state.game if you want to update it dynamically

        this.onUpdateHandler = dojo.subscribe("ui/update", function(game){
            self.setState({game: game});
        });
    },

    getQueueTypeSelect: function(){
        var options = [];
        var self = this;
        var queueSources = game.time.queue.queueSourcesArr;
        /*for (var i in queueSources){
            if(queueSources[i]){
                options.push($r("option", { value: i}, i));
            }
        }*/
        for (var i in queueSources){
            options.push($r("option", { value: queueSources[i].name}, queueSources[i].label));
        }
        return $r("select", {
            value: this.state.queueTypeId,
            onChange: function(e){
                var typeId = e.target.value;

                self.setState({
                    typeId: typeId
                });
                var options = game.time.queue.getQueueOptions(typeId);
                if (options.length){
                    self.setState({
                        //itemId: options[0].name,
                        itemId: 0,
                        itemLabel: options[0].label
                    });
                }
                
            }
        }, options);
    },

    getQueueItemSelect: function(options){
        var self = this;
        var selectOpts = [];

        for (var i in options){
            var option = options[i];
            //selectOpts.push($r("option", { value: option.name, "data-label": option.label}, option.label));
            selectOpts.push($r("option", { value: i, "data-label": option.label}, option.label));
        }

        if (!options.length){
            selectOpts.push($r("option", {}, "-"));
        }

        return $r("select", {
            value: this.state.itemId,
            onChange: function(e){
                self.setState({
                    itemId: e.target.value,
                    //itemLabel: e.target.dataset.label
                    //itemId: options[e.target.value].name,
                    itemLabel: options[e.target.value].label
                });
            }
        }, selectOpts);
    },

    getQueueItems: function(){
        var self = this;
        var items = [];

        var queueManager = self.state.game.time.queue;
        var queueItems = queueManager.queueItems;
        
        for (var i in queueItems){
            var item = queueItems[i];
            items.push($r(WQueueItem, {item: item, index: i, queueManager: queueManager, game: game}));
        }
        return $r("div", {}, 
            items
        );
    },

    render: function(){
        var self = this;

        var typeId = this.state.typeId;
        var options = game.time.queue.getQueueOptions(typeId);

        return $r("div", {
            className: "queue-container"
        }, [
            this.getQueueTypeSelect(),
            this.getQueueItemSelect(options),
            $r("button", {
                onClick: function(e){
                    if(self.state.itemId){
                        game.time.queue.addToQueue(
                            //self.state.itemId,
                            options[self.state.itemId].name,
                            self.state.typeId,
                            self.state.itemLabel,
                            e.shiftKey
                        );
                    }else if(options.length){
                        game.time.queue.addToQueue(
                            options[0].name,
                            self.state.typeId,
                            options[0].label,
                            e.shiftKey
                        );
                    }

                    //re-render component
                    self.forceUpdate();
                }
            }, "Add to queue"),

            this.getQueueItems()
        ]);
    }
});