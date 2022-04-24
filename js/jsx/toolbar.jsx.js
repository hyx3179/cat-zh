WToolbarIconContainer=React.createClass({componentDidMount:function(){this.props.getTooltip&&this.attachToolbarTooltip()},render:function(){return $r("div",{className:"toolbarIcon "+this.props.className,ref:"iconContainer"},this.props.children)},attachToolbarTooltip:function(){var a=React.findDOMNode(this.refs.iconContainer),b=this.props.getTooltip,c=this.props.game,e=dojo.byId("tooltip");dojo.empty(e);dojo.connect(a,"onmouseover",this,function(d){c.tooltipUpdateFunc=function(){e.innerHTML=b()};c.tooltipUpdateFunc();
if(d=$(d.originalTarget||d.toElement).offset())dojo.style(e,"left",d.left+"px"),dojo.style(e,"top",d.top+"px"),dojo.style(e,"display",""),dojo.style(a,"fontWeight","bold")});dojo.connect(a,"onmouseout",this,function(){c.tooltipUpdateFunc=null;dojo.style(e,"display","none");dojo.style(a,"fontWeight","normal")})}});
WToolbarHappiness=React.createClass({render:function(){var a=this.props.game;return 5>=a.village.getKittens()?null:$r(WToolbarIconContainer,{game:this.props.game,getTooltip:this.getTooltip,className:"happiness"},$r("div",{className:"happinessText",dangerouslySetInnerHTML:{__html:Math.floor(100*a.village.happiness)+"%"}}))},getTooltip:function(){this.game=this.props.game;var a=this.game.getEffect("happiness");a=$I("village.happiness.base")+": 100%<br>"+$I("village.happiness.buildings")+": +"+Math.floor(a)+
"%<br>";var b=0,c=this.game.resPool.resources;var e=10+this.game.getEffect("luxuryHappinessBonus");for(var d=c.length-1;0<=d;d--)"common"!=c[d].type&&0<c[d].value&&(b+=e,"elderBox"==c[d].name&&this.game.resPool.get("wrappingPaper").value&&(b-=e),"uncommon"==c[d].type&&(b+=this.game.getEffect("consumableLuxuryHappiness")));a+=$I("village.happiness.rare.resources")+": +"+this.game.getDisplayValueExt(b,!1,!1,0)+"%<br>";b=this.game.resPool.get("karma");0<b.value&&(a+=$I("village.happiness.karma")+": +"+
this.game.getDisplayValueExt(b.value,!1,!1,0)+"%<br>");0<this.game.calendar.festivalDays&&(b=30*(1+this.game.getEffect("festivalRatio")),a+=$I("village.happiness.festival")+": +"+this.game.getDisplayValueExt(b,!1,!1,0)+"%<br>");b=this.game.village.getUnhappiness()/(1+this.game.getEffect("unhappinessRatio"));c=b*this.game.getEffect("unhappinessRatio",!0);e=this.game.village.getEnvironmentEffect();a+=$I("village.happiness.penalty")+": -"+this.game.getDisplayValueExt(b+c,!1,!1,0)+"%<br>";a+="* "+$I("village.happiness.penalty.base")+
": -"+this.game.getDisplayValueExt(b,!1,!1,0)+"%<br>";a+="* "+$I("village.happiness.penalty.mitigated")+": "+this.game.getDisplayValueExt(-c,!1,!1,0)+"%<br>";a+=$I("village.happiness.environment")+": "+this.game.getDisplayValueExt(e,!1,!1,0)+"%<br>";b=this.game.village.getKittens()-this.game.village.maxKittens;0<b&&(a+=$I("village.happiness.overpopulation")+": -"+2*b+"%<br>");return a}});
WToolbarEnergy=React.createClass({render:function(){var a=this.props.game;if(!a.science.get("electricity").researched)return null;var b=a.resPool,c="";b.energyProd<b.energyCons?c=" warning":b.energyWinterProd<b.energyCons&&(c=" warningWinter");return $r(WToolbarIconContainer,{game:a,getTooltip:this.getTooltip,className:"energy"+c},$r("div",{className:"energyText",dangerouslySetInnerHTML:{__html:a.getDisplayValueExt(b.energyProd-b.energyCons)+$I("unit.watt")}}))},getTooltip:function(){this.game=this.props.game;
var a=this.game.resPool,b=a.energyProd-a.energyCons,c=this.game.resPool.getEnergyDelta();b=0<=b?"":"<br><br>"+$I("navbar.energy.penalty")+"<span class='energyPenalty'>-"+Math.floor(100*(1-c))+"%</span>";return $I("navbar.energy.prod.short")+" <span class='energyProduction'>"+this.game.getDisplayValueExt(a.energyProd,!0,!1)+$I("unit.watt")+"</span><br>"+$I("navbar.energy.cons.short")+" <span class='energyConsumption'>-"+this.game.getDisplayValueExt(a.energyCons)+$I("unit.watt")+"</span>"+b}});
WToolbarMOTD=React.createClass({render:function(){var a=this.props.game,b=a.server;return b.showMotd&&b.motdTitle?$r(WToolbarIconContainer,{game:a,getTooltip:this.getTooltip,className:b.motdFreshMessage?"freshMessage":null},$r("div",{dangerouslySetInnerHTML:{__html:"&nbsp;"+b.motdTitle+"&nbsp;"}})):null},getTooltip:function(){this.game=this.props.game;var a=this.game.server;if(a.showMotd&&a.motdContent)return a.motdFreshMessage=!1,"\u6709\u95ee\u9898\u627e\u767e\u79d1\u6216\u8005\u732b\u56fdQQ\u7fa4<br />"+
a.motdContent}});
WToolbarPollution=React.createClass({freshMessage:!1,message:"",render:function(){var a=this.props.game,b=this.getTooltip(!0);this.message!=b&&(this.freshMessage=""!=this.message,this.message=b);return 1E5<a.bld.cathPollution||a.science.get("ecology").researched?$r(WToolbarIconContainer,{game:a,getTooltip:this.getTooltip,className:"pollutionIcon "+(this.freshMessage?"energy warning":null)},$r("div",{className:"pollutionText"},a.science.get("ecology").researched?this.getPollutionMod():"\u00a0")):null},
getTooltip:function(a){var b=this.props.game,c="",e=b.bld.getEquilibriumPollution(),d=b.bld.getPollutionLevel(e),h=b.bld.cathPollution,f=b.bld.getPollutionLevel(),k=b.bld.getPollutionLevel(2*h);c=4<=f?c+($I("pollution.level1")+"<br/>"+$I("pollution.level2")+"<br/>"+$I("pollution.level3",[b.getDisplayValueExt(b.villageTab.getVillageTitle(),!1,!1,0)])+"<br/>"+$I("pollution.level4")):3==k||3==f?c+($I("pollution.level1")+"<br/>"+$I("pollution.level2")+"<br/>"+$I("pollution.level3",[b.getDisplayValueExt(b.villageTab.getVillageTitle(),
!1,!1,0)])):2==k?c+($I("pollution.level1")+"<br/>"+$I("pollution.level2")):1==k?c+$I("pollution.level1"):$I("pollution.level0");var g=b.bld.getPollutionLevel(4*h);1<=g&&4>=g&&g>k&&g<=d&&(c+="<br/>"+$I("pollution.level"+g+".warning"));c=1.5*h<=e||d>f?c+("<br/>"+$I("pollution.increasing")):0<=h&&0>=b.bld.cathPollutionPerTick&&d<f?c+("<br/>"+$I("pollution.cleaning")):d==f&&0<e?c+("<br/>"+$I("pollution.equilibrium")):c+("<br/>"+$I("pollution.pristine"));if(a)return c;c+="<br/>CO\u2082: "+(b.science.get("ecology").researched?
this.getPollutionMod():$I("pollution.unspecified"));this.freshMessage=!1;return c},getPollutionMod:function(){var a=this.props.game;return a.getDisplayValueExt(a.bld.cathPollution/a.bld.getPollutionLevelBase()*100)+"ppm"}});
WToolbarFPS=React.createClass({render:function(){var a=this.props.game;return a.isLocalhost?$r(WToolbarIconContainer,{game:a,getTooltip:this.getTooltip},$r("div",{},"fps: "+a.fps.ms+" ms")):null},getTooltip:function(){var a=this.props.game.fps;return" avg: "+a.avg.toFixed()+" ms ["+a.avg0.toFixed()+"."+a.avg1.toFixed()+"."+a.avg2.toFixed()+"."+a.avg3.toFixed()+"."+a.avg4.toFixed()+"] (Cl. to res.)"}});
WBLS=React.createClass({render:function(){var a=this.props.game,b=a.resPool.get("sorrow"),c=b.value;return c?$r(WToolbarIconContainer,{game:a,getTooltip:this.getTooltip,className:"sorrow"+(b.value==b.maxValue?" max":"")},$r("div",{},$I("resources.sorrow.short")+": "+c.toFixed()+"%")):null},getTooltip:function(){return $I("resources.sorrow.full")}});
WLoginForm=React.createClass({getInitialState:function(){return{login:null,password:null,isLoading:!1}},render:function(){if(this.state.isLoading)return $r("span",null,"\u52a0\u8f7d\u4e2d...");var a=this.props.game;if(a.server.userProfile){var b=a.server.userProfile;return $r("div",{className:"userProfile"},[$r("img",{src:"https://q2.qlogo.cn/headimg_dl?dst_uin="+(b.email?b.email:"n/a")+"&spec=1",width:"25px",height:"25px"}),$r("a",{href:"https://kittensgame.com/ui/profile",target:"_blank"},b.qqName)])}return $r("span",
{onClick:function(c){c.stopPropagation()}},[$r("div",{className:"row"},["\u90ae\u7bb1:",$r("input",{type:"email",onChange:this.setLogin,value:this.state.login}),"\u5bc6\u7801:",$r("input",{type:"password",onChange:this.setPassword,value:this.state.password})]),$r("div",{className:"row"},[$r("a",{href:"#",onClick:this.login},"\u767b\u5f55"),$r("a",{onClick:function(c){c.stopPropagation();a.ui.showDialog("registerDiv")}},"\u6ce8\u518c"),$r("span",{paddingTop:"10px"},"\u5b58\u6863\u81ea\u52a8\u5b58\u5728\u6d4f\u89c8\u5668\u7684\u7f13\u5b58\u91cc\uff0c\u4e0d\u6362\u7aef\u65e0\u9700\u4e91\u5b58\u6863")])])},
setLogin(a){a.stopPropagation();a.nativeEvent.stopImmediatePropagation();this.setState({login:a.target.value})},setPassword(a){a.stopPropagation();a.nativeEvent.stopImmediatePropagation();this.setState({password:a.target.value})},login:function(){var a=this;this.setState({isLoading:!0});$.ajax({cache:!1,type:"POST",data:{email:this.state.login,password:this.state.password},xhrFields:{withCredentials:!0},url:this.props.game.server.getServerUrl()+"/user/login/",dataType:"json"}).done(function(b){b.id&&
a.props.game.server.setUserProfile(b)}).always(function(){a.setState({isLoading:!1})})}});
WCloudSaveRecord=React.createClass({bytesToSize(a){if(0==a)return"0 Byte";var b=parseInt(Math.floor(Math.log(a)/Math.log(1024)));return Math.round(a/Math.pow(1024,b),2)+" "+["Bytes","KB","MB","GB","TB"][b]},render:function(){var a=this.props.game,b=this.props.save,c=b.guid==a.telemetry.guid,e=b.guid;return $r("div",{className:"save-record"},[$r("div",{className:"save-record-cell"},$r("a",{},e.substring(e.length-4,e.length)),c?"["+$I("ui.kgnet.save.current")+"]":""),$r("div",{className:"save-record-cell"},
b.index?b.index.calendar.year+"\u5e74\uff0c"+b.index.calendar.day+" \u5929 ":"\u52a0\u8f7d\u4e2d.."),$r("div",{className:"save-record-cell"},(new Date(b.timestamp)).toLocaleDateString("zh-CN",{month:"long",day:"numeric",hour:"numeric",minute:"numeric",hourCycle:"h24"})),$r("div",{className:"save-record-cell"},this.bytesToSize(b.size)),c&&$r("a",{className:"link",title:"\u4e0a\u4f20\u4f60\u5f53\u524d\u6e38\u620f\u5b58\u6863\u5230\u5b98\u7f51\uff08\u4f1a\u8986\u76d6\u65e7\u5b58\u6863\uff09",onClick:function(d){d.stopPropagation();
a.ui.confirm("\u4e0a\u4f20","\u8fd9\u4f1a\u8986\u76d6\u4e91\u7aef\u7684\u5b58\u6863\u3002\u786e\u5b9a/\u53d6\u6d88",function(){a.server.pushSave()})}},$I("ui.kgnet.save.save")),$r("a",{className:"link",title:"\u4e0b\u8f7d\u5e76\u52a0\u8f7d\u4e91\u5b58\u6863\uff08\u4f60\u5f53\u524d\u7684\u5b58\u6863\u4f1a\u4e22\u5931\uff09",onClick:function(d){d.stopPropagation();a.ui.confirm("\u52a0\u8f7d","\u8fd9\u4f1a\u8986\u76d6\u672c\u5730\u7684\u5b58\u6863\u3002 \u786e\u5b9a/\u53d6\u6d88",function(){a.server.loadSave(b.guid)})}},
$I("ui.kgnet.save.load"))])}});
WCloudSaves=React.createClass({render:function(){var a=this.props.game;if(!a.server.userProfile)return null;var b=a.server.saveData,c=!1;if(b&&b.length)for(var e in b)b[e].guid==a.telemetry.guid&&(c=!0);return $r("div",null,[$r("div",{className:"save-record-container"},b&&$r("div",{className:"save-record header"},[$r("div",{className:"save-record-cell"},"\u5b58\u6863ID"),$r("div",{className:"save-record-cell"},"\u6e38\u620f\u5e74"),$r("div",{className:"save-record-cell"},"\u4e0a\u6b21\u66f4\u65b0"),
$r("div",{className:"save-record-cell"},"\u5927\u5c0f"),$r("div",{className:"save-record-cell"},"\u5b58\u6863\u64cd\u4f5c")]),b&&b.map(function(d){return $r(WCloudSaveRecord,{save:d,game:a})})),$r("div",{className:"save-record-container"},[b&&!c&&$r("div",{className:"save-record"},[$r("a",{onClick:function(d){d.stopPropagation();a.server.pushSave()}},"\u521b\u5efa\u65b0\u7684\u5b58\u6863 ("+a.telemetry.guid+")")]),$r("div",{className:"save-record"},[$r("a",{className:"link",title:"\u66f4\u65b0\u5b58\u6863\u4fe1\u606f\u3002\u8fd9\u662f\u5b89\u5168\u6309\u94ae\u4e0d\u4f1a\u6539\u53d8\u4efb\u4f55\u6570\u636e\u3002",
onClick:function(d){d.stopPropagation();a.server.syncSaveData()}},$I("ui.kgnet.sync")),$r("span",{paddingTop:"10px"},b&&b.length?"":$I("ui.kgnet.instructional"))])])])}});
WLogin=React.createClass({getInitialState:function(){return{isExpanded:!1}},render:function(){var a=this.props.game,b=((new Date).getTime()-a.lastBackup)/864E5;return $r(WToolbarIconContainer,{game:a},$r("div",{onClick:this.toggleExpanded},[$r("span",{className:"kgnet-login-link status-indicator-"+(a.server.userProfile?"online":"offline")+(7<=b?" freshMessage":"")},"* "+(a.server.userProfile?$I("ui.kgnet.online"):$I("ui.kgnet.login"))),this.state.isExpanded&&$r("div",{className:"login-popup button_tooltip tooltip-block"},
$r("div",null,$r("div",{className:"last-backup"},[7<=b&&$r("span",{className:"hazard"}),"\u4e0a\u6b21\u66f4\u65b0\uff1a",b.toFixed(1)+" \u5929\u524d",7<=b&&$r("span",{className:"hazard"})]),$r(WLoginForm,{game:a}),$r(WCloudSaves,{game:a})))]))},toggleExpanded:function(){this.setState({isExpanded:!this.state.isExpanded})}});
WToolbar=React.createClass({getInitialState:function(){return{game:this.props.game}},componentDidMount:function(){var a=this;this.onUpdateHandler=dojo.subscribe("ui/update",function(b){a.setState({game:b})})},componentWillUnmount(){dojo.unsubscribe(this.onUpdateHandler)},getIcons:function(){var a=[];a.push($r(WToolbarFPS,{game:this.state.game}),game.opts.disablePollution?null:$r(WToolbarPollution,{game:this.state.game}),$r(WToolbarHappiness,{game:this.state.game}),$r(WToolbarEnergy,{game:this.state.game}),
$r(WBLS,{game:this.state.game}),$r(WToolbarMOTD,{game:this.state.game}),$r(WLogin,{game:this.state.game}));return a},render:function(){var a=this.getIcons();return $r("div",{className:"icons-container"},a)}});
